
import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './WeatherMap.css'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const MapUpdater = ({ location, onLocationChange }) => {
  const map = useMap()

  useEffect(() => {
    map.setView([location.lat, location.lon], 10)
  }, [location, map])

  useEffect(() => {
    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng
      onLocationChange({
        lat,
        lon: lng,
        name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      })
    }

    map.on('click', handleMapClick)
    return () => map.off('click', handleMapClick)
  }, [map, onLocationChange])

  return null
}

const WeatherMap = ({ location, onLocationChange }) => {
  const mapRef = useRef()

  return (
    <div className="main-content">
      <div className="container">
        <div className="weather-map-container">
          <div className="map-header card">
            <h2>Interactive Weather Map</h2>
            <p>Click on the map to get weather for that location</p>
            <div className="current-location">
              <strong>Current Location:</strong> {location.name}
            </div>
          </div>

          <div className="map-container card">
            <MapContainer
              center={[location.lat, location.lon]}
              zoom={10}
              style={{ height: '500px', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Weather overlay can be added here */}
              <TileLayer
                attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=demo_key`}
                opacity={0.6}
              />
              
              <Marker position={[location.lat, location.lon]}>
                <Popup>
                  <div className="map-popup">
                    <strong>{location.name}</strong>
                    <br />
                    Lat: {location.lat.toFixed(4)}
                    <br />
                    Lon: {location.lon.toFixed(4)}
                  </div>
                </Popup>
              </Marker>

              <MapUpdater location={location} onLocationChange={onLocationChange} />
            </MapContainer>
          </div>

          <div className="map-legend card">
            <h3>Map Legend</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ background: 'linear-gradient(to right, #0000ff, #00ff00, #ffff00, #ff0000)' }}></div>
                <span>Temperature (Cold to Hot)</span>
              </div>
              <div className="legend-note">
                <strong>Tip:</strong> Click anywhere on the map to check the weather for that location!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherMap
