
import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Zap } from 'lucide-react'
import './AIChat.css'

const AIChat = ({ currentWeather }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hey there! 👋 I'm your weather AI assistant. I can help explain weather patterns, give you personalized tips, and answer any weather-related questions you have!",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()
    
    if (msg.includes('weather') || msg.includes('temperature')) {
      if (currentWeather) {
        return `Based on current conditions, it's ${Math.round(currentWeather.temp)}°C and ${currentWeather.description}. ${
          currentWeather.temp > 25 
            ? "It's pretty warm out there! Stay hydrated and consider light clothing. ☀️" 
            : currentWeather.temp < 10 
            ? "It's quite chilly! Make sure to dress warmly and maybe grab a hot drink. 🧥" 
            : "Perfect weather for being outside! Enjoy your day! 🌤️"
        }`
      } else {
        return "I don't have current weather data right now, but I'm here to help with any weather questions you have!"
      }
    }
    
    if (msg.includes('rain') || msg.includes('umbrella')) {
      return "Great question about rain! ☔ I always recommend checking the hourly forecast before heading out. If there's a chance of rain, an umbrella or light rain jacket can save your day. Pro tip: Weather can change quickly, so it's better to be prepared!"
    }
    
    if (msg.includes('outfit') || msg.includes('clothes') || msg.includes('wear')) {
      if (currentWeather) {
        const temp = currentWeather.temp
        if (temp > 25) {
          return "For this warm weather, I'd suggest light, breathable fabrics like cotton or linen. Think shorts, t-shirts, and don't forget sunscreen! 👕☀️"
        } else if (temp < 10) {
          return "Bundle up! Layers are your friend - start with a base layer, add a sweater, and top with a warm coat. Don't forget a hat and gloves! 🧥❄️"
        } else {
          return "Perfect temperature for layers! A light jacket or sweater that you can easily remove if it warms up. Jeans and a comfortable top would work great! 👍"
        }
      } else {
        return "I'd love to give you outfit advice! Could you tell me what the current temperature is, or share your location so I can help you dress appropriately?"
      }
    }
    
    if (msg.includes('activities') || msg.includes('plans') || msg.includes('outside')) {
      return "Weather can totally make or break outdoor plans! 🌈 For sunny days, hiking, picnics, or sports are perfect. Cloudy but mild? Great for walking or outdoor photography. Rainy? Maybe indoor activities like museums, movies, or cozy cafes. What kind of activities do you enjoy?"
    }
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hey! 👋 So glad you're here! I'm your personal weather buddy. Whether you need outfit advice, activity suggestions, or just want to understand why the weather is doing what it's doing, I'm here to help! What's on your mind?"
    }
    
    if (msg.includes('thanks') || msg.includes('thank')) {
      return "You're so welcome! 😊 That's what I'm here for! Feel free to ask me anything else about weather, and remember - there's no such thing as bad weather, only inappropriate clothing! 🌦️"
    }
    
    // Default responses for general weather interest
    const responses = [
      "That's interesting! Weather is such a fascinating topic. Did you know that no two snowflakes are exactly alike? ❄️ What specifically about weather interests you?",
      "I love talking about weather! 🌤️ It affects so much of our daily lives. Is there something specific you'd like to know or discuss?",
      "Weather is amazing, right? From tiny raindrops to massive storm systems - there's always something cool happening in our atmosphere! 🌪️ What can I help you with?",
      "Great question! I'm always excited to chat about weather patterns, forecasts, or how weather impacts our daily decisions. What would you like to explore? 🔍"
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "What should I wear today?",
    "Is it good weather for outdoor activities?",
    "Will it rain later?",
    "Explain today's weather"
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
  }

  return (
    <div className="main-content">
      <div className="container">
        <div className="ai-chat-container">
          <div className="chat-header card">
            <div className="chat-title">
              <Bot size={32} className="chat-icon" />
              <div>
                <h2>AI Weather Assistant</h2>
                <p>Get personalized weather insights and tips</p>
              </div>
            </div>
            <div className="chat-status">
              <Zap size={16} />
              <span>Online & Ready</span>
            </div>
          </div>

          <div className="chat-messages card">
            <div className="messages-container">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.type}`}>
                  <div className="message-avatar">
                    {message.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.content}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot">
                  <div className="message-avatar">
                    <Bot size={20} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="quick-questions card">
            <h3>Quick Questions</h3>
            <div className="quick-questions-grid">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-input card">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about weather..."
                className="message-input"
                rows="2"
              />
              <button
                onClick={handleSendMessage}
                className="send-button"
                disabled={!inputMessage.trim() || isTyping}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChat
