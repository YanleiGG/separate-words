import * as React from "react";
import { Layout, Menu, Icon, Tooltip, Modal, Input  } from "antd";
import axios from 'axios'
import store from '../../state/store'
import { connect } from "react-redux";

const { SubMenu } = Menu;
const confirm = Modal.confirm;

class ClassList_UI extends React.Component {
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
                  { i.added ? <Tooltip placement="top" title="添加"><Icon onClick={ e => { e.stopPropagation(); return openAddModal(i.id) } } type="plus" /></Tooltip> : null }
                  { i.deleted ? <Tooltip placement="top" title="删除"><Icon onClick={ e => { e.stopPropagation(); return deleteConfirm(i.id, i.content) } } type="delete" /></Tooltip> : null }
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

let mapStateToClassList = state => {
  return state
}

let mapDispatchToClassList = dispatch => {
  return {
    refresh: async () => {
      let state = store.getState()
      let res = await axios.get(`${state.path}/api/class`)
      let classData =  res.data.data
      dispatch({ type: "SET_CLASS_DATA", classData })
    },
    deleteConfirm: async (id, content) => {
      let state = store.getState()
      confirm({
        title: '确认删除吗?',
        content,
        async onOk() {
          let res = await axios({
            method: 'delete',
            url: `${state.path}/api/class`,
            data: { id }
          })
          console.log(res)
          res = await axios.get(`${state.path}/api/class`)
          let classData =  res.data.data
          dispatch({ type: "SET_CLASS_DATA", classData })
        },
        onCancel() {}
      });
    },
    openAddModal: (id) => {
      dispatch({ type: "SET_ADD_CLASS_ID", addClassId: id })
      dispatch({ type: "SET_ADD_CLASS_VISIBLE", addClassVisible: true })
    },
    handleOk: async () => {
      let state = store.getState()
      let content = state.addClassInputValue
      if (content == '') return
      let parentId = state.addClassId
      let res = await axios.post(`${state.path}/api/class`, { content, parentId })
      dispatch({ type: "SET_ADD_CLASS_VISIBLE", addClassVisible: false })
      res = await axios.get(`${state.path}/api/class`)
      let classData =  res.data.data
      dispatch({ type: "SET_CLASS_DATA", classData })
      dispatch({ type: "SET_ADD_CLASS_INPUT_VALUE", addClassInputValue: ''})
    },
    handleCancel: () => dispatch({ type: "SET_ADD_CLASS_VISIBLE", addClassVisible: false }),
    addClassInputOnChange: e => dispatch({ type: "SET_ADD_CLASS_INPUT_VALUE", addClassInputValue: e.target.value })
  }
}

let ClassList = connect(mapStateToClassList, mapDispatchToClassList)(ClassList_UI)

export default ClassList