import {GOT_CONTACTS} from '../actions'

const initialState = {}

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CONTACTS:
      return action.contacts
    default:
      return state
  }
}

export default contacts
