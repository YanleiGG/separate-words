import React from 'react'
import { connect } from "react-redux";
import { Tabs } from 'antd';
import CreateTask from './CreateTask'

const TabPane = Tabs.TabPane;

class LabelManage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="2" style={{ textAlign: 'center' }}>
        <TabPane tab="任务总览" key="1">
        </TabPane>
        <TabPane tab="创建任务" key="2">
          <CreateTask/>
        </TabPane>
      </Tabs>
    )
  }
}

export default LabelManage