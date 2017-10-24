import pick from 'lodash.pick'

function wrap(reducer, key) {
    return (state, action) => {
        if(!action.meta || !action.meta['REDUX_REDUCED'] || !action.payload.hasOwnProperty(key)) {
            return reducer(state, action)
        }
        
        if(typeof action.payload[key] != 'object') {
            return action.payload[key]
        }

        return {
            ...state,
            ...action.payload[key]
        }
    }
}

function unmanagedChangesReducer(state = {}, action) {
    if(action.meta && action.meta['REDUX_REDUCED']) {
        return {
            ...state,
            ...pick(action.payload, action.meta['REDUX_REDUCED'].unmanaged)
        }
    }
    return state
}

const fakeReducer = initial_state => (state, action) => state || initial_state

export default function wrapReducer(reducers) {
    const wrappedReducers = {}  
    const reducerKeys = Object.keys(reducers);
    for (let i = 0; i < reducerKeys.length; i++) {
        if(typeof reducers[reducerKeys[i]] === "function") {
            wrappedReducers[reducerKeys[i]] = wrap(reducers[reducerKeys[i]], reducerKeys[i])
        }
        else {
            wrappedReducers[reducerKeys[i]] = wrap(fakeReducer(reducers[reducerKeys[i]]), reducerKeys[i])
        }
    }
    wrappedReducers['global'] = unmanagedChangesReducer
    return wrappedReducers
}
