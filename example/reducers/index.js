import { combineReducers } from 'redux'
import { wrapReducers } from 'redux-reduced'
import oldStandardReducer from './oldStandardReducer'

const reducers = combineReducers(wrapReducers({
    oldStandardReducer,
    simpleProperty: ""
}))

export default reducers
