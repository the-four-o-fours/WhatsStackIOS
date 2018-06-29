import {GOT_USER, GOT_NEW_MESSAGE} from '../actions'

const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return {...state, ...action.user}
    case GOT_NEW_MESSAGE:
      return {...state, [action.chatId]: action.conversation}
    default:
      return state
  }
}

export default userReducer
