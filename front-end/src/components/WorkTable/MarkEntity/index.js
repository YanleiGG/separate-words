import React from 'react'
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import HeaderNav from './HeaderNav'
import Mark from './Mark'
import SiderNav from './SiderNav'

const { Content } = Layout;

class Emotion extends React.Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <HeaderNav/>
        <Content>
          <Layout style={{ minHeight: '90vh' }}>
            <Layout>
              <SiderNav/>
              <Switch>
                <Route path='/table/markEntity' component={ Mark }></Route>
              </Switch>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default Emotion