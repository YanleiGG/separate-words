import React from 'react'
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import TasksShow from './TasksShow'
import CreateTask from './CreateTask'

const { Header, Content } = Layout;

class TaskManage extends React.Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Layout style={{ minHeight: '90vh' }}>
            <Switch>
              <Route path='/manage/task/tasks' component={ TasksShow }></Route>
              <Route path='/manage/task/createTask' component={ CreateTask }></Route>
            </Switch>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default TaskManage