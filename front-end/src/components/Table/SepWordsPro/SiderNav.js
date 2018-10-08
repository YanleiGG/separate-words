import React from 'react'
import { Menu, Pagination, Layout, Icon, Select } from 'antd';
import store from '../../../state/store'
import axios from 'axios'
import { connect } from "react-redux";
import { unformatWithoutProperty, unformatWithProperty, showContentToShowPro } from '../../../util'
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
        <Sider width={200} style={{ background: '#fff',  overflow: 'auto', height: '100%', position: 'fixed', left: 0 }}>
          <Select 
            defaultValue="all" 
            style={{ width: 150, margin: '15px' }} 
            onChange={filterChange}
          >
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

let refresh = async dispatch => {
  let state = store.getState()
  dispatch({
    type: "SET_SEP_WORDS_PRO",
    sepWordsPro: {
      ...state.sepWordsPro,
      spinning: true
    }
  })
  let {page, filter} = state.sepWordsPro, taskId = state.taskId
  let res = await axios.get(`${path}/api/task/${taskId}/articles/separateWordsProperty/${filter}?offset=${(page-1)*10}&pageSize=10`)
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
      title: item.title || '无标题',
      state: item.state
    }
  })
  let propertys = task.wordsPropertyGroup.words_propertys.map(item => {
    return { label: item.name, value: item.symbol }
  })
  propertys.unshift({label: '无', value: ''})
  let selectedKeys = articles.length > 0 ? [articles[0].id.toString()] : []
  dispatch({
    type: "SET_SEP_WORDS_PRO",
    sepWordsPro: {
      ...state.sepWordsPro,
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

let mapStateToProps = state => {
  return {
    ...state.sepWordsPro
  }
};

let mapDispatchToSiderNav = dispatch => {
  return {
    created: async () => {
      await refresh(dispatch)
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
    pageChange: async page => {
      let state = store.getState()
      dispatch({ type: "SET_SEP_WORDS_PRO", sepWordsPro: {
        ...state.sepWordsPro,
        page
      }})
      refresh(dispatch)
    },
    filterChange: async value => {
      let state = store.getState()
      dispatch({ type: "SET_SEP_WORDS_PRO", sepWordsPro: {
        ...state.sepWordsPro,
        filter: value,
        page: 1
      }})
      refresh(dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToSiderNav)(SiderNav_UI)