import React from 'react'
import { Row, Col, Input, Select, Button } from 'antd'
import { connect } from "react-redux";
import store from '../../../../state/store'

const Option = Select.Option;

class CreateTask extends React.Component {
  render() {
    let { labels, nameChange, create, cancel, typeChange, symbolChange } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>标签类型：</div>
            <Select style={{ width: '100%' }} onChange={typeChange}>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>名称：</div>
            <Input onChange={nameChange}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>标签代号：</div>
            <Input onChange={symbolChange}></Input>
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
  }
}

let mapDispatchToProps = dispatch => {
  let {createLabel} = store.getState()
  return {
    nameChange: e => {
      dispatch({
        type: 'SET_CREATE_LABEL',
        createLabel: {
          ...createLabel,
          name: e.target.value
        }
      })
    },
    typeChange: value => {
      let {createLabel} = store.getState()
      dispatch({
        type: 'SET_CREATE_LABEL',
        createLabel: {
          ...createLabel,
          type: value
        }
      })
    },    
    create: () => {},
    cancel: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)