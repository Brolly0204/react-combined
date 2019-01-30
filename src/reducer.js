import { combineReducers } from 'redux'
import { counter } from './redux.js'
import { auth } from './Auth.redux.js'

export default combineReducers({
  counter,
  auth
})
