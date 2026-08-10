import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { RuntimeModule } from '@marko/run'
import { packagesDir } from '../../constants.ts'
import { importWithoutListening } from './nitro.ts'
import type { ServerRenderHandler } from '../types.ts'

export async function buildMarkoRunHandler(): Promise<ServerRenderHandler> {
  const entryPath = join(packagesDir, 'app-marko-run', 'dist', 'index.mjs')

  // Importing the built entry registers the router on globalThis.
  await importWithoutListening(pathToFileURL(entryPath).href)
  const markoRun: RuntimeModule = globalThis.__marko_run__

  return { type: 'web', handler: markoRun.fetch }
}
