import React from 'react'
import FooterTable from './FooterTable'
import { connect } from "react-redux";
import { Layout } from "antd";
import HeaderNav from '../HeaderNav'

const { Content, Footer, Sider } = Layout;

class Emotion_UI extends React.Component {
  render () {
    const { showIndex, articles } = this.props
    return (
      <Layout style={{marginLeft: '200px'}}>
        <HeaderNav/>
        <Content style={{ padding: '15px', fontSize: '20px' }}>
          { articles.length > 0 ? articles[showIndex].text : null }
        </Content>
        <Footer style={{padding: 0}}>
          <FooterTable/>
        </Footer>
      </Layout>
    )
  }
}

let mapStateToEmotion = state => {
  return {
    ...state.emotion
  }
}
let mapDispatchToEmotion = dispatch => {
  return {
  }
}

export default connect(mapStateToEmotion, mapDispatchToEmotion)(Emotion_UI)