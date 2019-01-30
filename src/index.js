import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import reducers from './reducer.js'
import Auth from './Auth.js'
import DashBoard from './DashBoard.js'

/* eslint-disable no-undef */
window.composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/dashboard" component={DashBoard} />
        <Redirect to="/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

//
// function Test(props) {
//   console.log(props)
//   const { location } = props.match.params
//   return <h2>test {location}</h2>
// }
