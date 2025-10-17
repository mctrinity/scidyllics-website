'use client'

import React, { useState, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you learn about our DevOps and AI services. What would you like to know?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');


  const quickReplies = [
    'Tell me about your services',
    'What is your pricing?',
    'How can you help with CI/CD?',
    'AI integration consulting'
  ];

  const botResponses: Record<string, string> = {
    'tell me about your services': 'We offer 4 main services: CI/CD Pipeline Optimization, Infrastructure as Code, Open Source Monitoring, and AI Integration & Development. Our engagements are typically 4-6 week pilots designed for measurable impact.',
    'what is your pricing': 'Our pricing varies based on project scope and duration. Typical engagements range from $10k-50k for 4-6 week pilots. Contact us for a free assessment and customized quote.',
    'how can you help with ci/cd': 'We optimize CI/CD pipelines across Azure DevOps, GitHub Actions, and Jenkins. This includes multi-platform automation, parallel job optimization, and deployment strategies to reduce MTTR and increase deployment velocity.',
    'ai integration consulting': 'We help build and deploy AI-powered applications using OpenAI APIs, develop custom AI solutions, and create model deployment pipelines. Recent projects include customer service platforms and document processing systems.',
    'default': 'That\'s a great question! For detailed information about that topic, I\'d recommend reaching out through our contact form or emailing mdizon@scidyllics.com. Our team can provide specific guidance for your needs.'
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const lowercaseInput = input.toLowerCase();
      const response = botResponses[lowercaseInput] || botResponses['default'];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text shadow-lg transition-all duration-200 hover:scale-105 ${
          isOpen ? 'rotate-180' : ''
        }`}
        style={{ color: '#ffffff' }}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="chatbot-widget fixed bottom-20 right-6 w-96 h-[500px] z-40 flex flex-col"
        >
          {/* Header (draggable handle) */}
          <div
            className="bg-indigo-600 p-4 rounded-t-2xl select-none"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold chatbot-header-text">Scidyllics Assistant</h3>
                <p className="text-sm chatbot-header-text">DevOps & AI Consulting</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-gray-600' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
