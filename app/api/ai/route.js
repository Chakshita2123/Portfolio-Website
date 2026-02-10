import { GoogleGenerativeAI } from '@google/generative-ai';
import { systemPrompt, getContextPrompt } from '@/lib/portfolio-context';

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
        if (!process.env.GEMINI_API_KEY) {
            return Response.json(
                {
                    error: 'AI service not configured',
                    message: "I'm not fully set up yet. Please check back soon, or feel free to reach out directly via email!"
                },
                { status: 503 }
            );
        }

        const { message, context, pageContext, conversationHistory } = await request.json();

        if (!message || typeof message !== 'string') {
            return Response.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        if (message.length > 500) {
            return Response.json(
                { error: 'Message too long', message: 'Please keep your question under 500 characters.' },
                { status: 400 }
            );
        }

        const conversationSummary = buildConversationSummary(conversationHistory || []);
        const contextAddition = getContextPrompt(context || 'general', {
            pageContext: pageContext || null,
            conversationSummary
        });
        const fullSystemPrompt = systemPrompt + contextAddition;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash'
        });

        const prompt = `${fullSystemPrompt}\n\nUser question: ${message}\n\nRespond helpfully and professionally:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return Response.json({
            message: text,
            success: true
        });

    } catch (error) {
        console.error('AI API Error:', error);

        return Response.json(
            {
                error: 'AI service error',
                message: "Sorry, I couldn't process that request. Please try again or reach out directly via the contact page."
            },
            { status: 500 }
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
