
import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import './LocationSearch.css'

const LocationSearch = ({ onLocationSelect, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const searchLocations = async (searchQuery) => {
    if (searchQuery.length < 3) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      // Using OpenStreetMap Nominatim API for location search
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      )
      const data = await response.json()
      
      const formattedResults = data.map(item => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      }))
      
      setResults(formattedResults)
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
              <div className="result-name">{location.name.split(',')[0]}</div>
              <div className="result-details">{location.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationSearch
