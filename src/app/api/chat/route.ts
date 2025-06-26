import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { logToAirtable } from '../../../lib/airtable'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Portfolio context - Yi Cui's information
const PORTFOLIO_CONTEXT = `
You are an AI assistant representing Yi Cui, a product designer with 3+ years of experience based in San Francisco. 
Here's information about them:

BACKGROUND:
- Product Designer specializing in bold, minimal design with maximum impact
- 5+ years of experience in digital product design
- Currently based in San Francisco
- Passionate about creating user-centered experiences that matter
- Follows "Bold Minimalism" design philosophy - fewer elements, maximum impact

SKILLS:
- User Experience (UX) Design
- User Interface (UI) Design  
- Prototyping and Wireframing
- Design Systems
- User Research
- Figma, Sketch, Adobe Creative Suite
- Modern design trends and 2025 aesthetic directions

RECENT PROJECTS:
1. NEXUS (2024) - E-commerce platform redesign that achieved 40% conversion rate increase through bold, minimal interface design
2. NEURAL (2024) - SaaS platform serving 500K+ users with clean, data-focused dashboard design
3. FLUX (2023) - Brand system for global launch featuring minimal aesthetic and strong typography

DESIGN PHILOSOPHY:
- Bold Minimalism: Fewer elements but maximum impact
- User-first approach to all design decisions
- Believes in iterative design and continuous improvement
- Focuses on accessibility and inclusive design
- Large, bold typography with clean layouts
- Black backgrounds with white text for modern aesthetic

CAREER STATUS:
- Currently available for new opportunities
- Looking for senior product designer or design lead roles
- Interested in working with innovative companies that value design
- Contact: ycui0801@gmail.com

Answer questions about their work, experience, design process, or career in a helpful and professional manner. 
Be conversational but knowledgeable. Speak as if you are Yi Cui or representing them directly.
If asked about specific project details, focus on the design process, challenges solved, and impact achieved.
`

// Simple server-side logging utility
const logEvent = (eventName: string, properties?: Record<string, string | number | boolean>) => {
  console.log(`[CHAT API] ${eventName}:`, {
    timestamp: new Date().toISOString(),
    ...properties
  })
}

// Toggle this to true for testing without OpenAI API
const MOCK_MODE = false

const getMockResponse = (message: string): string => {
  const responses = [
    "That's a great question! Yi has extensive experience in product design, focusing on creating intuitive user experiences.",
    "Yi specializes in minimalist design principles that maximize impact. Their portfolio showcases several award-winning projects.",
    "Interesting! Yi's design process typically involves user research, rapid prototyping, and iterative testing to ensure optimal usability.",
    "Yi has worked with Fortune 500 companies and startups alike, bringing fresh perspectives to complex design challenges.",
    "Great point! Yi's expertise includes UX/UI design, design systems, and strategic product thinking.",
    `Regarding "${message}" - Yi would approach this with a user-centered design methodology, ensuring every decision is backed by research and data.`
  ]
  
  // Simple response selection based on message content
  if (message.toLowerCase().includes('experience') || message.toLowerCase().includes('background')) {
    return responses[0]
  } else if (message.toLowerCase().includes('design') || message.toLowerCase().includes('process')) {
    return responses[2]
  } else if (message.toLowerCase().includes('project') || message.toLowerCase().includes('work')) {
    return responses[1]
  } else {
    return responses[Math.floor(Math.random() * responses.length)]
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { message, previousMessages } = await request.json()

    if (!message) {
      logEvent('chat_api_error', { error: 'Message is required' })
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Log incoming request with content
    const logData: Record<string, string | number | boolean> = {
      messageLength: message.length,
      conversationLength: previousMessages?.length || 0,
      userMessage: message // Add actual message content
    }
    
    const userAgent = request.headers.get('user-agent')
    if (userAgent) logData.userAgent = userAgent
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    if (ip) logData.ip = ip
    
    logEvent('chat_api_request', logData)

    let aiResponse: string
    let tokensUsed: number | undefined

    if (MOCK_MODE) {
      // Mock mode - simulate AI response without OpenAI API
      console.log('🤖 MOCK MODE: Generating mock response...')
      
      // Simulate API delay for realistic testing
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))
      
      aiResponse = getMockResponse(message)
      tokensUsed = Math.floor(Math.random() * 200) + 100 // Mock token count
      
    } else {
      // Real OpenAI API mode
      if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json(
          { error: 'OpenAI API key not configured' },
          { status: 500 }
        )
      }

      // Build conversation history with proper typing
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        {
          role: "system",
          content: PORTFOLIO_CONTEXT
        }
      ]

      // Add previous messages for context
      if (previousMessages && Array.isArray(previousMessages)) {
        previousMessages.slice(-5).forEach((msg: { isUser: boolean; content: string }) => { // Keep only last 5 messages for context
          messages.push({
            role: msg.isUser ? "user" : "assistant",
            content: msg.content
          })
        })
      }

      // Add current message
      messages.push({
        role: "user",
        content: message
      })

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
      })

      aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request."
      tokensUsed = completion.usage?.total_tokens
    }

    // Log successful response
    const successData: Record<string, string | number | boolean> = {
      responseLength: aiResponse.length,
      processingTime: Date.now() - startTime,
      aiResponse: aiResponse // Add actual AI response content
    }
    
    if (tokensUsed !== undefined) {
      successData.tokensUsed = tokensUsed
    }
    
    logEvent('chat_api_success', successData)
    
    // Log complete conversation to Airtable
    await logToAirtable({
      userMessage: message,
      aiResponse: aiResponse,
      messageLength: message.length,
      responseTime: Date.now() - startTime,
      tokensUsed: tokensUsed
    })

    return NextResponse.json({ message: aiResponse })

  } catch (error) {
    console.error('OpenAI API error:', error)
    
    // Log API errors
    logEvent('chat_api_error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      processingTime: Date.now() - startTime
    })
    
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
} 