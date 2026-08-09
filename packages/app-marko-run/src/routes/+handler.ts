import { testData } from '../../../testdata/src/ssr'

export const GET = Run.GET(async (_context, next) =>
  next({ entries: await testData() }),
)
