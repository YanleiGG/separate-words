import React from 'react'
import { Menu, Icon, Tooltip } from 'antd';

const { SubMenu } = Menu;

class SiderNav extends React.Component {
  getData = (data) => {
    const { handleClick, deleteConfirm } = this.props
    return data.map(i => {
      if (i.child) {
        return <SubMenu key={i.id} title={<span>{ i.title }</span>}>{ this.getData(i.child) }</SubMenu>
      } else {
        return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >{ i.title }<Tooltip placement="top" title="删除"><Icon onClick={deleteConfirm} style={{float: 'right', marginTop: '8%'}} type="delete" /></Tooltip></Menu.Item>
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

export default SiderNav