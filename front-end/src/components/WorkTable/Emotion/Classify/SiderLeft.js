import React from 'react'
import { Menu, Layout, Pagination } from 'antd';
import { connect } from "react-redux";
import store from '../../../../state/store'
import axios from 'axios'

const { Sider } = Layout;

class SiderLeft_UI extends React.Component {
  render () {
    let { SiderLeftData, selectedKeys, handleClick, totalCount, pageChange } = this.props
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys = { selectedKeys }
        >
          {SiderLeftData.map(i => {
            return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >
              { i.title }
            </Menu.Item>
          })}
        </Menu>
        <Pagination 
          style={{marginTop: "-60px"}} 
          onChange={ pageChange } 
          defaultCurrent={1} 
          total={totalCount} 
          simple
        />
      </Sider>
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

let mapStateToSiderLeft = state => {
  return {
    ...state,
    SiderLeftData: state.emotion.SiderLeftData,
    totalCount: state.emotion.totalCount,
    selectedKeys: state.emotion.selectedKeys,
  }
}

let mapDispatchToSiderLeft = dispatch => {
  return {
    handleClick: id => {
      let state = store.getState()
      let data = state.emotion.emotions
      let showIndex = data.findIndex(item => {
        return item.article.id === id
      })
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        showIndex,
        selectedKeys: [id.toString()]
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

export default connect(mapStateToSiderLeft, mapDispatchToSiderLeft)(SiderLeft_UI)