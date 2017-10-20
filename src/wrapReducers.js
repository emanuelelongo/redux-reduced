function wrap(reducer, key) {
    return (state, action) => {
        if(!action.meta || !action.meta.REDUX_DIRECT || !action.payload.hasOwnProperty(key)) {
            return reducer(state, action)
        }
        
        if(typeof state != 'object') {
            return action.payload[key]
        }

        return {
            ...state,
            ...action.payload[key]
        }
    }
}

export default function wrapReducer(reducers) {
    const wrappedReducers = {}
    const reducerKeys = Object.keys(reducers);
    for (let i = 0; i < reducerKeys.length; i++) {
        wrappedReducers[reducerKeys[i]] = wrap(reducers[reducerKeys[i]], reducerKeys[i])
    }
    return wrappedReducers
}
