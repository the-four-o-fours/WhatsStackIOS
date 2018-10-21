export const GOT_MESSAGES = 'GOT_MESSAGES'
export const GOT_NEW_MESSAGE = 'GOT_NEW_MESSAGE'
export const SAW_MESSAGE = 'SAW_MESSAGE'

export const getMessages = (chatId, members, conversation) => ({
  type: GOT_MESSAGES,
  chatId,
  members,
  conversation,
})

export const getNewMessage = (chatId, members, conversation) => ({
  type: GOT_NEW_MESSAGE,
  chatId,
  members,
  conversation,
})

export const seenMessages = chatId => ({
  type: SAW_MESSAGE,
  chatId,
})
