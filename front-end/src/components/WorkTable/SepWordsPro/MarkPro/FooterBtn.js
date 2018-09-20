import FooterBtn_UI from '../../FooterBtn_UI'
import store from '../../../../state/store'
import { connect } from "react-redux";
import { formatWithoutProperty, formatWithProperty } from '../../../../util'
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
      let showPro = articles[showIndex].showPro
      articles[showIndex].separateWordsProperty = formatWithProperty(showPro)
      let tips = message.loading('保存中...')
      let res = await axios.put(`${state.path}/api/sep_words_property`, { ...articles[showIndex]})
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('保存成功!', 1.5)
      } else {
        message.error('保存失败!', 1.5)
      }
    },
    cancel: async () => {
      console.log('cancel')
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FooterBtn_UI)