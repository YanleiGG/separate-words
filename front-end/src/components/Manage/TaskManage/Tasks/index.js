import React from 'react'
import { Tabs } from 'antd';
import CreateTask from './CreateTask'
import TasksShow from './TasksShow'

const TabPane = Tabs.TabPane;

class LabelManage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" style={{ textAlign: 'center' }}>
        <TabPane tab="任务总览" key="1">
          <TasksShow/>
        </TabPane>
        <TabPane tab="创建任务" key="2">
          <CreateTask/>
        </TabPane>
      </Tabs>
    )
  }
}

export default LabelManage