import * as React from "react";
import { Menu, Icon, Layout, Button, Dropdown } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

class HeaderNav_UI extends React.Component {
  render() {
    let { headerNavData } = this.props
    if (!headerNavData) headerNavData = { data: [] }   // 这里后面重构好了得删掉
    return (
      <Header style={{
        padding: 0,
      }}>
        <Menu
          mode="horizontal"
          style={{ 
            lineHeight: '64px', 
            position: 'fixed', 
            zIndex: 1, 
            width: '100%',
          }}
        >
          {headerNavData.data.map((item, index) => {
            return  <Menu.Item key={item.key}>
              <Link to={ item.path }>
                <Icon type="pie-chart" />
                <span>{ item.name }</span>
              </Link>
            </Menu.Item>
          })}
          <Dropdown overlay={
            <Menu>
              <Menu.Item>
                <Link to='/user/myTasks'>首页</Link>
              </Menu.Item>
            </Menu>
          }>
            <Button icon='ellipsis' size='small'></Button>
          </Dropdown>
        </Menu>
      </Header>
    )
  }
}

export default HeaderNav_UI