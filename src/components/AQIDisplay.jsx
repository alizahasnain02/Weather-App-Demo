
import React, { useState, useEffect } from 'react'
import { Wind } from 'lucide-react'
import './AQIDisplay.css'

const AQIDisplay = ({ location }) => {
  const [aqiData, setAqiData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: '#4CAF50', description: 'Air quality is satisfactory' }
    if (aqi <= 100) return { level: 'Moderate', color: '#FFC107', description: 'Air quality is acceptable for most people' }
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: '#FF9800', description: 'Sensitive people should limit outdoor exposure' }
    if (aqi <= 200) return { level: 'Unhealthy', color: '#F44336', description: 'Everyone should limit outdoor activities' }
    if (aqi <= 300) return { level: 'Very Unhealthy', color: '#9C27B0', description: 'Health alert: everyone should avoid outdoor activities' }
    return { level: 'Hazardous', color: '#795548', description: 'Health warning: emergency conditions' }
  }

  useEffect(() => {
    const fetchAQI = async () => {
      if (!location) return

      setLoading(true)
      setError(null)

      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
        
        if (!apiKey) {
          throw new Error('API key not found')
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch air quality data')
        }

        const data = await response.json()
        setAqiData(data)
      } catch (err) {
        console.error('Error fetching AQI:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAQI()
  }, [location])

  if (loading) {
    return (
      <div className="aqi-display card">
        <div className="aqi-loading">
          <Wind size={24} />
          <p>Loading air quality data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="aqi-display card">
        <div className="aqi-error">
          <p>Unable to load air quality data</p>
          <small>{error}</small>
        </div>
      </div>
    )
  }

  if (!aqiData || !aqiData.list || aqiData.list.length === 0) {
    return (
      <div className="aqi-display card">
        <div className="aqi-error">
          <p>No air quality data available</p>
        </div>
      </div>
    )
  }

  const currentAQI = aqiData.list[0]
  const aqiValue = currentAQI.main.aqi * 50 // Convert to US AQI scale approximation
  const aqiInfo = getAQILevel(aqiValue)
  
  const pollutants = [
    { name: 'CO', value: currentAQI.components.co, unit: 'μg/m³' },
    { name: 'NO₂', value: currentAQI.components.no2, unit: 'μg/m³' },
    { name: 'O₃', value: currentAQI.components.o3, unit: 'μg/m³' },
    { name: 'PM2.5', value: currentAQI.components.pm2_5, unit: 'μg/m³' },
    { name: 'PM10', value: currentAQI.components.pm10, unit: 'μg/m³' },
    { name: 'SO₂', value: currentAQI.components.so2, unit: 'μg/m³' }
  ]

  return (
    <div className="aqi-display card">
      <h3>Air Quality Index</h3>
      
      <div className="aqi-main">
        <div 
          className="aqi-indicator" 
          style={{ background: aqiInfo.color }}
        >
          <div className="aqi-value">{Math.round(aqiValue)}</div>
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
        {pollutants.map((pollutant) => (
          <div key={pollutant.name} className="pollutant-item">
            <div className="pollutant-name">{pollutant.name}</div>
            <div className="pollutant-value">
              {pollutant.value?.toFixed(1) || 'N/A'}
              <span className="pollutant-unit"> {pollutant.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AQIDisplay
