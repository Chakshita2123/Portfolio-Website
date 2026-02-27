import Groq from 'groq-sdk';
import { systemPrompt, getContextPrompt, messageEnhancerPrompt } from '@/lib/portfolio-context';

/** Build a short summary of recent conversation for context (last N messages, capped length) */
function buildConversationSummary(history, maxMessages = 6, maxChars = 800) {
    if (!Array.isArray(history) || history.length === 0) return '';
    const recent = history.slice(-maxMessages);
    const lines = recent.map(m => {
        const role = m.role === 'user' ? 'User' : 'Chakshita AI';
        const content = (m.content || '').slice(0, 200);
        return `${role}: ${content}`;
    });
    return lines.join('\n').slice(0, maxChars);
}

export async function POST(request) {
    try {
        if (!process.env.GROQ_API_KEY) {
            return Response.json(
                {
                    error: 'AI service not configured',
                    message: "I'm not fully set up yet. Please check back soon, or feel free to reach out directly via email!"
                },
                { status: 503 }
            );
        }

        const { message, context, pageContext, conversationHistory, mode } = await request.json();

        if (!message || typeof message !== 'string') {
            return Response.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Keep character limit to save tokens
        if (message.length > 1000) {
            return Response.json(
                { error: 'Message too long', message: 'Please keep your message under 1000 characters.' },
                { status: 400 }
            );
        }

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });

        let systemMessageContent = '';
        let userMessageContent = '';

        // Mode: Enhance Message (Specialized Task)
        if (mode === 'enhance-message') {
            systemMessageContent = messageEnhancerPrompt;
            userMessageContent = `User's draft message:\n"${message}"\n\nImproved version:`;
        }
        // Mode: Standard Portfolio Chat
        else {
            const conversationSummary = buildConversationSummary(conversationHistory || []);
            const contextAddition = getContextPrompt(context || 'general', {
                pageContext: pageContext || null,
                conversationSummary
            });
            systemMessageContent = systemPrompt + contextAddition;
            userMessageContent = message;
        }

        // Retry helper for rate-limited requests
        const generateWithRetry = async (retries = 3) => {
            for (let attempt = 0; attempt < retries; attempt++) {
                try {
                    const chatCompletion = await groq.chat.completions.create({
                        messages: [
                            { role: "system", content: systemMessageContent },
                            { role: "user", content: userMessageContent }
                        ],
                        model: "llama-3.1-8b-instant",
                        temperature: 0.7,
                        max_tokens: 1024,
                    });

                    return chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
                } catch (err) {
                    const isRateLimit = err.status === 429 || (err.message && err.message.includes('429'));
                    if (isRateLimit && attempt < retries - 1) {
                        // Wait before retrying (exponential backoff: 2s, 4s, 8s)
                        await new Promise(resolve => setTimeout(resolve, 2000 * Math.pow(2, attempt)));
                        continue;
                    }
                    throw err;
                }
            }
        };

        const text = await generateWithRetry();

        return Response.json({
            message: text,
            success: true
        });

    } catch (error) {
        console.error('AI API Error:', error);

        const isRateLimit = error.status === 429 || (error.message && error.message.includes('429'));

        return Response.json(
            {
                error: isRateLimit ? 'Rate limited' : 'AI service error',
                message: isRateLimit
                    ? "I'm getting a lot of requests right now. Please wait a moment and try again!"
                    : "Sorry, I couldn't process that request. Please try again or reach out directly via the contact page."
            },
            { status: isRateLimit ? 429 : 500 }
        );
    }
}

// Only allow POST
export async function GET() {
    return Response.json(
        { error: 'Method not allowed' },
        { status: 405 }
    );
}
