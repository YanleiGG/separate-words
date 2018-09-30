import FooterBtn_UI from '../../../public/FooterBtn_UI'
import store from '../../../../state/store'
import { connect } from "react-redux";
import { formatWithoutProperty, showContentToShowPro, formatWithProperty } from '../../../../util'
import axios from 'axios'
import { message } from 'antd'

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
      console.log(res)
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
    cancel: async () => {
      let state = store.getState()
      let { showIndex, articles } = state.sepWordsPro
      console.log(articles[showIndex])
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FooterBtn_UI)