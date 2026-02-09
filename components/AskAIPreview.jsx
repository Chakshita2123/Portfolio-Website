'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './AskAIPreview.module.css';

const quickQuestions = [
    { icon: '💡', text: "What are your top skills?" },
    { icon: '🚀', text: "Tell me about your projects" },
    { icon: '💼', text: "Are you open to internships?" },
];

export default function AskAIPreview() {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            content: "Hi! 👋 I'm Chakshita's AI assistant. Ask me anything about her skills, projects, or experience!"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (messageText) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage = messageText.trim();
        setInputValue('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, context: 'general' })
            });

            const data = await response.json();

            if (response.ok && data.message) {
                // Truncate response for preview
                const truncated = data.message.length > 200
                    ? data.message.substring(0, 200) + '...'
                    : data.message;
                setMessages(prev => [...prev, { role: 'ai', content: truncated }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    content: "Let me help you! Try asking about skills or projects.",
                    isError: true
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: "Something went wrong. Please try the full chat!",
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    const handleQuickQuestion = (question) => {
        sendMessage(question);
    };

    return (
        <section className={`section ${styles.askAi}`}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <span className="ai-badge">AI Assistant</span>
                        <h2 className="section-title">
                            Ask <span className="gradient-text">Chakshita AI</span>
                        </h2>
                        <p className="section-subtitle">
                            Get instant answers about my skills, projects, or experience.
                        </p>

                        {/* Quick Questions */}
                        <div className={styles.quickQuestions}>
                            {quickQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    className={styles.quickBtn}
                                    onClick={() => handleQuickQuestion(q.text)}
                                    disabled={isLoading}
                                >
                                    <span>{q.icon}</span>
                                    <span>{q.text}</span>
                                </button>
                            ))}
                        </div>

                        <Link href="/ask-ai" className={styles.fullChatLink}>
                            Open Full Chat →
                        </Link>
                    </div>

                    {/* Chat UI Preview */}
                    <div className={styles.chatContainer}>
                        <div className={`${styles.chatWindow} card-3d`}>
                            {/* Chat Header */}
                            <div className={styles.chatHeader}>
                                <div className={styles.chatStatus}>
                                    <span className={styles.statusDot}></span>
                                    <span className={styles.statusText}>Chakshita AI</span>
                                </div>
                                <span className={styles.chatBeta}>
                                    {isLoading ? 'Thinking...' : 'Online'}
                                </span>
                            </div>

                            {/* Chat Messages */}
                            <div className={styles.chatMessages}>
                                {messages.slice(-3).map((msg, index) => (
                                    <div key={index} className={msg.role === 'ai' ? styles.messageBot : styles.messageUser}>
                                        <div className={msg.role === 'ai' ? styles.messageBubble : styles.messageBubbleUser}>
                                            <p>{msg.content}</p>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className={styles.messageBot}>
                                        <div className={styles.messageBubble}>
                                            <div className={styles.typingIndicator}>
                                                <span></span><span></span><span></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleSubmit} className={styles.chatInput}>
                                <input
                                    type="text"
                                    placeholder="Ask me anything..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className={styles.input}
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    className={`${styles.sendBtn} ${inputValue.trim() && !isLoading ? styles.sendBtnActive : ''}`}
                                    disabled={!inputValue.trim() || isLoading}
                                >
                                    <span>Send</span>
                                    <span className={styles.sendIcon}>→</span>
                                </button>
                            </form>
                        </div>

                        {/* Decorative Elements */}
                        <div className={styles.decorCircle}></div>
                        <div className={styles.decorCircle2}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
