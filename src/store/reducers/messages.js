import {GOT_MESSAGES, GOT_NEW_MESSAGE, SAW_MESSAGE} from '../actions'

const initialState = {}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES:
      return {...state, ...action.messages}
    case GOT_NEW_MESSAGE:
      return {
        ...state,
        [action.chatId]: {seen: false, conversation: action.conversation},
      }
    case SAW_MESSAGE: {
      const conversation = state[action.chatId].conversation.slice()
      return {
        ...state,
        [action.chatId]: {
          conversation,
          seen: true,
        },
      }
    }
    default:
      return state
  }
}

export default messagesReducer
