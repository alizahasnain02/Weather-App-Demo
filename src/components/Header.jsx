
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, MapPin, MessageCircle, AlertTriangle, Moon, Sun } from 'lucide-react'
import LocationSearch from './LocationSearch'
import './Header.css'

const Header = ({ location, onLocationChange, darkMode, setDarkMode }) => {
  const [showSearch, setShowSearch] = useState(false)
  const currentPath = useLocation().pathname

  const navItems = [
    { path: '/', icon: MapPin, label: 'Dashboard' },
    { path: '/map', icon: MapPin, label: 'Map' },
    { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
    { path: '/emergency', icon: AlertTriangle, label: 'Emergency' }
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Daily Forecast ⛅</h1>
          </div>

          <nav className="nav">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-item ${currentPath === path ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span className="nav-label">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="action-btn"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search size={20} />
            </button>
            
            <button
              className="action-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="location-display">
              <MapPin size={16} />
              <span>{location.name}</span>
            </div>
          </div>
        </div>

        {showSearch && (
          <LocationSearch
            onLocationSelect={(newLocation) => {
              onLocationChange(newLocation)
              setShowSearch(false)
            }}
            onClose={() => setShowSearch(false)}
          />
        )}
      </div>
    </header>
  )
}

export default Header
