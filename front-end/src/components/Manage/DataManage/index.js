import React from 'react'
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import TasksShow from './TasksShow'
import uploadDocs from './CreateDocs'
import DocsManage from './DocsManage'

const { Content } = Layout;

class DataManage extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Layout style={{ minHeight: '90vh' }}>
            <Switch>
              <Route path='/manage/data/tasks' component={ TasksShow }></Route>
              <Route path='/manage/data/uploadDocs' component={ uploadDocs }></Route>
              <Route path='/manage/data/docs' component={ DocsManage }></Route>
            </Switch>
          </Layout>
        </Content>
      </Layout>
    )
  }
}
  
export default DataManage