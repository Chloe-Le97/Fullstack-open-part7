import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ConnectApp from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <ConnectApp />
  </Provider>,
  document.getElementById('root')
)