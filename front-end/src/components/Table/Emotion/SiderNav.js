import React from 'react'
import { Menu, Layout, Pagination } from 'antd';
import { connect } from "react-redux";
import store from '../../../state/store'
import {path} from '../../../config'
import axios from 'axios'

const { Sider } = Layout;

class SiderNav_UI extends React.Component {
  async componentWillMount(){
   await this.props.created()
  }
  render () {
    let { SiderNavData, selectedKeys, handleClick, totalCount, pageChange } = this.props
    return (
      <Sider width={200} style={{ background: '#fff',  overflow: 'auto', height: '100%', position: 'fixed', left: 0 }}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys = { selectedKeys }
        >
          {SiderNavData.map(i => {
            return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >
              { i.title }
            </Menu.Item>
          })}
          <Pagination
            style={{marginTop: '50px'}}
            onChange={ pageChange } 
            defaultCurrent={1} 
            total={totalCount} 
            simple
          />
        </Menu>
      </Sider>
    )
  }
}

let refresh = async () => {
  let state = store.getState()
  let {taskId} = state
  let {filter, page} = state.emotion
  let res = await axios.get(`${path}/api/task/${taskId}/articles/emotion/${filter}?offset=${(page-1)*10}&pageSize=10`)
  let {articles} = res.data.data.task
  let totalCount = res.data.data.totalCount
  let SiderNavData = articles.map((item, index) => {
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
  store.dispatch({ type: "SET_EMOTION", emotion: {
    ...state.emotion,
    articles,
    SiderNavData,
    totalCount,
    showIndex: 0,
    selectedKeys: [articles[0].id.toString()]
  }})
}

let mapStateToSiderNav = state => {
  return {
    ...state.emotion
  }
}

let mapDispatchToSiderNav = dispatch => {
  return {
    created: async () => {
      await refresh()
    },
    handleClick: id => {
      let state = store.getState()
      let {articles} = state.emotion
      let showIndex = articles.findIndex(item => {
        return item.id === id
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
      refresh()
    }
  }
}

export default connect(mapStateToSiderNav, mapDispatchToSiderNav)(SiderNav_UI)