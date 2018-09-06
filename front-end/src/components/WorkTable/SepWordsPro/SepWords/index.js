import * as React from "react";
import { Modal, Radio, Pagination } from "antd";
import { Layout } from "antd";
import { connect } from "react-redux";
import store from '../../../../state/store'
import axios from 'axios'
import { unformatWithoutProperty } from '../../../../util'

import SiderNav from './SiderNav'
import FooterBtn from './FooterBtn'

const { Content, Footer, Sider } = Layout;

class SepWords extends React.Component {
  componentWillMount() {
    this.props.created()
  }

  render() {
    let { pickWords, sep_words_propertys, showIndex } = this.props
    let showContent = sep_words_propertys.length > 0 ? sep_words_propertys[showIndex].showContent : []
    return (
      <Layout>
        <SiderNav />
        <Layout>
          <Content onMouseUp={pickWords} style={{ padding: '15px' }} id="content">
            <div style={{ fontSize: 20 + 'px' }}>
              {
                showContent.map((i, index) => {
                  return <span key={index} id={index}>{i.content}</span>
                })
              }
            </div>
          </Content>
          <Footer>
            <FooterBtn />
          </Footer>
        </Layout>
      </Layout>
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
    ...state.sepWordsPro
  }
}

let mapDispatchToProps = dispatch => {
  return {
    created: async () => {
      refresh(dispatch)
    },
    pickWords: () => {
      if (window.getSelection().toString()) {
        let state = store.getState()
        let sep_words_propertys = state.sepWordsPro.sep_words_propertys
        let start = window.getSelection().getRangeAt(0).startContainer.parentElement.id
        let end = + window.getSelection().getRangeAt(0).endContainer.parentElement.id + 1
        let showContent = sep_words_propertys[state.sepWordsPro.showIndex].showContent
        if (showContent[start].content == '|' && start == end-1) return
        if (showContent[start - 1] && showContent[start - 1].content != '|') {
          showContent.splice(start, 0, { id: null, content: '|' })
          start++
          end++
        }
        if (showContent[end] && showContent[end].content != '|') {
          showContent.splice(end, 0, { id: 1, content: '|' })
        }
        for (let i = end - 1; i >= start; i--) {
          if (showContent[i] && showContent[i].content == '|') showContent.splice(i, 1)
        }
        sep_words_propertys[state.sepWordsPro.showIndex].showContent = showContent
        dispatch({
          type: "SET_SEP_WORDS_PRO",
          sepWordsPro: {
            ...state.sepWordsPro,
            sep_words_propertys
          }
        })
        window.getSelection().removeAllRanges()
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SepWords)