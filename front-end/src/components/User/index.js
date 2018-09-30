import React from 'react'
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import MyTasks from './MyTasks'

const { Content } = Layout;

class TaskManage extends React.Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Layout style={{ minHeight: '90vh', marginTop: '15px' }}>
            <Switch>
              <Route path='/user/myTasks' component={ MyTasks }></Route>
            </Switch>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default TaskManage