import * as React from "react";
import { Layout, Menu, Icon, Tooltip  } from "antd";

const { SubMenu } = Menu;

export default class ClassList extends React.Component {
  componentWillMount () {
    const { refresh } = this.props
    refresh()
  }

  getData = (data) => {
    const { deleteConfirm, addConfirm } = this.props
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
                  { i.added ? <Tooltip placement="top" title="添加"><Icon onClick={ () => addConfirm(i.id, i.content) } type="plus" /></Tooltip> : null }
                  { i.deleted ? <Tooltip placement="top" title="删除"><Icon onClick={ () => deleteConfirm(i.id, i.content) } type="delete" /></Tooltip> : null }
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
      </Layout>
    )
  }
}