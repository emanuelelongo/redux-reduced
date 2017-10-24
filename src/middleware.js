import omit from 'lodash.omit'

export default store => next => action => {
    if (typeof action !== 'function') {
        return next(action);
    }
    const state = store.getState()

    const setState = (update, actionType) => {
        const changes =
            typeof update === "function"
                ? { ...update(state) }
                : { ...update }
        
        const unmanageChanges = omit(changes, Object.keys(state))
        store.dispatch({
            type: actionType || 'REDUX_REDUCED',
            payload: changes,
            meta: { 
                "REDUX_REDUCED": {
                    unmanaged: Object.keys(unmanageChanges) 
                }
            }
        })
    }
    return action(store.dispatch, store.getState, setState)
}