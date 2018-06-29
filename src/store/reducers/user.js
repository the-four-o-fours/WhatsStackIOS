import {GOT_USER, GOT_NEW_MESSAGE} from '../actions'

const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user
    case GOT_NEW_MESSAGE: {
      const chat = [...state[action.chatId]]
      chat.push(action.message)
      const copy = {...state}
      copy[action.chatId] = chat
      return copy
      //fix it later
    }
    default:
      return state
  }
}

export default userReducer
