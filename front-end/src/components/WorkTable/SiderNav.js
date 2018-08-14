import React from 'react'
import { Menu, Icon, Tooltip } from 'antd';

const { SubMenu } = Menu;

class SiderNav extends React.Component {
  getData = (data) => {
    const { handleClick, deleteConfirm } = this.props
    if (data[0] && data[0].child) {
      return data.map(i => {return <SubMenu key={ i.id } title={<span>{ i.title }</span>}>{ i.child ? ( i.child.child ? this.getData(data) : i.child.map(item => { return <Menu.Item key={ item.id }>{item.title}</Menu.Item> })) : null }</SubMenu>})
    } else {
      return data.map(item => { return <Menu.Item key={ item.id } onClick={() => handleClick(item.id)}>{item.title}<Tooltip placement="top" title="删除"><Icon onClick={deleteConfirm} style={{float: 'right', marginTop: '8%'}} type="delete" /></Tooltip></Menu.Item>})
    }
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