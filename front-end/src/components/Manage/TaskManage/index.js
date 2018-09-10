import React from 'react'
import { connect } from "react-redux";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import HeaderNav from './HeaderNav'
import Tasks from './Tasks'
import LabelManage from './LabelManage'

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
              <Route path='/manage/task/tasks' component={ Tasks }></Route>
              <Route path='/manage/task/labels' component={ LabelManage }></Route>
            </Switch>
          </Layout>
        </Content>
      </Layout>
    )
  }
}

export default TaskManage