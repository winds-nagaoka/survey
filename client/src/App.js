import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Scroll from './Component/Scroll/Scroll'
import Base from './Base/Base'
import Home from './Guest/Home'
import Input from './Guest/Input'
import Check from './Guest/Check'
import Close from './Guest/Close'
import Login from './Login/Login'
import Survey from './Survey/Survey'

export default class App extends Component {
  render () {
    return (
      <Router>
        <Scroll>
          <Switch>
            <Route exact path='/' component={Base} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/guest' component={Input} />
            <Route exact path='/check' component={Check} />
            <Route exact path='/close' component={Close} />
            <Route exact path='/32ndconcert' component={Login} />
            <Route path='/32ndconcert/survey' component={Survey} />
          </Switch>
        </Scroll>
      </Router>
    )
  }
}