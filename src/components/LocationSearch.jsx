
import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import './LocationSearch.css'

const LocationSearch = ({ onLocationSelect, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const searchLocations = async (searchQuery) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      // First try our comprehensive global database
      const { weatherAPI } = await import('../services/weatherAPI')
      const globalResults = await weatherAPI.searchGlobalLocations(searchQuery)
      
      // Also search using OpenStreetMap for additional coverage
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      )
      const osmData = await response.json()
      
      const osmResults = osmData.map(item => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        type: 'osm_location',
        country: 'Various'
      }))
      
      // Combine and format results
      const combinedResults = [
        ...globalResults.map(item => ({
          name: item.name,
          lat: item.lat,
          lon: item.lon,
          type: item.type,
          country: item.country,
          code: item.code,
          fullName: `${item.name}, ${item.country}`
        })),
        ...osmResults.map(item => ({
          name: item.name.split(',')[0],
          lat: item.lat,
          lon: item.lon,
          type: item.type,
          country: item.country,
          fullName: item.name
        }))
      ]
      
      // Remove duplicates and limit results
      const uniqueResults = combinedResults.filter((result, index, self) => 
        index === self.findIndex(r => r.name === result.name && Math.abs(r.lat - result.lat) < 0.1)
      ).slice(0, 10)
      
      setResults(uniqueResults)
    } catch (error) {
      console.error('Error searching locations:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    searchLocations(value)
  }

  const handleLocationClick = (location) => {
    onLocationSelect({
      lat: location.lat,
      lon: location.lon,
      name: location.name.split(',')[0] // Use first part of the name
    })
  }

  return (
    <div className="location-search">
      <div className="search-header">
        <div className="search-input-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
            autoFocus
          />
        </div>
        <button onClick={onClose} className="close-btn">
          <X size={18} />
        </button>
      </div>

      {loading && (
        <div className="search-loading">Searching...</div>
      )}

      {results.length > 0 && (
        <div className="search-results">
          {results.map((location, index) => (
            <button
              key={index}
              className="search-result"
              onClick={() => handleLocationClick(location)}
            >
              <div className="result-header">
                <div className="result-name">{location.name}</div>
                <span className="result-type">{location.type || 'location'}</span>
              </div>
              <div className="result-details">
                {location.country && (
                  <span className="result-country">📍 {location.country}</span>
                )}
                {location.code && location.code !== 'XX' && (
                  <span className="result-code">{location.code}</span>
                )}
              </div>
              <div className="result-coordinates">
                {location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationSearch
