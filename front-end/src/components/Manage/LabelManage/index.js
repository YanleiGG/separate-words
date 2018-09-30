import React from 'react'
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import LabelAndLabels from './LabelAndLabels'
import CreateLabels from './CreateLabels'

const { Content } = Layout;

class LabelManage extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Layout style={{ minHeight: '90vh' }}>
            <Switch>
              <Route path='/manage/label/labels' component={ LabelAndLabels }></Route>
              <Route path='/manage/label/createLabels' component={ CreateLabels }></Route>
            </Switch>
          </Layout>
        </Content>
      </Layout>
    )
  }
}
  
export default LabelManage