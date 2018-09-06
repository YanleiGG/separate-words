import * as React from "react";
import { Modal, Radio, Pagination } from "antd";
import { Layout } from "antd";
import { connect } from "react-redux";
import store from '../../../../state/store'
import axios from 'axios'
import { unformatWithoutProperty } from '../../../../util'

import FooterBtn from './FooterBtn'

const { Content, Footer, Sider } = Layout;

class SepWords extends React.Component {
  render() {
    let { pickWords, sep_words_propertys, showIndex } = this.props
    let showContent = sep_words_propertys.length > 0 ? sep_words_propertys[showIndex].showContent : []
    return (
      <Layout>
        <Layout>
          <Content onMouseUp={pickWords} style={{ padding: '15px', fontSize: '20px' }} id="content">
              {showContent.map((i, index) => {
                return <span key={index} id={index}>{i.content}</span>
              })}
          </Content>
          <Footer>
            <FooterBtn/>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}


let mapStateToProps = state => {
  return {
    ...state.sepWordsPro
  }
}

let mapDispatchToProps = dispatch => {
  return {
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