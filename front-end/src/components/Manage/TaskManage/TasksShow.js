import React from 'react'
import { path } from '../../../config'
import { Row, Col, Select, message, Table, Button } from 'antd'
import { connect } from "react-redux"
import store from '../../../state/store'
import axios from 'axios'

const Option = Select.Option;
const { Column } = Table;

class TasksShow extends React.Component {
  componentWillMount() {
    this.props.created()
  }
  render() {
    let { taskTypeChange, data, tasksRefresh } = this.props
    console.log(data, 'data')
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
            <Button style={{float: 'right'}} onClick={tasksRefresh}>刷新</Button>
          </Col>
          <Col span={20}>
            <Table dataSource={data} locale={{ emptyText: '暂无任务' }}>
              <Column title="任务名称" rowKey={(record)=> record.id+"name"} dataIndex="name"/>
              <Column title="任务说明" rowKey={(record)=> record.id+"instruction"} dataIndex="instruction"/>
              <Column title="任务类别" rowKey={(record)=> record.id+"type"} dataIndex="type"/>
              <Column title="任务状态" rowKey={(record)=> record.id+"state"} dataIndex="state"/>
              <Column title="标签集合" rowKey={(record)=> record.id+"labels"} dataIndex="labels"/>
              <Column title="标注人员" rowKey={(record)=> record.id+"users"} dataIndex="users"/>
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
      refresh('all')
    },
    tasksRefresh: () => {
      let {type} = store.getState().tasks
      refresh(type)
    },
    taskTypeChange: async value => {
      refresh(value)
    }
  }
}

async function refresh(value) {
  let state = store.getState()
  if (value === 'all') {
      let res = await axios.get(`${path}/api/task`)
      if (res.data.code === 0) {
        let data = format(res)
        store.dispatch({
          type: "SET_TASKS",
          tasks: {
            ...state.tasks,
            data,
            type: value
          }
        })
      } else {
        message.error('获取任务信息失败！')
      }
    } else {
      let res = await axios.get(`${path}/api/task/${value}`)
      if (res.data.code === 0) {
        let data = format(res)
        store.dispatch({
          type: "SET_TASKS",
          tasks: {
            ...state.tasks,
            data,
            type: value
          }
        })
      } else {
        message.error('获取任务信息失败！')
      }
      console.log(res)
    }
}

function format (res) {
  let data = res.data.tasks
  data.forEach(item => {
    console.log(item)
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
          labels += index === item.types.length-1 ? item.entitiesGroup.name : item.entitiesGroup.name + '、'
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
  console.log(data)
  return data
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksShow)