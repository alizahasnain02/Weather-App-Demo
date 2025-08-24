
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const WeatherChart = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return <div>No forecast data available</div>
  }

  // Take every 8th item to get daily data (assuming 3-hour intervals)
  const dailyData = forecast.filter((_, index) => index % 8 === 0).slice(0, 7)

  const labels = dailyData.map(item => {
    const date = new Date(item.dt * 1000)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  })

  const temperatureData = dailyData.map(item => Math.round(item.main.temp))
  const humidityData = dailyData.map(item => item.main.humidity)

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData,
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Humidity (%)',
        data: humidityData,
        borderColor: '#f093fb',
        backgroundColor: 'rgba(240, 147, 251, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#667eea',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#666'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: '#667eea'
        },
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: '#667eea'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          color: '#f093fb'
        },
        title: {
          display: true,
          text: 'Humidity (%)',
          color: '#f093fb'
        }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8
      }
    }
  }

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  )
}

export default WeatherChart
