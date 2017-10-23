import { combineReducers } from 'redux'
import { wrapReducers } from 'redux-reduced'
import contact from './contact'

const reducers = combineReducers(wrapReducers({
    contact
}))

export default reducers
