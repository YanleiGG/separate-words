import React from 'react'
import { Row, Col, Input, Select } from 'antd'
import { connect } from "react-redux";
import store from '../../../../state/store'

const Option = Select.Option;

class CreateTask extends React.Component {
  render() {
    let { labelsSelectChange, labels } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>标签集合类型：</div>
            <Select style={{ width: '100%' }}>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>标签：</div>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              onChange={labelsSelectChange}
            >
            { labels.map(item => <Option key={item.label}>{item.label}</Option>) }
            </Select>
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
  let {createLabels} = store.getState()
  return {
    labelsSelectChange: value => {
      dispatch({
        type: 'SET_CREATE_LABEL',
        createLabels: {
          ...createLabels,
          labelsValue: value
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)