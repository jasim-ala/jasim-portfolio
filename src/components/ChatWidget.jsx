import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, Minimize2 } from 'lucide-react';

const STARTER_PROMPTS = [
  'What is your education background?',
  'What is your web development stack?',
  'Tell me about your UAE experience.',
  'What languages do you speak?',
];

// Exact Facts & Rules Injected from System Prompt
const SYSTEM_KNOWLEDGE = {
  education:
    'Jasim is a final-year university student studying cybersecurity and information technology.',
  web:
    'Jasim is a freelance full-stack developer (React, Next.js, Node.js, Vercel, Firebase, NeonDB, Clerk) specializing in dark, high-contrast, minimalist aesthetics and 3D web design using tools like Antigravity and Google Flow.',
  experience:
    'Jasim works as a sales and visual merchandising executive in the UAE. He is also experienced as an audio-visual technician for international summits, specializing in simultaneous interpretation systems.',
  languages:
    'Jasim is fluent in English and Malayalam, with beginner proficiency in Arabic.',
};

function getLocalAiResponse(userMessage) {
  const lower = userMessage.toLowerCase();

  if (lower.includes('education') || lower.includes('study') || lower.includes('degree') || lower.includes('university') || lower.includes('college')) {
    return SYSTEM_KNOWLEDGE.education;
  }
  if (lower.includes('skill') || lower.includes('stack') || lower.includes('web') || lower.includes('develop') || lower.includes('frontend') || lower.includes('backend') || lower.includes('code') || lower.includes('3d') || lower.includes('antigravity') || lower.includes('react') || lower.includes('next')) {
    return SYSTEM_KNOWLEDGE.web;
  }
  if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('uae') || lower.includes('sales') || lower.includes('audio') || lower.includes('visual') || lower.includes('summit')) {
    return SYSTEM_KNOWLEDGE.experience;
  }
  if (lower.includes('language') || lower.includes('speak') || lower.includes('english') || lower.includes('arabic') || lower.includes('malayalam')) {
    return SYSTEM_KNOWLEDGE.languages;
  }
  if (lower.includes('project') || lower.includes('portfolio') || lower.includes('service')) {
    return `Jasim specializes in dark, high-contrast, minimalist aesthetics and interactive 3D web design (React, Next.js, Antigravity, Google Flow). He also provides enterprise AV technical services and sales executive expertise.`;
  }
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach')) {
    return `You can reach out to Jasim directly through the contact section on this portfolio to discuss full-stack web development, 3D web experiences, or professional roles.`;
  }

  // Pivot back to professional qualifications
  return `I am Jasim's personal portfolio assistant. I can answer questions about his cybersecurity education, full-stack web development (React/Next.js/3D design), his UAE sales & AV technician experience, or spoken languages. How can I help with his qualifications?`;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am the personal AI assistant for Jasim's portfolio. How can I help you regarding his skills, experience, or projects?",
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Attempt Next.js API route first
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, sender: 'bot', text: data.reply, time: 'Just now' },
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch (e) {
      // Fallback in client-only/Vite preview environment
    }

    // Use exact system prompt agent response
    setTimeout(() => {
      const replyText = getLocalAiResponse(query);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: replyText, time: 'Just now' },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: "Chat reset. How can I assist you with Jasim's background, full-stack skills, or experience?",
        time: 'Just now',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          id="chat-widget-launcher"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-black text-white border border-white/20 shadow-2xl hover:border-white/50 hover:bg-zinc-900 transition-all duration-300 active:scale-95"
          aria-label="Open Jasim AI Chatbot"
        >
          {/* Glowing pulse indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-cyan" />
          </span>

          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-cyan group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase">
              Chat with AI
            </span>
          </div>
        </button>
      )}

      {/* Floating Dark-Mode Chatbot Window */}
      {isOpen && (
        <div
          id="chat-widget-window"
          className="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] bg-black/95 border border-white/20 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden animate-fade-in text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Jasim's AI Assistant
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Representative</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                title="Reset Chat"
                aria-label="Reset Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                id="chat-widget-close"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                title="Minimize Window"
                aria-label="Minimize Chat Window"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed text-[11px] ${
                    m.sender === 'user'
                      ? 'bg-white text-black font-sans font-semibold rounded-tr-none'
                      : 'bg-white/10 text-zinc-200 border border-white/10 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] pl-8">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:0.2s]">●</span>
                <span className="animate-bounce [animation-delay:0.4s]">●</span>
                <span className="ml-1 text-zinc-400 font-mono">Thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts Chips */}
          <div className="px-4 py-2 flex gap-1.5 overflow-x-auto border-t border-white/5 bg-white/[0.02]">
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-[10px] font-mono text-zinc-300 border border-white/10 whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 p-3 bg-white/5 border-t border-white/10"
          >
            <input
              id="chat-widget-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about skills, experience, or projects..."
              className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
            />
            <button
              id="chat-widget-submit"
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-30 transition-all"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
