export const GOT_USER = 'GOT_USER'
export const GOT_NEW_MESSAGE = 'GOT_NEW_MESSAGE'

export const getUser = user => ({
  type: GOT_USER,
  user,
})

export const getNewMessage = (conversation, chatId) => ({
  type: GOT_NEW_MESSAGE,
  chatId,
  conversation,
})
