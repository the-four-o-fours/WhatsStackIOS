import RNFetchBlob from 'rn-fetch-blob'

export default (url, type = 'jpg') =>
  new Promise((resolve, reject) => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: type,
    })
      .fetch('GET', url)
      .then(res => resolve(res.path()))
      .catch(err => reject(err))
  })
