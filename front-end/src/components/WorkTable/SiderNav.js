import React from 'react'
import { Layout, Menu, Icon, Tooltip } from 'antd';
import { Pagination } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

class SiderNav extends React.Component {
  getArticles = (articles) => {
    const { handleClick, deleteConfirm } = this.props
    if (articles[0] && articles[0].child) {
      return articles.map(i => {return <SubMenu key={ i.id } title={<span>{ i.title }</span>}>{ i.child ? ( i.child.child ? this.getArticles(articles) : i.child.map(item => { return <Menu.Item key={ item.id }>{item.title}</Menu.Item> })) : null }</SubMenu>})
    } else {
      return articles.map(item => { return <Menu.Item key={ item.id } onClick={() => handleClick(item.id)}>{item.title}<Tooltip placement="top" title="删除"><Icon onClick={deleteConfirm} style={{float: 'right', marginTop: '8%'}} type="delete" /></Tooltip></Menu.Item>})
    }
  }

  render () {
    let { articles, selectedKeys, pageChange, totalCount } = this.props
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys = { selectedKeys }
        >
          {this.getArticles(articles)}
        </Menu>
        <Pagination style={{marginTop: "-60px"}} onChange={ pageChange } defaultCurrent={1} total={totalCount} simple />
      </Sider>
    )    
  }
}

export default SiderNav