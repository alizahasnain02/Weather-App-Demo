
import React, { useState, useEffect } from 'react'
import { Wind } from 'lucide-react'
import './AQIDisplay.css'

const AQIDisplay = ({ location }) => {
  const [aqiData, setAqiData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAQI = async () => {
      if (!location) return
      
      setLoading(true)
      try {
        // Mock AQI data for demo purposes
        const mockAQI = {
          aqi: Math.floor(Math.random() * 100) + 1,
          pm25: Math.floor(Math.random() * 50) + 10,
          pm10: Math.floor(Math.random() * 80) + 20,
          no2: Math.floor(Math.random() * 30) + 5,
          o3: Math.floor(Math.random() * 60) + 15
        }
        setAqiData(mockAQI)
      } catch (error) {
        console.error('Error fetching AQI:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAQI()
  }, [location])

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { status: 'Good', color: '#00e400' }
    if (aqi <= 100) return { status: 'Moderate', color: '#ffff00' }
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: '#ff7e00' }
    if (aqi <= 200) return { status: 'Unhealthy', color: '#ff0000' }
    if (aqi <= 300) return { status: 'Very Unhealthy', color: '#8f3f97' }
    return { status: 'Hazardous', color: '#7e0023' }
  }

  if (loading) {
    return (
      <div className="aqi-container card">
        <h3>Air Quality</h3>
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (!aqiData) {
    return (
      <div className="aqi-container card">
        <h3>Air Quality</h3>
        <div className="no-data">No data available</div>
      </div>
    )
  }

  const { status, color } = getAQIStatus(aqiData.aqi)

  return (
    <div className="aqi-container card">
      <h3>
        <Wind size={24} />
        Air Quality Index
      </h3>
      
      <div className="aqi-main">
        <div className="aqi-value" style={{ color }}>
          {aqiData.aqi}
        </div>
        <div className="aqi-status" style={{ color }}>
          {status}
        </div>
      </div>

      <div className="aqi-details">
        <div className="aqi-item">
          <span>PM2.5</span>
          <span>{aqiData.pm25} μg/m³</span>
        </div>
        <div className="aqi-item">
          <span>PM10</span>
          <span>{aqiData.pm10} μg/m³</span>
        </div>
        <div className="aqi-item">
          <span>NO₂</span>
          <span>{aqiData.no2} μg/m³</span>
        </div>
        <div className="aqi-item">
          <span>O₃</span>
          <span>{aqiData.o3} μg/m³</span>
        </div>
      </div>
    </div>
  )
}

export default AQIDisplay

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
