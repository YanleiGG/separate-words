import React from 'react'
import UploadInput from './UploadInput'
import { Row, Col, Input, Select, Button, message } from 'antd'
import { path } from '../../../config'
import { connect } from "react-redux"
import store from '../../../state/store'
import axios from 'axios'

const Option = Select.Option

class CreateDocs extends React.Component {
  render() {
    let { docsNameChange, create, cancel, typeChange } = this.props
    return (
      <div>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>上传语料：</div>
            <UploadInput/>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>语料名称：</div>
            <Input onChange={docsNameChange}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8} push={8}>
            <div style={{ marginBottom: '10px' }}>语料类型：</div>
            <Select style={{ width: '100%' }} onChange={typeChange}>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
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
  return state.createDocs
}

let mapDispatchToProps = dispatch => {
  return {
    docsNameChange: e => {
      let state = store.getState()
      dispatch({
        type: 'SET_CREATE_DOCS',
        createDocs: {
          ...state.createDocs,
          docsName: e.target.value
        }
      })
    },
    typeChange: value => {
      let state = store.getState()
      dispatch({
        type: 'SET_CREATE_DOCS',
        createDocs: {
          ...state.createDocs,
          docsType: value
        }
      })
    },
    create: async () => {
      let state = store.getState()
      let name = state.createDocs.docsName, 
          pathName = state.createDocs.docsPathName, 
          type = state.createDocs.docsType
      if (!name || !pathName || !type) {
        message.error('请将所有内容填写完整!', 1.5)
        return
      }
      let tips = message.loading('创建中...')
      let res = await axios.post(`${path}/api/docs`, { name, pathName, type })
      message.destroy(tips)
      if (res.data.code === 0) {
        message.success('创建成功!', 1.5)
      } else {
        message.error(res.data.msg, 1.5)
      }
    },
    cancel: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocs) 