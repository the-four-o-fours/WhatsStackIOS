import {GOT_MESSAGES, GOT_NEW_MESSAGE} from '../actions'

const initialState = {}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES:
      return action.messages
    case GOT_NEW_MESSAGE: {
      const chat = state[action.chatId]
    }
    default:
      return state
  }
}

export default messagesReducer
