import React from 'react'
import { Layout, Spin } from "antd";
import SiderNav from './SiderNav'
import Main from './Main'
import { connect } from "react-redux";

const { Content } = Layout;

class ContentType extends React.Component {
  render () {
    let {spinning} = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Spin spinning={spinning} tip='加载数据中...' style={{marginTop: '10%'}}>
          <Content>
            <Layout style={{ minHeight: '100vh' }}>
              <SiderNav/>
              <Main/>
            </Layout>
          </Content>
        </Spin>
      </Layout>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.contentType
  }
};

export default connect(mapStateToProps)(ContentType)