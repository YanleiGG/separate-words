import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import { connect } from "react-redux";
import store from '../../state/store'
import { Link, Route, Redirect } from "react-router-dom";
import Manage from '../Manage'
import User from '../User'
import ictImg from '../../assets/ict.png'
import './home.css'
import axios from 'axios'
import { path } from '../../config'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu

class Home extends React.Component {
  async componentWillMount() {
    let state = store.getState()
    // 获取用户信息
    let {id} = state.user
    let res = await axios.get(`${path}/api/user/${id}`)
    store.dispatch({
      type: 'SET_USER',
      user: {
        id: res.data.id,
        name: res.data.name,
        roles: res.data.roles
      }
    })
    console.log('userInfo' ,res)
    // 设置左侧菜单栏展出样式
    let pathname = window.location.pathname
    let openKeys
    if (pathname === '/manage/user/users' || pathname === '/manage/user/create') openKeys = ['userManage']
    if (pathname === '/manage/task/tasks' || pathname === '/manage/task/createTask') openKeys = ['taskManage']
    if (pathname === '/manage/label/labels' || pathname === '/manage/label/createLabel' || pathname === '/manage/label/createLabels') openKeys = ['labelManage']
    store.dispatch({
      type: "SET_HOME",
      home: {
        ...state.home,
        selectedKeys: [pathname],
        openKeys
      }
    })
  }

  render() {
    let { collapsed, toggle, selectedKeys, onSelect, openKeys, onOpenChange, roles } = this.props
    let markPermission, userManagePermission, dataManagePermission, taskAndLabelManagePermission
    if (roles) {
      markPermission = roles.some(item => item.name === '任务标注')
      userManagePermission = roles.some(item => item.name === '用户管理')
      dataManagePermission = roles.some(item => item.name === '数据管理')
      taskAndLabelManagePermission = roles.some(item => item.name === '任务及标签管理')
    }
    
    return (
      <Layout id="home">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div>
            <img style={{height: '32px',margin: '16px'}} src={ictImg}/>
            {collapsed ? null : <span className="title">自然语言标注系统</span>}
          </div>
          <Menu theme="dark" mode="inline" 
            openKeys={openKeys} 
            selectedKeys={selectedKeys} 
            onSelect={onSelect} 
            onOpenChange={onOpenChange}
          >
            { markPermission ? 
              <Menu.Item key="/user/myTasks">
                <Link to='/user/myTasks'>
                  <Icon type="bars" theme="outlined" />
                  <span>我的任务</span>
                </Link>
              </Menu.Item> 
            : null }
            { userManagePermission ? 
              <SubMenu key="userManage" title={
                <span>
                  <Icon type="user" theme="outlined" />
                  <span>用户管理</span>
                </span>
              }>
                <Menu.Item key="/manage/user/users">
                  <Link to="/manage/user/users">用户总览</Link>
                </Menu.Item>
                <Menu.Item key="/manage/user/create">
                  <Link to="/manage/user/create">创建用户</Link>
                </Menu.Item>
              </SubMenu>
            : null }
            { taskAndLabelManagePermission ? 
              <SubMenu key="taskManage" title={
                  <span>
                    <Icon type="solution" theme="outlined" />
                    <span>任务管理</span>
                  </span>
              }>
                <Menu.Item key="/manage/task/tasks">
                  <Link to="/manage/task/tasks">任务总览</Link>
                </Menu.Item>
                <Menu.Item key="/manage/task/createTask">
                  <Link to="/manage/task/createTask">创建任务</Link>
                </Menu.Item>
              </SubMenu>
            : null}
            { taskAndLabelManagePermission ? 
              <SubMenu key="labelManage" title={
                  <span>
                    <Icon type="tags" theme="outlined" />
                    <span>标签管理</span>
                  </span>
              }>
                <Menu.Item key="/manage/label/labels">
                  <Link to='/manage/label/labels'>标签总览</Link>
                </Menu.Item>
                <Menu.Item key="/manage/label/createLabel">
                  <Link to='/manage/label/createLabel'>创建标签</Link>
                </Menu.Item>
                <Menu.Item key="/manage/label/createLabels">
                  <Link to='/manage/label/createLabels'>创建标签集合</Link>
                </Menu.Item>
              </SubMenu> 
            : null }
            { dataManagePermission ? 
              <Menu.Item key="/manage/data">
                <Link to='/manage/data'>
                  <Icon type="database" theme="outlined" />
                  <span>数据管理</span>
                </Link>
              </Menu.Item> 
            : null }
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
  return {
    ...state.home,
    ...state.user
  }
}
let mapDispatchToApp = dispatch => {
  return {
    toggle: () => {
      let state = store.getState()
      dispatch({
        type: "SET_HOME",
        home: {
          ...state.home,
          collapsed: !state.home.collapsed,
          openKeys: []
        }
      })
    },
    onSelect: (item) => {
      let state = store.getState()
      store.dispatch({
        type: "SET_HOME",
        home: {
          ...state.home,
          selectedKeys: [item.key]
        }
      })
    },
    onOpenChange: (openKeys) => {
      let state = store.getState()
      store.dispatch({
        type: "SET_HOME",
        home: {
          ...state.home,
          openKeys: openKeys
        }
      })
    }
  }
}

export default connect(mapAllStateToProps, mapDispatchToApp)(Home)