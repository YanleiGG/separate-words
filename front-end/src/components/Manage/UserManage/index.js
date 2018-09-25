import React from 'react'
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import HeaderNav from './HeaderNav'
import Users from './Users'

const { Header, Content } = Layout;

class TaskManage extends React.Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <HeaderNav/>
        </Header>
        <Content>
          <Layout style={{ minHeight: '90vh' }}>
            <Switch>
              <Route path='/manage/user/users' component={ Users }></Route>
            </Switch>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default TaskManage