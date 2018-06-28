export const GOT_CONTACTS = 'GOT_CONTACTS'

export const getContacts = contacts => ({
  type: GOT_CONTACTS,
  contacts,
})
