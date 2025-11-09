import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  base: '/bbnme/',
  plugins: [svelte()],
  server: {
    port: 2025,
    open: true
  },
})
