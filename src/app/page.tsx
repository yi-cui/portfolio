"use client"

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, ArrowUpRight, Send, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

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
      content: "Hi! I'm Yi's AI assistant. Ask me anything about their design work, process, or experience.",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
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
      title: "SORCARA COPILOT",
      category: "AI PLATFORM",
      year: "2025",
      impact: "50+ BRANDS",
      href: "/projects/sorcara-copilot",
      preview: "/copilot-overview.png"
    },
    {
      id: 2,
      title: "INVOICE BUILDER REDESIGN",
      category: "INVOICE BUILDER",
      year: "2024",
      impact: "+40% EFFICIENCY",
      href: "/projects/invoice-builder",
      preview: "/invoice-builder.png"
    }
    // Third project hidden for now
    // {
    //   id: 3,
    //   title: "FLUX",
    //   category: "BRAND SYSTEM",
    //   year: "2023",
    //   impact: "GLOBAL LAUNCH"
    // }
  ]

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputMessage.trim() || isLoading) return

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
        body: JSON.stringify({
          message: inputMessage,
          previousMessages: messages
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || "I'd be happy to help! Could you please rephrase your question?",
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
    } catch {
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
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-16 lg:h-screen">
        <div className="grid grid-cols-5 gap-16 w-full">
          
          {/* Desktop Left Column - Hero + Projects + Footer */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-2 overflow-y-auto pr-4"
            style={{ height: 'calc(100vh - 8rem)' }}
          >
            {/* Desktop Hero Section */}
            <div className="mb-16">
              <h1 className="text-[clamp(2.5rem,6vw,8rem)] font-bold leading-[0.85] tracking-tight mb-4">
                Yi Cui
              </h1>
              
              <div className="flex items-baseline gap-8 mb-8">
                <h2 className="text-[clamp(1rem,2vw,1.5rem)] font-bold text-gray-300">
                  PRODUCT DESIGNER
                </h2>
                <div className="text-lg font-medium text-gray-500">
                  3+ yoe / SF
                </div>
              </div>

              <p className="text-xl font-medium max-w-2xl leading-relaxed text-gray-300">
                Crafting digital experiences that matter.
                <br />
                <span className="text-white">Bold. Minimal. Impactful.</span>
              </p>
            </div>

            {/* Desktop Projects Section */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-12">
                <h3 className="text-2xl font-bold">SELECTED WORK</h3>
                <div className="flex-1 h-px bg-gray-800"></div>
                <span className="text-gray-500 font-medium">02</span>
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
                    <Link href={project.href || "#"} className="block">
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
                      
                      <div className="flex items-center gap-6 ml-8 mb-4">
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

                      {/* Preview Image */}
                      <div className="mb-4 ml-8 rounded-lg overflow-hidden bg-gray-900/50">
                        <Image 
                          src={project.preview} 
                          alt={`${project.title} Preview`}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="h-px bg-gray-900 mt-4 group-hover:bg-gray-700 transition-colors duration-300"></div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Footer */}
                          <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-8"
              >
                <div>
                  <h4 className="text-3xl font-bold mb-2">LET&apos;S WORK</h4>
                  <p className="text-gray-400 text-xl">ycui0801@gmail.com</p>
                </div>
              </motion.div>
          </motion.div>

          {/* Desktop Chat Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-3 flex flex-col h-[calc(100vh-8rem)]"
          >
            <div className="border border-gray-800 bg-gray-950/50 rounded-lg flex flex-col h-full">
              
              {/* Desktop Chat Header */}
              <div className="flex-shrink-0">
                <div className="p-6 border-b border-gray-800 relative flex items-center justify-between">
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

              {/* Desktop Messages */}
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
                      {!message.isUser && (
                        <Image 
                          src="/your-photo.png" 
                          alt="Yi Cui" 
                          width={40}
                          height={40}
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
                    <Image
                      src="/your-photo.png" 
                      alt="Yi Cui" 
                      width={40}
                      height={40}
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

              {/* Desktop Input */}
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

      {/* Mobile Layout - ChatGPT Style with Fixed Positioning */}
      <div className="lg:hidden">
        
        {/* Mobile Header - Fixed to Top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-10 p-4 border-b border-gray-800 bg-black"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Yi Cui</h1>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>PRODUCT DESIGNER</span>
                <span>5Y+ / SF</span>
              </div>
            </div>
            
            {/* Work Button */}
            <button
              onClick={() => setShowProjects(!showProjects)}
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors border border-gray-700 rounded-full px-3 py-1.5"
            >
              <span>Work</span>
              {showProjects ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Mobile Projects - Collapsible */}
          <AnimatePresence>
            {showProjects && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group cursor-pointer p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors bg-gray-900/50"
                    >
                      <Link href={project.href || "#"} className="block">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base font-bold group-hover:text-gray-300 transition-colors">
                            {project.title}
                          </h4>
                          <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                          <span className="font-medium">{project.category}</span>
                          <span>{project.year}</span>
                          <span className="text-white font-medium">{project.impact}</span>
                        </div>

                        {/* Preview Image */}
                        <div className="mb-3 rounded-lg overflow-hidden bg-gray-900/50">
                          <Image 
                            src={project.preview} 
                            alt={`${project.title} Preview`}
                            width={400}
                            height={200}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Messages - Scrollable with Fixed Header/Footer Space */}
        <div 
          className="fixed top-0 left-0 right-0 bottom-0 overflow-y-auto p-3 space-y-4"
          style={{ 
            paddingTop: showProjects ? '280px' : '120px', 
            paddingBottom: '80px' 
          }}
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <Image 
                    src="/your-photo.png" 
                    alt="Yi Cui" 
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                  />
                )}
                
                <div
                  className={`max-w-[80%] p-3 text-sm rounded-2xl ${
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
              className="flex gap-2 justify-start"
            >
              <Image 
                src="/your-photo.png" 
                alt="Yi Cui" 
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
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

        {/* Input - Fixed to Bottom */}
        <div className="fixed bottom-4 left-4 right-4 z-10">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-900 rounded-full px-3 py-2 shadow-lg">
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
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>

        {/* Hidden Footer - No longer needed */}
        <div className="hidden flex-shrink-0 p-3 border-t border-gray-800 bg-black">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>hello@yourname.com</span>
            <span>San Francisco</span>
          </div>
        </div>
      </div>
    </div>
  )
}
