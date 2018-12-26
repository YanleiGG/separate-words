import React from 'react'
import { Menu, Layout, Pagination, Select, Icon } from 'antd';
import { connect } from "react-redux";
import store from '../../../state/store'
import {path} from '../../../config'
import axios from 'axios'
import { getContentLabelsTree } from '../../../util'

const { Sider } = Layout;
const Option = Select.Option

class SiderNav_UI extends React.Component {
  async componentWillMount(){
   await this.props.created()
  }
  render () {
    let { siderNavData, selectedKeys, handleClick, totalCount, pageChange, filterChange, page } = this.props
    return (
      <Sider width={200} style={{ background: '#fff',  overflow: 'auto', height: '100%', position: 'fixed', left: 0, zIndex: '99' }}>
        <Select defaultValue="all" style={{ width: 150, margin: '15px' }} onChange={filterChange}>
          <Option value="all">全部</Option>
          <Option value="marking">标注中</Option>
          <Option value="completed">已完成</Option>
        </Select>
        <Menu
          mode="inline"
          style={{ height: '80%' }}
          selectedKeys = { selectedKeys }
        >
          {siderNavData ? siderNavData.map(i => {
            return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >
              { i.title.length > 8 ? i.title.slice(0,7) + '...' : i.title }
              { i.state === 'completed' ? <Icon 
                style={{color: 'green', float: 'right', marginTop: '15px'}} 
                type="check" 
                theme="outlined" 
              /> : null }
            </Menu.Item>
          }) : null}
        </Menu>
        <Pagination 
          current={page} 
          onChange={ pageChange } 
          defaultCurrent={1} 
          total={totalCount} 
          simple
        />
      </Sider>
    )
  }
}

let refresh = async () => {
  let state = store.getState()
  store.dispatch({
    type: "SET_CONTENT_TYPE",
    contentType: {
      ...state.contentType,
      spinning: true
    }
  })
  let taskId = window.location.pathname.split('/').pop()
  let {filter, page} = state.contentType
  let res = await axios.get(`${path}/api/task/${taskId}/articles/contentType/${filter}?offset=${(page-1)*10}&pageSize=10`)
  let {articles, contentLabelGroup} = res.data.data.task
  let treeData = getContentLabelsTree(contentLabelGroup.contentLabels)  // 分类体系树
  let totalCount = res.data.data.totalCount
  let siderNavData = articles.map((item, index) => {
    let { contentType } = articles[index]
    // contentType 是服务器端拼接好的string, contentTypes是前端转换出的数组
    // 如果 contentType 为空则初始化一个空数组 contentTypes 和 treeSelectedKeys
    if (!contentType) {    
      articles[index].contentTypes = []
      articles[index].treeSelectedKeys = []
    } else {
      articles[index].contentTypes = contentType.split('::')
      articles[index].treeSelectedKeys = articles[index].contentType.split('::')
    }
    return {
      id: item.id,
      title: item.title || '无标题',
      state: item.state
    }
  })
  let selectedKeys = articles.length > 0 ? [articles[0].id.toString()] : []
  store.dispatch({ type: "SET_CONTENT_TYPE", contentType: {
    ...state.contentType,
    articles,
    siderNavData,
    totalCount,
    showIndex: 0,
    selectedKeys,
    spinning: false,
    treeData
  }})
}

let mapStateToSiderNav = state => {
  return {
    ...state.contentType
  }
}

let mapDispatchToSiderNav = dispatch => {
  return {
    created: async () => {
      await refresh()
    },
    handleClick: id => {
      let state = store.getState()
      let {articles} = state.contentType
      let showIndex = articles.findIndex(item => {
        return item.id === id
      })
      dispatch({ type: "SET_CONTENT_TYPE", contentType: {
        ...state.contentType,
        showIndex,
        selectedKeys: [id.toString()]
      }})
    },
    pageChange: async (page) => {
      let state = store.getState()
      dispatch({ type: "SET_CONTENT_TYPE", contentType: {
        ...state.contentType,
        page
      }})
      refresh()
    },
    filterChange: async value => {
      let state = store.getState()
      dispatch({ type: "SET_CONTENT_TYPE", contentType: {
        ...state.contentType,
        filter: value,
        page: 1
      }})
      refresh(dispatch)
    }
  }
}

export default connect(mapStateToSiderNav, mapDispatchToSiderNav)(SiderNav_UI)