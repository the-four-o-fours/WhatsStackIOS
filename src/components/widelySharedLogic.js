import RSAKey from 'react-native-rsa'

const rsa = new RSAKey()

import RNFetchBlob from 'rn-fetch-blob'

const downloadBlob = (url, type = 'jpg') =>
  new Promise((resolve, reject) => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: type,
    })
      .fetch('GET', url)
      .then(res => resolve(res.path()))
      .catch(err => {
        resolve('bandwidth')
        reject(err)
      })
  })

export {rsa, downloadBlob}
