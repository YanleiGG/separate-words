import React from 'react'
import { Layout, Spin  } from "antd";
import { Route, Switch} from "react-router-dom";
import SiderNav from './SiderNav'
import SepWords from './SepWords'
import MarkPro from './MarkPro'
import { connect } from "react-redux";

const { Content } = Layout;

class SepWordsPro extends React.Component {
  render () {
    let { spinning } = this.props

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Spin spinning={spinning} tip='加载数据中...'>
          <Content>
            <Layout style={{ minHeight: '100vh' }}>
              <Layout>
                  <SiderNav/>
                  <Switch>
                    <Route path='/table/sepWordsPro/sepWords' component={ SepWords }></Route>
                    <Route path='/table/sepWordsPro/markPro' component={ MarkPro }></Route>
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
    ...state.sepWordsPro
  }
};

export default connect(mapStateToProps)(SepWordsPro)