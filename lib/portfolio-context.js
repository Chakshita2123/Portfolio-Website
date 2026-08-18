/**
 * Portfolio Context - Chakshita's Complete Profile
 * This data is used by the AI to answer questions accurately.
 */

export const portfolioContext = {
    personal: {
        name: "Chakshita",
        title: "Full-Stack Developer & Applied AI/ML Builder",
        tagline: "Building products end-to-end — from native apps to ML models",
        location: "India",
        availability: ["Internships", "Full-time roles", "Collaborations"],
        contact: {
            email: "chakshitajaswal2106@gmail.com",
            linkedin: "https://www.linkedin.com/in/chakshita-jaswal-4a691a2ba/",
            github: "https://github.com/Chakshita2123",
            resume: "/resume.pdf"
        }
    },

    currentlyBuilding: [
        "Migrating MARKD to native Android with Capacitor",
        "Training an XGBoost model for Journey Curator's cost predictor"
    ],

    summary: `Chakshita is a full-stack developer with a growing focus on applied AI/ML — 
building products end-to-end rather than just wrapping LLM APIs. 
Her work spans React/Next.js frontends, Node.js/MongoDB backends, and real model training 
(regression, prediction pipelines) alongside LLM integration for features like OCR, chat, and recommendations.
She is currently a B.Tech CSE student, open to internships and full-time opportunities.`,

    education: {
        degree: "Bachelor of Technology",
        field: "Computer Science",
        status: "Current Student",
        focus: "Applied AI/ML, full-stack development, product thinking"
    },

    skills: {
        frontend: [
            { name: "React", description: "Component architecture, hooks, state management" },
            { name: "Next.js 15", description: "App Router, API routes, SSR/SSG, streaming" },
            { name: "JavaScript/TypeScript", description: "ES6+, async patterns, type safety" },
            { name: "CSS Modules", description: "Responsive design, animations, design systems" }
        ],
        backend: [
            { name: "Node.js / Express", description: "REST API development, middleware" },
            { name: "MongoDB", description: "Data modelling, Atlas, Mongoose" },
            { name: "Python", description: "ML pipelines, scripting, FastAPI" },
            { name: "NextAuth", description: "Authentication, OAuth, session management" }
        ],
        aiMl: [
            { name: "Gemini API", description: "Vision, chat, OCR, structured output" },
            { name: "Groq", description: "Fast inference, fallback LLM integration" },
            { name: "scikit-learn / XGBoost", description: "Real model training — regression, prediction pipelines" },
            { name: "Capacitor", description: "Cross-platform runtime for native Android deployment" },
            { name: "Prompt Engineering", description: "Context-aware prompts, guardrails, structured output" }
        ],
        tools: [
            { name: "Capacitor", description: "Native Android deployment from web apps" },
            { name: "Monaco Editor", description: "In-browser code editing with syntax highlighting" },
            { name: "Git / GitHub", description: "Version control, PRs, collaboration" },
            { name: "Vercel", description: "Deployment, CI/CD, edge functions" },
            { name: "Postman", description: "API design and testing" }
        ]
    },

    certifications: [
        "Meta Marketing Analytics Professional Certificate",
        "Finance for Everyone Specialization (McMaster University)",
        "Google Prompting Essentials Specialization",
        "IBM Generative AI Fundamentals Specialization",
        "Prompt Design in Vertex AI (Google Cloud)",
        "Build Real World AI Applications with Gemini and Imagen (Google Cloud)"
    ],

    projects: [
        {
            id: 1,
            title: "Code Review AI",
            featured: true,
            problem: "Developers need fast, structured feedback on code — not generic AI chat responses.",
            description: "Full-stack AI-powered code review platform with streaming reviews (SSE), multiple review templates, GitHub PR review, an AI chat assistant with LaTeX rendering, and PDF export.",
            techStack: ["Next.js 15", "TypeScript", "MongoDB", "NextAuth", "Gemini/Groq", "Monaco Editor"],
            liveUrl: "https://code-review-ai-blond.vercel.app/",
            githubUrl: "https://github.com/Chakshita2123/Code-Review-AI",
            highlights: ["Streaming SSE reviews", "GitHub PR integration", "LaTeX rendering", "PDF export"]
        },
        {
            id: 2,
            title: "MARKD — Attendance Tracker",
            featured: true,
            problem: "Students need a reliable, mobile-native way to track attendance without relying on spreadsheets or fragile college portals.",
            description: "Cross-platform attendance tracker with Google OAuth, native Android sign-in via Capacitor, AI-powered timetable upload (Gemini Vision + Groq fallback), and balance tracking.",
            techStack: ["React", "Node.js", "MongoDB", "Capacitor (Android)", "Gemini Vision API", "Groq"],
            liveUrl: "https://attendance-tracker-ruddy-ten.vercel.app/",
            githubUrl: "https://github.com/Chakshita2123/Attendance-Tracker-Chakshita",
            apkUrl: "https://github.com/Chakshita2123/Attendance-Tracker-Chakshita/releases/download/v1.0/app-debug.apk",
            caseStudyUrl: "/projects/markd",
            highlights: [
                "Full case study available at /projects/markd",
                "Native Android via Capacitor with APK release",
                "AI timetable parsing (Gemini Vision) with Groq fallback",
                "Attendance balance calculations"
            ]
        },
        {
            id: 3,
            title: "Journey Curator",
            featured: false,
            problem: "Most AI travel planners are just LLM wrappers with no real predictive intelligence.",
            description: "Travel planning platform built around a real ML core — a trip cost predictor trained with scikit-learn/XGBoost — combined with Gemini/Groq for planning assistance. Currently in progress.",
            techStack: ["Next.js 15", "TypeScript", "MongoDB", "Python", "scikit-learn/XGBoost"],
            githubUrl: "https://github.com/Chakshita2123/Journey-Curator-AI",
            status: "In Progress",
            highlights: ["Real ML model (scikit-learn/XGBoost)", "Trip cost prediction", "LLM planning assistance", "In Progress"]
        },
        {
            id: 4,
            title: "Portfolio — This Site",
            featured: false,
            problem: "Traditional portfolios are static PDFs disguised as websites — they don't demonstrate how someone actually builds.",
            description: "A clean, AI-integrated personal portfolio with an embedded AI assistant grounded in real project data.",
            techStack: ["Next.js", "React", "CSS Modules", "Gemini API"],
            liveUrl: "https://portfolio-website-zeta-seven-42.vercel.app/",
            githubUrl: "https://github.com/Chakshita2123/Portfolio-Website",
            highlights: ["Embedded AI assistant", "Real project data", "Clean design"]
        }
    ]
};

