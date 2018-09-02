import React from 'react'
import { Menu, Icon, Tooltip, Modal, message } from 'antd';
import { refresh } from '../../../util' 
import store from '../../../state/store'
import axios from 'axios'
import { connect } from "react-redux";

const { SubMenu } = Menu;
const confirm = Modal.confirm;

class SiderNav_UI extends React.Component {
  getData = (data) => {
    const { handleClick, deleteConfirm } = this.props
    return data.map(i => {
      if (i.child) {
        return <SubMenu key={i.id} title={<span>{ i.title }</span>}>{ this.getData(i.child) }</SubMenu>
      } else {
        return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >{ i.title }<Tooltip placement="top" title="删除"><Icon onClick={ () => deleteConfirm(i.id, i.title)} style={{float: 'right', marginTop: '8%'}} type="delete" /></Tooltip></Menu.Item>
      }
    })
  }

  render () {
    let { SiderNavData, selectedKeys } = this.props
    return (
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys = { selectedKeys }
        >
          {this.getData(SiderNavData)}
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

    deleteConfirm: async (id, title) => {
      let state = store.getState()
      confirm({
        title: '确认删除吗?',
        content: title,
        async onOk() {
          let tips = message.loading('Deleting...')
          let res = await axios({
            method: 'delete',
            url: `${state.path}/api/article`,
            data: { id }
          });
          message.destroy(tips)
          if (res.data.code == 0) {
            message.success('删除成功！', 1.5)
            refresh(dispatch)
          } else {
            message.error('删除失败，请重试!', 1.5)
          }
        },
        onCancel() {},
      });
    }
  }
}

let mapStateToProps = state => {
  return {
    ...state,
    SiderNavData: state.articles
  }
};

export default connect(mapStateToProps, mapDispatchToSiderNav)(SiderNav_UI)