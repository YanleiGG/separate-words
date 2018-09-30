import React from 'react'
import { Card, Select, InputNumber, Slider, Row, Col, Button, message } from 'antd';
import { connect } from "react-redux";
import store from '../../../../state/store'
import axios from 'axios'

const Option = Select.Option;

class SiderRight_UI extends React.Component {
  render () {
    let { perspectiveChange, attitudeChange, degreeChange, emotionChange, save, cancel, showIndex, emotions } = this.props
    let perspective = emotions.length > 0 ? emotions[showIndex].perspective : null
    let attitude = emotions.length > 0 ? emotions[showIndex].attitude : null
    let emotion = emotions.length > 0 ? emotions[showIndex].emotion : null
    let degree = emotions.length > 0 ? Number(emotions[showIndex].degree) : null
    return (
      <Row style={{ height: "100%", textAlign: 'center' }}>
        <Card style={{ height: "100%" }}>
          <Select 
            style={{ width: 300, marginBottom: '20px' }} 
            onChange={perspectiveChange}
            placeholder="分类"
            value={ perspective }
          >
            <Option value="subjective">主观句</Option>
            <Option value="objective">客观句</Option>
            <Option value="disabled">无法判断</Option>
          </Select>
          <Select 
            style={{ width: 300, marginBottom: '20px' }} 
            onChange={attitudeChange}
            placeholder="极性分类"
            value = { attitude }
          >
            <Option value="pos">正面</Option>
            <Option value="neg">负面</Option>
            <Option value="neutral">中性/无明显情感</Option>
            <Option value="disabled">无法判断</Option>
          </Select>
          <Col span={4}></Col>
          <Col span={12}>
            <Slider 
              min={1} 
              max={5} 
              onChange={degreeChange} 
              value={degree} 
              style={{marginLeft: '-20px', marginRight: '10px'}}
            />
          </Col>
          <Col span={5}>
            <InputNumber
                min={1}
                max={5}
                value={degree}
                onChange={degreeChange}
                placeholder='情感强度'
                style={{ marginBottom: '20px' }} 
            />
          </Col>
          <Select 
            style={{ width: 300, marginBottom: '20px' }} 
            onChange={emotionChange}
            placeholder="情绪识别"
            value = { emotion }
          >
            <Option value="happy">喜</Option>
            <Option value="anger">怒</Option>
            <Option value="sorrow">哀</Option>
            <Option value="pleased">乐</Option>
            <Option value="amazing">惊</Option>
            <Option value="fear">惧</Option>
            <Option value="disabled">无法判断</Option>
          </Select>
          <div style={{textAlign: 'center'}}>
            <Button onClick={ save } type="primary">确认</Button>
            <Button onClick= { cancel } type="primary" style={{ marginLeft: '20px'}}>取消</Button>
          </div>
        </Card>
      </Row>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state,
    ...state.emotion
  }
}

let mapDispatchToProps = dispatch => {
  return {
    perspectiveChange: value => {
      let state = store.getState()
      let showIndex = state.emotion.showIndex
      let emotions = state.emotion.emotions
      emotions[showIndex].perspective = value
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        emotions
      }})
    },
    attitudeChange: value => {
      let state = store.getState()
      let showIndex = state.emotion.showIndex
      let emotions = state.emotion.emotions
      emotions[showIndex].attitude = value
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        emotions
      }})
    },
    degreeChange: value => {
      let state = store.getState()
      let showIndex = state.emotion.showIndex
      let emotions = state.emotion.emotions
      emotions[showIndex].degree = value
      if (Number(value) > 5) value = 5
      if (Number(value) < 1) value = 1
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        emotions
      }})
    },
    emotionChange: value => {
      let state = store.getState()
      let showIndex = state.emotion.showIndex
      let emotions = state.emotion.emotions
      emotions[showIndex].emotion = value
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        emotions
      }})
    },
    save: async () => {
      let state = store.getState()
      let { showIndex } = state.emotion
      let data = state.emotion.emotions[showIndex]
      let tips = message.loading('保存中...')
      let res = await axios.put(`${state.path}/api/emotion`, data)
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('保存成功!', 1.5)
      } else {
        message.error('保存失败!', 1.5)
      }   
    },
    cancel: () => {
      let state = store.getState()
    //   dispatch({ type: "SET_EMOTION", emotion: {
    //     ...state.emotion,
    //     degree: '',
    //     emotion: '',
    //     attitude: '',
    //     perspective: ''
    //   }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderRight_UI)