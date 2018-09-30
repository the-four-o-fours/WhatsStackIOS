import {combineReducers} from 'redux'
import user from './user'
import contacts from './contacts'
import messages from './messages'

export default combineReducers({user, contacts, messages})
