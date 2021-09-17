import { Plugin } from 'vite'

export { dev }

function dev(): Plugin {
  return {
    name: 'vite-plugin-ssr:dev',
    apply: 'serve',
    config: () => ({
      ssr: { external: ['vite-plugin-ssr'] },
      optimizeDeps: {
        entries: ['pages/**/*.page.*([a-zA-Z0-9])', 'pages/**/*.page.client.*([a-zA-Z0-9])']
      }
    })
  }
}
