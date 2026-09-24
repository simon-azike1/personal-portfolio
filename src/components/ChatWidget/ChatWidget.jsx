import React, { useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // NEW
import remarkGfm from 'remark-gfm'; // NEW for tables

const starterMessage = {
  id: 1,
  role: 'assistant',
  content: "Hi, I'm Simon's portfolio assistant. Ask me about his projects, skills, availability, or how to get in touch.",
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([starterMessage]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const historyForBackend = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    const userMsg = { id: Date.now(), role: 'user', content: trimmedInput };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/openAI/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput, history: historyForBackend })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.reply
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm having trouble connecting right now. Try WhatsApp or contact form."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 sm:bottom-8 sm:left-auto sm:right-8">
      {isOpen && (
        <div className="mb-4 flex h-[min(32rem,calc(100vh-7rem))] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-bg-secondary px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-primary/15 text-accent-primary">
                <Bot size={18} />
              </span>
              <div>
                <p className="font-semibold text-text-primary">Portfolio assistant</p>
                <p className="text-xs text-text-tertiary">{isLoading? 'Thinking...' : 'Available now'}</p>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-text-tertiary hover:bg-bg-tertiary">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
                  message.role === 'user'
                   ? 'ml-auto bg-accent-primary text-white'
                    : 'bg-bg-secondary text-text-secondary'
                }`}
              >
                {message.role === 'user'? (
                  message.content
                ) : (
                  // THIS IS THE MARKDOWN RENDERER
                  <div className={`max-w-[88%] rounded-2xl ${message.role === 'user'? 'ml-auto bg-accent-primary text-white px-3 py-2.5' : 'bg-[#1e293b] text-slate-200'}`}>

  {message.role === 'user'? message.content : (
    <div className="px-3 py-2.5 prose prose-invert prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({children}) => <div className="my-2 overflow-x-auto rounded-lg border border-white/10">{children}</div>,
          table: props => <div className="overflow-x-auto"><table className="w-full text- border-collapse" {...props} /></div>,
          th: props => <th className="bg-white/10 px-3 py-2 text-left whitespace-nowrap font-semibold" {...props} />,
          td: props => <td className="border-t border-white/5 px-3 py-2" {...props} />,
        }}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  )}
</div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[88%] rounded-2xl bg-bg-secondary px-3 py-2 text-sm text-text-tertiary animate-pulse">
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-secondary p-1.5 focus-within:border-accent-primary">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Simon..."
                disabled={isLoading}
                className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2 text-sm outline-none disabled:opacity-50"
              />
              <button type="submit" disabled={isLoading} className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-primary text-white hover:bg-accent-hover disabled:opacity-50">
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button type="button" onClick={() => setIsOpen(o =>!o)} className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary text-white shadow-xl hover:scale-105">
        {isOpen? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;