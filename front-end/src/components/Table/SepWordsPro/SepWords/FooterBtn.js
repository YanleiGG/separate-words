import React from 'react'
import store from '../../../../state/store'
import { connect } from "react-redux";
import { formatWithoutProperty, showContentToShowPro, formatWithProperty, unformatWithoutProperty } from '../../../../util'
import axios from 'axios'
import { message, Button, Popconfirm } from 'antd'
import { path } from '../../../../config'

class FooterBtn_UI extends React.Component {
  render () {
  const { save, cancel, complete } = this.props
  return (
      <div style={{textAlign: 'center'}}>
        <Popconfirm title="确认完成标注吗?" onConfirm={complete} okText="确认" cancelText="取消">
          <Button type="primary">完成标注</Button>
        </Popconfirm>
        <Button onClick= { save } type="primary" style={{ marginLeft: '20px'}}>保存</Button>
        {/* <Button onClick= { cancel } type="primary" style={{ marginLeft: '20px'}}>取消</Button> */}
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {}
}

let mapDispatchToProps = dispatch => {
  return {
    save: async () => {
      let state = store.getState()
      let { showIndex, articles } = state.sepWordsPro
      let {showContent, showPro} = articles[showIndex]
      articles[showIndex].showPro = showContentToShowPro(showContent, showPro)
      let sep_words_property = articles[showIndex].sep_words_property || {}
      sep_words_property.separateWords = formatWithoutProperty(showContent)
      sep_words_property.separateWordsProperty = formatWithProperty(showPro)
      let tips = message.loading('保存中...')
      let res = await axios.post(`${state.path}/api/sep_words_property`, { ...sep_words_property, articleId: articles[showIndex].id })
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('保存成功!', 1.5)
        if(!articles[showIndex].sep_words_property) articles[showIndex].sep_words_property = {id: res.data.data.id}
        if(!articles[showIndex].sep_words_property.id) articles[showIndex].sep_words_property.id = res.data.data.id
        dispatch({
          type: "SET_SEP_WORDS_PRO",
          sepWordsPro: {
            ...state.sepWordsPro,
            articles
          }
        })
      } else {
        message.error('保存失败!', 1.5)
      }
    },
    // cancel: async () => {
    //   let state = store.getState()
    //   let { showIndex, articles } = state.sepWordsPro
    //   let id = articles[showIndex].id
    //   let res = await axios.get(`${path}/api/article/separateWordsProperty/${id}`)
    //   let { separateWords } = res.data.article.sep_words_property
    //   articles[showIndex].sep_words_property.separateWords = separateWords
    //   articles[showIndex].showContent = unformatWithoutProperty(separateWords)
    //   dispatch({
    //     type: "SET_SEP_WORDS_PRO",
    //     sepWordsPro: {
    //       ...state.sepWordsPro,
    //       articles
    //     }
    //   })
    // }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FooterBtn_UI)