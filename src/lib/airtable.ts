import Airtable from 'airtable'

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!)

interface ChatLogData {
  userMessage: string
  aiResponse: string
  messageLength: number
  responseTime: number
  tokensUsed?: number
}

export async function logToAirtable(data: ChatLogData) {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.log('⚠️ Airtable credentials missing, skipping log')
    return
  }

  try {
    const table = base(process.env.AIRTABLE_TABLE_NAME || 'Chat Conversations')
    
    const record = await table.create({
      'Timestamp': new Date().toLocaleString('en-US'),
      'User Message': data.userMessage,
      'AI Response': data.aiResponse,
      'Message Length': data.messageLength,
      'Response Time': data.responseTime,
      'Tokens Used': data.tokensUsed || 0
    })

    console.log('✅ Successfully logged to Airtable:', record.id)
    return record
  } catch (error) {
    console.error('❌ Failed to log to Airtable:', error)
    // Don't throw error to avoid breaking the chat functionality
  }
} 