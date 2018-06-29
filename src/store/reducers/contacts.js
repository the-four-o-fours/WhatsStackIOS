import {GOT_CONTACTS} from '../actions'

const initialState = []

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CONTACTS:
      return action.contacts
    default:
      return state
  }
}

export default contactsReducer
