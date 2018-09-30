import FooterBtn_UI from '../../../public/FooterBtn_UI'
import store from '../../../../state/store'
import { connect } from "react-redux";
import { formatWithProperty, unformatWithProperty } from '../../../../util'
import axios from 'axios'
import { message } from 'antd'
import { path } from '../../../../config'

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
      res = await axios.post(`${state.path}/api/mark_entity`, { ...mark_entity, articleId: articles[showIndex].id })
      console.log(res)
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('保存成功!', 1.5)
        if(!articles[showIndex].mark_entity) articles[showIndex].mark_entity = {id: res.data.data.id}
        if(!articles[showIndex].mark_entity.id) articles[showIndex].mark_entity.id = res.data.data.id
        dispatch({
          type: "SET_MARK_ENTITY",
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
      let state = store.getState()
      let { showIndex, articles, propertys } = state.markEntity
      let id = articles[showIndex].id
      let res = await axios.get(`${path}/api/article/markEntity/${id}`)
      articles[showIndex].mark_entity.markEntity = res.data.article.mark_entity.markEntity
      propertys = propertys.map(item => {
        return {
          name: item.label,
          symbol: item.value
        }
      })
      articles[showIndex].showPro = unformatWithProperty(res.data.article.mark_entity.markEntity, propertys)
      dispatch({
        type: "SET_MARK_ENTITY",
        markEntity: {
          ...state.markEntity,
          articles
        }
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FooterBtn_UI)