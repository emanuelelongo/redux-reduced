import { createStore, applyMiddleware } from 'redux'
import nextConnectRedux from 'next-connect-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from './reducers'
import { reduxDirectMiddleware } from 'redux-direct'

export function initStore(initialState) {
    return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(reduxDirectMiddleware)));
}

export const connect = nextConnectRedux(initStore)
