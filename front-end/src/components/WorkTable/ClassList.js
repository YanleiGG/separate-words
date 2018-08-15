import * as React from "react";
import { Layout, message, Menu, Icon, Tooltip   } from "antd";

const { Content } = Layout;
const { SubMenu } = Menu;

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
      </Layout>
    )
  }
}