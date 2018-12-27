import React from 'react'
import { Layout, Spin  } from "antd";
import { Route, Switch} from "react-router-dom";
import SiderNav from './SiderNav'
import SepWords from './SepWords'
import MarkPro from './MarkPro'
import { connect } from "react-redux";
import store from '../../../state/store'

const { Content } = Layout;

class SepWordsPro extends React.Component {
  componentWillMount() {
    // 刷新时根据url修改taskId和headerNavData
    let urlTaskId = window.location.pathname.split('/').pop()
    let {headerNavData} = store.getState().sepWordsPro
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
      type: 'SET_SEP_HEADER_NAV',
      headerNavData
    })
  }

  render () {
    let { spinning, user } = this.props
    if (!user.name) return null
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Spin spinning={spinning} tip='加载数据中...' style={{marginTop: '10%'}}>
          <Content>
            <Layout style={{ minHeight: '100vh' }}>
              <SiderNav/>
              <Switch>
                <Route path='/table/sepWordsPro/sepWords' component={ SepWords }></Route>
                <Route path='/table/sepWordsPro/markPro' component={ MarkPro }></Route>
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
    ...state.sepWordsPro,
    user: state.user
  }
};

export default connect(mapStateToProps)(SepWordsPro)