import React from 'react'
import { path } from '../../../config'
import { Row, Col, Select, message, Table, Button, Modal } from 'antd'
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
    let { taskTypeChange, data, startTask, stateModalVisible, stateModalOk, stateModalCancel, stateCellClick, taskModalStateChange, modalTaskState, history, type } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row type='flex' justify='space-around' style={{ marginBottom: '15px', textAlign: 'left' }}>
          <Col span={22}>
            <Select 
              style={{ width: '20%', marginBottom: '15px' }} 
              onChange={taskTypeChange} 
              placeholder="标签类型" 
              defaultValue={type}
            >
              <Option value="all">全部</Option>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
          </Col>
          <Col span={22}>
            <Table dataSource={data} locale={{ emptyText: '暂无任务' }} bordered>
              <Column title="任务名称" rowKey={(record)=> record.id+"name"} dataIndex="name"/>
              <Column title="任务说明" rowKey={(record)=> record.id+"instruction"} dataIndex="instruction"/>
              <Column title="任务类别" rowKey={(record)=> record.id+"type"} dataIndex="type"/>
              <Column 
                title="任务状态" 
                rowKey={(record)=> record.id+"state"} 
                dataIndex="state" onCellClick={(record) => stateCellClick(record.id, record.state)}
                style={{ cursor: 'pointer' }}
              />
              <Column title="标签集合" rowKey={(record)=> record.id+"labels"} dataIndex="labels"/>
              <Column title="标注人员" rowKey={(record)=> record.id+"users"} dataIndex="users"/>
              <Column 
                title="操作" 
                key="action" 
                dataIndex="action"
                render={(text, record) => (
                  <span>
                    <a onClick={() => startTask(record.id, record.types[0].symbol, history)}>查看详情</a>
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
        <Modal
          title="设置任务状态"
          visible={stateModalVisible}
          onOk={stateModalOk}
          onCancel={stateModalCancel}
          defaultValue={modalTaskState}
        >
          <Select 
            style={{ width: '20%', marginBottom: '15px' }} 
            onChange={taskModalStateChange} 
            placeholder="任务状态" 
          >
            <Option value="进行中">进行中</Option>
            <Option value="已完成">已完成</Option>
            <Option value="已终止">已终止</Option>
          </Select>
        </Modal>
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
    stateModalOk: async () => {
      let state = store.getState()
      let { data, modalTaskId, modalTaskState, type } = state.tasks
      if (!modalTaskState) return message.error('请选择任务状态！')
      let task = data.find(item => item.id === modalTaskId)
      task.state = modalTaskState
      let res = await axios.put(`${path}/api/task`, { ...task })
      if (res.data.code === 0) {
        dispatch({
          type: "SET_TASKS",
          tasks: {
            ...state.tasks,
            stateModalVisible: false,
          }
        })
        refresh(type)
      } else {
        message.error('修改失败，请重试！')
      }
    },
    stateModalCancel: () => {
      let state = store.getState()
      dispatch({
        type: "SET_TASKS",
        tasks: {
          ...state.tasks,
          stateModalVisible: false,
        }
      })
    },
    stateCellClick: (id, taskState) => {
      let state = store.getState()
      dispatch({
        type: "SET_TASKS",
        tasks: {
          ...state.tasks,
          stateModalVisible: true,
          modalTaskId: id,
          modalTaskState: taskState
        }
      })
    },
    taskModalStateChange: (value) => {
      let state = store.getState()
      dispatch({
        type: "SET_TASKS",
        tasks: {
          ...state.tasks,
          modalTaskState: value
        }
      })
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
        case "emotion": {
          labels += index === item.types.length-1 ? item.emotionTypeGroup.name : item.emotionTypeGroup.name + '、'
          break;
        }
        case "contentType": {
          labels += index === item.types.length-1 ? item.contentLabelGroup.name : item.contentLabelGroup.name + '、'
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