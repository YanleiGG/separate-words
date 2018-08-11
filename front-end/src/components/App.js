import React from 'react'
import WorkTable from './WorkTable'
import Login from './Login'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from '../state/store'
import axios from 'axios'

class App extends React.Component {
  componentWillMount () {
    
  }
  render () {
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={ Login }></Route>
            <Route path='/WorkTable' render={() => {
              return store.getState().isLogin ? <WorkTable/> : <Redirect to="/login" />
            }} />
          </Switch>
        </BrowserRouter>
      )
  }
}

export default App