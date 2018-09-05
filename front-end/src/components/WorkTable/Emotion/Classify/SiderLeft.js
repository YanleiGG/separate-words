import React from 'react'
import { Menu, Icon, Tooltip } from 'antd';
import { connect } from "react-redux";
import store from '../../../../state/store'

class SiderLeft_UI extends React.Component {
  render () {
    let { SiderLeftData, selectedKeys, handleClick } = this.props
    return (
      <Menu
        mode="inline"
        style={{ height: '100%' }}
        selectedKeys = { selectedKeys }
      >
        {SiderLeftData.map(i => {
          return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >
            { i.title }
          </Menu.Item>
        })}
      </Menu>
    )
  }
}

let mapStateToSiderLeft = state => {
  return {
    ...state,
    SiderLeftData: state.emotion.SiderLeftData,
    totalCount: state.emotion.totalCount,
    selectedKeys: state.emotion.selectedKeys,
  }
}

let mapDispatchToSiderLeft = dispatch => {
  return {
    handleClick: id => {
      let state = store.getState()
      let data = state.emotion.emotions
      let showIndex = data.findIndex(item => {
        return item.article.id === id
      })
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        showIndex,
        selectedKeys: [data[showIndex].article.id.toString()]
      }})
    }
  }
}

export default connect(mapStateToSiderLeft, mapDispatchToSiderLeft)(SiderLeft_UI)