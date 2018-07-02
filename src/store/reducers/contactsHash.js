import {GOT_CONTACTS_HASH} from '../actions'

const initialState = {}

const contactsHash = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CONTACTS_HASH:
      return action.contacts
    default:
      return state
  }
}

export default contactsHash
