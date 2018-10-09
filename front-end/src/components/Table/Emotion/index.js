import React from 'react'
import { Layout, Spin } from "antd";
import { Route, Switch } from "react-router-dom";
import Classify from './Classify'
import SiderNav from './SiderNav'
import { connect } from "react-redux";
import MarkEntity from './MarkEntity'

const { Content } = Layout;

class Emotion extends React.Component {
  render () {
    let {spinning} = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Spin spinning={spinning} tip='加载数据中...' style={{marginTop: '10%'}}>
          <Content>
            <Layout style={{ minHeight: '100vh' }}>
              <SiderNav/>
              <Switch>
                <Route path='/table/emotion/classify' component={ Classify }></Route>
                <Route path='/table/emotion/markEntity' component={ MarkEntity }></Route>
              </Switch>
            </Layout>
          </Content>
        </Spin>
      </Layout>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.emotion
  }
};

export default connect(mapStateToProps)(Emotion)