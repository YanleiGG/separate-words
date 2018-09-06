import React from 'react'
import { Menu, Icon, Tooltip, Modal, message } from 'antd';
import { refresh } from '../../../util' 
import store from '../../../state/store'
import axios from 'axios'
import { connect } from "react-redux";

class SiderNav_UI extends React.Component {
  render () {
    let { SiderNavData, selectedKeys, handleClick } = this.props
    return (
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys = { selectedKeys }
        >
          {data.map(i => {
            return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >{ i.title }</Menu.Item>
          })}
        </Menu>
    )
  }
}

let mapDispatchToSiderNav = dispatch => {
  return {
    handleClick: id => {
      let state = store.getState()
      let showArticle = state.articles.find(item => item.id == id)
      dispatch({ type: "SET_SHOWARTICLE", showArticle })
      dispatch({ type: "SET_SELECTED_KEYS", selectedKeys: [id.toString()]})
    },
  }
}

let mapStateToProps = state => {
  return {
    ...state,
    SiderNavData: state.articles
  }
};

export default connect(mapStateToProps, mapDispatchToSiderNav)(SiderNav_UI)