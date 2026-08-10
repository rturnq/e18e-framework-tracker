import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { RuntimeModule } from '@marko/run'
import { packagesDir } from '../../constants.ts'
import { importWithoutListening } from './nitro.ts'
import type { ServerRenderHandler } from '../types.ts'

export async function buildMarkoRunHandler(): Promise<ServerRenderHandler> {
  const entryPath = join(packagesDir, 'app-marko-run', 'dist', 'index.mjs')

  await importWithoutListening(pathToFileURL(entryPath).href)
  const { fetch } = globalThis.__marko_run__ as RuntimeModule

  return {
    type: 'web',
    handler: (request) => fetch(request, {}) as Promise<Response>,
  }
}
