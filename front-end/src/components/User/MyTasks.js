import React from 'react'
import { path } from '../../config'
import { Row, Col, Select, message, Table, Button } from 'antd'
import { connect } from "react-redux"
import store from '../../state/store'
import axios from 'axios'

const Option = Select.Option;
const { Column } = Table;

class TasksShow extends React.Component {
  componentWillMount() {
    this.props.created()
  }
  render() {
    let { taskTypeChange, data, tasksRefresh, startTask } = this.props
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
              <Column title="任务名称" key="name" dataIndex="name"/>
              <Column title="任务说明" key="instruction" dataIndex="instruction"/>
              <Column title="任务类别" key="type" dataIndex="type"/>
              <Column title="任务状态" key="state" dataIndex="state"/>
              <Column title="标签集合" key="labels" dataIndex="labels"/>
              <Column title="标注人员" key="users" dataIndex="users"/>
              <Column 
                title="操作" 
                key="action" 
                dataIndex="action"
                render={(text, record) => (
                  <span>
                    <a onClick={() => startTask(record.id, record.types[0].symbol, this.props.history)}>开始任务</a>
                  </span>
                )}
              />
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
    },
    startTask: async (id, type, history) => {
      store.dispatch({
        type: 'SET_TASK_ID',
        taskId: id
      })
      // 等待20ms, taskId完成修改后再跳转
      setTimeout(() => {
        switch(type){
          case 'separateWordsProperty': {
            history.push('/table/sepWordsPro/sepWords/'+id)
            break;
          }
          case 'markEntity': {
            history.push('/table/markEntity/'+id)
            break;
          }
          case 'emotion': {
            history.push('/table/emotion/classify/'+id)
            break;
          }
          case 'contentType': {
            history.push('/table/contentType/'+id)
            break;
          }
          default: break;
        }
      }, 20);

    }
  }
}

async function refresh(value) {
  let state = store.getState()
  let userId = state.user.id
  let tips = message.loading('获取数据中...')
  let res
  if (value === 'all') {
    res = await axios.get(`${path}/api/task/user/${userId}`)
  } else {
    res = await axios.get(`${path}/api/task/${value}/user/${userId}`)
  }
  console.log(res)
  message.destroy(tips)
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
    message.success('数据获取成功！', 1.5)
  } else {
    message.error('获取任务信息失败！', 1.5)
  }
}

function format (res) {
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
  return data
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksShow)