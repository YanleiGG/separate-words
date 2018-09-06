import * as React from "react";
import { Modal, Radio, Pagination } from "antd";
import { Layout } from "antd";
import { connect } from "react-redux";
import store from '../../../../state/store'
import axios from 'axios'
import { unformatWithoutProperty } from '../../../../util'

import FooterBtn from './FooterBtn'

const { Content, Footer, Sider } = Layout;

class MarkPro extends React.Component {
  render() {
    let { pickWords, sep_words_propertys, showIndex } = this.props
    let showPro = sep_words_propertys.length > 0 ? sep_words_propertys[showIndex].showPro : []

    return (
      <Layout>
        <Layout>
          <Content onMouseUp={pickWords} style={{ padding: '15px', fontSize: '20px' }}>
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
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkPro)