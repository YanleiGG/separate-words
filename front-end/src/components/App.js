import React from 'react'
import WorkTable from './WorkTable'
import Login from './Login'
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/WorkTable' component={ WorkTable }></Route>
          <Route path='/login' component={ Login }></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App