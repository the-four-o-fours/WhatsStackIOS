import {combineReducers} from 'redux'
import user from './user'
import contactsArr from './contactsArr'
import contactsHash from './contactsHash'
import messages from './messages'

export default combineReducers({user, contactsArr, contactsHash, messages})
