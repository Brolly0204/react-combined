import { combineReducers } from 'redux'
import user from './redux/user'
import chatuser from './redux/chatuser'
import chat from './redux/chat'

export default combineReducers({
  user,
  chatuser,
  chat
})
