import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from '../state/store'
import axios from 'axios'
import { path } from '../config'

import Table from './Table'
import Login from './Login'
import Home from './Home'

class App extends React.Component {


  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={ Login }></Route>
          <Route path='/table' render={props => {
            return store.getState().isLogin ? <Table {...props}/> : <Redirect to="/login" />
          }}/>
          <Route path='/' render={props => {
            return store.getState().isLogin ? <Home {...props}/> : <Redirect to="/login" />
          }}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App