import * as React from "react";
import { Modal, Radio, Pagination } from "antd";
import { Layout, Popover } from "antd";
import { connect } from "react-redux";
import store from '../../../../state/store'
import axios from 'axios'
import { unformatWithoutProperty } from '../../../../util'

import FooterBtn from './FooterBtn'
import PopoverContent from './PopoverContent'

const { Content, Footer, Sider } = Layout;

class MarkPro extends React.Component {
  render() {
    let { articles, showIndex } = this.props
    let showPro = articles.length > 0 ? articles[showIndex].showPro : []
    return (
      <Layout>
        <Layout>
          <Content style={{ padding: '15px', fontSize: '20px' }}>
            {showPro.map((item, index) => {
              return  <Popover placement='bottom' content={<PopoverContent index={index}/>} key={item.id} title={item.content}>
                        <span key={item.id} style={{cursor:'pointer'}}>{ item.content + '|' }</span>
                      </Popover>
            })}
          </Content>
          <Footer>
            <FooterBtn/>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.sepWordsPro
  }
}

let mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkPro)