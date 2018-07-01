import {combineReducers} from 'redux'
import user from './user'
import contactsArr from './contactsArr'
import contactsHash from './contactsHash'

export default combineReducers({user, contactsArr, contactsHash})
