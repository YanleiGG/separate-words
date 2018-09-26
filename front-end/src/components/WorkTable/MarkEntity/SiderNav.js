import React from 'react'
import { Menu, Pagination, Layout } from 'antd';
import store from '../../../state/store'
import axios from 'axios'
import { connect } from "react-redux";
import { unformatWithProperty, formatWithProperty } from '../../../util'
import { path } from '../../../config'

const { Sider } = Layout;

class SiderNav_UI extends React.Component {
  componentWillMount () {
    this.props.created()
  }

  render () {
    let { selectedKeys, handleClick, pageChange, totalCount } = this.props
    let siderNavData = this.props.markEntity.articles.length > 0 ? this.props.siderNavData : []
    
    return (
        <Sider width={200} style={{ background: '#fff',  overflow: 'auto', height: '100vh', position: 'fixed', left: 0  }}>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            selectedKeys = { selectedKeys }
          >
            {siderNavData.map(i => {
              return <Menu.Item onClick={() => handleClick(i.id)} key={i.id} >{ i.title }</Menu.Item>
            })}
          </Menu>
          <Pagination style={{marginTop: "-150px"}} onChange={ pageChange } defaultCurrent={1} total={totalCount} simple />
        </Sider>
    )
  }
}

let refresh = async dispatch => {
  let state = store.getState()
  let page = state.markEntity.page, taskId = state.taskId
  let res = await axios.get(`${path}/api/task/${taskId}/articles/markEntity?offset=${(page-1)*10}&pageSize=10`)
  let totalCount = res.data.data.totalCount
  console.log(res)
  let task = res.data.data.task
  let articles = task.articles
  let siderNavData = articles.map((item, index) => {
    let firstFromatMarkEntity = false
    let { mark_entity } = item
    if (!mark_entity) {
      articles[index].mark_entity = { markEntity: item.text }
      firstFromatMarkEntity = true
    }
    articles[index].showPro = unformatWithProperty(articles[index].mark_entity.markEntity, task.entitiesGroup.entities, firstFromatMarkEntity)
    articles[index].mark_entity.markEntity = formatWithProperty(articles[index].showPro)
    return {
      id: item.id,
      title: item.title || '无标题'
    }
  })
  let propertys = task.entitiesGroup.entities.map(item => {
    return { label: item.name, value: item.symbol }
  })
  dispatch({
    type: "SET_MARK_ENTITY",
    markEntity: {
      ...state.markEntity,
      articles,
      siderNavData,
      totalCount,
      propertys
    }
  })
}

let mapStateToProps = state => {
  return {
    ...state,
    siderNavData: state.markEntity.siderNavData,
    selectedKeys: state.markEntity.selectedKeys,
    totalCount: state.markEntity.totalCount
  }
};

let mapDispatchToSiderNav = dispatch => {
  return {
    created: async () => {
      await refresh(dispatch)
      let state = store.getState()
      let articles = state.markEntity.articles
      let selectedKeys = articles.length > 0 ? [articles[0].id.toString()] : []
      dispatch({
        type: "SET_MARK_ENTITY",
        markEntity: {
          ...state.markEntity,
          selectedKeys
        }
      })
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToSiderNav)(SiderNav_UI)