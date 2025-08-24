
// Weather API service using OpenWeatherMap with comprehensive global coverage
const API_KEY = 'demo_key' // Replace with actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0'

// Comprehensive global locations data
const globalLocations = {
  countries: [
    // Major Countries with cities, territories, and colonies
    {
      name: 'United States',
      code: 'US',
      cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
      territories: ['Puerto Rico', 'US Virgin Islands', 'American Samoa', 'Guam', 'Northern Mariana Islands'],
      states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia']
    },
    {
      name: 'United Kingdom',
      code: 'GB',
      cities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Bristol', 'Sheffield', 'Leeds', 'Edinburgh', 'Leicester'],
      territories: ['Gibraltar', 'Bermuda', 'Falkland Islands', 'British Virgin Islands', 'Cayman Islands', 'Turks and Caicos'],
      regions: ['England', 'Scotland', 'Wales', 'Northern Ireland']
    },
    {
      name: 'France',
      code: 'FR',
      cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
      territories: ['French Guiana', 'Martinique', 'Guadeloupe', 'Réunion', 'Mayotte', 'New Caledonia', 'French Polynesia'],
      regions: ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes', 'Occitanie', 'Nouvelle-Aquitaine']
    },
    {
      name: 'Germany',
      code: 'DE',
      cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
      regions: ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Lower Saxony', 'Hesse', 'Saxony']
    },
    {
      name: 'Canada',
      code: 'CA',
      cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
      provinces: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick'],
      territories: ['Northwest Territories', 'Yukon', 'Nunavut']
    },
    {
      name: 'Australia',
      code: 'AU',
      cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong'],
      states: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania'],
      territories: ['Australian Capital Territory', 'Northern Territory', 'Norfolk Island', 'Christmas Island']
    },
    {
      name: 'India',
      code: 'IN',
      cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur'],
      states: ['Maharashtra', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Madhya Pradesh', 'Tamil Nadu', 'Rajasthan', 'Karnataka'],
      territories: ['Delhi', 'Puducherry', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'Andaman and Nicobar Islands']
    },
    {
      name: 'China',
      code: 'CN',
      cities: ['Shanghai', 'Beijing', 'Shenzhen', 'Guangzhou', 'Chengdu', 'Tianjin', 'Hangzhou', 'Wuhan', 'Dongguan', 'Chongqing'],
      provinces: ['Guangdong', 'Shandong', 'Henan', 'Sichuan', 'Jiangsu', 'Hebei', 'Hunan', 'Anhui', 'Hubei', 'Zhejiang'],
      territories: ['Hong Kong', 'Macau', 'Taiwan']
    },
    {
      name: 'Brazil',
      code: 'BR',
      cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Goiânia'],
      states: ['São Paulo', 'Minas Gerais', 'Rio de Janeiro', 'Bahia', 'Paraná', 'Rio Grande do Sul', 'Pernambuco', 'Ceará', 'Pará', 'Santa Catarina']
    },
    {
      name: 'Russia',
      code: 'RU',
      cities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov-on-Don'],
      regions: ['Moscow Oblast', 'Krasnodar Krai', 'Sverdlovsk Oblast', 'Rostov Oblast', 'Bashkortostan', 'Tatarstan']
    },
    {
      name: 'Japan',
      code: 'JP',
      cities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kawasaki', 'Kyoto', 'Saitama'],
      prefectures: ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Saitama', 'Chiba', 'Hyogo', 'Hokkaido', 'Fukuoka', 'Shizuoka']
    },
    {
      name: 'Mexico',
      code: 'MX',
      cities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Torreón', 'Querétaro', 'San Luis Potosí'],
      states: ['Mexico City', 'State of Mexico', 'Veracruz', 'Jalisco', 'Puebla', 'Guanajuato', 'Chiapas', 'Nuevo León', 'Michoacán', 'Oaxaca']
    }
  ],
  // Additional global territories and dependencies
  dependencies: [
    'Aruba', 'Curaçao', 'Sint Maarten', 'Faroe Islands', 'Greenland', 'Isle of Man', 'Jersey', 'Guernsey',
    'Cook Islands', 'Niue', 'Tokelau', 'Pitcairn Islands', 'Saint Helena', 'Tristan da Cunha', 'Montserrat',
    'Anguilla', 'British Antarctic Territory', 'South Georgia', 'Bouvet Island', 'Heard Island'
  ],
  // Climate zones for temperature analysis
  climateZones: {
    tropical: ['Singapore', 'Kuala Lumpur', 'Jakarta', 'Manila', 'Bangkok', 'Ho Chi Minh City', 'Yangon', 'Phnom Penh'],
    desert: ['Dubai', 'Riyadh', 'Phoenix', 'Las Vegas', 'Alice Springs', 'Cairo', 'Marrakech', 'Atacama'],
    mediterranean: ['Barcelona', 'Rome', 'Athens', 'Tel Aviv', 'Los Angeles', 'San Francisco', 'Perth', 'Cape Town'],
    continental: ['Moscow', 'Beijing', 'Chicago', 'Toronto', 'Warsaw', 'Budapest', 'Prague', 'Vienna'],
    oceanic: ['London', 'Paris', 'Dublin', 'Amsterdam', 'Brussels', 'Copenhagen', 'Stockholm', 'Oslo'],
    arctic: ['Reykjavik', 'Murmansk', 'Fairbanks', 'Yellowknife', 'Iqaluit', 'Longyearbyen', 'Alert', 'Eureka'],
    subtropical: ['Miami', 'New Orleans', 'Houston', 'Brisbane', 'Hong Kong', 'Taipei', 'Buenos Aires', 'Montevideo']
  }
}

// Enhanced weather data with global coverage
const mockCurrentWeather = {
  temp: 22,
  feels_like: 24,
  temp_min: 18,
  temp_max: 26,
  pressure: 1013,
  humidity: 65,
  visibility: 10000,
  wind_speed: 3.5,
  wind_deg: 180,
  uvi: 5,
  description: 'partly cloudy',
  weather: [{ main: 'Clouds', description: 'partly cloudy', icon: '02d' }],
  timezone: 0,
  sunrise: Date.now() / 1000 - 7200,
  sunset: Date.now() / 1000 + 3600
}

const generateGlobalForecast = (location) => {
  // Generate realistic forecast based on location and climate zone
  const isArctic = globalLocations.climateZones.arctic.some(city => 
    location.toLowerCase().includes(city.toLowerCase())
  )
  const isTropical = globalLocations.climateZones.tropical.some(city => 
    location.toLowerCase().includes(city.toLowerCase())
  )
  const isDesert = globalLocations.climateZones.desert.some(city => 
    location.toLowerCase().includes(city.toLowerCase())
  )

  let baseTemp = 20
  if (isArctic) baseTemp = -10
  else if (isTropical) baseTemp = 28
  else if (isDesert) baseTemp = 35

  return Array.from({ length: 120 }, (_, i) => ({
    dt: Date.now() / 1000 + (i * 3600), // 5-day hourly forecast
    main: {
      temp: baseTemp + (Math.random() * 15 - 7.5),
      temp_min: baseTemp - 5 + (Math.random() * 8),
      temp_max: baseTemp + 5 + (Math.random() * 8),
      humidity: isDesert ? 20 + Math.random() * 30 : 50 + Math.random() * 40,
      pressure: 1000 + Math.random() * 50
    },
    weather: [{ 
      main: isArctic ? ['Snow', 'Clear', 'Clouds'][Math.floor(Math.random() * 3)] :
            isTropical ? ['Rain', 'Clouds', 'Clear'][Math.floor(Math.random() * 3)] :
            isDesert ? ['Clear', 'Clouds'][Math.floor(Math.random() * 2)] :
            ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
      description: isArctic ? ['light snow', 'clear sky', 'overcast clouds'][Math.floor(Math.random() * 3)] :
                   isTropical ? ['tropical rain', 'tropical clouds', 'clear sky'][Math.floor(Math.random() * 3)] :
                   isDesert ? ['clear sky', 'few clouds'][Math.floor(Math.random() * 2)] :
                   ['clear sky', 'few clouds', 'light rain'][Math.floor(Math.random() * 3)],
      icon: '01d'
    }],
    wind: { speed: Math.random() * 10, deg: Math.random() * 360 },
    clouds: { all: Math.random() * 100 },
    pop: isDesert ? Math.random() * 0.1 : Math.random() * 0.5
  }))
}

export const weatherAPI = {
  // Get all global locations
  getAllLocations() {
    return globalLocations
  },

  // Search locations globally
  async searchGlobalLocations(query) {
    if (query.length < 2) return []
    
    const results = []
    const searchTerm = query.toLowerCase()

    // Search through countries, cities, territories
    globalLocations.countries.forEach(country => {
      // Add country itself
      if (country.name.toLowerCase().includes(searchTerm)) {
        results.push({
          name: country.name,
          type: 'country',
          lat: this.getCountryCoordinates(country.code).lat,
          lon: this.getCountryCoordinates(country.code).lon,
          country: country.name,
          code: country.code
        })
      }

      // Add cities
      country.cities?.forEach(city => {
        if (city.toLowerCase().includes(searchTerm)) {
          results.push({
            name: city,
            type: 'city',
            lat: Math.random() * 180 - 90, // Mock coordinates
            lon: Math.random() * 360 - 180,
            country: country.name,
            code: country.code
          })
        }
      })

      // Add territories/colonies
      country.territories?.forEach(territory => {
        if (territory.toLowerCase().includes(searchTerm)) {
          results.push({
            name: territory,
            type: 'territory',
            lat: Math.random() * 180 - 90,
            lon: Math.random() * 360 - 180,
            country: country.name,
            code: country.code
          })
        }
      })

      // Add states/provinces/regions
      const regions = [...(country.states || []), ...(country.provinces || []), ...(country.regions || [])]
      regions.forEach(region => {
        if (region.toLowerCase().includes(searchTerm)) {
          results.push({
            name: region,
            type: 'region',
            lat: Math.random() * 180 - 90,
            lon: Math.random() * 360 - 180,
            country: country.name,
            code: country.code
          })
        }
      })
    })

    // Search dependencies
    globalLocations.dependencies.forEach(dependency => {
      if (dependency.toLowerCase().includes(searchTerm)) {
        results.push({
          name: dependency,
          type: 'dependency',
          lat: Math.random() * 180 - 90,
          lon: Math.random() * 360 - 180,
          country: 'Various',
          code: 'XX'
        })
      }
    })

    return results.slice(0, 10)
  },

  // Get coordinates for countries (mock data)
  getCountryCoordinates(countryCode) {
    const coords = {
      'US': { lat: 39.8283, lon: -98.5795 },
      'GB': { lat: 55.3781, lon: -3.4360 },
      'FR': { lat: 46.6034, lon: 1.8883 },
      'DE': { lat: 51.1657, lon: 10.4515 },
      'CA': { lat: 56.1304, lon: -106.3468 },
      'AU': { lat: -25.2744, lon: 133.7751 },
      'IN': { lat: 20.5937, lon: 78.9629 },
      'CN': { lat: 35.8617, lon: 104.1954 },
      'BR': { lat: -14.2350, lon: -51.9253 },
      'RU': { lat: 61.5240, lon: 105.3188 },
      'JP': { lat: 36.2048, lon: 138.2529 },
      'MX': { lat: 23.6345, lon: -102.5528 }
    }
    return coords[countryCode] || { lat: 0, lon: 0 }
  },

  async getCurrentWeather(lat, lon, locationName = '') {
    try {
      // Generate weather based on location characteristics
      const weather = { ...mockCurrentWeather }
      
      // Modify weather based on location
      if (locationName) {
        const forecast = generateGlobalForecast(locationName)
        if (forecast.length > 0) {
          weather.temp = forecast[0].main.temp
          weather.humidity = forecast[0].main.humidity
          weather.pressure = forecast[0].main.pressure
          weather.weather = forecast[0].weather
          weather.description = forecast[0].weather[0].description
        }
      }

      return new Promise(resolve => {
        setTimeout(() => resolve(weather), 1000)
      })
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw error
    }
  },

  async getForecast(lat, lon, locationName = '') {
    try {
      const forecast = generateGlobalForecast(locationName || `${lat},${lon}`)
      
      return new Promise(resolve => {
        setTimeout(() => resolve(forecast), 1200)
      })
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw error
    }
  },

  async getGlobalTemperatureMap() {
    // Generate global temperature data for major world regions
    const regions = [
      { name: 'North America', lat: 45, lon: -100, temp: 15 },
      { name: 'South America', lat: -15, lon: -60, temp: 25 },
      { name: 'Europe', lat: 50, lon: 10, temp: 12 },
      { name: 'Asia', lat: 30, lon: 100, temp: 20 },
      { name: 'Africa', lat: 0, lon: 20, temp: 30 },
      { name: 'Australia', lat: -25, lon: 140, temp: 22 },
      { name: 'Antarctica', lat: -80, lon: 0, temp: -40 }
    ]

    return new Promise(resolve => {
      setTimeout(() => resolve(regions), 800)
    })
  },

  async getAirQuality(lat, lon) {
    try {
      return new Promise(resolve => {
        setTimeout(() => resolve({
          aqi: Math.floor(Math.random() * 5) + 1,
          co: 200 + Math.random() * 100,
          no2: 10 + Math.random() * 20,
          o3: 50 + Math.random() * 40,
          pm2_5: 5 + Math.random() * 20,
          pm10: 10 + Math.random() * 25,
          so2: 5 + Math.random() * 15
        }), 800)
      })
    } catch (error) {
      console.error('Error fetching air quality:', error)
      throw error
    }
  },

  // Get climate zone information
  getClimateZone(locationName) {
    for (const [zone, cities] of Object.entries(globalLocations.climateZones)) {
      if (cities.some(city => locationName.toLowerCase().includes(city.toLowerCase()))) {
        return zone
      }
    }
    return 'temperate'
  },

  // Get all major cities worldwide
  getMajorCities() {
    const cities = []
    globalLocations.countries.forEach(country => {
      country.cities.forEach(city => {
        cities.push({
          name: city,
          country: country.name,
          code: country.code,
          lat: Math.random() * 180 - 90,
          lon: Math.random() * 360 - 180
        })
      })
    })
    return cities
  }
}
