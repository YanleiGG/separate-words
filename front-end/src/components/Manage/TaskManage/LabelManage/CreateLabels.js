import React from 'react'
import { path } from '../../../../config'
import { Row, Col, Input, Select, Button, message } from 'antd'
import { connect } from "react-redux";
import store from '../../../../state/store'
import axios from 'axios'

const Option = Select.Option;

class CreateLabels extends React.Component {
  render() {
    let { labelsSelectChange, labels, nameChange, create, cancel, typeChange } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>标签集合类型：</div>
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
            <div style={{ marginBottom: '10px' }}>标签集合名称：</div>
            <Input onChange={nameChange}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>所含标签：</div>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              onChange={labelsSelectChange}
            >
            { labels.map(item => <Option key={item.name}>{item.name}</Option>) }
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
  return {
    labels: state.createLabels.labels
  }
}

let mapDispatchToProps = dispatch => {
  return {
    labelsSelectChange: value => {
      let {createLabels} = store.getState()
      dispatch({
        type: 'SET_CREATE_LABELS',
        createLabels: {
          ...createLabels,
          labelsValue: value
        }
      })
    },
    nameChange: e => {
      let {createLabels} = store.getState()
      dispatch({
        type: 'SET_CREATE_LABELS',
        createLabels: {
          ...createLabels,
          name: e.target.value
        }
      })
    },
    typeChange: async value => {
      let state = store.getState(), url = '', {createLabels} = state
      if (value === 'separateWordsProperty') url = `${path}/api/words_property`
      if (value === 'markEntity') url = `${path}/api/entities`
      let res = await axios.get(url)
      dispatch({
        type: 'SET_CREATE_LABELS',
        createLabels: {
          ...createLabels,
          type: value,
          labels: res.data.data
        }
      })
    },
    symbolChange: e => {
      let {createLabels} = store.getState()
      dispatch({
        type: 'SET_CREATE_LABELS',
        createLabels: {
          ...createLabels,
          symbol: e.target.value
        }
      })
    },
    create: async () => {
      let state = store.getState(), url = '', {createLabels} = state
      let {type, labelsValue, name} = createLabels
      if (!type || !name || labelsValue.length == 0) return message.info('请将所有内容填写完整!', 1.5)
      if (type === 'separateWordsProperty') url = `${path}/api/words_property_group`
      if (type === 'markEntity') url = `${path}/api/entities_group`
      let tips = message.loading('创建中...')
      let res = await axios.post(url, { name, labels: labelsValue })
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('创建成功!', 1.5)
      } else {
        message.error(res.data.msg, 1.5)
      }
    },
    cancel: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLabels)