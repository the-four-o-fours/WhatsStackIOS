import {combineReducers} from 'redux'
import user from './user'
import contactsHash from './contactsHash'
import messages from './messages'

export default combineReducers({user, contactsHash, messages})
