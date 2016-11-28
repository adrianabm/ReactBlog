import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import routes from './routes'
// Middleware
import promise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>
  , document.querySelector('.container'))
