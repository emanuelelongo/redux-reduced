import { createStore, applyMiddleware } from 'redux'
import nextConnectRedux from 'next-connect-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from './reducers'
import { middleware as reduxReducedMiddleware } from 'redux-reduced'

export function initStore(initialState) {
    return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(reduxReducedMiddleware)));
}

export const connect = nextConnectRedux(initStore)
