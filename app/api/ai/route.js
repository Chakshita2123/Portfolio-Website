import { GoogleGenerativeAI } from '@google/generative-ai';
import { systemPrompt, getContextPrompt } from '@/lib/portfolio-context';

export async function POST(request) {
    try {
        // Check for API key
        if (!process.env.GEMINI_API_KEY) {
            return Response.json(
                {
                    error: 'AI service not configured',
                    message: "I'm not fully set up yet. Please check back soon, or feel free to reach out directly via email!"
                },
                { status: 503 }
            );
        }

        const { message, context } = await request.json();

        // Validate input
        if (!message || typeof message !== 'string') {
            return Response.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Limit message length
        if (message.length > 500) {
            return Response.json(
                { error: 'Message too long', message: 'Please keep your question under 500 characters.' },
                { status: 400 }
            );
        }

        // Build the full prompt with context
        const contextAddition = getContextPrompt(context);
        const fullSystemPrompt = systemPrompt + contextAddition;

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Use gemini-2.5-flash which is available for this API key
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash'
        });

        // Generate content with the full context
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
