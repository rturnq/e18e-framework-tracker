import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { packagesDir } from '../../constants.ts'
import { importWithoutListening } from './nitro.ts'
import type { ServerRenderHandler } from '../types.ts'

interface MarkoRunGlobal {
  fetch: (
    request: Request,
    platform: unknown,
  ) => Promise<Response | undefined> | Response | undefined
}

export async function buildMarkoRunHandler(): Promise<ServerRenderHandler> {
  const entryPath = join(packagesDir, 'app-marko-run', 'dist', 'index.mjs')
  const entryUrl = pathToFileURL(entryPath).href

  await importWithoutListening(entryUrl)
  const { __marko_run__: markoRun } = globalThis as typeof globalThis & {
    __marko_run__?: MarkoRunGlobal
  }

  if (!markoRun) {
    throw new Error(
      `Importing ${entryPath} did not register the Marko Run fetch handler`,
    )
  }

  return {
    type: 'web',
    handler: async (request) =>
      (await markoRun.fetch(request, {})) ??
      new Response(null, { status: 404 }),
  }
}
