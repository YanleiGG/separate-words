import React from 'react'
import SiderNav_UI from './SiderNav'
import axios from 'axios'
import { connect } from "react-redux";
import store from '../../../state/store'
import { Layout, Pagination, Card } from "antd";

const { Content, Footer, Sider } = Layout;

let mapStateToSiderNav = state => {
  return {
    ...state,
    siderNavData: state.emotion.siderNavData,
    totalCount: state.emotion.totalCount,
    selectedKeys: state.emotion.selectedKeys,
  }
}

let mapDispatchToSiderNav = dispatch => {
  return {
    handleClick: id => {
      let state = store.getState()
      let data = state.emotion.emotionData
      let showArticle = data.find(item => {
        return item.article.id === id
      }).article
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        showArticle,
        selectedKeys: [showArticle.id.toString()]
      }})
    }
  }
}

let SiderNav = connect(mapStateToSiderNav, mapDispatchToSiderNav)(SiderNav_UI)

class Emotion_UI extends React.Component {
  componentWillMount() {
    this.props.created()
  }

  render () {
    const { pageChange, totalCount, showArticle } = this.props
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <SiderNav></SiderNav>
          <Pagination style={{marginTop: "-60px"}} onChange={ pageChange } defaultCurrent={1} total={totalCount} simple />
        </Sider>
        <Content style={{ padding: '15px', fontSize: '20px' }}>
          { showArticle.content }
        </Content>
        <Sider width={400}>
          <Card style={{ height: "100%" }}>

          </Card>
        </Sider>
      </Layout>
    )
  }
}

let refresh = async (dispatch) => {
  let state = store.getState()
  let res = await axios.get(`${state.path}/api/emotion?offset=${(state.emotion.page-1)*10}&pageSize=10`)
  let emotionData = res.data.emotions
  let totalCount = res.data.totalCount
  let siderNavData = emotionData.map(item => {
    return {
      id: item.article.id,
      title: item.article.title
    }
  })
  dispatch({ type: "SET_EMOTION", emotion: {
    ...state.emotion,
    emotionData,
    siderNavData,
    totalCount,
    showArticle: emotionData[0].article,
    selectedKeys: [emotionData[0].article.id.toString()]
  }})
}

let mapStateToEmotion = state => {
  return {
    ...state,
    ...state.emotion
  }
}
let mapDispatchToEmotion = dispatch => {
  return {
    created: async () => {
      let state = store.getState()
      refresh(dispatch)
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion
      }})
    },
    pageChange: async (page) => {
      let state = store.getState()
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        page
      }})
      refresh(dispatch)
    }
  }
}

export default connect(mapStateToEmotion, mapDispatchToEmotion)(Emotion_UI)