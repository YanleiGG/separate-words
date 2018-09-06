import React from 'react'
import { Layout, Button, message, Input, TreeSelect } from "antd";
import axios from 'axios'
import { connect } from "react-redux";
import store from '../../state/store'
import { refresh } from '../../util'

const SHOW_PARENT = TreeSelect.SHOW_PARENT
const { TextArea } = Input;
const { Footer, Content } = Layout;

const treeData = [{
  title: '分词和词性标注',
  value: '0-0-1',
  key: '0-0-1',
},{
  title: '情感标注',
  value: '0-0-2',
  key: '0-0-2',
},{
  title: '文本内容分类标注',
  value: '0-0-3',
  key: '0-0-3',
},{
  title: '实体标注',
  value: '0-0-4',
  key: '0-0-4',
},]

class CreateArticle_UI extends React.Component {
  render () {
    let { createArticle, createArticleTitle, create, cancel, contentChange, titleChange, createArticleSelected, selectChange } = this.props
    return (
      <Content>
        <Content style={{textAlign: 'center', marginTop: '5%'}}>
          <TreeSelect
            treeData={treeData}
            value={createArticleSelected}
            searchPlaceholder='文章分类'
            style={{ width: '60%', marginBottom: '2%' }}
            showCheckedStrategy={SHOW_PARENT}
            onChange={selectChange}
            treeCheckable={true}
          />
          <Input onChange={ titleChange } value={ createArticleTitle } placeholder="输入标题..." style={{ width: '60%', marginBottom: '2%' }}/>
          <TextArea onChange={ contentChange } value={ createArticle } autosize = {{ minRows: 15 }} style={{ width: '60%' }} placeholder = "输入文章内容..."/>
        </Content>
        <Footer style={{textAlign: 'center', marginTop: '3%'}}>
          <Button type="primary" onClick={create}>确认</Button>
          <Button type="primary" style={{ marginLeft: '20px'}} onClick={cancel}>取消</Button>
        </Footer>
      </Content>
    ) 
  }
}

let mapAllStateToProps = state => {
  return state
};

let mapDispathToCreateArticle = dispatch => {
  return {
    create: async () => {
      let state = store.getState()
      // let content = state.createArticle.replace('\n', '').replace(/\s+/g, '')
      let content = state.createArticle.replace('\n', '')
      let title = state.createArticleTitle
      if (content == '' || title == '') return message.error('标题和内容不能为空！')
      let tips = message.loading('Creating...')
      let selected = state.createArticleSelected
      if (selected.indexOf('0-0-2') != -1) {
        let res = await axios.post(`${state.path}/api/emotion`, { title, content })
        message.destroy(tips)
        if (res.data.code === 0) message.success('Create Successed!', 1.5)
        return
      }
      if (selected.indexOf('0-0-1') != -1) {
        let res = await axios.post(`${state.path}/api/sep_words_property`, { title, content })
        message.destroy(tips)
        if (res.data.code === 0) message.success('Create Successed!', 1.5)
        return
      }
      // let separateWords = '', separateWordsProperty = '', markEntity = ''
      // for (let i = 0;i < content.length;i++) {
      //   separateWords += 'S'
      //   markEntity += 'S'
      //   separateWordsProperty += 'S0'
      // }
      // let article = {
      //   title,
      //   content,
      //   separateWords,
      //   markEntity,
      //   separateWordsProperty
      // }
      // let res = await axios.post(`${state.path}/api/article`, article)

      // message.destroy(tips)
      // if (res.data.code == 0) {
      //   dispatch({ type: "SET_CREATE_ARTICLE", createArticle: '' })
      //   dispatch({ type: "SET_CREATE_ARTICLE_TITLE", createArticleTitle: '' })
      //   dispatch({ type: "SET_PAGE", page: 1 })
      //   message.success('Create Successed!', 1.5)
      //   refresh(dispatch)
      // } else {
      //   message.error('Create defeat!', 1.5)
      // }
    },
    cancel: () => {
      dispatch({ type: "SET_CREATE_ARTICLE", createArticle: '' })
      dispatch({ type: "SET_CREATE_ARTICLE_TITLE", createArticleTitle: '' })
    },
    contentChange: e => {
      dispatch({ type: "SET_CREATE_ARTICLE", createArticle: e.target.value })
    },
    titleChange: e => {
      dispatch({ type: "SET_CREATE_ARTICLE_TITLE", createArticleTitle: e.target.value })
    },
    selectChange: value => {
      dispatch({ type: "SET_CREATE_ARTICLE_SELECTED", createArticleSelected: value })
    }
  }
}

let CreateArticle = connect(mapAllStateToProps, mapDispathToCreateArticle)(CreateArticle_UI)

export default CreateArticle