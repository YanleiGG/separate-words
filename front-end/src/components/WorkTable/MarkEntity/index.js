import React from 'react'
import { connect } from "react-redux";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import HeaderNav from './HeaderNav'

const { Header, Content } = Layout;

class Emotion extends React.Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <HeaderNav></HeaderNav>
        </Header>
        <Content>
          <Layout style={{ minHeight: '90vh' }}>
            <Layout>
              <Switch>
                {/* <Route path='/table/emotion/classify' component={ Classify }></Route> */}
              </Switch>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default Emotion