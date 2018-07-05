import {
  GOT_MESSAGES,
  GOT_GROUP_MESSAGES,
  GOT_NEW_MESSAGE,
  SAW_MESSAGE,
} from '../actions'

const initialState = {}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES: {
      const chatId = Object.keys(action.messages)[0]
      if (!state[chatId]) action.messages[chatId].seen = false
      return {...state, ...action.messages}
    }
    case GOT_GROUP_MESSAGES: {
      const chatId = Object.keys(action.groupMessages)[0]
      if (!state[chatId]) action.groupMessages[chatId].seen = false
      return {...state, ...action.groupMessages}
    }
    case GOT_NEW_MESSAGE:
      return {
        ...state,
        [action.chatId]: {seen: false, conversation: action.conversation},
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
