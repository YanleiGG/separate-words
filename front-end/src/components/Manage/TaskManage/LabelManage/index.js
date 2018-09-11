import React from 'react'
import { connect } from "react-redux";
import { Tabs } from 'antd';
import LabelAndLabels from './LabelAndLabels'
import CreateLabels from './CreateLabels'
import CreateLabel from './CreateLabel'

const TabPane = Tabs.TabPane;

class LabelManage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" style={{ textAlign: 'center' }}>
        <TabPane tab="总览" key="1">
          <LabelAndLabels/>
        </TabPane>
        <TabPane tab="创建标签" key="2">
          <CreateLabel/>
        </TabPane>
        <TabPane tab="创建标签集合" key="3">
          <CreateLabels/>
        </TabPane>
      </Tabs>
    )
  }
}
  
export default LabelManage