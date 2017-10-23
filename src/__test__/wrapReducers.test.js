import wrapReducers from '../wrapReducers'

describe('wrapReducers', () => {
    it('should wrap all the reducers', () => {
        const reducers = {
            foo: jest.fn(),
            bar: jest.fn()
        }

        const wrappedReducers = wrapReducers(reducers)
        expect(wrappedReducers).toHaveProperty('foo')
        expect(wrappedReducers).toHaveProperty('bar')
    })

    describe('wrapped reducer', () => {

        it('should call original reducer if is not a REDUX_REDUCED actions', () => {
            const reducers = {
                foo: jest.fn(),
                bar: jest.fn()
            }
    
            const wrappedReducers = wrapReducers(reducers)
            const state = {}
            const action = {}
            wrappedReducers.foo(state, action)
            expect(reducers.foo).toHaveBeenCalledWith(state, action)
        })

        it('should call original reducer if changes do not match the state portion', () => {
            const reducers = {
                foo: jest.fn(),
                bar: jest.fn()
            }
    
            const wrappedReducers = wrapReducers(reducers)
            const state = {}
            const action = { meta: { REDUX_REDUCED: true }, payload: {bar: 'bar'} }
            wrappedReducers.foo(state, action)
            expect(reducers.foo).toHaveBeenCalledWith(state, action)
        })

        it('should not call original reducer for REDUX_REDUCED actions', () => {
            const reducers = {
                foo: jest.fn(),
                bar: jest.fn()
            }
    
            const wrappedReducers = wrapReducers(reducers)
            const state = {}
            const action = { meta: { REDUX_REDUCED: true }, payload: {foo: 'foo'} }
            wrappedReducers.foo(state, action)
            expect(reducers.foo).not.toHaveBeenCalled()
        })

        it('should replace state property of a "non object" type', () => {
            const reducers = {
                foo: jest.fn(),
                bar: jest.fn()
            }
    
            const wrappedReducers = wrapReducers(reducers)
            const state = "STATE"
            const action = { meta: { REDUX_REDUCED: true }, payload: {foo: 'foo'} }
            const newState = wrappedReducers.foo(state, action)
            expect(newState).toBe('foo')
        })

        it('should update state', () => {
            const reducers = {
                foo: jest.fn(),
                bar: jest.fn()
            }
    
            const wrappedReducers = wrapReducers(reducers)
            const state = {
                 value: 'old',
                 other: 'unchanged'
            }
            const action = { meta: { REDUX_REDUCED: true }, payload: {foo: {value: 'new'}} }
            const newState = wrappedReducers.foo(state, action)
            expect(newState).toMatchObject({value: 'new', other: 'unchanged'})
        })
    })
})
