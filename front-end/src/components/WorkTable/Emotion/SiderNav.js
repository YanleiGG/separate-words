import React from 'react'
import { Menu, Icon, Tooltip } from 'antd';

class SiderNav_UI extends React.Component {
  render () {
    let { siderNavData, selectedKeys, handleClick } = this.props
    return (
      <Menu
        mode="inline"
        style={{ height: '100%' }}
        selectedKeys = { selectedKeys }
      >
        {siderNavData.map(i => {
          return <Menu.Item  onClick={() => handleClick(i.id)} key={i.id} >
            { i.title }
          </Menu.Item>
        })}
      </Menu>
    )
  }
}

export default SiderNav_UI