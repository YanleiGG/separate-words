import React from 'react'
import { Menu, Layout, Pagination, Select } from 'antd';
import { connect } from "react-redux";
import store from '../../../state/store'
import {path} from '../../../config'
import axios from 'axios'

const { Sider } = Layout;
const Option = Select.Option

class SiderNav_UI extends React.Component {
  async componentWillMount(){
   await this.props.created()
  }
  render () {
    let { SiderNavData, selectedKeys, handleClick, totalCount, pageChange, filterChange, page } = this.props
    return (
      <Sider width={200} style={{ background: '#fff',  overflow: 'hidden', height: '100%', position: 'fixed', left: 0 }}>
        <Select defaultValue="all" style={{ width: 150, margin: '15px' }} onChange={filterChange}>
          <Option value="all">全部</Option>
          <Option value="marking">标注中</Option>
          <Option value="completed">已完成</Option>
        </Select>
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
            current={page}
            onChange={ pageChange } 
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
  store.dispatch({
    type: "SET_EMOTION",
    emotion: {
      ...state.emotion,
      spinning: true
    }
  })  
  let {taskId} = state
  let {filter, page} = state.emotion
  let res = await axios.get(`${path}/api/task/${taskId}/articles/emotion/${filter}?offset=${(page-1)*10}&pageSize=10`)
  console.log(res)
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
    selectedKeys: [articles[0].id.toString()],
    spinning: false
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
    },
    filterChange: async value => {
      let state = store.getState()
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        filter: value,
        page: 1
      }})
      refresh(dispatch)
    }
  }
}

export default connect(mapStateToSiderNav, mapDispatchToSiderNav)(SiderNav_UI)