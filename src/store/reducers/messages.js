import {GOT_MESSAGES, GOT_NEW_MESSAGE, SAW_MESSAGE} from '../actions'

const initialState = {}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES:
      return {
        ...state,
        [action.chatId]: {
          ...state[action.chatId],
          members: action.members,
          conversation: action.conversation,
          seen: Boolean(state[action.chatId] && state[action.chatId].seen),
        },
      }
    case GOT_NEW_MESSAGE: {
      return {
        ...state,
        [action.chatId]: {
          ...state[action.chatId],
          members: action.members,
          conversation: action.conversation,
          seen: false,
        },
      }
    }
    case SAW_MESSAGE: {
      return {
        ...state,
        [action.chatId]: {...state[action.chatId], seen: true},
      }
    }
    default:
      return state
  }
}

export default messagesReducer
