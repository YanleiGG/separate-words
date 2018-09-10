import * as React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

class HeaderNav_UI extends React.Component {
  render() {
    let { headerNavData } = this.props
    if (!headerNavData) headerNavData = { data: [] }   // 这里后面重构好了得删掉
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: '64px' }}
      >
        {/* <span style={style.title}>{ headerNavData.title }</span> */}
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

let style = {
  title: { 
    color: 'white',
    float: 'left',
    marginLeft: '-150px',
    fontSize: '18px'
  }
}

export default HeaderNav_UI