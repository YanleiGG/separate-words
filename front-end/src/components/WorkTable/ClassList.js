import * as React from "react";
import { Layout, message, Menu, Icon, Tooltip  } from "antd";
import FooterBtn_UI from './FooterBtn'
import store from '../../state/store'
import { connect } from "react-redux";
import axios from 'axios'

const { Footer } = Layout;
const { SubMenu } = Menu;

let mapAllStateToProps = state => {
  return {
    ...state
  }
};
let mapDispathToFooterBtn = dispatch => {
  return {
    save: async () => {
      let tips = message.loading('保存中...')
      let state = store.getState()
      let classData = store.getState().classData
      let res = await axios.put(`${state.path}/api/class`, {
        id: 1,
        single: classData[0],
        double: classData[1],
        much: classData[2]
      })
      message.destroy(tips)
      console.log(res)
      if (res.data.code == 0) {
        message.success('保存成功!', 1.5)
      } else {
        message.error('保存失败，请重试!', 1.5)
      }
    },
    cancel: async () => {}
  }
}


let FooterBtn = connect(mapAllStateToProps, mapDispathToFooterBtn)(FooterBtn_UI)

export default class ClassList extends React.Component {
  componentWillMount () {
    const { refresh } = this.props
    refresh()
  }

  getData = (data) => {
    const { deleteConfirm, addConfirm } = this.props
    return data.map(i => {
      if (i.child) {
        return <SubMenu key={i.id} title={<span>{ i.title }
                <span style={{float: 'right'}}>
                  { i.added ? <Tooltip placement="top" title="添加"><Icon type="plus" /></Tooltip> : null }
                  { i.deleted ? <Tooltip placement="top" title="删除"><Icon onClick={ () => deleteConfirm(i.id, i.title) } type="delete" /></Tooltip> : null }
                </span></span>}>
                { this.getData(i.child) }
               </SubMenu>
      } else {
        return <Menu.Item key={i.id}>{ i.title }
                <span style={{float: 'right'}}>
                  { i.added ? <Tooltip placement="top" title="添加"><Icon onClick={ () => addConfirm(i.id, i.title) } type="plus" /></Tooltip> : null }
                  { i.deleted ? <Tooltip placement="top" title="删除"><Icon onClick={ () => deleteConfirm(i.id, i.title) } type="delete" /></Tooltip> : null }
                </span>
              </Menu.Item>
      }
    })
  }

  render () {
    let { classData } = this.props
    return (
      <Layout style={{ padding: "3% 20%" }}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys = { null }
        >
          { this.getData(classData) }
        </Menu>
        <Footer>
          <FooterBtn></FooterBtn>
        </Footer>
      </Layout>
    )
  }
}