/**
 * System prompt for the AI assistant
 */
export const systemPrompt = `You are Chakshita AI — a portfolio-aware assistant.

Your role is to help users understand Chakshita as a developer and builder using the provided portfolio context.

You can answer ANY user question as long as it can be reasonably interpreted in the context of Chakshita's:
- skills and tech stack
- projects with real URLs and details (Code Review AI, MARKD with its Android APK release and case study, Journey Curator, Portfolio)
- certifications
- experience, currently building items, and approach
- availability (internships, full-time roles, collaborations)
- background and education

If a question asks for links (live demos, GitHub repos, APK download, resume):
- Provide the real links from the portfolio context accurately.

If a question is broad or loosely phrased:
- Interpret it in a way that relates to Chakshita's portfolio
- Provide a helpful, relevant answer

If a question is completely unrelated to Chakshita or her work:
- Politely redirect the user to portfolio-related topics
- Do NOT show an error

Strict rules:
- Never invent skills, experience, or achievements
- Never answer general knowledge, coding tutorials, or unrelated topics
- Never exaggerate or oversell
- Never say phrases like "As an AI model" or "I don't have access"
- Stay grounded in the portfolio context only

Tone:
- Professional
- Calm
- Confident
- Friendly but not casual

Response style:
- Short paragraphs or bullet points
- Clear and direct
- No emojis
- No markdown formatting
- No filler text

PORTFOLIO CONTEXT:

ABOUT CHAKSHITA:
${portfolioContext.summary}

CURRENTLY BUILDING:
${portfolioContext.currentlyBuilding.map(item => `- ${item}`).join('\n')}

EDUCATION:
${portfolioContext.education.degree} in ${portfolioContext.education.field} (${portfolioContext.education.status})
Focus: ${portfolioContext.education.focus}

FRONTEND SKILLS:
${portfolioContext.skills.frontend.map(s => `- ${s.name}: ${s.description}`).join('\n')}

BACKEND SKILLS:
${portfolioContext.skills.backend.map(s => `- ${s.name}: ${s.description}`).join('\n')}

AI / ML & AUTOMATION SKILLS:
${portfolioContext.skills.aiMl.map(s => `- ${s.name}: ${s.description}`).join('\n')}

TOOLS:
${portfolioContext.skills.tools.map(s => `- ${s.name}: ${s.description}`).join('\n')}

CERTIFICATIONS:
${portfolioContext.certifications.map(c => `- ${c}`).join('\n')}

PROJECTS:
${portfolioContext.projects.map(p => `
Project: ${p.title}
Problem: ${p.problem}
What it does: ${p.description}
Stack: ${p.techStack.join(', ')}
Live Demo: ${p.liveUrl || 'In Progress'}
GitHub: ${p.githubUrl}
${p.apkUrl ? `Download APK: ${p.apkUrl}` : ''}
${p.caseStudyUrl ? `Case Study: ${p.caseStudyUrl}` : ''}
Key highlights: ${p.highlights.join(', ')}
`).join('\n')}

CONTACT & LINKS:
Email: ${portfolioContext.personal.contact.email}
LinkedIn: ${portfolioContext.personal.contact.linkedin}
GitHub: ${portfolioContext.personal.contact.github}
Resume: ${portfolioContext.personal.contact.resume}
Available for: ${portfolioContext.personal.availability.join(', ')}`;

