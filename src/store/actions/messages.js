export const GOT_MESSAGES = 'GOT_MESSAGES'
export const GOT_GROUP_MESSAGES = 'GOT_GROUP_MESSAGES'
export const GOT_NEW_MESSAGE = 'GOT_NEW_MESSAGE'
export const SAW_MESSAGE = 'SAW_MESSAGE'

export const getMessages = messages => ({
  type: GOT_MESSAGES,
  messages,
})

export const getGroupMessages = groupMessages => ({
  type: GOT_GROUP_MESSAGES,
  groupMessages,
})

export const getNewMessage = (conversation, chatId) => ({
  type: GOT_NEW_MESSAGE,
  conversation,
  chatId,
})

export const seenMessages = chatId => ({
  type: SAW_MESSAGE,
  chatId,
})
