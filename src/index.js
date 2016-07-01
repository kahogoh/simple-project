import React from 'react'
import {
  Provider,
} from 'react-redux'
import createStore from './createStore'
import { app } from './modules'

const store = createStore()

const Main = () => (
  <Provider store={store}>
    <app.App />
  </Provider>
)

export default Main
