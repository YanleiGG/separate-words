import React from 'react'
import { Layout, Spin } from "antd";
import { Switch, Route } from "react-router-dom";
import Mark from './Mark'
import SiderNav from './SiderNav'
import { connect } from "react-redux";
import store from '../../../state/store'

const { Content } = Layout;

class Emotion extends React.Component {
  componentWillMount() {
    // 刷新时根据url修改taskId和headerNavData
    let urlTaskId = window.location.pathname.split('/').pop()
    let {headerNavData} = store.getState().markEntity
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
      type: 'SET_MARK_ENTITY_HEADER_NAV',
      headerNavData
    })
  }

  render () {
    let {spinning, user} = this.props
    if (!user.name) return null
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
    ...state.markEntity,
    user: state.user
  }
};

export default connect(mapStateToProps)(Emotion)