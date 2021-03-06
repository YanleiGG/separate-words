import React from 'react'
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import Users from './Users'
import CreateUser from './CreateUser'

const { Content } = Layout;

class TaskManage extends React.Component {
  render () {
    return (
      <Layout>
        <Content>
          <Layout>
            <Switch>
              <Route path='/manage/user/users' component={ Users }></Route>
              <Route path='/manage/user/create' component={ CreateUser }></Route>
            </Switch>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default TaskManage