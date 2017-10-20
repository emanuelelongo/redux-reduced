import { combineReducers } from 'redux'
import { wrapReducers } from 'redux-direct'
import counter from './counter'
import contact from './contact'

const reducers = combineReducers(wrapReducers({
    counter,
    contact
}))

export default reducers
