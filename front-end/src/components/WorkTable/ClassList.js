import * as React from "react";
import { Layout, Menu, Icon, Tooltip, Modal, Input  } from "antd";

const { SubMenu } = Menu;

export default class ClassList extends React.Component {
  componentWillMount () {
    const { refresh } = this.props
    refresh()
  }

  getData = (data) => {
    const { deleteConfirm, openAddModal } = this.props
    return data.map(i => {
      if (i.child.length > 0 || i.parentId === 0) {
        return <SubMenu key={i.id} title={<span>{ i.content }
                <span style={{float: 'right'}}>
                  { i.added ? <Tooltip placement="top" title="添加"><Icon type="plus" /></Tooltip> : null }
                  { i.deleted ? <Tooltip placement="top" title="删除"><Icon onClick={ () => deleteConfirm(i.id, i.content) } type="delete" /></Tooltip> : null }
                </span></span>}>
                { this.getData(i.child) }
               </SubMenu>
      } else {
        return <Menu.Item key={i.id}>{ i.content }
                <span style={{float: 'right'}}>
                  { i.added ? <Tooltip placement="top" title="添加"><Icon onClick={ () => openAddModal(i.id) } type="plus" /></Tooltip> : null }
                  { i.deleted ? <Tooltip placement="top" title="删除"><Icon onClick={ () => deleteConfirm(i.id, i.content) } type="delete" /></Tooltip> : null }
                </span>
              </Menu.Item>
      }
    })
  }

  render () {
    let { classData, addClassVisible, handleOk, handleCancel, addClassInputValue, addClassInputOnChange } = this.props
    return (
      <Layout style={{ padding: "3% 20%" }}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys = { null }
        >
          { this.getData(classData) }
        </Menu>
        <Modal
          title="添加分类"
          visible={ addClassVisible }
          onOk={ handleOk }
          onCancel={ handleCancel }
          cancelText = "取消"
          okText = "确认"
        >
          <Input value = { addClassInputValue } onChange = { addClassInputOnChange } placeholder="输入子分类的名称"></Input>
        </Modal>
      </Layout>
    )
  }
}