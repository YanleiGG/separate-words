import React from 'react'
import { path } from '../../../config'
import { connect } from "react-redux";
import { Table, Row, Col, Select, Button, Tree } from 'antd'
import axios from 'axios'
import store from '../../../state/store'

const { Column } = Table;
const Option = Select.Option;
const { TreeNode } = Tree;

class LabelAndLabels extends React.Component {
  async componentWillMount () {
    await this.props.refresh()
  }

  render() {
    let { labels, label, labelTypeChange, refresh, selectType } = this.props
    const loop = data => data.map((item) => {
      if (item.child) {
        return (
          <TreeNode key={item.key} title={item.title}>
            {loop(item.child)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.title} />;
    });

    return (
      <div>
        <Row type='flex' justify='space-around' style={{ marginBottom: '15px', textAlign: 'left' }}>
          <Col span={23}>
            <Select style={{ width: '25%' }} onChange={labelTypeChange} placeholder="标签类型" defaultValue={selectType}>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
          </Col>
        </Row>
        <Row type='flex' justify='space-around'>
         {label.type != 'contentType' ?           
          <Col span={8}>
              <Table dataSource={label.data} bordered>
                <Column title="标签名称" dataIndex="name" key="name"/>
                <Column title="标签代号" dataIndex="symbol" key="symbol"/>
              </Table>
            </Col> 
          : null}
          <Col span={ label.type != 'contentType' ? 15 : 23}>
            <Table dataSource={labels.data} bordered>
              <Column title="标签集合名称" dataIndex="name" key="name" width={180}/>
              <Column title="所含标签" render={(text, record) => (
                <div>
                  { record.words_propertys ? record.words_propertys.map((item, index, arr) => {
                      return index === arr.length-1 ? item.name : item.name + '、'
                  }) : null }
                  { record.entities ? record.entities.map((item, index, arr) => {
                      return index === arr.length-1 ? item.name : item.name + '、'
                  }) : null }     
                  { record.emotionTypes ? record.emotionTypes.map((item, index, arr) => {
                      return index === arr.length-1 ? item.name : item.name + '、'
                  }) : null }
                  { record.treeData ? 
                    <Tree>
                      { loop(record.treeData) }
                    </Tree>
                  : null }
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
    refresh: async () => {
      let state = store.getState()
      let value = state.labelAndLabels.label.type
      let labelUrl = `${path}/api/words_property`, labelsUrl = `${path}/api/words_property_group`
      if (value === 'markEntity') labelUrl = `${path}/api/entities`, labelsUrl = `${path}/api/entities_group`
      if (value === 'emotion') labelUrl = `${path}/api/emotionType`, labelsUrl = `${path}/api/emotionTypeGroup`
      if (value === 'contentType') {
        labelsUrl = `${path}/api/contentLabelGroup`
        let labelsRes = await axios.get(labelsUrl), labelsData = labelsRes.data.data
        labelsData.forEach(item => {
          item.key = item.id
        })
        dispatch({
          type: 'SET_LABEL_AND_LABELS',
          labelAndLabels: {
            ...state.labelAndLabels,
            label: {
              ...state.labelAndLabels.label,
              type: value,
            },
            labels: {
              ...state.labelAndLabels.labels,
              type: value,
              data: labelsData,
            },
            selectType: value
          }
        })
        return
      }
      let labelRes = await axios.get(labelUrl), labelData = labelRes.data.data
      let labelsRes = await axios.get(labelsUrl), labelsData = labelsRes.data.data
      labelData.forEach(item => {
        item.key = item.id
      })
      labelsData.forEach(item => {
        item.key = item.id
      })
      dispatch({
        type: 'SET_LABEL_AND_LABELS',
        labelAndLabels: {
          ...state.labelAndLabels,
          label: {
            ...state.labelAndLabels.label,
            type: value,
            data: labelData,
          },
          labels: {
            ...state.labelAndLabels.labels,
            type: value,
            data: labelsData,
          },
          selectType: value
        }
      })
    },
    labelTypeChange: async value => {
      let state = store.getState(), labelUrl = `${path}/api/words_property`, labelsUrl = `${path}/api/words_property_group`
      if (value === 'markEntity') labelUrl = `${path}/api/entities`, labelsUrl = `${path}/api/entities_group`
      if (value === 'emotion') labelUrl = `${path}/api/emotionType`, labelsUrl = `${path}/api/emotionTypeGroup`
      if (value === 'contentType') {
        labelsUrl = `${path}/api/contentLabelGroup`
        let labelsRes = await axios.get(labelsUrl), labelsData = labelsRes.data.data
        labelsData.forEach(item => {
          item.key = item.id
        })
        dispatch({
          type: 'SET_LABEL_AND_LABELS',
          labelAndLabels: {
            ...state.labelAndLabels,
            label: {
              ...state.labelAndLabels.label,
              type: value,
            },
            labels: {
              ...state.labelAndLabels.labels,
              type: value,
              data: labelsData,
            },
            selectType: value
          }
        })
        return
      }
      let labelRes = await axios.get(labelUrl), labelData = labelRes.data.data
      let labelsRes = await axios.get(labelsUrl), labelsData = labelsRes.data.data
      labelData.forEach(item => {
        item.key = item.id
      })
      labelsData.forEach(item => {
        item.key = item.id
      })
      dispatch({
        type: 'SET_LABEL_AND_LABELS',
        labelAndLabels: {
          ...state.labelAndLabels,
          label: {
            ...state.labelAndLabels.label,
            type: value,
            data: labelData,
          },
          labels: {
            ...state.labelAndLabels.labels,
            type: value,
            data: labelsData,
          },
          selectType: value
        }
      })
    },
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelAndLabels)