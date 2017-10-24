import { middleware, wrapReducers } from '..'

describe('index', () => {
    it('should export middleware', () => expect(middleware).toBeDefined())
    it('should export wrapReducers', () => expect(wrapReducers).toBeDefined())
})
