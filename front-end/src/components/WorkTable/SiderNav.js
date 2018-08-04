import React from 'react'
import { Layout, Menu } from 'antd';
import { Pagination } from 'antd';

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
    let { articles, selectedKeys, pageChange, totalCount } = this.props
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          style={{ height: '80%' }}
          selectedKeys = { selectedKeys }
        >
          {this.getArticles(articles)}
        </Menu>
        <Pagination onChange={ pageChange } defaultCurrent={1} total={totalCount} simple />
      </Sider>
    )    
  }
}

export default SiderNav