import React from 'react'
import { Row, Col, Input, Select } from 'antd'
import { connect } from "react-redux";
import store from '../../../../state/store'

const Option = Select.Option;

class CreateTask extends React.Component {
  render() {
    let { nameChange, instructionChange, typeChange, labels, labelChange } = this.props
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
              {labels.map(item => <Option key={item.value} value={item.value}>{item.content}</Option>)}
            </Select>
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
    typeChange: value => {
      let createTask = store.getState().createTask
      dispatch({ 
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          type: value
        }
      })
    },
    labelChange: value => {
      console.log(value)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)