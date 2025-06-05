"use client"

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, ArrowUpRight, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export default function Portfolio() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Ask me anything about my design work, process, or experience.",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Minimal project data - fewer but impactful
  const projects = [
    {
      id: 1,
      title: "NEXUS",
      category: "E-COMMERCE",
      year: "2024",
      impact: "40% CVR increase"
    },
    {
      id: 2,
      title: "NEURAL",
      category: "SAAS PLATFORM",
      year: "2024",
      impact: "500K+ users"
    },
    {
      id: 3,
      title: "FLUX",
      category: "BRAND SYSTEM",
      year: "2023",
      impact: "Global launch"
    }
  ]

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "System temporarily unavailable.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-16 h-screen flex">
        
        <div className="grid grid-cols-5 gap-16 w-full">
          
          {/* Left Column - Hero + Projects + Footer - Scrollable */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-2 overflow-y-auto pr-4"
            style={{ height: 'calc(100vh - 8rem)' }}
          >
            {/* Hero Section - Bold and Minimal */}
            <div className="mb-16">
              <h1 className="text-[clamp(2.5rem,6vw,8rem)] font-bold leading-[0.85] tracking-tight mb-4">
                Yi Cui
              </h1>
              
              <div className="flex items-baseline gap-8 mb-8">
                <h2 className="text-[clamp(1rem,2vw,1.5rem)] font-bold text-gray-300">
                  PRODUCT DESIGNER
                </h2>
                <div className="text-lg font-medium text-gray-500">
                  5Y+ / SF
                </div>
              </div>

              <p className="text-xl font-medium max-w-2xl leading-relaxed text-gray-300">
                Crafting digital experiences that matter.
                <br />
                <span className="text-white">Bold. Minimal. Impactful.</span>
              </p>
            </div>

            {/* Projects Section */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-12">
                <h3 className="text-2xl font-bold">SELECTED WORK</h3>
                <div className="flex-1 h-px bg-gray-800"></div>
                <span className="text-gray-500 font-medium">03</span>
              </div>

              <div className="space-y-10">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-500">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-2xl font-bold group-hover:text-gray-300 transition-colors duration-300">
                          {project.title}
                        </h4>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                    
                    <div className="flex items-center gap-6 ml-8">
                      <span className="text-gray-400 text-xs font-medium tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {project.year}
                      </span>
                      <span className="text-white text-xs font-medium">
                        {project.impact}
                      </span>
                    </div>

                    <div className="h-px bg-gray-900 mt-4 group-hover:bg-gray-700 transition-colors duration-300"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer - Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-16 border-t border-gray-800"
            >
              <div className="space-y-8">
                <div>
                  <h4 className="text-3xl font-bold mb-2">LET'S WORK</h4>
                  <p className="text-gray-400 text-xl">hello@yourname.com</p>
                </div>
                <div>
                  <div className="text-gray-500 mb-2">CURRENTLY</div>
                  <div className="text-2xl font-bold">SAN FRANCISCO</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - AI Chat - Fixed Height */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-3 flex flex-col h-[calc(100vh-8rem)]"
          >
            <div className="border border-gray-800 bg-gray-950/50 rounded-lg flex flex-col h-full">
              
              {/* Chat Header - Fixed */}
              <div className="flex-shrink-0">
                <div className="p-3 border-b border-gray-800 relative flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <MessageCircle className="w-5 h-5" />
                      <h3 className="text-lg font-bold">Chat with my AI agent</h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Get instant answers about my design work & process
                    </p>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-bold text-sm tracking-wider text-white">AI ASSISTANT ONLINE</span>
                  </motion.div>
                </div>
              </div>

              {/* Messages - Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Avatar for AI responses */}
                      {!message.isUser && (
                        <img 
                          src="/your-photo.png" 
                          alt="Yi Cui" 
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                        />
                      )}
                      
                      <div
                        className={`max-w-sm p-3 text-sm rounded-2xl ${
                          message.isUser
                            ? 'bg-gray-500 text-gray-100'
                            : 'bg-gray-800 text-gray-100'
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 justify-start"
                  >
                    <img 
                      src="/your-photo.png" 
                      alt="Yi Cui" 
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                    />
                    <div className="bg-gray-800 p-3 rounded-2xl">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input - Fixed */}
              <div className="p-6 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-gray-900 rounded-full px-4 py-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about my design process..."
                    className="flex-1 bg-transparent text-sm placeholder-gray-500 focus:outline-none text-white"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
