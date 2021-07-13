import fs from 'fs'
import { getSsrEnv } from './ssrEnv.node'
import { assert } from './utils'

export { unsetViteManifest }
export { setViteManifest }
export { getViteManifest }
export { ViteManifest }

type ViteManifest = Record<
  string,
  {
    src?: string
    file: string
    css?: string[]
    assets?: string[]
    isEntry?: boolean
    isDynamicEntry?: boolean
    imports?: string[]
    dynamicImports?: string[]
  }
>

var clientManifest: null | ViteManifest = null
var serverManifest: null | ViteManifest = null
function getViteManifest(): {
  clientManifest: null | ViteManifest
  serverManifest: null | ViteManifest
  clientManifestPath: string
  serverManifestPath: string
} {
  const { root } = getSsrEnv()
  const clientManifestPath = `${root}/dist/client/manifest.json`
  const serverManifestPath = `${root}/dist/server/manifest.json`

  clientManifest ??= readJson(clientManifestPath)
  serverManifest ??= readJson(serverManifestPath)

  return {
    clientManifest,
    serverManifest,
    clientManifestPath,
    serverManifestPath
  }
}

function readJson(filePath: string) {
  try {
    const text = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(text)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }
}

function setViteManifest(manifests: { clientManifest: ViteManifest; serverManifest: ViteManifest }) {
  clientManifest = manifests.clientManifest
  serverManifest = manifests.serverManifest
  assert(clientManifest && serverManifest)
}

function unsetViteManifest() {
  clientManifest = null
  serverManifest = null
}
