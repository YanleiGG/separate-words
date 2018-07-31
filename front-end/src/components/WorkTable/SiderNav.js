import React from 'react'
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

class SiderNav extends React.Component {
  getArticles = (articles) => {
    const { handleClick } = this.props
    if (articles[0].child) {
      return articles.map(i => {return <SubMenu key={ i.id } title={<span>{ i.title }</span>}>{ i.child ? ( i.child.child ? this.getArticles(articles) : i.child.map(item => { return <Menu.Item key={ item.id }>{item.title}</Menu.Item> })) : null }</SubMenu>})
    } else {
      return articles.map(item => { return <Menu.Item key={ item.id } onClick={() => handleClick(item.id)}>{item.title}</Menu.Item>})
    }
  }

  render () {
    let { articles } = this.props
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          {this.getArticles(articles)}
        </Menu>
      </Sider>
    )    
  }
}

export default SiderNav