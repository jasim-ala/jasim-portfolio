import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

const QUICK_PROMPTS = [
  'What IT services do you offer?',
  'How do I check ticket SLA status?',
  'Tell me about your cybersecurity skills.',
];

const BOT_KNOWLEDGE = {
  'What IT services do you offer?':
    'Mohamed Jasim provides tier-1/2 hardware & network troubleshooting, SLA incident management, full-stack web applications, and security log auditing.',
  'How do I check ticket SLA status?':
    'At Al Mariah Facility Management (SKMC Ajman), tickets are prioritized and logged with a proven 95%+ first-call resolution rate ensuring minimal downtime.',
  'Tell me about your cybersecurity skills.':
    'Jasim holds an MSc in Cybersecurity from the University of West London and completed the Deloitte Cyber Simulation in threat log analysis and incident containment.',
};

export default function ChatbotSimulator() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am Mohamed Jasim’s automated AI Assistant powered by Dialogflow & Node.js. How can I help you today?',
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
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: query, time: 'Just now' },
    ]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response calculation
    setTimeout(() => {
      let botReply = BOT_KNOWLEDGE[query];
      if (!botReply) {
        if (query.toLowerCase().includes('contact') || query.toLowerCase().includes('email')) {
          botReply = 'You can reach Mohamed Jasim at jasimala07@gmail.com or call +971 56 766 5827.';
        } else if (query.toLowerCase().includes('project') || query.toLowerCase().includes('work')) {
          botReply = 'Jasim has developed AI Chatbots, full-stack E-Commerce stores (PHP/JS), and responsive Task Management platforms with 30%+ efficiency gains.';
        } else {
          botReply = `Thanks for asking! As an AI customer support bot, I resolve routine inquiries 24/7, driving a 40% increase in customer engagement.`;
        }
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: botReply, time: 'Just now' },
      ]);
      setIsTyping(false);
    }, 650);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: 'bot',
        text: 'Chat reset. Click a prompt below or type your question to test the live AI assistant!',
        time: 'Just now',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[320px] bg-black/80 rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-bold">Dialogflow AI Bot • Online</span>
        </div>
        <button
          onClick={handleReset}
          className="text-zinc-500 hover:text-white transition-colors"
          title="Reset Chat"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${
              m.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.sender === 'bot' && (
              <div className="w-5 h-5 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                <Bot className="w-3 h-3" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-3 py-2 rounded-2xl leading-relaxed text-[11px] ${
                m.sender === 'user'
                  ? 'bg-white text-black font-sans font-medium'
                  : 'bg-white/10 text-zinc-200 border border-white/10'
              }`}
            >
              {m.text}
            </div>
            {m.sender === 'user' && (
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
                <User className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] pl-7">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce [animation-delay:0.2s]">●</span>
            <span className="animate-bounce [animation-delay:0.4s]">●</span>
            <span className="ml-1 text-zinc-400">AI Bot is responding...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto border-t border-white/5 bg-white/[0.02]">
        {QUICK_PROMPTS.map((prompt, pIdx) => (
          <button
            key={pIdx}
            onClick={() => handleSend(prompt)}
            className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/15 text-[9px] text-zinc-300 border border-white/10 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-2.5 bg-white/5 border-t border-white/10"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question or test AI response..."
          className="flex-1 bg-transparent px-2.5 py-1 text-[11px] text-white placeholder-zinc-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-30 transition-all"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}
