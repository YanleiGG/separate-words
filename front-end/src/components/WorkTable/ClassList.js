import * as React from "react";
import { Layout, message, Menu, Icon, Tooltip   } from "antd";
import FooterBtn_UI from './FooterBtn'
import store from '../../state/store'
import { connect } from "react-redux";
import axios from 'axios'

const { Footer } = Layout;
const { SubMenu } = Menu;

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
    cancel: async () => {
    }
  }
}
let mapAllStateToProps = state => {
  return {
    ...state
  }
};

let FooterBtn = connect(mapAllStateToProps, mapDispathToFooterBtn)(FooterBtn_UI)

export default class ClassList extends React.Component {
  getData = (data) => {
    const { deleteConfirm } = this.props
    return data.map(i => {
      if (i.child) {
        return (<SubMenu key={i.id} title={<span>{ i.title }</span>}>
          { this.getData(i.child) }
        </SubMenu>)
      } else {
        return <Menu.Item key={i.id}>{ i.title }</Menu.Item>
      }
    })
  }

  render () {
    let { classData } = this.props
    return (
      <Layout style={{ padding: "20px" }}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
        >
          {this.getData(classData)}
        </Menu>
        <Footer>
          <FooterBtn></FooterBtn>
        </Footer>
      </Layout>
    )
  }
}