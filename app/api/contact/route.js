export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app, send actual email here (e.g., mailto, Resend, Nodemailer)
        // For now, log to console for debugging
        console.log('--- NEW CONTACT FORM SUBMISSION ---');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);
        console.log('-----------------------------------');

        return Response.json({
            success: true,
            message: 'Message received! (Console logged)'
        });
    } catch (error) {
        console.error('Contact API Error:', error);
        return Response.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
