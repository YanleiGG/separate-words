import * as React from "react";
import { Modal, Radio } from "antd";
import FooterBtn_UI from './FooterBtn'
import { Layout, message  } from "antd";
import { connect } from "react-redux";
import util from '../../util'
import store from '../../state/store'
import axios from 'axios'

const { Content } = Layout;
const RadioGroup = Radio.Group;

let mapDispathToFooterBtn = dispatch => {
  return {
    save: async () => {
      let tips = message.loading('Saving...')
      let state = store.getState()
      let article = JSON.parse(JSON.stringify(state.showArticle))
      article.separateWords = util.formatWithoutProperty(article.separateWords)
      article.separateWordsProperty = util.formatWithProperty(article.separateWordsProperty)
      article.markEntity = util.formatWithoutProperty(article.markEntity)
      let res = await axios.put(`${state.path}/api/article`, article)
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('Save Successed!', 1.5)
      } else {
        message.error('Save defeat!', 1.5)
      }
    },
    cancel: async () => {
      let state = store.getState()
      let res = await axios.get(`${state.path}/api/article/${state.showArticle.id}`)
      let article = res.data.article
      article = {
        ...article,
        separateWords: util.unformatWithoutProperty(article.content, article.separateWords, state.typeArr),
        separateWordsProperty: util.unformatWithoutProperty(article.content, article.separateWordsProperty, state.typeArr),
        markEntity: util.unformatWithoutProperty(article.content, article.markEntity, state.typeArr)
      }
      let articles = state.articles.map(item => {
        if (item.id == article.id) return article
        return item
      })
      dispatch({ type: "SET_ARTICLES", articles })
      dispatch({ type: "SET_SHOWARTICLE", showArticle: article })
    }
  }
}
let mapAllStateToProps = state => {
  return state
};

let FooterBtn = connect(mapAllStateToProps, mapDispathToFooterBtn)(FooterBtn_UI)

class Navigation extends React.Component {
  render() {
    let { article, color, selection, visible, handleOk, handleCancel, pickWords, radioOnChange, radioValue, wordsType } = this.props 

    return (
      <Layout>
        <Content>
          <div onMouseUp={ pickWords } style={{ fontSize: 20 + 'px' } }>
            { 
              article.map((i, index) => {
                return <span key={index} id={index} style={{color: color[i.type]}}>{ i.content }</span>
              })
            }
          </div>
          <Modal
            title={ selection.content }
            visible={ visible }
            onOk={ handleOk }
            onCancel={ handleCancel }
          >
            <RadioGroup onChange={radioOnChange} value={radioValue}>
              { 
                wordsType.map((i, index) => {
                  return <Radio value={index} key={index}>{ i }</Radio>
                }) 
              }
            </RadioGroup>
          </Modal>        
        </Content>
        <FooterBtn></FooterBtn>
      </Layout>
    )
  }
}

export default Navigation