import FooterBtn_UI from '../../../public/FooterBtn_UI'
import store from '../../../../state/store'
import { connect } from "react-redux";
import { formatWithProperty } from '../../../../util'
import axios from 'axios'
import { message } from 'antd'

let mapStateToProps = state => {
  return {}
}

let mapDispatchToProps = dispatch => {
  return {
    save: async () => {
      let state = store.getState()
      let { showIndex, articles } = state.markEntity
      let showPro = articles[showIndex].showPro
      let mark_entity = articles[showIndex].mark_entity || {}
      mark_entity.markEntity = formatWithProperty(showPro)
      let tips = message.loading('保存中...')
      let res
      console.log(mark_entity)
      res = await axios.post(`${state.path}/api/mark_entity`, { ...mark_entity, articleId: articles[showIndex].id })
      console.log(res)
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('保存成功!', 1.5)
        if(!articles[showIndex].mark_entity) articles[showIndex].mark_entity = {id: res.data.data.id}
        if(!articles[showIndex].mark_entity.id) articles[showIndex].mark_entity.id = res.data.data.id
        dispatch({
          type: "SET_SEP_WORDS_PRO",
          markEntity: {
            ...state.markEntity,
            articles
          }
        })
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