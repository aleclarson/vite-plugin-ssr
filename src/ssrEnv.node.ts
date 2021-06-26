import { ViteDevServer, ResolvedConfig as ViteConfig } from 'vite'

export { setSsrEnv }
export { getSsrEnv }
export type { SsrEnv }

type SsrEnv =
  | {
      isProduction: false
      viteDevServer: ViteDevServer
      viteConfig?: undefined
      root: string
      baseUrl: string
    }
  | {
      isProduction: true
      viteDevServer?: undefined
      viteConfig?: ViteConfig
      root?: string
      baseUrl: string
    }

function getSsrEnv(): SsrEnv {
  return global.__vite_ssr_plugin
}

function setSsrEnv(ssrEnv: SsrEnv) {
  global.__vite_ssr_plugin = ssrEnv
}

declare global {
  namespace NodeJS {
    interface Global {
      __vite_ssr_plugin: SsrEnv
    }
  }
}
