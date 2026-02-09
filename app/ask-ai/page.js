'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './ask-ai.module.css';

const STORAGE_KEY = 'chakshita-ai-conversations';

const welcomeMessage = {
    role: 'ai',
    content: "Hi, I'm Chakshita AI.\n\nI'm your personal guide to exploring Chakshita's work, skills, and experience. Ask me anything — I'm here to help you find exactly what you're looking for.",
    isWelcome: true,
    timestamp: Date.now()
};

// Format timestamp for message display (e.g., "6:42 PM")
const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

const suggestedQuestions = [
    { icon: '💡', text: "What are your strongest skills?" },
    { icon: '🚀', text: "Which project should I start with?" },
    { icon: '💼', text: "Are you open to internships or full-time roles?" },
    { icon: '📧', text: "How can I contact you?" },
    { icon: '🎯', text: "Tell me about your design approach" },
    { icon: '🤖', text: "What AI tools do you work with?" },
];

// Generate a unique ID for conversations
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Get a preview of the conversation (first user message)
const getConversationPreview = (messages) => {
    const firstUserMsg = messages.find(m => m.role === 'user');
    if (firstUserMsg) {
        return firstUserMsg.content.length > 40
            ? firstUserMsg.content.substring(0, 40) + '...'
            : firstUserMsg.content;
    }
    return 'New conversation';
};

