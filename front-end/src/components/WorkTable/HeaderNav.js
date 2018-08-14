import * as React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: '64px', marginLeft: '150px' }}
      >
          <Menu.Item key="1">
            <Link to='/WorkTable/separate-words'>
              <Icon type="pie-chart" />
              <span>分词</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/WorkTable/mark-entity'>
              <Icon type="pie-chart" />
              <span>标注实体</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/WorkTable/separate-words-property'>
              <Icon type="pie-chart" />
              <span>划分词性</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to='/WorkTable/class-list'>
              <Icon type="plus-circle-o" />
              <span>分类管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to='/WorkTable/create-article'>
              <Icon type="plus-circle-o" />
              <span>添加文章</span>
            </Link>
          </Menu.Item>
      </Menu>
    )
  }
}

export default Navigation