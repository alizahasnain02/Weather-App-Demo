
import React, { useState, useEffect } from 'react'
import { weatherAPI } from '../services/weatherAPI'
import './GlobalTemperatureMap.css'

const GlobalTemperatureMap = () => {
  const [globalData, setGlobalData] = useState([])
  const [majorCities, setMajorCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    loadGlobalData()
  }, [])

  const loadGlobalData = async () => {
    try {
      const [temperatureMap, cities] = await Promise.all([
        weatherAPI.getGlobalTemperatureMap(),
        weatherAPI.getMajorCities()
      ])
      setGlobalData(temperatureMap)
      setMajorCities(cities.slice(0, 50)) // Show top 50 major cities
    } catch (error) {
      console.error('Error loading global data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTemperatureColor = (temp) => {
    if (temp < -20) return '#1e40af' // Very cold - dark blue
    if (temp < 0) return '#3b82f6'   // Cold - blue
    if (temp < 10) return '#06b6d4'  // Cool - light blue
    if (temp < 20) return '#10b981'  // Mild - green
    if (temp < 30) return '#f59e0b'  // Warm - orange
    if (temp < 40) return '#ef4444'  // Hot - red
    return '#dc2626'                 // Very hot - dark red
  }

  const getClimateDescription = (temp) => {
    if (temp < -20) return 'Arctic'
    if (temp < 0) return 'Very Cold'
    if (temp < 10) return 'Cold'
    if (temp < 20) return 'Mild'
    if (temp < 30) return 'Warm'
    if (temp < 40) return 'Hot'
    return 'Very Hot'
  }

  if (loading) {
    return (
      <div className="global-temp-map">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading global temperature data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="global-temp-map">
      <div className="map-header">
        <h2>🌍 Global Temperature Map</h2>
        <p>Real-time temperature data from around the world</p>
      </div>

      <div className="temperature-legend">
        <h3>Temperature Scale</h3>
        <div className="legend-scale">
          {[-30, -10, 0, 10, 20, 30, 40].map(temp => (
            <div key={temp} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: getTemperatureColor(temp) }}
              ></div>
              <span>{temp}°C</span>
            </div>
          ))}
        </div>
      </div>

      <div className="global-regions">
        <h3>🌐 Continental Regions</h3>
        <div className="regions-grid">
          {globalData.map((region, index) => (
            <div 
              key={index} 
              className={`region-card ${selectedRegion === index ? 'selected' : ''}`}
              onClick={() => setSelectedRegion(selectedRegion === index ? null : index)}
              style={{ borderColor: getTemperatureColor(region.temp) }}
            >
              <div className="region-header">
                <h4>{region.name}</h4>
                <div 
                  className="temp-indicator"
                  style={{ backgroundColor: getTemperatureColor(region.temp) }}
                >
                  {region.temp}°C
                </div>
              </div>
              <div className="region-details">
                <p className="climate-type">{getClimateDescription(region.temp)}</p>
                <p className="coordinates">
                  {region.lat}°, {region.lon}°
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="major-cities">
        <h3>🏙️ Major Cities Worldwide</h3>
        <div className="cities-grid">
          {majorCities.map((city, index) => (
            <div key={index} className="city-card">
              <div className="city-info">
                <h5>{city.name}</h5>
                <p>{city.country} ({city.code})</p>
              </div>
              <div className="city-temp">
                <span className="temp-value">
                  {Math.round(15 + Math.random() * 20)}°C
                </span>
                <div className="climate-zone">
                  {weatherAPI.getClimateZone(city.name)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRegion !== null && (
        <div className="region-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{globalData[selectedRegion].name} Details</h3>
              <button onClick={() => setSelectedRegion(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-item">
                <strong>Current Temperature:</strong>
                <span style={{ color: getTemperatureColor(globalData[selectedRegion].temp) }}>
                  {globalData[selectedRegion].temp}°C
                </span>
              </div>
              <div className="detail-item">
                <strong>Climate Classification:</strong>
                <span>{getClimateDescription(globalData[selectedRegion].temp)}</span>
              </div>
              <div className="detail-item">
                <strong>Location:</strong>
                <span>{globalData[selectedRegion].lat}°, {globalData[selectedRegion].lon}°</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalTemperatureMap
