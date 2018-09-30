import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import { connect } from "react-redux";
import store from '../../state/store'
import { Link, Route, Redirect } from "react-router-dom";
import Manage from '../Manage'
import User from '../User'
import ictImg from '../../assets/ict.png'
import './home.css'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu

class Home extends React.Component {
  render() {
    let { collapsed, toggle } = this.props

    return (
      <Layout id="home">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div>
            <img style={{height: '32px',margin: '16px'}} src={ictImg}/>
            {collapsed ? null : <span className="title">分词系统</span>}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['6']}>
            <Menu.Item key="6">
              <Link to='/user/myTasks'>
                <Icon type="bars" theme="outlined" />
                <span>我的任务</span>
              </Link>
            </Menu.Item>
            <SubMenu key="sub1" title={
              <span>
                <Icon type="user" theme="outlined" />
                <span>用户管理</span>
              </span>
            }>
              <Menu.Item key="11">
                <Link to="/manage/user/users">用户总览</Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link to="/manage/user/create">创建用户</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={
                <span>
                  <Icon type="solution" theme="outlined" />
                  <span>任务管理</span>
                </span>
            }>
              <Menu.Item key="21">
                <Link to="/manage/task/tasks">任务总览</Link>
              </Menu.Item>
              <Menu.Item key="22">
                <Link to="/manage/task/createTask">创建任务</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={
                <span>
                  <Icon type="tags" theme="outlined" />
                  <span>标签管理</span>
                </span>
            }>
              <Menu.Item key="31">
                <Link to='/manage/label/labels'>标签总览</Link>
              </Menu.Item>
              <Menu.Item key="32">
                <Link to='/manage/label/createLabels'>创建标签集合</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <Icon type="database" theme="outlined" />
              <span>数据管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280 }}>
            <Route path='/manage' render={props => {
              return store.getState().isLogin ? <Manage {...props}/> : <Redirect to="/login" />
            }}/>
            <Route path='/user' render={props => {
              return store.getState().isLogin ? <User {...props}/> : <Redirect to="/login" />
            }}/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

let mapAllStateToProps = state => {
  return state.home
}
let mapDispatchToApp = dispatch => {
  return {
    toggle: () => {
      let state = store.getState()
      dispatch({
        type: "SET_HOME",
        home: {
          ...state.home,
          collapsed: !state.home.collapsed
        }
      })
    }
  }
}

export default connect(mapAllStateToProps, mapDispatchToApp)(Home)