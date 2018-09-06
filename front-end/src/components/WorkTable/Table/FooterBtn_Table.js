import { unformatWithoutProperty, formatWithProperty, unformatWithProperty , formatWithoutProperty, refresh } from '../../../util' 
import FooterBtn_UI from '../FooterBtn_UI'
import { connect } from "react-redux";
import { message } from 'antd'

import store from '../../../state/store'
import axios from 'axios'

let mapAllStateToProps = state => {
  return state
};
let mapDispathToFooterBtn = dispatch => {
  return {
    save: async () => {
      let tips = message.loading('Saving...')
      let state = store.getState()
      let article = JSON.parse(JSON.stringify(state.showArticle))
      article.separateWords = formatWithoutProperty(article.separateWords)
      article.separateWordsProperty = formatWithProperty(article.separateWordsProperty)
      article.markEntity = formatWithoutProperty(article.markEntity)
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
        separateWordsProperty: unformatWithProperty(article.content, article.separateWordsProperty, state.typeArr),
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

export default connect(mapAllStateToProps, mapDispathToFooterBtn)(FooterBtn_UI)