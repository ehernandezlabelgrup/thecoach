import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    // build: {
    //   lib: {
    //     entry: './src/AppWebComponent.ts', // Cambia esto por la ruta de tu archivo principal
    //     name: 'MyComponent',
    //     formats: ['es'], // Para ESM
    //   }
    // }
})
