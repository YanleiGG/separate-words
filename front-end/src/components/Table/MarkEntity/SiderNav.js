import React from 'react'
import { Menu, Pagination, Layout, Icon, Select } from 'antd';
import store from '../../../state/store'
import axios from 'axios'
import { connect } from "react-redux";
import { unformatWithProperty, formatWithProperty } from '../../../util'
import { path } from '../../../config'

const { Sider } = Layout;
const Option = Select.Option

class SiderNav_UI extends React.Component {
  componentWillMount () {
    this.props.created()
  }

  render () {
    let { selectedKeys, handleClick, pageChange, totalCount, filterChange, page } = this.props
    let siderNavData = this.props.articles.length > 0 ? this.props.siderNavData : []
    
    return (
        <Sider width={200} style={{ background: '#fff',  overflow: 'auto', height: '100vh', position: 'fixed', left: 0  }}>
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
            {siderNavData.map(i => {
              return <Menu.Item onClick={() => handleClick(i.id)} key={i.id} >
                { i.title }
                { i.state === 'completed' ? <Icon 
                  style={{color: 'green', float: 'right', marginTop: '15px'}} 
                  type="check" 
                  theme="outlined" 
                /> : null }
              </Menu.Item>
            })}
          </Menu>
          <Pagination current={page} onChange={ pageChange } defaultCurrent={1} total={totalCount} simple />
        </Sider>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.markEntity
  }
};

let mapDispatchToSiderNav = dispatch => {
  return {
    created: async () => {
      await refresh(dispatch)
    },
    handleClick: id => {
      let state = store.getState()
      let articles = state.markEntity.articles
      let showIndex = articles.findIndex(item => item.id == id)
      dispatch({
        type: "SET_MARK_ENTITY", 
        markEntity: {
          ...state.markEntity,
          showIndex,
          selectedKeys: [id.toString()]
        }
      })
    },
    pageChange: async (page) => {
      let state = store.getState()
      dispatch({ type: "SET_MARK_ENTITY", markEntity: {
        ...state.markEntity,
        page
      }})
      refresh(dispatch)
    },
    filterChange: async value => {
      let state = store.getState()
      dispatch({ type: "SET_MARK_ENTITY", markEntity: {
        ...state.markEntity,
        filter: value,
        page: 1
      }})
      refresh(dispatch)
    }
  }
}

let refresh = async dispatch => {
  let state = store.getState()
  dispatch({
    type: "SET_MARK_ENTITY",
    markEntity: {
      ...state.markEntity,
      spinning: true
    }
  })
  let {page, filter} = state.markEntity, taskId = state.taskId
  let res = await axios.get(`${path}/api/task/${taskId}/articles/markEntity/${filter}?offset=${(page-1)*10}&pageSize=10`)
  let totalCount = res.data.data.totalCount
  console.log(res)
  let task = res.data.data.task
  let articles = task.articles
  let siderNavData = articles.map((item, index) => {
    let { mark_entity } = item
    if (!mark_entity) {
      let markEntity = item.text.split('').map(item => item + '/ ').join('')
      articles[index].mark_entity = { markEntity }
    }
    articles[index].showPro = unformatWithProperty(articles[index].mark_entity.markEntity, task.entitiesGroup.entities)
    articles[index].mark_entity.markEntity = formatWithProperty(articles[index].showPro)
    return {
      id: item.id,
      title: item.title || '无标题',
      state: item.state
    }
  })
  let propertys = task.entitiesGroup.entities.map(item => {
    return { label: item.name, value: item.symbol }
  })
  let selectedKeys = articles.length > 0 ? [articles[0].id.toString()] : []
  dispatch({
    type: "SET_MARK_ENTITY",
    markEntity: {
      ...state.markEntity,
      articles,
      siderNavData,
      totalCount,
      propertys,
      selectedKeys,
      showIndex: 0,
      spinning: false
    }
  })
}

export default connect(mapStateToProps, mapDispatchToSiderNav)(SiderNav_UI)