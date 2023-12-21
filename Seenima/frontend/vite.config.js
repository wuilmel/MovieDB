// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 4000,
//     proxy: {
//       '/api': {
//         target: 'https://seenima-n3v1.onrender.com',
//         changeOrigin: true,
//         secure: false
//       }
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://seenima-n3v1.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})

