import React from 'react'
import { Layout, Spin } from "antd";
import { Switch, Route } from "react-router-dom";
import Mark from './Mark'
import SiderNav from './SiderNav'
import { connect } from "react-redux";

const { Content } = Layout;

class Emotion extends React.Component {
  render () {
    let {spinning} = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Spin spinning={spinning} tip='加载数据中...' style={{marginTop: '10%'}}>
          <Content>
            <Layout style={{ minHeight: '100vh' }}>
              <Layout>
                <SiderNav/>
                <Switch>
                  <Route path='/table/markEntity' component={ Mark }></Route>
                </Switch>
              </Layout>
            </Layout>
          </Content>
        </Spin>
      </Layout>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.markEntity
  }
};

export default connect(mapStateToProps)(Emotion)