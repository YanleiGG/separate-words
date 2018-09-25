import * as React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import store from '../../../../state/store'
import FooterBtn from './FooterBtn'

const { Content, Footer } = Layout;

class SepWords extends React.Component {
  render() {
    let { pickWords, articles, showIndex } = this.props
    console.log(articles)
    let showPro = articles.length > 0 ? articles[showIndex].showPro : []
    return (
      <Layout>
        <Layout>
          <Content onMouseUp={pickWords} style={{ padding: '15px', fontSize: '20px', marginLeft: '200px' }} id="content">
              {showPro.map((i, index) => {
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
    ...state.markEntity
  }
}

let mapDispatchToProps = dispatch => {
  return {
    pickWords: () => {
      if (window.getSelection().toString()) {
        let state = store.getState()
        let {articles, showIndex} = state.markEntity
        let start = window.getSelection().getRangeAt(0).startContainer.parentElement.id
        let end = + window.getSelection().getRangeAt(0).endContainer.parentElement.id + 1
        let showPro = articles[showIndex].showPro
        if (showPro[start].content == '|' && start == end-1) return
        if (showPro[start - 1] && showPro[start - 1].content != '|') {
          showPro.splice(start, 0, { id: null, content: '|' })
          start++
          end++
        }
        if (showPro[end] && showPro[end].content != '|') {
          showPro.splice(end, 0, { id: 1, content: '|' })
        }
        for (let i = end - 1; i >= start; i--) {
          if (showPro[i] && showPro[i].content == '|') showPro.splice(i, 1)
        }
        articles[showIndex].showPro = showPro
        dispatch({
          type: "SET_MARK_ENTITY",
          markEntity: {
            ...state.markEntity,
            articles
          }
        })
        window.getSelection().removeAllRanges()
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SepWords)