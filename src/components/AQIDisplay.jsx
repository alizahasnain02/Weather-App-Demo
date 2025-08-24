
import React, { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { weatherAPI } from '../services/weatherAPI'
import './AQIDisplay.css'

const AQIDisplay = ({ location }) => {
  const [aqiData, setAqiData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAQI = async () => {
      try {
        setLoading(true)
        const data = await weatherAPI.getAirQuality(location.lat, location.lon)
        setAqiData(data)
      } catch (error) {
        console.error('Error fetching AQI:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAQI()
  }, [location])

  const getAQIInfo = (aqi) => {
    switch (aqi) {
      case 1:
        return { 
          level: 'Good', 
          color: '#2ecc71', 
          icon: CheckCircle,
          description: 'Air quality is satisfactory'
        }
      case 2:
        return { 
          level: 'Fair', 
          color: '#f1c40f', 
          icon: CheckCircle,
          description: 'Air quality is acceptable'
        }
      case 3:
        return { 
          level: 'Moderate', 
          color: '#e67e22', 
          icon: AlertTriangle,
          description: 'May cause issues for sensitive people'
        }
      case 4:
        return { 
          level: 'Poor', 
          color: '#e74c3c', 
          icon: XCircle,
          description: 'Health effects for everyone'
        }
      case 5:
        return { 
          level: 'Very Poor', 
          color: '#8e44ad', 
          icon: XCircle,
          description: 'Serious health effects'
        }
      default:
        return { 
          level: 'Unknown', 
          color: '#95a5a6', 
          icon: AlertTriangle,
          description: 'AQI data unavailable'
        }
    }
  }

  if (loading) {
    return (
      <div className="aqi-display">
        <h3>Air Quality Index</h3>
        <div className="aqi-loading">Loading AQI data...</div>
      </div>
    )
  }

  if (!aqiData) {
    return (
      <div className="aqi-display">
        <h3>Air Quality Index</h3>
        <div className="aqi-error">Unable to load AQI data</div>
      </div>
    )
  }

  const aqiInfo = getAQIInfo(aqiData.aqi)
  const Icon = aqiInfo.icon

  const pollutants = [
    { name: 'PM2.5', value: aqiData.pm2_5, unit: 'µg/m³' },
    { name: 'PM10', value: aqiData.pm10, unit: 'µg/m³' },
    { name: 'CO', value: aqiData.co, unit: 'µg/m³' },
    { name: 'NO₂', value: aqiData.no2, unit: 'µg/m³' },
    { name: 'O₃', value: aqiData.o3, unit: 'µg/m³' }
  ]

  return (
    <div className="aqi-display">
      <h3>Air Quality Index</h3>
      
      <div className="aqi-main">
        <div className="aqi-indicator" style={{ backgroundColor: aqiInfo.color }}>
          <Icon size={24} color="white" />
          <span className="aqi-value">{aqiData.aqi}</span>
        </div>
        
        <div className="aqi-info">
          <div className="aqi-level" style={{ color: aqiInfo.color }}>
            {aqiInfo.level}
          </div>
          <div className="aqi-description">
            {aqiInfo.description}
          </div>
        </div>
      </div>

      <div className="pollutants-grid">
        {pollutants.map((pollutant, index) => (
          <div key={index} className="pollutant-item">
            <div className="pollutant-name">{pollutant.name}</div>
            <div className="pollutant-value">
              {pollutant.value.toFixed(1)} <span className="pollutant-unit">{pollutant.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AQIDisplay
