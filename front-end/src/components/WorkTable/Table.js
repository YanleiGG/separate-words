import * as React from "react";
import { Modal, Radio } from "antd";
import FooterBtn_UI from './FooterBtn'
import { Layout, message  } from "antd";
import { connect } from "react-redux";
import SiderNav_UI from './SiderNav'
import { unformatWithoutProperty, formatWithProperty, formatWithoutProperty, refresh } from '../../util' 


import store from '../../state/store'
import axios from 'axios'

const { Content, Footer } = Layout;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

let mapDispathToFooterBtn = dispatch => {
  return {
    save: async () => {
      let tips = message.loading('Saving...')
      let state = store.getState()
      let article = JSON.parse(JSON.stringify(state.showArticle))
      article.separateWords = formatWithoutProperty(article.separateWords)
      article.separateWordsProperty = formatWithProperty(article.separateWordsProperty)
      article.markEntity = formatWithoutProperty(article.markEntity)
      console.log(article)
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
        separateWords: unformatWithoutProperty(article.content, article.separateWords, state.typeArr),
        separateWordsProperty: unformatWithoutProperty(article.content, article.separateWordsProperty, state.typeArr),
        markEntity: unformatWithoutProperty(article.content, article.markEntity, state.typeArr)
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

let mapDispatchToSiderNav = dispatch => {
  return {
    handleClick: id => {
      let state = store.getState()
      let showArticle = state.articles.find(item => item.id == id)
      dispatch({ type: "SET_SHOWARTICLE", showArticle })
      dispatch({ type: "SET_SELECTED_KEYS", selectedKeys: [showArticle.id.toString()]})
    },
    pageChange: async (page) => {
      dispatch({ type: "SET_PAGE", page })
      refresh(dispatch)
    },
    deleteConfirm: async () => {
      let state = store.getState()
      confirm({
        title: '确认删除吗?',
        content: state.showArticle.title,
        async onOk() {
          let tips = message.loading('Deleting...')
          let res = await axios({
            method: 'delete',
            url: `${state.path}/api/article`,
            data: { id: state.showArticle.id }
          });
          message.destroy(tips)
          if (res.data.code == 0) {
            message.success('Delete Successed!', 1.5)
            refresh(dispatch)
          } else {
            message.error('Delete defeat!', 1.5)
          }
        },
        onCancel() {},
      });
    }
  }
}

let FooterBtn = connect(mapAllStateToProps, mapDispathToFooterBtn)(FooterBtn_UI)
let SiderNav = connect(mapAllStateToProps, mapDispatchToSiderNav)(SiderNav_UI)

class Navigation extends React.Component {
  render() {
    let { article, color, selection, visible, handleOk, handleCancel, pickWords, radioOnChange, radioValue, wordsType } = this.props 

    return (
      <Layout>
        <SiderNav></SiderNav>
        <Layout>
          <Content style={{ padding: '15px' }}>
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
          <Footer>
            <FooterBtn></FooterBtn> 
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Navigation