import { testData } from '../../../../testdata/src/ssr'

export const GET = Run.GET((_context, next) => next({ entries: testData() }))