export default function AskAIPage() {
    const [conversations, setConversations] = useState([]);
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [messages, setMessages] = useState([welcomeMessage]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const messagesEndRef = useRef(null);

    // Load conversations from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setConversations(parsed);
                    // Load the most recent conversation
                    const mostRecent = parsed[0];
                    setActiveConversationId(mostRecent.id);
                    setMessages(mostRecent.messages);
                }
            }
        } catch (e) {
            console.warn('Failed to load conversations:', e);
        }
        setIsHydrated(true);
    }, []);

    // Save conversations to localStorage
    const saveConversations = useCallback((convs) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(convs));
        } catch (e) {
            console.warn('Failed to save conversations:', e);
        }
    }, []);

    // Update current conversation in storage
    useEffect(() => {
        if (!isHydrated || !activeConversationId) return;

        // Only save if there are actual messages beyond welcome
        if (messages.length > 1) {
            setConversations(prev => {
                const existing = prev.find(c => c.id === activeConversationId);
                let updated;
                if (existing) {
                    updated = prev.map(c =>
                        c.id === activeConversationId
                            ? { ...c, messages, updatedAt: Date.now() }
                            : c
                    );
                } else {
                    updated = [
                        { id: activeConversationId, messages, createdAt: Date.now(), updatedAt: Date.now() },
                        ...prev
                    ];
                }
                // Sort by most recent and limit to 10 conversations
                updated = updated.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 10);
                saveConversations(updated);
                return updated;
            });
        }
    }, [messages, activeConversationId, isHydrated, saveConversations]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Start a new conversation
    const startNewConversation = useCallback(() => {
        const newId = generateId();
        setActiveConversationId(newId);
        setMessages([welcomeMessage]);
        setShowSidebar(false);
    }, []);

    // Switch to a conversation
    const switchConversation = useCallback((conv) => {
        setActiveConversationId(conv.id);
        setMessages(conv.messages);
        setShowSidebar(false);
    }, []);

    // Delete a conversation
    const deleteConversation = useCallback((convId, e) => {
        e.stopPropagation();
        setConversations(prev => {
            const updated = prev.filter(c => c.id !== convId);
            saveConversations(updated);
            return updated;
        });
        // If deleting active conversation, start fresh
        if (convId === activeConversationId) {
            startNewConversation();
        }
    }, [activeConversationId, saveConversations, startNewConversation]);

    // Clear all history
    const clearAllHistory = useCallback(() => {
        setConversations([]);
        localStorage.removeItem(STORAGE_KEY);
        startNewConversation();
    }, [startNewConversation]);

    const sendMessage = async (messageText) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage = messageText.trim();
        setInputValue('');

        // Ensure we have an active conversation ID
        if (!activeConversationId) {
            setActiveConversationId(generateId());
        }

        // Add user message with timestamp
        setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: Date.now() }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, context: 'general' })
            });

            const data = await response.json();

            if (response.ok && data.message) {
                setMessages(prev => [...prev, { role: 'ai', content: data.message, timestamp: Date.now() }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    content: data.message || "Sorry, I couldn't process that. Please try again or reach out directly via the contact page.",
                    isError: true,
                    timestamp: Date.now()
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: "I'm having trouble connecting. Please try again later or contact Chakshita directly.",
                isError: true,
                timestamp: Date.now()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    const handleQuestionClick = (question) => {
        sendMessage(question);
    };

    // Format date for display
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <>
            <Navbar />
            <main className={styles.askAiPage}>
                {/* Page Header */}
                <section className={styles.pageHeader}>
                    <div className="container">
                        <div className={`${styles.headerContent} ${styles.animateIn}`}>
                            <div className={styles.aiIndicator}>
                                <span className={styles.aiDot}></span>
                                <span className={styles.aiLabel}>AI Assistant</span>
                            </div>
                            <h1 className={styles.pageTitle}>
                                Ask <span className="gradient-text">Chakshita AI</span>
                            </h1>
                            <p className={styles.pageSubtitle}>
                                An AI-powered assistant that helps you explore my work, skills, and experience.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Chat Interface */}
                <section className={`section ${styles.chatSection}`}>
                    <div className="container">
                        <div className={`${styles.chatLayout} ${styles.animateIn} ${styles.delay1}`}>

                            {/* History Sidebar */}
                            <div className={`${styles.historySidebar} ${showSidebar ? styles.sidebarOpen : ''}`}>
                                <div className={styles.sidebarHeader}>
                                    <h3 className={styles.sidebarTitle}>Chat History</h3>
                                    <button
                                        className={styles.closeSidebarBtn}
                                        onClick={() => setShowSidebar(false)}
                                    >
                                        ×
                                    </button>
                                </div>

                                <button
                                    className={styles.newChatBtn}
                                    onClick={startNewConversation}
                                >
                                    + New Chat
                                </button>

                                <div className={styles.conversationsList}>
                                    {conversations.length === 0 ? (
                                        <p className={styles.noHistory}>No previous chats</p>
                                    ) : (
                                        conversations.map(conv => (
                                            <div
                                                key={conv.id}
                                                className={`${styles.conversationItem} ${conv.id === activeConversationId ? styles.conversationActive : ''}`}
                                                onClick={() => switchConversation(conv)}
                                            >
                                                <div className={styles.conversationInfo}>
                                                    <span className={styles.conversationPreview}>
                                                        {getConversationPreview(conv.messages)}
                                                    </span>
                                                    <span className={styles.conversationTime}>
                                                        {formatDate(conv.updatedAt)}
                                                    </span>
                                                </div>
                                                <button
                                                    className={styles.deleteConvBtn}
                                                    onClick={(e) => deleteConversation(conv.id, e)}
                                                    title="Delete"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {conversations.length > 0 && (
                                    <button
                                        className={styles.clearAllBtn}
                                        onClick={clearAllHistory}
                                    >
                                        Clear all history
                                    </button>
                                )}
                            </div>

                            {/* Main Chat Container */}
                            <div className={styles.chatContainer}>
                                {/* Chat Window */}
                                <div className={styles.chatWindow}>
                                    {/* Chat Header */}
                                    <div className={styles.chatHeader}>
                                        <div className={styles.chatStatus}>
                                            <button
                                                className={styles.historyToggleBtn}
                                                onClick={() => setShowSidebar(!showSidebar)}
                                                title="Chat history"
                                            >
                                                ☰
                                            </button>
                                            <div className={styles.avatarContainer}>
                                                <span className={styles.avatar}>C</span>
                                                <span className={styles.statusDotOnline}></span>
                                            </div>
                                            <div className={styles.statusInfo}>
                                                <span className={styles.statusText}>Chakshita AI</span>
                                                <span className={styles.statusSubtext}>Portfolio Assistant</span>
                                            </div>
                                        </div>
                                        <div className={styles.headerActions}>
                                            <button
                                                className={styles.newChatHeaderBtn}
                                                onClick={startNewConversation}
                                                title="New chat"
                                            >
                                                + New
                                            </button>
                                            <span className={styles.statusBadge}>
                                                {isLoading ? 'Thinking...' : 'Online'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Chat Messages Area */}
                                    <div className={styles.chatMessages}>
                                        {messages.map((msg, index) => (
                                            msg.role === 'ai' ? (
                                                <div key={index} className={styles.messageAi}>
                                                    <div className={styles.messageAvatar}>
                                                        <span>C</span>
                                                    </div>
                                                    <div className={`${styles.messageBubbleAi} ${msg.isError ? styles.messageError : ''}`}>
                                                        {msg.isWelcome && (
                                                            <p className={styles.messageGreeting}>
                                                                Hi, I'm Chakshita AI
                                                            </p>
                                                        )}
                                                        <p className={styles.messageText}>
                                                            {msg.isWelcome
                                                                ? "I'm your personal guide to exploring Chakshita's work, skills, and experience. Ask me anything — I'm here to help you find exactly what you're looking for."
                                                                : msg.content
                                                            }
                                                        </p>
                                                        {msg.isWelcome && (
                                                            <div className={styles.messageCapabilities}>
                                                                <span className={styles.capabilityTag}>Skills and Expertise</span>
                                                                <span className={styles.capabilityTag}>Project Details</span>
                                                                <span className={styles.capabilityTag}>Work Availability</span>
                                                            </div>
                                                        )}
                                                        {msg.timestamp && !msg.isWelcome && (
                                                            <span className={styles.messageTimestamp}>
                                                                {formatMessageTime(msg.timestamp)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div key={index} className={styles.messageUser}>
                                                    <div className={styles.messageBubbleUser}>
                                                        <p>{msg.content}</p>
                                                        {msg.timestamp && (
                                                            <span className={styles.messageTimestamp}>
                                                                {formatMessageTime(msg.timestamp)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        ))}

                                        {/* Loading indicator */}
                                        {isLoading && (
                                            <div className={styles.messageAi}>
                                                <div className={styles.messageAvatar}>
                                                    <span>C</span>
                                                </div>
                                                <div className={styles.messageBubbleAiPlaceholder}>
                                                    <div className={styles.typingIndicator}>
                                                        <span className={styles.typingDot}></span>
                                                        <span className={styles.typingDot}></span>
                                                        <span className={styles.typingDot}></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Chat Input Area */}
                                    <form onSubmit={handleSubmit} className={styles.chatInputArea}>
                                        <div className={styles.contextIndicator}>
                                            <span className={styles.contextDot}></span>
                                            <span>Context: Portfolio Assistant</span>
                                        </div>
                                        <div className={`${styles.inputWrapper} ${isFocused ? styles.inputFocused : ''}`}>
                                            <input
                                                type="text"
                                                placeholder="Ask about skills, projects, or experience..."
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onFocus={() => setIsFocused(true)}
                                                onBlur={() => setIsFocused(false)}
                                                className={styles.chatInput}
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="submit"
                                                className={`${styles.sendButton} ${inputValue.trim() && !isLoading ? styles.sendButtonActive : ''}`}
                                                disabled={!inputValue.trim() || isLoading}
                                            >
                                                <span className={styles.sendIcon}>→</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Suggested Questions */}
                                <div className={`${styles.suggestionsSection} ${styles.animateIn} ${styles.delay2}`}>
                                    <p className={styles.suggestionsLabel}>
                                        <span className={styles.sparkle}>✨</span>
                                        Try asking:
                                    </p>
                                    <div className={styles.suggestionsGrid}>
                                        {suggestedQuestions.map((question, index) => (
                                            <button
                                                key={index}
                                                className={styles.suggestionChip}
                                                onClick={() => handleQuestionClick(question.text)}
                                                disabled={isLoading}
                                            >
                                                <span className={styles.chipIcon}>{question.icon}</span>
                                                <span>{question.text}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Trust Note */}
                                <div className={`${styles.trustNote} ${styles.animateIn} ${styles.delay3}`}>
                                    <div className={styles.trustNoteContent}>
                                        <span className={styles.trustIcon}>🔒</span>
                                        <div className={styles.trustText}>
                                            <span className={styles.trustTitle}>Powered by Real Data</span>
                                            <span className={styles.trustDescription}>
                                                This AI assistant is trained on actual project data, skills, and experience — no made-up information.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Navigation CTAs */}
                <section className={`section ${styles.ctaSection}`}>
                    <div className="container">
                        <div className={`${styles.ctaContent} ${styles.animateIn}`}>
                            <p className={styles.ctaText}>Want to explore more?</p>
                            <div className={styles.ctaButtons}>
                                <Link href="/projects" className="btn btn-primary">
                                    View Projects <span>→</span>
                                </Link>
                                <Link href="/skills" className="btn btn-secondary">
                                    Browse Skills
                                </Link>
                                <a href="/#contact" className="btn btn-ghost">
                                    Contact Me
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Sidebar Overlay */}
            {showSidebar && (
                <div
                    className={styles.sidebarOverlay}
                    onClick={() => setShowSidebar(false)}
                />
            )}
        </>
    );
}
