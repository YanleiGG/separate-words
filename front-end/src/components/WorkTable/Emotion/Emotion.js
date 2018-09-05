import React from 'react'
import SiderLeft from './SiderLeft'
import SiderRight from './SiderRight'
import axios from 'axios'
import { connect } from "react-redux";
import store from '../../../state/store'
import { Layout, Pagination } from "antd";

const { Content, Footer, Sider } = Layout;

class Emotion_UI extends React.Component {
  componentWillMount() {
    this.props.created()
  }

  render () {
    const { pageChange, totalCount, showIndex, emotions } = this.props
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <SiderLeft/>
          <Pagination 
            style={{marginTop: "-60px"}} 
            onChange={ pageChange } 
            defaultCurrent={1} 
            total={totalCount} 
            simple
          />
        </Sider>
        <Content style={{ padding: '15px', fontSize: '20px' }}>
          { emotions.length > 0 ? emotions[showIndex].article.content : null }
        </Content>
        <Sider width={400}>
          <SiderRight/>
        </Sider>
      </Layout>
    )
  }
}

let refresh = async (dispatch) => {
  let state = store.getState()
  let res = await axios.get(`${state.path}/api/emotion?offset=${(state.emotion.page-1)*10}&pageSize=10`)
  let emotions = res.data.emotions
  let totalCount = res.data.totalCount
  let SiderLeftData = emotions.map(item => {
    return {
      id: item.article.id,
      title: item.article.title
    }
  })
  dispatch({ type: "SET_EMOTION", emotion: {
    ...state.emotion,
    emotions,
    SiderLeftData,
    totalCount,
    showIndex: 0,
    selectedKeys: [emotions[0].article.id.toString()]
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
      // dispatch({ type: "SET_EMOTION", emotion: {
      //   ...state.emotion
      // }})
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