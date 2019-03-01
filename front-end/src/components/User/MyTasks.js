import React from 'react'
import { path } from '../../config'
import { Row, Col, Select, message, Table, Button, Popconfirm } from 'antd'
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
    let { taskTypeChange, data, tasksRefresh, startTask, user, type, deleteTask } = this.props
    if (!user.name) return null
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
            <Button style={{float: 'right'}} onClick={tasksRefresh}>刷新</Button>
          </Col>
          <Col span={22}>
            <Table dataSource={data} locale={{ emptyText: '暂无任务' }} bordered>
              <Column title="任务名称" key="nameMyTask" dataIndex="name"/>
              <Column title="任务说明" key="instructionMyTask" dataIndex="instruction"/>
              <Column title="任务类别" key="typeMyTask" dataIndex="type"/>
              <Column title="任务状态" key="stateMyTask" dataIndex="state"/>
              <Column title="标签集合" key="labelsMyTask" dataIndex="labels"/>
              <Column title="标注人员" key="usersMyTask" dataIndex="users"/>
              <Column 
                title="操作"
                key="actionMyTask" 
                dataIndex="action"
                render={(text, record) => (
                  <span>
                    {record.state === '进行中' ? <a onClick={() => startTask(record.id, record.types[0].symbol, this.props.history)}>开始任务</a> : null}
                    <Popconfirm 
                      title="确认删除吗?" 
                      onConfirm={() => deleteTask(record.id)} 
                      okText="确认" 
                      cancelText="取消"
                    >
                      <a href="#" style={{marginLeft: '10px'}}>删除</a>
                    </Popconfirm> 
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
  return {
    ...state.tasks,
    user: state.user
  }
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
    },
    async deleteTask (taskId) {
      const res = await axios({
        url: `${path}/api/task`,
        method: 'put',
        data: {
          id: taskId,
          deleted: 1
        }
      })
      if (res.data.code === 0) {
        message.success('删除成功！', 1.5)
        refresh('all')
      } else {
        message.error('删除失败！', 1.5)
        refresh('all')
      }
    }
  }
}

async function refresh(value) {
  let timer
  // id的更新可能有延时，设置一个interval来不断监听它
  timer = setInterval(async ()=>{
    let state = store.getState()
    let {id, name} = state.user
    if (!id) return
    clearInterval(timer)
    let tips = message.loading('获取数据中...', 10)
    let res
    // 管理员账号直接获取全部任务
    if (name === 'admin') {
      if (value === 'all') {
        res = await axios.get(`${path}/api/task`)
      } else {
        res = await axios.get(`${path}/api/task/${value}`)
      }
    } else {
      if (value === 'all') {
        res = await axios.get(`${path}/api/task/user/${id}`)
      } else {
        res = await axios.get(`${path}/api/task/${value}/user/${id}`)
      }
    }
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
    } else {
      message.error('获取任务信息失败！', 1.5)
    }
  }, 50)
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