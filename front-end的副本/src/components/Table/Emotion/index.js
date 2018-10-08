import React from 'react'
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import HeaderNav from './HeaderNav'
import Classify from './Classify'

const { Header, Content } = Layout;

class Emotion extends React.Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <HeaderNav/>
        </Header>
        <Content>
          <Layout style={{ minHeight: '90vh' }}>
            <Switch>
              <Route path='/table/emotion/classify' component={ Classify }></Route>
            </Switch>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default Emotion