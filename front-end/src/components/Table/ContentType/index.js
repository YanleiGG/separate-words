import React from 'react'
import { Layout, Spin } from "antd";
import SiderNav from './SiderNav'
import Main from './Main'
import { connect } from "react-redux";
import store from '../../../state/store'

const { Content } = Layout;

class ContentType extends React.Component {

  componentWillMount() {
    // 刷新时根据url修改taskId和headerNavData
    let urlTaskId = window.location.pathname.split('/').pop()
    let {headerNavData} = store.getState().contentType
    headerNavData.data.forEach(item => {
      let itemTaskId = item.path.split('/').pop()
      if(!isNaN(urlTaskId) && isNaN(itemTaskId)) item.path += `/${urlTaskId}`
      if (!isNaN(urlTaskId) && !isNaN(itemTaskId) && urlTaskId != itemTaskId) {
        let pathArr = item.path.split('/')
        pathArr[pathArr.length-1] = urlTaskId
        item.path = pathArr.join('/')
      }
    })
    store.dispatch({
      type: 'SET_CONTENT_TYPE_HEADER_NAV',
      headerNavData
    })
  }

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