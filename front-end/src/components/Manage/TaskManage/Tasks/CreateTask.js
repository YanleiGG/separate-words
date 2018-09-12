import React from 'react'
import { Row, Col, Input, Select, Button, Upload, Icon, message } from 'antd'
import { connect } from "react-redux"
import store from '../../../../state/store'
import axios from 'axios'

const Option = Select.Option

const uploadProps = {
  name: 'file',
  action: `//localhost:3000/api/upload/docs`,
  withCredentials: true,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 成功上传！`)
      let state = store.getState(), {createTask} = state
      let docs = state.createTask.docs
      docs.push(info.file.response.data.fileName)
      store.dispatch({ 
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          docs
        }
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败！`)
    }
  },
  onRemove(file) {
    let state = store.getState(), {createTask} = state
    let docs = state.createTask.docs
    let name = file.response.data.fileName
    let index = docs.indexOf(name)
    docs.splice(index, 1)
    store.dispatch({
      type: 'SET_CREATE_TASK',
      createTask: {
        ...createTask,
        docs
      }
    })
  }
}

class CreateTask extends React.Component {
  render() {
    let { nameChange, instructionChange, typeChange, labels, labelChange, create, cancel } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>任务名称：</div>
            <Input onChange={nameChange}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>说明：</div>
            <Input onChange={instructionChange}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>任务类型：</div>
            <Select style={{ width: '100%' }} onChange={typeChange}>
              <Option value="separateWords">分词</Option>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>标签集合：</div>
            <Select style={{ width: '100%' }} onChange={labelChange}>
              {labels.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>上传语料：</div>
            <Upload {...uploadProps}>
              <Button  style={{ width: '100%' }}>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px', textAlign: 'center' }}>
          <Col span={10} push={7}>
            <Button onClick={ create } type="primary">创建</Button>
            <Button onClick= { cancel } type="primary" style={{ marginLeft: '20px'}}>取消</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    labels: state.createTask.labels
  }
}

let mapDispatchToProps = dispatch => {
  return {
    nameChange: e => {
      let createTask = store.getState().createTask
      dispatch({ 
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          name: e.target.value
        }
      })
    },
    instructionChange: e => {
      let createTask = store.getState().createTask
      dispatch({ 
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          instruction: e.target.value
        }
      })
    },
    typeChange: async value => {
      let state = store.getState(), path = ''
      let createTask = state.createTask
      if (value === 'separateWordsProperty') path = `${state.path}/api/words_property_group`
      if (value === 'markEntity') path = `${state.path}/api/entities_group`
      let res = await axios.get(path), data = res.data.data
      console.log(data)
      dispatch({ 
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          type: value,
          labels: data
        }
      })
    },
    labelChange: value => {
      console.log(value)
    },
    create: async () => {
      let state = store.getState()
      let {createTask} = state
      console.log(createTask)
    },
    cancel: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)