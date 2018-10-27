export const formatDate = timeStamp => {
  const now = new Date(Date.now()).toString()
  const messageDate = new Date(Number(timeStamp)).toString()
  if (now.slice(0, 15) === messageDate.slice(0, 15)) {
    return `Today ${messageDate.slice(16, 24)}`
  } else {
    return messageDate.slice(0, 24)
  }
}
