console.disableYellowBox = true

import React from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import {store, persistor} from './src/store'
import Main from './src/components/Main'
import {ActivityIndicator} from 'react-native'

const App = () => {
  persistor.purge()
  return (
    <Provider store={store}>
      <PersistGate loading={< ActivityIndicator />} persistor={persistor}>
        <Main/>
      </PersistGate>
    </Provider>
  )
}

export default App
