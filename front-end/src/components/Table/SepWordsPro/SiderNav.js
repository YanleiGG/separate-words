import React from 'react'
import { Menu, Pagination, Layout } from 'antd';
import store from '../../../state/store'
import axios from 'axios'
import { connect } from "react-redux";
import { unformatWithoutProperty, unformatWithProperty, showContentToShowPro } from '../../../util'
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
  let page = state.sepWordsPro.page, taskId = state.taskId
  let res = await axios.get(`${path}/api/task/${taskId}/articles/separateWordsProperty?offset=${(page-1)*10}&pageSize=10`)
  let totalCount = res.data.data.totalCount
  console.log(res)
  let task = res.data.data.task
  let articles = task.articles
  let siderNavData = articles.map((item, index) => {
    let { sep_words_property } = item
    if (sep_words_property === null) sep_words_property = {}
    if (!sep_words_property || !sep_words_property.separateWords) {
      item.text = item.text.replace(' ', '')
      articles[index].showContent = unformatWithoutProperty(item.text, true)
    } else {
      articles[index].showContent = unformatWithoutProperty(articles[index].sep_words_property.separateWords, false)
    }
    if (!sep_words_property || !sep_words_property.separateWordsProperty) {
      articles[index].showPro = showContentToShowPro(articles[index].showContent)
    } else {
      articles[index].showPro = unformatWithProperty(articles[index].sep_words_property.separateWordsProperty, task.wordsPropertyGroup.words_propertys)
    }
    return {
      id: item.id,
      title: item.title || '无标题'
    }
  })
  let propertys = task.wordsPropertyGroup.words_propertys.map(item => {
    return { label: item.name, value: item.symbol }
  })
  propertys.unshift({label: '无', value: ''})
  dispatch({
    type: "SET_SEP_WORDS_PRO",
    sepWordsPro: {
      ...state.sepWordsPro,
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