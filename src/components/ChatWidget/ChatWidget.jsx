import React, { useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';

const starterMessage = {
  id: 1,
  role: 'assistant',
  content: "Hi, I'm Simon's portfolio assistant. Ask me about his projects, skills, availability, or how to get in touch.",
};

const getAssistantReply = (value) => {
  const message = value.toLowerCase();

  if (message.includes('project') || message.includes('work')) {
    return 'Simon builds practical digital products with React, Node.js, MongoDB, and polished responsive interfaces. Open the Projects section to explore the case studies.';
  }

  if (message.includes('skill') || message.includes('technology') || message.includes('stack')) {
    return 'His main stack includes React, JavaScript, Node.js, Express, MongoDB, REST APIs, Tailwind CSS, and deployment workflows.';
  }

  if (message.includes('contact') || message.includes('hire') || message.includes('available')) {
    return 'Simon is open to thoughtful product and development work. Use the Contact section or WhatsApp button to start a conversation.';
  }

  if (message.includes('whatsapp') || message.includes('talk')) {
    return 'You can reach Simon directly on WhatsApp using the green Let\'s talk button in the hero section.';
  }

  return 'I can help with questions about Simon\'s projects, skills, availability, and contact options. What would you like to know?';
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([starterMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), role: 'user', content: trimmedInput },
      { id: Date.now() + 1, role: 'assistant', content: getAssistantReply(trimmedInput) },
    ]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 sm:bottom-8 sm:left-auto sm:right-8">
      {isOpen && (
        <div className="mb-4 flex h-[min(32rem,calc(100vh-7rem))] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-bg-secondary px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-primary/15 text-accent-primary">
                <Bot size={18} />
              </span>
              <div>
                <p className="font-semibold text-text-primary">Portfolio assistant</p>
                <p className="text-xs text-text-tertiary">Available now</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto bg-accent-primary text-white'
                    : 'bg-bg-secondary text-text-secondary'
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-secondary p-1.5 focus-within:border-accent-primary">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Simon..."
                className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2 text-sm text-text-primary outline-none placeholder:text-text-tertiary"
                aria-label="Ask the portfolio assistant"
              />
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-primary text-white transition-colors hover:bg-accent-hover"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-primary text-white shadow-xl transition-transform hover:scale-105 hover:bg-accent-hover"
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        title="Chat with the portfolio assistant"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
