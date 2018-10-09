import React from 'react'
import SiderRight from './SiderRight'
import axios from 'axios'
import { connect } from "react-redux";
import store from '../../../../state/store'
import { Layout } from "antd";
import {path} from '../../../../config'
import HeaderNav from '../HeaderNav'

const { Content, Footer, Sider } = Layout;

class Emotion_UI extends React.Component {
  componentWillMount() {
    this.props.created()
  }

  render () {
    const { showIndex, articles } = this.props
    return (
      <Layout style={{marginLeft: '200px'}}>
        <HeaderNav/>
        <Content style={{ padding: '15px', fontSize: '20px' }}>
          { articles.length > 0 ? articles[showIndex].text : null }
        </Content>
        <Footer style={{padding: 0}}>
          <SiderRight/>
        </Footer>
      </Layout>
    )
  }
}

let refresh = async (dispatch) => {
  let state = store.getState()
  let {taskId} = state
  let {filter, page} = state.emotion
  let res = await axios.get(`${path}/api/task/${taskId}/articles/emotion/${filter}?offset=${(page-1)*10}&pageSize=10`)
  let {articles} = res.data.data.task
  let totalCount = res.data.data.totalCount
  let SiderLeftData = articles.map((item, index) => {
    if (!articles[index].emotion) {
      articles[index].emotion = {
        perspective: '',
        attitude: '',
        emotion: '',
        degree: ''
      }
    }
    return {
      id: item.id,
      title: item.title || '无标题'
    }
  })
  console.log(articles)
  dispatch({ type: "SET_EMOTION", emotion: {
    ...state.emotion,
    articles,
    SiderLeftData,
    totalCount,
    showIndex: 0,
    selectedKeys: [articles[0].id.toString()]
  }})
}

let mapStateToEmotion = state => {
  return {
    ...state.emotion
  }
}
let mapDispatchToEmotion = dispatch => {
  return {
    created: async () => {
      refresh(dispatch)
    }
  }
}

export default connect(mapStateToEmotion, mapDispatchToEmotion)(Emotion_UI)