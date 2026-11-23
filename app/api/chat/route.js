import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the personal AI assistant for Mohamed Jasim's portfolio. Answer visitor questions about his skills, experience, and projects professionally and concisely. Use these facts:
- Headline: IT Specialist | AI & Automation | IT Support Engineer, over three years of UAE experience.
- Education: MSc in Cybersecurity, Paris American University (2025 – 2026); BSc in Computer Science, University of West London (2021 – 2024).
- Current role: IT Support Engineer, Facility Management Helpdesk at Al Mariah Facility Management (SKMC, Ajman), April 2025 – present; 95% first-call resolution, SLA-based ticket handling.
- Previous: Senior IT Specialist & Web Developer, La Rose Gallery Perfumes, Umm Al Quwain (May 2024 – April 2025): n8n and AI automations, API and webhook integrations, Gemini in workflows, IT ticketing, websites. IT Support, Al Taqwa Electric Wire Trading, Ajman (February 2023 – April 2024).
- AI work: Claude, Claude Code, ChatGPT, Gemini, n8n, Zapier, Make, RAG, AI agents, structured output, LLM evals. Live projects: Pipeline CRM, DocuChat, TripAgent, BillScan, EvalLab (129/137 checks passing).
- Skills: Python, PowerShell, Google Apps Script, TypeScript, JavaScript, Node.js, SQL; TCP/IP, DNS, DHCP, LAN and Wi-Fi; macOS, iOS, Windows, Linux; Google Workspace, Microsoft 365, ServiceNow, JIRA; 2FA, encryption, access control, incident response.
- Location: Dubai, UAE. Contact: jasimala07@gmail.com, linkedin.com/in/mohamed-jasim-247493271.
- Languages: English and Malayalam, some Arabic.
If a visitor asks a question outside of this scope, politely pivot back to his professional qualifications.`;

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, message } = body;

    const userMessage = message || (messages && messages[messages.length - 1]?.content) || '';

    if (!userMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. If OPENAI_API_KEY is configured in environment
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...(messages || [{ role: 'user', content: userMessage }]),
          ],
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices[0]?.message?.content;
        return NextResponse.json({ reply });
      }
    }

    // 2. If GEMINI_API_KEY is configured in environment
    if (process.env.GEMINI_API_KEY) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${userMessage}` }] },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return NextResponse.json({ reply });
      }
    }

    // 3. Fallback Built-In Deterministic Representative Agent
    const lower = userMessage.toLowerCase();
    let reply = '';

    if (lower.includes('education') || lower.includes('degree') || lower.includes('study') || lower.includes('university')) {
      reply = "Jasim is a final-year university student specializing in Cybersecurity and Information Technology.";
    } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('web') || lower.includes('develop') || lower.includes('frontend') || lower.includes('backend') || lower.includes('code')) {
      reply = "Jasim is a freelance full-stack developer proficient in React, Next.js, Node.js, Vercel, Firebase, NeonDB, and Clerk. He specializes in dark, high-contrast, minimalist aesthetics and cutting-edge 3D web design using tools like Antigravity and Google Flow.";
    } else if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('career') || lower.includes('uae')) {
      reply = "Jasim works as a Sales and Visual Merchandising Executive in the UAE. He also possesses extensive technical experience as an Audio-Visual Technician for international summits, specializing in simultaneous interpretation systems.";
    } else if (lower.includes('language') || lower.includes('speak') || lower.includes('arabic') || lower.includes('english')) {
      reply = "Jasim is fluent in English and Malayalam, and holds beginner-level proficiency in Arabic.";
    } else if (lower.includes('project') || lower.includes('portfolio') || lower.includes('3d') || lower.includes('antigravity')) {
      reply = "Jasim builds high-performance, dark-aesthetic web applications and interactive 3D web experiences leveraging tools like Antigravity, Google Flow, React, and Next.js.";
    } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach')) {
      reply = "You can get in touch with Jasim directly through the contact section below to discuss freelance full-stack development, 3D web projects, or professional opportunities in the UAE.";
    } else {
      reply = "I am Jasim's portfolio assistant. I can provide details regarding his cybersecurity education, freelance full-stack development (Next.js/React/3D web), his AV technician and executive experience in the UAE, or his spoken languages. How can I assist you with his qualifications?";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
