import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from '../state/store'

import WorkTable from './WorkTable'
import Login from './Login'
import Entry from './Entry'
import Home from './Home'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={ Login }></Route>
          <Route path='/table' render={props => {
            return store.getState().isLogin ? <WorkTable {...props}/> : <Redirect to="/login" />
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