import React from 'react'
import { Menu, Icon, Tooltip, Modal, message, Pagination, Layout } from 'antd';
import store from '../../../state/store'
import axios from 'axios'
import { connect } from "react-redux";
import { unformatWithoutProperty, unformatWithProperty } from '../../../util'
import { path } from '../../../config'

const { Sider } = Layout;

class SiderNav_UI extends React.Component {
  componentWillMount () {
    this.props.created()
  }

  render () {
    let { selectedKeys, handleClick, pageChange, totalCount } = this.props
    let siderNavData = this.props.sepWordsPro.articles.length > 0 ? this.props.siderNavData : []
    
    return (
        <Sider width={200} style={{ background: '#fff',  overflow: 'auto', height: '100vh', position: 'fixed', left: 0  }}>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            selectedKeys = { selectedKeys }
          >
            {siderNavData.map(i => {
              return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >{ i.title }</Menu.Item>
            })}
          </Menu>
          <Pagination style={{marginTop: "-200px"}} onChange={ pageChange } defaultCurrent={1} total={totalCount} simple />
        </Sider>
    )
  }
}

let refresh = async dispatch => {
  let state = store.getState()
  let page = state.sepWordsPro.page, taskId = state.taskId
  let res = await axios.get(`${path}/api/task/${taskId}/articles/separateWordsProperty?offset=${(page-1)*10}&pageSize=10`)
  let totalCount = res.data.data.totalCount
  console.log(res)
  let articles = res.data.data.task.articles
  let siderNavData = articles.map((item, index) => {
    let firstFromatSepWords = false, firstFromatSepWordsPro = false
    if (!item.sep_words_property || !item.sep_words_property.separateWords) firstFromatSepWords = true
    if (!item.sep_words_property || !item.sep_words_property.separateWordsProperty) firstFromatSepWordsPro = true
    let sep_words_propertys = item.sep_words_property || { separateWords: item.text, separateWordsProperty: item.text } 
    articles[index].showContent = unformatWithoutProperty(sep_words_propertys.separateWords, firstFromatSepWords)
    articles[index].showPro = unformatWithProperty(sep_words_propertys.separateWordsProperty)
    return {
      id: item.id,
      title: item.title || '无标题'
    }
  })
  console.log(siderNavData)
  dispatch({
    type: "SET_SEP_WORDS_PRO",
    sepWordsPro: {
      ...state.sepWordsPro,
      articles,
      siderNavData,
      totalCount
    }
  })
}

let mapStateToProps = state => {
  return {
    ...state,
    siderNavData: state.sepWordsPro.siderNavData,
    selectedKeys: state.sepWordsPro.selectedKeys,
    totalCount: state.sepWordsPro.totalCount
  }
};

let mapDispatchToSiderNav = dispatch => {
  return {
    created: async () => {
      await refresh(dispatch)
      let state = store.getState()
      let articles = state.sepWordsPro.articles
      let selectedKeys = articles.length > 0 ? [articles[0].id.toString()] : []
      dispatch({
        type: "SET_SEP_WORDS_PRO",
        sepWordsPro: {
          ...state.sepWordsPro,
          selectedKeys
        }
      })
    },
    handleClick: id => {
      let state = store.getState()
      let articles = state.sepWordsPro.articles
      let showIndex = articles.findIndex(item => item.id == id)
      dispatch({
        type: "SET_SEP_WORDS_PRO", 
        sepWordsPro: {
          ...state.sepWordsPro,
          showIndex,
          selectedKeys: [id.toString()]
        }
      })
    },
    pageChange: async (page) => {
      let state = store.getState()
      dispatch({ type: "SET_SEP_WORDS_PRO", sepWordsPro: {
        ...state.sepWordsPro,
        page
      }})
      refresh(dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToSiderNav)(SiderNav_UI)