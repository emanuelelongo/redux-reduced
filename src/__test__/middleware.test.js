import middleware from '../middleware'

describe('middleware', () => {
    it('should skip by calling the "next" callback', () => {
        const store = {}
        const next = jest.fn()
        const action = {}

        middleware(store)(next)(action)
        expect(next).toHaveBeenCalledWith(action)
        expect(next).toHaveBeenCalledTimes(1)
    })

    it('should call the action passing dispatch, getState and setState', () => {
        const store = { dispatch: jest.fn(), getState: jest.fn() }
        const next = jest.fn()
        const action = jest.fn()

        middleware(store)(next)(action)
        expect(action).toHaveBeenCalledTimes(1)
        expect(action.mock.calls[0][0]).toBe(store.dispatch)
        expect(action.mock.calls[0][1]).toBe(store.getState)
        expect(action.mock.calls[0][2]).toBeInstanceOf(Function)
    })

    describe('setState', () => {

        it('should dispatch a REDUX_REDUCED action with changes in payload', () => {
            const getState = jest.fn().mockImplementation(() => ({
                foo: 'bar'
            }))
            const store = { dispatch: jest.fn(), getState }
            const next = jest.fn()
            const action = jest.fn()

            middleware(store)(next)(action)
            const setState = action.mock.calls[0][2]

            const update = {foo: 'baz'}
            setState(update)
            expect(store.dispatch).toHaveBeenCalledWith({
                type: 'REDUX_REDUCED',
                payload: {foo: 'baz'},
                meta: {'REDUX_REDUCED': {unmanaged: []}}
            })
        })

        it('should dispatch a REDUX_REDUCED action with unmanaged property meta', () => {
            const getState = jest.fn().mockImplementation(() => ({
                foo: 'bar'
            }))
            const store = { dispatch: jest.fn(), getState }
            const next = jest.fn()
            const action = jest.fn()

            middleware(store)(next)(action)
            const setState = action.mock.calls[0][2]

            const update = {fuz: 'baz'}
            setState(update)
            expect(store.dispatch).toHaveBeenCalledWith({
                type: 'REDUX_REDUCED',
                payload: {fuz: 'baz'},
                meta: {'REDUX_REDUCED': {unmanaged: ['fuz']}}
            })
        })

        it('should dispatch a custom action type', () => {
            const getState = jest.fn().mockImplementation(() => ({
                foo: 'bar'
            }))
            const store = { dispatch: jest.fn(), getState }
            const next = jest.fn()
            const action = jest.fn()

            middleware(store)(next)(action)
            const setState = action.mock.calls[0][2]

            const update = {foo: 'baz'}
            const actionType = 'CUSTOM_ACTION_TYPE'
            setState(update, actionType)
            expect(store.dispatch).toHaveBeenCalledWith({
                type: 'CUSTOM_ACTION_TYPE',
                payload: {foo: 'baz'},
                meta: {'REDUX_REDUCED': {unmanaged: []}}
            })
        })

        it('should compute state changes by an "update" function', () => {
            const getState = jest.fn().mockImplementation(() => ({
                foo: 'bar'
            }))
            const store = { dispatch: jest.fn(), getState }
            const next = jest.fn()
            const action = jest.fn()

            middleware(store)(next)(action)
            const setState = action.mock.calls[0][2]

            const update = jest.fn().mockImplementation(() =>({foo: 'baz'}))
            setState(update)
            expect(update).toHaveBeenCalledWith({foo: 'bar'})
            expect(store.dispatch).toHaveBeenCalledWith({
                type: 'REDUX_REDUCED',
                payload: {foo: 'baz'},
                meta: {'REDUX_REDUCED': {unmanaged: []}}
            })
        })
    })
})