import { useEffect, useMemo, useRef, useState } from 'react'
import { useApi } from '../api/ApiContext'

const SUGGESTED_PROMPTS = [
  'Who won the last race?',
  'Which team leads the constructors standings?',
  'Give me a quick summary of this season so far.'
]

export default function ChatBot() {
  // Request function from our API context to send messages to the backend.
  const { request } = useApi()
  // Controls whether the floating widget is expanded into the full chat panel.
  const [isOpen, setIsOpen] = useState(false)
  // Tracks the current value in the message input.
  const [input, setInput] = useState('')
  // Prevents duplicate requests while waiting for the assistant reply.
  const [isSending, setIsSending] = useState(false)
  // Stores full conversation history for two-way chat rendering.
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am your F1 Assistant. Do you have any questions about Formula 1?'
    }
  ])
  // Surface request errors to the user inside the chat panel.
  const [error, setError] = useState('')
  // Enables auto-scroll so the newest message is always visible.
  const listRef = useRef(null)

  // Submit button stays disabled for empty input (e.g. white space) or while an API request is in flight.
  const disabled = useMemo(() => isSending || !input.trim().length, [isSending, input])

  // Scroll to the bottom of the messages list whenever a new message is added or the panel is opened.
  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, isOpen])

  // Sends a user message to the backend and appends the assistant response.
  const sendMessage = async (messageText) => {
    const text = messageText.trim()
    if (!text || isSending) return

    setIsSending(true)
    setError('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')

    try {
      const result = await request('/ask', {
        method: 'POST',
        body: JSON.stringify({ message: text })
      })

      //if the response is an empty string or just whitespace, show a default message instead
      const reply =
        typeof result?.reply === 'string' && result.reply.trim() //
          ? result.reply
          : 'I could not generate an answer for that yet.'

      // Append the assistant reply to the chat history.
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      const message = e?.message || 'Something went wrong while sending.'
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I hit an error while replying. Please try again.'
        }
      ])
    } finally {
      setIsSending(false)
    }
  }

  // Handles form submission from the message input.
  const onSubmit = async (event) => {
    event.preventDefault()
    await sendMessage(input)
  }

  return (
    <div className="chatbot-shell" aria-live="polite">
      {/* Expanded panel view with history, quick prompts, and composer. */}
      {isOpen && (
        <section className="chatbot-panel" aria-label="F1 Assistant chat window">
          <header className="chatbot-header">
            <div>
              <strong>F1 Assistant</strong>
              <p>Live Q&A</p>
            </div>
            <button className="chatbot-close" type="button" onClick={() => setIsOpen(false)} aria-label="Collapse chat">
              x
            </button>
          </header>

          <div className="chatbot-messages" ref={listRef}>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chatbot-bubble chatbot-bubble-${message.role}`}>
                {message.content}
              </div>
            ))}
            {isSending && <div className="chatbot-bubble chatbot-bubble-assistant chatbot-loading">Thinking...</div>}
          </div>

          {!!error && <p className="chatbot-error">{error}</p>}

          <div className="chatbot-prompts">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="chatbot-prompt"
                onClick={() => sendMessage(prompt)}
                disabled={isSending}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className="chatbot-input-row" onSubmit={onSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about F1..."
              aria-label="Type your question"
              disabled={isSending}
            />
            <button type="submit" disabled={disabled}>
              Send
            </button>
          </form>
        </section>
      )}

      {/* Floating action button toggles chat open/closed from any page. */}
      <button
        type="button"
        className="chatbot-fab"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Collapse chat' : 'Open chat'}
      >
        {isOpen ? '-' : 'Formula 1 Chat'}
      </button>
    </div>
  )
}
