import * as React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

class HeaderNav extends React.Component {
  render() {
    let { headerNavData } = this.props
    if (!headerNavData) headerNavData = { data: [] }   // 这里后面重构好了得删掉
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: '64px', marginLeft: '150px' }}
      >
        {headerNavData.data.map(item => {
          return  <Menu.Item key={item.key}>
            <Link to={ item.path }>
              <Icon type="pie-chart" />
              <span>{ item.name }</span>
            </Link>
          </Menu.Item>
        })}
      </Menu>
    )
  }
}

export default HeaderNav