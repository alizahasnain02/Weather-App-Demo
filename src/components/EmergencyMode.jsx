
import React, { useState, useEffect } from 'react'
import { AlertTriangle, Phone, MessageSquare, MapPin, Clock, Thermometer } from 'lucide-react'
import './EmergencyMode.css'

const EmergencyMode = ({ location }) => {
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [weatherAlerts, setWeatherAlerts] = useState([])
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Emergency Services', number: '911', type: 'emergency' },
    { name: 'Weather Service', number: '1-888-NWS-SKYWARN', type: 'weather' },
    { name: 'Local Emergency', number: '311', type: 'local' }
  ])

  useEffect(() => {
    // Simulate weather alerts
    const alerts = [
      {
        id: 1,
        type: 'warning',
        title: 'Severe Thunderstorm Watch',
        message: 'Severe thunderstorms possible in your area. Stay indoors and avoid travel.',
        severity: 'moderate',
        expires: new Date(Date.now() + 3600000)
      }
    ]
    setWeatherAlerts(alerts)
  }, [location])

  const handleEmergencyCall = (number) => {
    if (typeof window !== 'undefined') {
      window.open(`tel:${number}`)
    }
  }

  const handleEmergencySMS = () => {
    const message = `Weather Emergency Alert: I need assistance due to severe weather conditions. My location: ${location.name} (${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}). Please send help if possible.`
    
    if (typeof window !== 'undefined') {
      // For mobile devices
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open(`sms:?body=${encodeURIComponent(message)}`)
      } else {
        // For desktop, copy to clipboard
        navigator.clipboard.writeText(message).then(() => {
          alert('Emergency message copied to clipboard!')
        })
      }
    }
  }

  const handleWhatsAppEmergency = () => {
    const message = `🚨 Weather Emergency Alert: I need assistance due to severe weather conditions. My location: ${location.name} (${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}). Please send help if possible.`
    
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`)
    }
  }

  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'severe':
        return '🚨'
      case 'moderate':
        return '⚠️'
      case 'minor':
        return '⚡'
      default:
        return '📢'
    }
  }

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'severe':
        return '#e74c3c'
      case 'moderate':
        return '#f39c12'
      case 'minor':
        return '#f1c40f'
      default:
        return '#3498db'
    }
  }

  const currentWeatherTips = [
    "Stay indoors during severe weather",
    "Keep emergency supplies readily available",
    "Monitor weather updates regularly",
    "Have a communication plan with family",
    "Know your evacuation routes"
  ]

  return (
    <div className="main-content">
      <div className="container">
        <div className="emergency-mode">
          <div className="emergency-header card">
            <div className="emergency-title">
              <AlertTriangle size={32} className="emergency-icon" />
              <div>
                <h2>Emergency Weather Mode</h2>
                <p>Quick access to emergency services and weather alerts</p>
              </div>
            </div>
            <div className="emergency-status">
              <div className={`status-indicator ${emergencyActive ? 'active' : 'standby'}`}>
                {emergencyActive ? 'ACTIVE' : 'STANDBY'}
              </div>
            </div>
          </div>

          {/* Current Location & Time */}
          <div className="location-info card">
            <div className="info-item">
              <MapPin size={20} />
              <div>
                <strong>Current Location</strong>
                <p>{location.name}</p>
                <small>Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}</small>
              </div>
            </div>
            <div className="info-item">
              <Clock size={20} />
              <div>
                <strong>Current Time</strong>
                <p>{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Weather Alerts */}
          {weatherAlerts.length > 0 && (
            <div className="weather-alerts">
              <h3>Active Weather Alerts</h3>
              {weatherAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className="alert-card card"
                  style={{ borderLeft: `4px solid ${getAlertColor(alert.severity)}` }}
                >
                  <div className="alert-header">
                    <span className="alert-emoji">{getAlertIcon(alert.severity)}</span>
                    <div className="alert-info">
                      <h4>{alert.title}</h4>
                      <p className="alert-expires">
                        Expires: {alert.expires.toLocaleString()}
                      </p>
                    </div>
                    <div 
                      className="alert-severity"
                      style={{ color: getAlertColor(alert.severity) }}
                    >
                      {alert.severity.toUpperCase()}
                    </div>
                  </div>
                  <p className="alert-message">{alert.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Emergency Actions */}
          <div className="emergency-actions">
            <h3>Emergency Communication</h3>
            <div className="actions-grid">
              <button 
                className="emergency-action-btn call"
                onClick={() => handleEmergencyCall('911')}
              >
                <Phone size={24} />
                <div>
                  <strong>Emergency Call</strong>
                  <p>Call 911 now</p>
                </div>
              </button>

              <button 
                className="emergency-action-btn sms"
                onClick={handleEmergencySMS}
              >
                <MessageSquare size={24} />
                <div>
                  <strong>Emergency SMS</strong>
                  <p>Send location via text</p>
                </div>
              </button>

              <button 
                className="emergency-action-btn whatsapp"
                onClick={handleWhatsAppEmergency}
              >
                <MessageSquare size={24} />
                <div>
                  <strong>WhatsApp Alert</strong>
                  <p>Share emergency location</p>
                </div>
              </button>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="emergency-contacts card">
            <h3>Emergency Contacts</h3>
            <div className="contacts-list">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-info">
                    <strong>{contact.name}</strong>
                    <p>{contact.number}</p>
                  </div>
                  <button 
                    className="contact-call-btn"
                    onClick={() => handleEmergencyCall(contact.number)}
                  >
                    <Phone size={16} />
                    Call
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div className="safety-tips card">
            <h3>Weather Safety Tips</h3>
            <div className="tips-list">
              {currentWeatherTips.map((tip, index) => (
                <div key={index} className="tip-item">
                  <span className="tip-number">{index + 1}</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Activation */}
          <div className="emergency-activation card">
            <div className="activation-content">
              <h3>Emergency Mode</h3>
              <p>
                Activate emergency mode to enable continuous weather monitoring 
                and faster access to emergency services.
              </p>
              <button 
                className={`activation-btn ${emergencyActive ? 'deactivate' : 'activate'}`}
                onClick={() => setEmergencyActive(!emergencyActive)}
              >
                {emergencyActive ? 'Deactivate Emergency Mode' : 'Activate Emergency Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyMode
