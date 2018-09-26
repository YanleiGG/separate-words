import React from 'react'
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import HeaderNav from './HeaderNav'
import SiderNav from './SiderNav'
import SepWords from './SepWords'
import MarkPro from './MarkPro'

const { Content } = Layout;

class SepWordsPro extends React.Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <HeaderNav/>
        <Content>
          <Layout style={{ minHeight: '90vh', marginTop: '-50px' }}>
            <Layout>
              <SiderNav/>
              <Switch>
                <Route path='/table/sepWordsPro/sepWords' component={ SepWords }></Route>
                <Route path='/table/sepWordsPro/markPro' component={ MarkPro }></Route>
              </Switch>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default SepWordsPro