import React from 'react'
import store from '../../../../state/store'
import { connect } from "react-redux";
import { unformatWithProperty, formatWithProperty } from '../../../../util'
import axios from 'axios'
import { message, Button } from 'antd'
import { path } from '../../../../config'

class FooterBtn_UI extends React.Component {
  render () {
  const { save, cancel, complete } = this.props
  return (
      <div style={{textAlign: 'center'}}>
        <Button onClick={ complete } type="primary">完成</Button>
        <Button onClick= { save } type="primary" style={{ marginLeft: '20px'}}>保存</Button>
        <Button onClick= { cancel } type="primary" style={{ marginLeft: '20px'}}>取消</Button>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {}
}

let mapDispatchToProps = dispatch => {
  return {
    complete: async () => {
      let state = store.getState()
      let { showIndex, articles } = state.sepWordsPro
      let data = articles[showIndex]
      data.state = 'completed'
      let tips = message.loading('提交中...')
      let res = await axios.put(`${path}/api/article`, data)
      let siderNavData = articles.map(item => {
        return {
          id: item.id,
          title: item.title || '无标题',
          state: item.state
        }
      })
      message.destroy(tips)
      if (res.data.code == 0) {
        articles[showIndex] = data
        dispatch({
          type: "SET_SEP_WORDS_PRO",
          sepWordsPro: {
            ...state.sepWordsPro,
            articles,
            siderNavData
          }
        })
        message.success('提交成功!', 1.5)
      } else {
        message.error('提交失败!', 1.5)
      }
    },
    save: async () => {
      let state = store.getState()
      let { showIndex, articles } = state.sepWordsPro
      let showPro = articles[showIndex].showPro
      let sep_words_property = articles[showIndex].sep_words_property || {}
      sep_words_property.separateWordsProperty = formatWithProperty(showPro)
      let tips = message.loading('保存中...')
      let res
      res = await axios.post(`${state.path}/api/sep_words_property`, { ...sep_words_property, articleId: articles[showIndex].id })
      message.destroy(tips)
      if (res.data.code == 0) {
        sep_words_property.id = res.data.data.id
        dispatch({
          type: "SET_SEP_WORDS_PRO",
          sepWordsPro: {
            ...state.sepWordsPro,
            articles
          }
        })
        message.success('保存成功!', 1.5)
      } else {
        message.error('保存失败!', 1.5)
      }
    },
    cancel: async () => {
      let state = store.getState()
      let { showIndex, articles, propertys } = state.sepWordsPro
      let id = articles[showIndex].id
      let res = await axios.get(`${path}/api/article/separateWordsProperty/${id}`)
      let sep_words_property = res.data.article.sep_words_property
      if (!sep_words_property) {
        sep_words_property = {}
        articles[showIndex].sep_words_property = {}
        res.data.article.text = res.data.article.text.replace(' ', '')
        let tempArr = res.data.article.text.split('').map((item, index) => {
          return {
            id: index,
            content: item,
            type: '',
            label: ''
          }
        })
        sep_words_property.separateWordsProperty = formatWithProperty(tempArr)
      }
      let separateWordsProperty = sep_words_property.separateWordsProperty
      articles[showIndex].sep_words_property.separateWordsProperty = separateWordsProperty
      propertys = propertys.map(item => {
        return {
          name: item.label,
          symbol: item.value
        }
      })
      articles[showIndex].showPro = unformatWithProperty(separateWordsProperty, propertys)
      dispatch({
        type: "SET_SEP_WORDS_PRO",
        sepWordsPro: {
          ...state.sepWordsPro,
          articles
        }
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FooterBtn_UI)