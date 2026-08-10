import { testData } from '../../../../testdata/src/ssr'

export const GET = Run.GET((_ctx, next) => next({ entries: testData() }))
