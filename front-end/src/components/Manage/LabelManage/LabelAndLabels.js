import React from 'react'
import { path } from '../../../config'
import { connect } from "react-redux";
import { Table, Row, Col, Select, Button } from 'antd'
import axios from 'axios'
import store from '../../../state/store'

const { Column } = Table;
const Option = Select.Option;

class LabelAndLabels extends React.Component {
  async componentWillMount () {
    await this.props.labelRefresh()
    await this.props.labelsRefresh()
  }

  render() {
    let { labels, label, labelTypeChange, labelsTypeChange, labelRefresh, labelsRefresh } = this.props

    return (
      <div>
        <Row type='flex' justify='space-around' style={{ marginBottom: '15px', textAlign: 'left' }}>
          <Col span={10}>
            <Select style={{ width: '50%' }} onChange={labelTypeChange} placeholder="标签类型" defaultValue='separateWordsProperty'>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
            <Button style={{float: 'right'}} onClick={labelRefresh}>刷新</Button>
          </Col>
          <Col span={10}>
            <Select style={{ width: '50%' }} onChange={labelsTypeChange} placeholder="标签集合类型" defaultValue='separateWordsProperty'>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
            <Button style={{float: 'right'}} onClick={labelsRefresh}>刷新</Button>
          </Col>
        </Row>
        <Row type='flex' justify='space-around'>
          <Col span={10}>
            <Table dataSource={label.data}>
              <Column title="标签名称" dataIndex="name" key="name"/>
              <Column title="标签代号" dataIndex="symbol" key="symbol"/>
            </Table>
          </Col>
          <Col span={10}>
            <Table dataSource={labels.data}>
              <Column title="标签集合名称" dataIndex="name" key="name"/>
              <Column title="所含标签" render={(text, record) => (
                <div>
                  { record.words_propertys ? record.words_propertys.map((item, index, arr) => {
                      return index === arr.length-1 ? item.name : item.name + '、'
                  }) : null }
                  { record.entities ? record.entities.map((item, index, arr) => {
                      return index === arr.length-1 ? item.name : item.name + '、'
                  }) : null }        
                </div>
              )}/>
            </Table>
          </Col>
        </Row>        
      </div>
    )
  }
}

let mapStateToProps = state => {
  return state.labelAndLabels
}

let mapDispatchToProps = dispatch => {
  return {
    labelRefresh: async () => {
      let state = store.getState()
      let value = state.labelAndLabels.label.type, url = `${path}/api/words_property`
      if (value === 'markEntity') url = `${path}/api/entities`
      let res = await axios.get(url)
      res.data.data.forEach(item => {
        item.key = item.id
      })
      dispatch({
        type: 'SET_LABEL_AND_LABELS',
        labelAndLabels: {
          ...state.labelAndLabels,
          label: {
            ...state.label,
            data: res.data.data
          }
        }
      })
    },
    labelTypeChange: async value => {
      let state = store.getState(), url = `${path}/api/words_property`
      if (value === 'markEntity') url = `${path}/api/entities`
      let res = await axios.get(url), data = res.data.data
      data.forEach(item => {
        item.key = item.id
      })
      dispatch({
        type: 'SET_LABEL_AND_LABELS',
        labelAndLabels: {
          ...state.labelAndLabels,
          label: {
            ...state.labelAndLabels.label,
            type: value,
            data
          }
        }
      })
    },
    labelsRefresh: async () => {
      let state = store.getState()
      let value = state.labelAndLabels.labels.type, url = `${path}/api/words_property_group`
      if (value === 'markEntity') url = `${path}/api/entities_group`
      let res = await axios.get(url)
      console.log(res)
      let data = res.data.data
      data.forEach(item => {
        item.key = item.id
      })
      dispatch({
        type: 'SET_LABEL_AND_LABELS',
        labelAndLabels: {
          ...state.labelAndLabels,
          labels: {
            ...state.labelAndLabels.labels,
            data
          }
        }
      })
    },
    labelsTypeChange: async value => {
      let state = store.getState(), url = `${path}/api/words_property_group`
      if (value === 'markEntity') url = `${path}/api/entities_group`
      let res = await axios.get(url), data = res.data.data
      console.log(res)
      data.forEach(item => {
        item.key = item.id
      })
      dispatch({
        type: 'SET_LABEL_AND_LABELS',
        labelAndLabels: {
          ...state.labelAndLabels,
          labels: {
            ...state.labelAndLabels.label,
            type: value,
            data
          }
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelAndLabels)