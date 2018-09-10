import React from 'react'
import { connect } from "react-redux";
import { Tabs } from 'antd';
import Labels from './Labels'
import CreateLabels from './CreateLabels'

const TabPane = Tabs.TabPane;

class LabelManage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="2" style={{ textAlign: 'center' }}>
        <TabPane tab="标签总览" key="1">
          <Labels/>
        </TabPane>
        <TabPane tab="创建标签集合" key="2">
          <CreateLabels/>
        </TabPane>
      </Tabs>
    )
  }
}
  
export default LabelManage