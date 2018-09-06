import React from 'react'
import { Menu, Icon, Tooltip, Modal, message, Pagination, Layout } from 'antd';
import store from '../../../state/store'
import axios from 'axios'
import { connect } from "react-redux";
import { unformatWithoutProperty } from '../../../util'

const { Sider } = Layout;

class SiderNav_UI extends React.Component {
  componentWillMount () {
    this.props.created()
  }

  render () {
    let { selectedKeys, handleClick, pageChange, totalCount } = this.props
    let siderNavData = this.props.sepWordsPro.sep_words_propertys.length > 0 ? this.props.siderNavData : []
    
    return (
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            selectedKeys = { selectedKeys }
          >
            {siderNavData.map(i => {
              return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >{ i.title }</Menu.Item>
            })}
          </Menu>
          <Pagination style={{marginTop: "-60px"}} onChange={ pageChange } defaultCurrent={1} total={totalCount} simple />
        </Sider>
    )
  }
}

let refresh = async dispatch => {
  let state = store.getState()
  let page = state.sepWordsPro.page
  let res = await axios.get(`${state.path}/api/sep_words_property?offset=${(page - 1) * 10}&pageSize=10`)
  let sep_words_propertys = res.data.sep_words_propertys
  let totalCount = res.data.totalCount
  let showContent = []
  let siderNavData = sep_words_propertys.map((item, index) => {
    if (item.separateWords == null) {
      sep_words_propertys[index].separateWords = ''
      for (let i = 0; i < item.article.content.length; i++) {
        sep_words_propertys[index].separateWords += 'S'
        showContent.push({ content: item.article.content[i] })
      }
    }
    if (!item.separateWords) {     //  这里后面可以根据业务逻辑考虑删除
      item.separateWords = ''
      for (let i = 0;i < item.article.content.length;i++) {
        item.separateWords += item.article.content[i] + 'S'
      }
    } 
    showContent = unformatWithoutProperty(item.separateWords)
    sep_words_propertys[index].showContent = showContent
    showContent = []
    return {
      id: item.article.id,
      title: item.article.title
    }
  })
  let selectedKeys = sep_words_propertys.length > 0 ? [sep_words_propertys[0].article.id.toString()] : []
  dispatch({
    type: "SET_SEP_WORDS_PRO",
    sepWordsPro: {
      ...state.sepWordsPro,
      sep_words_propertys,
      siderNavData,
      selectedKeys,
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
    created: () => {
      refresh(dispatch)
    },
    handleClick: id => {
      let state = store.getState()
      let sep_words_propertys = state.sepWordsPro.sep_words_propertys
      let showIndex = sep_words_propertys.findIndex(item => item.article.id == id)
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
      dispatch({ type: "SET_SEP_WORDS_PRO", emotion: {
        ...state.sepWordsPro,
        page
      }})
      refresh(dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToSiderNav)(SiderNav_UI)