import React from 'react'
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import Classify from './Classify'
import SiderNav from './SiderNav'

const { Header, Content } = Layout;

class Emotion extends React.Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Layout style={{ minHeight: '100vh' }}>
            <SiderNav/>
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