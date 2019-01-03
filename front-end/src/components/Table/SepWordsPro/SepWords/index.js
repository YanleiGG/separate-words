import * as React from "react";
import { Layout, Pagination } from "antd";
import { connect } from "react-redux";
import store from '../../../../state/store'
import HeaderNav from '../HeaderNav'
import FooterBtn from './FooterBtn'

const { Content, Footer } = Layout;

class SepWords extends React.Component {
  render() {
    let { pickWords, articles, showIndex } = this.props
    let showContent = articles.length > 0 ? articles[showIndex].showContent : []
    return (
      <Layout style={{marginLeft: '200px'}}>
        <HeaderNav/>
        <Content onMouseUp={pickWords} style={{ padding: '15px', fontSize: '20px' }} id="content">
          {showContent.map((i, index) => {
            return <span key={index+'showContent'} id={index}>{i.content}</span>
          })}
        </Content>
        <Footer>
          <FooterBtn/>
        </Footer>
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
      let { mainSepPage } = store.getState().sepWordsPro
      if (window.getSelection().toString()) {
        let state = store.getState()
        let articles = state.sepWordsPro.articles
        let start = + window.getSelection().getRangeAt(0).startContainer.parentElement.id
        let end = + window.getSelection().getRangeAt(0).endContainer.parentElement.id + 1
        let showContent = articles[state.sepWordsPro.showIndex].showContent
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
        articles[state.sepWordsPro.showIndex].showContent = showContent
        dispatch({
          type: "SET_SEP_WORDS_PRO",
          sepWordsPro: {
            ...state.sepWordsPro,
            articles
          }
        })
        window.getSelection().removeAllRanges()
      }
    },
    mainPageChange: page => {
        let state = store.getState()
        dispatch({
        type: "SET_SEP_WORDS_PRO",
        sepWordsPro: {
          ...state.sepWordsPro,
          mainSepPage: page
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SepWords)