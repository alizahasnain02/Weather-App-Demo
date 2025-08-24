
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      'localhost',
      '.replit.dev',
      '988b0c33-07d4-47ef-b690-1dd12e016f86-00-1c7qm5cyiwu2.sisko.replit.dev'
    ]
  }
})
