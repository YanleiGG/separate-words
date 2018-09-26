import React from 'react'
import { path } from '../../../../config'
import { Row, Col, Input, Select, Button, message } from 'antd'
import { connect } from "react-redux";
import store from '../../../../state/store'
import axios from 'axios'

const Option = Select.Option;

class CreateTask extends React.Component {
  render() {
    let { nameChange, create, cancel, typeChange, symbolChange } = this.props
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
            <div style={{ marginBottom: '10px' }}>标签名称：</div>
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
  return {
    nameChange: e => {
      let {createLabel} = store.getState()
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
    symbolChange: e => {
      let {createLabel} = store.getState()
      dispatch({
        type: 'SET_CREATE_LABEL',
        createLabel: {
          ...createLabel,
          symbol: e.target.value
        }
      })
    },
    create: async () => {
      let state = store.getState(), url = ''
      let { createLabel } = store.getState()
      let { type, symbol, name } = createLabel
      if (!type || !symbol || !name) return message.info('请将所有内容填写完整!', 1.5)
      if (type === 'separateWordsProperty') url = `${path}/api/words_property`
      if (type === 'markEntity') url = `${path}/api/entities`
      let tips = message.loading('创建中...')
      let res = await axios.post(url, { symbol, name })
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('创建成功!', 1.5)
      } else {
        message.error(res.data.msg, 1.5)
      }
    },
    cancel: () => {
      dispatch({
        type: 'SET_CREATE_LABEL',
        createLabel: {
          type: '',
          name: '',
          symbol: ''
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)