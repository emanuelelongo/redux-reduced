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
            type: actionType || 'REDUX_DIRECT',
            payload: changes,
            meta: { REDUX_DIRECT: true }
        })
    }
    return action(store.dispatch, store.getState, setState)
}