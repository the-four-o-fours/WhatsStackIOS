export const GOT_MESSAGES = 'GOT_CONTACTS'
export const GOT_NEW_MESSAGE = 'GOT_NEW_MESSAGE'

export const getMessages = messages => ({
  type: GOT_MESSAGES,
  messages,
})

export const getNewMessage = (chatId, message) => ({
  type: GOT_NEW_MESSAGE,
  chatId,
  message,
})
