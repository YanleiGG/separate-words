import * as React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import Emotion from './Emotion'
import SepWordsPro from './SepWordsPro'
import MarkEntity from './MarkEntity'
import ContentType from './ContentType'

const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Layout style={{ minHeight: '90vh' }}>
            <Layout>
              <Switch>
                <Route path='/table/emotion' component={ Emotion }></Route>
                <Route path='/table/sepWordsPro' component={ SepWordsPro }></Route>
                <Route path='/table/markEntity' component={ MarkEntity }></Route>
                <Route path='/table/ContentType' component={ ContentType }></Route>
              </Switch>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

let mapAllStateToProps = state => {
  return state
}
let mapDispatchToApp = dispatch => {
  return {}
}

export default connect(mapAllStateToProps, mapDispatchToApp)(App)