import {combineReducers} from 'redux'
import user from './user'
import contactsArr from './contacts'
import contactsHash from './contactsHash'

export default combineReducers({user, contactsArr, contactsHash})
