import * as React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class HeaderNav extends React.Component {
  render() {
    let { headerNavData } = this.props
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

let mapStateToProps = state => {
  return {
    headerNavData: state.emotion.headerNavData
  }
}

export default connect(mapStateToProps)(HeaderNav)