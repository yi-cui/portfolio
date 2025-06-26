export interface ChatEvent {
  event: string
  properties?: Record<string, string | number | boolean>
  timestamp: string
  sessionId: string
}

export const getChatEvents = (): ChatEvent[] => {
  if (typeof window === 'undefined') return []
  try {
    const events = localStorage.getItem('chatEvents')
    return events ? JSON.parse(events) : []
  } catch {
    return []
  }
}

export const clearChatEvents = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('chatEvents')
  localStorage.removeItem('chatSessionId')
}

export const exportChatEvents = () => {
  const events = getChatEvents()
  const dataStr = JSON.stringify(events, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `chat-analytics-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export const getAnalyticsSummary = () => {
  const events = getChatEvents()
  
  const summary = {
    totalEvents: events.length,
    uniqueSessions: new Set(events.map(e => e.sessionId)).size,
    firstInteractions: events.filter(e => e.event === 'chat_first_interaction').length,
    messagesSent: events.filter(e => e.event === 'chat_message_sent').length,
    inputFocuses: events.filter(e => e.event === 'chat_input_focused').length,
    errorsCount: events.filter(e => e.event === 'chat_error').length,
    conversationStarts: events.filter(e => e.event === 'chat_page_loaded').length,
    lastActivity: events.length > 0 ? events[events.length - 1].timestamp : null
  }
  
  return summary
} 