import React from 'react'
import WorkTable from './WorkTable'
import Login from './Login'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from '../state/store'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={ Login }></Route>
          <Route path='/' render={props => {
            return store.getState().isLogin ? <WorkTable {...props}/> : <Redirect to="/login" />
          }}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App