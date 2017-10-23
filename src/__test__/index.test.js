import { reduxDirectMiddleware, wrapReducers } from '..'

describe('index', () => {
    it('should export middleware', () => {
        expect(reduxDirectMiddleware).toBeDefined()
    })

    it('should export wrapReducers', () => {
        expect(wrapReducers).toBeDefined()
    })
})
