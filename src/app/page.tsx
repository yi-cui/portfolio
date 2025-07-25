"use client"

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, ArrowUpRight, Send, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, string | number | boolean>) => void
  }
}

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

// Simple tracking utility
const trackEvent = (eventName: string, properties?: Record<string, string | number | boolean>) => {
  // Log to console for debugging
  console.log(`[CHAT TRACKING] ${eventName}:`, properties)
  
  // Store in localStorage for persistence
  const events = JSON.parse(localStorage.getItem('chatEvents') || '[]')
  events.push({
    event: eventName,
    properties,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId()
  })
  localStorage.setItem('chatEvents', JSON.stringify(events))
  
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
    try {
      const eventParams: Record<string, string | number | boolean> = {
        event_category: 'chat_interaction',
        event_label: properties?.sessionId || getSessionId(),
        value: properties?.messageLength || 1
      }
      
      if (properties?.messageLength !== undefined) {
        eventParams.custom_parameter_1 = properties.messageLength
      }
      if (properties?.conversationLength !== undefined) {
        eventParams.custom_parameter_2 = properties.conversationLength
      }
      if (properties?.messageCount !== undefined) {
        eventParams.custom_parameter_3 = properties.messageCount
      }
      
      window.gtag('event', eventName, eventParams)
    } catch (error) {
      console.warn('Google Analytics tracking failed:', error)
    }
  }
}

const getSessionId = () => {
  let sessionId = localStorage.getItem('chatSessionId')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('chatSessionId', sessionId)
  }
  return sessionId
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
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showPresetQuestions, setShowPresetQuestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const desktopMessagesRef = useRef<HTMLDivElement>(null)
  const mobileMessagesRef = useRef<HTMLDivElement>(null)

  // Preset questions for users to quickly ask
  const presetQuestions = [
    "Tell me about your AI experience",
    "What's your design process?",
    "How do you approach user research?",
    "What tools do you use?",
    "Can you share your experience?",
  ]

  const scrollToBottom = () => {
    setTimeout(() => {
      // Scroll desktop container
      if (desktopMessagesRef.current) {
        desktopMessagesRef.current.scrollTop = desktopMessagesRef.current.scrollHeight
      }
      
      // Scroll mobile container  
      if (mobileMessagesRef.current) {
        mobileMessagesRef.current.scrollTop = mobileMessagesRef.current.scrollHeight
      }
      
      // Fallback to scrollIntoView
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Track initial page load and chat visibility
  useEffect(() => {
    // Wait a bit for Google Analytics to initialize
    const timer = setTimeout(() => {
      trackEvent('chat_page_loaded', {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Handle preset question clicks
  const handlePresetQuestion = async (question: string) => {
    if (isLoading) return

    // Hide preset questions after first use (they're just guidance)
    setShowPresetQuestions(false)

    // Track preset question usage
    trackEvent('chat_preset_question_clicked', {
      question: question,
      timestamp: new Date().toISOString()
    })

    // Track user message
    if (!hasInteracted) {
      trackEvent('chat_first_interaction', {
        messageLength: question.length,
        timestamp: new Date().toISOString()
      })
      setHasInteracted(true)
    }

    trackEvent('chat_message_sent', {
      messageLength: question.length,
      messageCount: messages.filter(m => m.isUser).length + 1,
      timestamp: new Date().toISOString()
    })

    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('') // Clear the input
    setIsLoading(true)
    
    // Scroll to show user message immediately
    setTimeout(() => {
      scrollToBottom()
    }, 50)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
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
      
      // Force scroll to bottom for AI response
      setTimeout(() => {
        scrollToBottom()
      }, 200)
      
      // Track successful AI response
      trackEvent('chat_ai_response_received', {
        responseLength: data.message?.length || 0,
        conversationLength: messages.length + 2,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "System temporarily unavailable.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
      
      // Track errors
      trackEvent('chat_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Minimal project data - fewer but impactful
  const projects = [
    {
      id: 1,
      title: "SORCARA COPILOT",
      category: "AI PLATFORM",
      year: "2025",
      impact: "20+ BRANDS",
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

    // Hide preset questions after first manual input (user has learned the interface)
    setShowPresetQuestions(false)

    // Track user message
    if (!hasInteracted) {
      trackEvent('chat_first_interaction', {
        messageLength: inputMessage.length,
        timestamp: new Date().toISOString()
      })
      setHasInteracted(true)
    }

    trackEvent('chat_message_sent', {
      messageLength: inputMessage.length,
      messageCount: messages.filter(m => m.isUser).length + 1,
      timestamp: new Date().toISOString()
    })

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    
    // Scroll to show user message immediately
    setTimeout(() => {
      scrollToBottom()
    }, 50)

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
      
      // Force scroll to bottom for AI response
      setTimeout(() => {
        scrollToBottom()
      }, 200)
      
      // Track successful AI response
      trackEvent('chat_ai_response_received', {
        responseLength: data.message?.length || 0,
        conversationLength: messages.length + 2,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "System temporarily unavailable.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
      
      // Track errors
      trackEvent('chat_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
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
                  <h4 className="text-3xl font-bold mb-2">Contact Me</h4>
                  <p className="text-gray-400 text-xl mb-3">ycui0801@gmail.com</p>
                  <div className="flex items-center justify-between">
                    <a 
                      href="/yi-cui-resume.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors text-lg"
                    >
                      <span>View Resume</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <div className="flex items-center gap-4">
                      <a 
                        href="https://www.linkedin.com/in/yicui-designer/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://github.com/yi-cui" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition-colors"
                        aria-label="GitHub"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
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
              <div ref={desktopMessagesRef} className="flex-1 overflow-y-auto p-6 space-y-6">
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
                {/* Desktop Preset Questions */}
                <AnimatePresence>
                  {showPresetQuestions && (
                                        <motion.div 
                      className="mb-4"
                      initial={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {presetQuestions.map((question, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => handlePresetQuestion(question)}
                            disabled={isLoading}
                            className="px-3 py-1.5 text-xs text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:text-white"
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-gray-900 rounded-full px-4 py-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onFocus={() => trackEvent('chat_input_focused')}
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
                <span>3Y+ / SF</span>
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
          ref={mobileMessagesRef}
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
          {/* Mobile Preset Questions */}
          <AnimatePresence>
            {showPresetQuestions && (
              <motion.div 
                className="mb-3"
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  {presetQuestions.slice(0, 4).map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handlePresetQuestion(question)}
                      disabled={isLoading}
                      className="px-2.5 py-1 text-xs text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:text-white"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-900 rounded-full px-3 py-2 shadow-lg">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onFocus={() => trackEvent('chat_input_focused')}
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
            <span>ycui0801@gmail.com</span>
            <span>San Francisco</span>
          </div>
        </div>
      </div>
    </div>
  )
}
