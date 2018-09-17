import React from 'react'
import { Row, Col, Input, Select, message, Table } from 'antd'
import { connect } from "react-redux"
import store from '../../../../state/store'
import axios from 'axios'

const Option = Select.Option;
const { Column } = Table;

class TasksShow extends React.Component {
  componentWillMount() {
    this.props.created()
  }
  render() {
    let { taskTypeChange, data } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row type='flex' justify='space-around' style={{ marginBottom: '15px', textAlign: 'left' }}>
          <Col span={20}>
            <Select 
              style={{ width: '20%', marginBottom: '15px' }} 
              onChange={taskTypeChange} 
              placeholder="标签类型" 
              defaultValue='all'
            >
              <Option value="all">全部</Option>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
          </Col>
          <Col span={20}>
            <Table dataSource={data}>
              <Column title="任务名称" key="name" dataIndex="name"/>
              <Column title="任务说明" key="instruction" dataIndex="instruction"/>
              <Column title="任务类别" key="type" dataIndex="type"/>
              <Column title="任务状态" key="state" dataIndex="state"/>
              <Column title="标签集合" key="labels" dataIndex="labels"/>
              <Column title="标注人员" key="users" dataIndex="users"/>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return state.tasks
}

let mapDispatchToProps = dispatch => {
  return {
    created: async () => {
      let state = store.getState()
      let res = await axios.get(`${state.path}/api/task`)
      if (res.data.code === 0) {
        let data = res.data.tasks
        data.forEach(item => {
          let type = ''
          let users = ''
          let labels = ''
          item.types.forEach((i, index) => {
            type += index === item.types.length-1 ? i.name : i.name + '、'
            switch (i.symbol) {
              case "separateWordsProperty": {
                labels += index === item.types.length-1 ? item.wordsPropertyGroup.name : item.wordsPropertyGroup.name + '、'
                break;
              }
              case "markEntity": {
                labels += index === item.types.length-1 ? item.markEntityGroup.name : item.markEntityGroup.name + '、'
                break;
              }
              default: break;
            }
          })
          item.users.forEach((i, index) => {
            users += index === item.users.length-1 ? i.name : i.name + '、'
          })
          item.type = type
          item.users = users
          item.labels = labels
        })
        dispatch({
          type: "SET_TASKS",
          tasks: {
            ...state.tasks,
            data
          }
        })
        console.log(data)
      } else {
        message.error('获取任务信息失败！')
      }
    },
    taskTypeChange: value => {
      console.log(value)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksShow)