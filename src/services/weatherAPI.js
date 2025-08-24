
// Weather API service using OpenWeatherMap
const API_KEY = 'demo_key' // Replace with actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// Mock data for demo purposes
const mockCurrentWeather = {
  temp: 22,
  feels_like: 24,
  temp_min: 18,
  temp_max: 26,
  pressure: 1013,
  humidity: 65,
  visibility: 10000,
  wind_speed: 3.5,
  uvi: 5,
  description: 'partly cloudy',
  weather: [{ main: 'Clouds', description: 'partly cloudy' }]
}

const mockForecast = Array.from({ length: 40 }, (_, i) => ({
  dt: Date.now() / 1000 + (i * 3600), // hourly data
  main: {
    temp: 20 + Math.random() * 10,
    temp_min: 18 + Math.random() * 8,
    temp_max: 22 + Math.random() * 12,
    humidity: 50 + Math.random() * 30
  },
  weather: [{ 
    main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
    description: ['clear sky', 'few clouds', 'light rain'][Math.floor(Math.random() * 3)]
  }],
  wind: { speed: Math.random() * 5 }
}))

export const weatherAPI = {
  async getCurrentWeather(lat, lon) {
    try {
      // For demo, return mock data
      // In production, use:
      // const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      // return await response.json()
      
      return new Promise(resolve => {
        setTimeout(() => resolve(mockCurrentWeather), 1000)
      })
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw error
    }
  },

  async getForecast(lat, lon) {
    try {
      // For demo, return mock data
      // In production, use:
      // const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      // const data = await response.json()
      // return data.list
      
      return new Promise(resolve => {
        setTimeout(() => resolve(mockForecast), 1200)
      })
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw error
    }
  },

  async getAirQuality(lat, lon) {
    try {
      // Mock AQI data
      return new Promise(resolve => {
        setTimeout(() => resolve({
          aqi: Math.floor(Math.random() * 5) + 1,
          co: 233.4,
          no2: 15.3,
          o3: 68.9,
          pm2_5: 12.1,
          pm10: 18.7
        }), 800)
      })
    } catch (error) {
      console.error('Error fetching air quality:', error)
      throw error
    }
  }
}
