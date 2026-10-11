import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, RefreshCw, X } from 'lucide-react';

const STARTER_PROMPTS = [
  'What AI projects have you built?',
  'What is your current role?',
  'What is your education?',
  'What is your tech stack?',
];

// Facts the local assistant answers from (kept in line with the CV)
const KNOWLEDGE = {
  education:
    'Jasim holds a BSc in Computer Science (2021 – 2024) and an MSc in Cybersecurity, both from the University of West London.',
  stack:
    'For AI work Jasim uses the Gemini and Claude APIs, RAG, function calling, structured output, LLM evals and n8n. He builds with TypeScript, React, Next.js and Node.js, and also works in Python, Java, PHP and MySQL.',
  experience:
    'Jasim is an IT Support Engineer on the Facility Management Helpdesk at Al Mariah Facility Management (SKMC, Ajman) since April 2025, with a 95% first-call resolution rate and SLA-based ticket handling. Before that he did IT support at Al Taqwa Electric Wire Trading (2023 – 2025).',
  projects:
    'His live AI projects are Pipeline (a full-stack B2B CRM where Claude drafts outreach emails that are approved in the app or on Telegram), DocuChat (RAG chat with PDFs and page citations), TripAgent (a function-calling agent with code-enforced stop rules), BillScan (bill photos to verified tables) and EvalLab (an eval scorecard for those apps, 129 of 137 checks passing). He also built an n8n Telegram bot that drafts influencer pitches with human review. See the Projects section for live links.',
  languages: 'Jasim speaks English and Malayalam, and some Arabic.',
  contact:
    'You can email Jasim at jasimala07@gmail.com or use the contact form at the bottom of this page. He is based in Ajman, UAE.',
};

const RULES = [
  { keys: ['education', 'study', 'degree', 'university', 'college', 'msc', 'bsc'], answer: KNOWLEDGE.education },
  { keys: ['project', 'built', 'portfolio', 'pipeline', 'crm', 'docuchat', 'tripagent', 'billscan', 'evallab', 'rag', 'agent', 'n8n'], answer: KNOWLEDGE.projects },
  { keys: ['skill', 'stack', 'tech', 'develop', 'code', 'react', 'next', 'python', 'gemini', 'claude'], answer: KNOWLEDGE.stack },
  { keys: ['experience', 'work', 'job', 'role', 'uae', 'helpdesk', 'support', 'current'], answer: KNOWLEDGE.experience },
  { keys: ['language', 'speak', 'english', 'arabic', 'malayalam'], answer: KNOWLEDGE.languages },
  { keys: ['contact', 'hire', 'email', 'reach', 'phone'], answer: KNOWLEDGE.contact },
];

function getLocalAiResponse(userMessage) {
  const lower = userMessage.toLowerCase();
  const rule = RULES.find((r) => r.keys.some((k) => lower.includes(k)));
  if (rule) return rule.answer;
  return "I'm Jasim's portfolio assistant. Ask me about his AI projects, his IT support role, his tech stack or his education.";
}

const greeting = (text) => ({ id: Date.now(), sender: 'bot', text });

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    greeting("Hi! I'm Jasim's AI assistant. Ask me about his projects, experience or skills."),
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: query }]);
    setInputText('');
    setIsTyping(true);

    try {
      // Server route when available
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: data.reply }]);
          setIsTyping(false);
          return;
        }
      }
    } catch (e) {
      // Static hosting: fall through to the local answers
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: getLocalAiResponse(query) },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([greeting('Chat cleared. What would you like to know about Jasim?')]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans sm:bottom-6 sm:right-6">
      {!isOpen && (
        <button
          id="chat-widget-launcher"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full bg-accent py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-accent transition-[background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0"
          aria-label="Open Jasim's AI assistant"
        >
          <MessageSquare className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:scale-110" />
          Ask my AI
        </button>
      )}

      {isOpen && (
        <div
          id="chat-widget-window"
          role="dialog"
          aria-label="Jasim's AI assistant"
          className="animate-fade-in flex h-[540px] max-h-[80vh] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[28px] bg-white/70 shadow-float ring-1 ring-black/5 backdrop-blur-md sm:w-[400px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-accent">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink">Jasim&apos;s AI assistant</h3>
                <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="rounded-full p-2 text-ink-muted transition-colors duration-300 hover:bg-white hover:text-ink"
                title="Reset chat"
                aria-label="Reset chat"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                id="chat-widget-close"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-ink-muted transition-colors duration-300 hover:bg-white hover:text-ink"
                title="Close"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'rounded-[20px] rounded-br-md bg-accent text-white'
                      : 'rounded-[20px] rounded-bl-md bg-white text-ink shadow-soft'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex">
                <div className="flex items-center gap-1 rounded-[20px] rounded-bl-md bg-white px-4 py-3 shadow-soft" aria-label="Assistant is typing">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter prompts */}
          <div className="flex gap-1.5 overflow-x-auto px-4 pb-3">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-ink-soft shadow-soft transition-colors duration-300 hover:bg-accent-soft hover:text-accent"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 p-3 pt-0"
          >
            <input
              id="chat-widget-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about projects, skills, experience…"
              className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm text-ink shadow-soft placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent-ring"
            />
            <button
              id="chat-widget-submit"
              type="submit"
              disabled={!inputText.trim()}
              className="rounded-full bg-accent p-3 text-white transition-[background-color,opacity] duration-300 hover:bg-accent-hover disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
