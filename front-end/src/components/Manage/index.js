import * as React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import TaskManage from './TaskManage'
import UserManage from './UserManage'
import LabelManage from './LabelManage'
import DataManage from './DataManage'

class Manage extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Switch>
          <Route path='/manage/task' component={ TaskManage }></Route>
          <Route path='/manage/user' component={ UserManage }></Route>
          <Route path='/manage/label' component={ LabelManage }></Route>
          <Route path='/manage/data' component={ DataManage }></Route>
        </Switch>
      </Layout>
    );
  }
}

let mapAllStateToProps = state => {
  return state
};
let mapDispatchToApp = dispatch => {
  return {
  }
}

export default connect(mapAllStateToProps, mapDispatchToApp)(Manage) 