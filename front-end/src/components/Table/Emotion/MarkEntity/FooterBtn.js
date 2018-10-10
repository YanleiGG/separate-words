import React from 'react'
import store from '../../../../state/store'
import { connect } from "react-redux";
import { formatWithProperty } from '../../../../util'
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
      let { showIndex, articles } = state.emotion
      let article = articles[showIndex]
      article.state = 'completed'
      let tips = message.loading('提交中...')
      let res = await axios.put(`${path}/api/article`, article)
      let siderNavData = articles.map(item => {
        return {
          id: item.id,
          title: item.title || '无标题',
          state: item.state
        }
      })
      message.destroy(tips)
      if (res.data.code == 0) {
        articles[showIndex] = article
        dispatch({
          type: "SET_EMOTION",
          emotion: {
            ...state.emotion,
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
      let {showIndex, articles} = state.emotion
      let article = articles[showIndex]
      article.emotion.markEntity = formatWithProperty(article.showPro)
      let tips = message.loading('保存中...')
      let res = await axios.post(`${state.path}/api/emotion`, { ...article })
      console.log(res)
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('保存成功!', 1.5)
      } else {
        message.error('保存失败!', 1.5)
      }
    },
    cancel: async () => {
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FooterBtn_UI)