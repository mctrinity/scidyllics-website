'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const predefinedResponses: Record<string, string> = {
  'hello': 'Hi there! I\'m here to help you with any questions about our DevOps consulting services. How can I assist you today?',
  'hi': 'Hello! Welcome to Scidyllics. I\'d be happy to help you learn more about our DevOps solutions.',
  'services': 'We offer comprehensive DevOps consulting including:\n• CI/CD Pipeline Setup\n• Infrastructure as Code\n• Cloud Migration\n• Monitoring & Observability\n• Security & Compliance\n\nWhich area interests you most?',
  'pricing': 'Our pricing varies based on project scope and requirements. I\'d recommend scheduling a free consultation to discuss your specific needs. Would you like me to connect you with our team?',
  'contact': 'You can reach us through the contact form on this page, or schedule a free assessment. We typically respond within 24 hours.',
  'devops': 'DevOps is about bridging development and operations to deliver software faster and more reliably. We help companies implement DevOps practices, tools, and culture. What specific challenges are you facing?',
  'consultation': 'Great! We offer free 30-minute consultations to assess your current setup and identify improvement opportunities. You can schedule one using our contact form or I can help gather some initial information.',
  'help': 'I can help you with information about:\n• Our services and expertise\n• Pricing and consultation options\n• DevOps best practices\n• How to get started\n\nWhat would you like to know?'
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your DevOps assistant. I can help answer questions about our services, pricing, or DevOps in general. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Prevent hydration mismatch by not rendering until mounted on client
  if (!isMounted) {
    return null
  }

  const findBestResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase()
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowercaseInput.includes(key)) {
        return response
      }
    }

    // Check for partial matches or keywords
    if (lowercaseInput.includes('price') || lowercaseInput.includes('cost') || lowercaseInput.includes('rate')) {
      return predefinedResponses.pricing
    }
    
    if (lowercaseInput.includes('service') || lowercaseInput.includes('what do you do')) {
      return predefinedResponses.services
    }
    
    if (lowercaseInput.includes('contact') || lowercaseInput.includes('reach') || lowercaseInput.includes('call')) {
      return predefinedResponses.contact
    }
    
    if (lowercaseInput.includes('consult') || lowercaseInput.includes('meeting') || lowercaseInput.includes('assessment')) {
      return predefinedResponses.consultation
    }

    // Default response
    return 'I\'m not sure I understand that completely. Could you rephrase your question? I can help with information about our DevOps services, pricing, consultations, or general DevOps questions. You can also use our contact form for more detailed inquiries.'
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBestResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 h-96 flex flex-col animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-semibold">DevOps Assistant</h3>
            <p className="text-sm opacity-90">Ask me anything about our services</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in duration-300`}
              >
                <div className={`flex items-start max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    message.isBot ? 'bg-blue-100 text-blue-600 mr-2' : 'bg-gray-100 text-gray-600 ml-2'
                  }`}>
                    {message.isBot ? <Bot size={12} /> : <User size={12} />}
                  </div>
                  <div className={`rounded-2xl p-3 ${
                    message.isBot 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}