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
            const action = { meta: { REDUX_REDUCED: {} }, payload: {bar: 'bar'} }
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
            const action = { meta: { REDUX_REDUCED: {} }, payload: {foo: 'foo'} }
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
            const action = { meta: { REDUX_REDUCED: {} }, payload: {foo: 'foo'} }
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
            const action = { meta: { REDUX_REDUCED: {} }, payload: {foo: {value: 'new'}} }
            const newState = wrappedReducers.foo(state, action)
            expect(newState).toMatchObject({value: 'new', other: 'unchanged'})
        })

        it('should set a property not initialized by a reducer', () => {
            const reducers = {}
            const wrappedReducers = wrapReducers(reducers)
            const state = {}
            const action = { meta: { REDUX_REDUCED: { unmanaged: ['foo']} }, payload: {foo: {value: 'fuz'}} }
            const newState = wrappedReducers.global(state, action)
            expect(newState).toMatchObject({foo: {value: 'fuz'}})
        })

        it('should generate a reducer based on configuration', () => {
            const reducers = {
                foo: { bar: "baz", other: 'unchanged'}
            }
            const wrappedReducers = wrapReducers(reducers)
            expect(wrappedReducers.foo).toBeInstanceOf(Function)
            
            const state = wrappedReducers.foo(null, {})
            expect(state).toBe(reducers.foo)
        })
    })

    describe('unmanagedChangesReducer', () => {
        it('should return untouched state', () => {
            const reducers = {}
            const wrappedReducers = wrapReducers(reducers)
            const state = {}
            const action = {}
            const newState = wrappedReducers.global(state, action)
            expect(newState).toMatchObject(state)
        })

        it('should return default initial state', () => {
            const reducers = {}
            const wrappedReducers = wrapReducers(reducers)
            const newState = wrappedReducers.global()
            expect(newState).toMatchObject({})
        })
    })
})