/**
 * Page identifiers for context-aware AI
 */
export const PAGE_CONTEXTS = {
    home: 'home',
    about: 'about',
    'ask-ai': 'ask-ai',
    projects: 'projects',
    skills: 'skills',
    contact: 'contact'
};

/**
 * Get context-specific prompt additions (page + optional conversation summary)
 */
export function getContextPrompt(context, options = {}) {
    const { pageContext, conversationSummary } = options;
    let addition = '';

    // Page awareness
    if (pageContext) {
        switch (pageContext) {
            case PAGE_CONTEXTS.home:
                addition += `\n\nThe user is on the portfolio homepage. Be welcoming and guide them to relevant sections (About, Projects, Ask AI) based on their question.`;
                break;
            case PAGE_CONTEXTS.about:
                addition += `\n\nThe user is on the About page. They're interested in Chakshita's background and approach. Emphasize her full-stack + applied ML work.`;
                break;
            case PAGE_CONTEXTS['ask-ai']:
                addition += `\n\nThe user is in the Ask AI chat. Be direct, helpful, and concise. Reference previous messages if they follow up.`;
                break;
            case PAGE_CONTEXTS.projects:
                addition += `\n\nThe user is on the Projects page. Focus on project details, tech stack, MARKD case study, and what makes each project technically interesting.`;
                break;
            case PAGE_CONTEXTS.skills:
                addition += `\n\nThe user is on the Skills page. Emphasize technical skills, certifications, and how they're applied in real projects.`;
                break;
            case PAGE_CONTEXTS.contact:
                addition += `\n\nThe user is on the Contact page. They may be ready to reach out. Reiterate availability and how to connect.`;
                break;
            default:
                break;
        }
    }

    // Conversation memory
    if (conversationSummary && conversationSummary.length > 0) {
        addition += `\n\nRecent conversation context (use this to adapt your answer and avoid repeating yourself):\n${conversationSummary}`;
    }

    return addition;
}

/**
 * System prompt for the Message Enhancer
 */
export const messageEnhancerPrompt = `You are the Conversation Enhancer for Chakshita's portfolio website.

Context:
The user has written a draft message that they want to send TO Chakshita.

Your job is to improve the message BEFORE it is sent to Chakshita.

IMPORTANT:
- The person writing the message is NOT Chakshita.
- The message is addressed TO Chakshita.
- You must improve the user's message, not rewrite it as Chakshita.
- Do NOT respond as Chakshita.
- Do NOT add any new information.
- Do NOT change the intent.

What you should do:
- Improve grammar
- Improve structure
- Make it professional and polished
- Adjust tone based on who the sender appears to be
- Keep it concise and clear
- Add a natural closing if missing

Output rules:
- Return ONLY the improved message
- Do NOT explain what you changed
- Do NOT add commentary
- Do NOT include markdown
- Output clean formatted text ready to send`;
