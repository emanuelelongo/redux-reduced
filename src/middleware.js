export default store => next => action => {
    if (typeof action !== 'function') {
        return next(action);
    }
    
    const setState = (update, actionType) => {
        const changes =
            typeof update === "function"
                ? { ...update(store.getState()) }
                : { ...update }
    
        store.dispatch({
            type: actionType || 'REDUX_REDUCED',
            payload: changes,
            meta: { REDUX_REDUCED: true }
        })
    }
    return action(store.dispatch, store.getState, setState)
}