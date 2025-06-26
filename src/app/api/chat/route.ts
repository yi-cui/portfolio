import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Portfolio context - Yi Cui's information
const PORTFOLIO_CONTEXT = `
You are an AI assistant representing Yi Cui, a product designer with 5+ years of experience based in San Francisco. 
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
- Contact: hello@yourname.com

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

    // Log incoming request
    const logData: Record<string, string | number | boolean> = {
      messageLength: message.length,
      conversationLength: previousMessages?.length || 0
    }
    
    const userAgent = request.headers.get('user-agent')
    if (userAgent) logData.userAgent = userAgent
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    if (ip) logData.ip = ip
    
    logEvent('chat_api_request', logData)

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

    const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request."

    // Log successful response
    const successData: Record<string, string | number | boolean> = {
      responseLength: aiResponse.length,
      processingTime: Date.now() - startTime
    }
    
    if (completion.usage?.total_tokens !== undefined) {
      successData.tokensUsed = completion.usage.total_tokens
    }
    
    logEvent('chat_api_success', successData)

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