import React from 'react'
import { Card, Select, Row, Col, Button, message } from 'antd';
import { connect } from "react-redux";
import store from '../../../../state/store'
import axios from 'axios'

const Option = Select.Option;

class FooterTable_UI extends React.Component {
  render () {
    let { perspectiveChange, attitudeChange, degreeChange, emotionChange, save, cancel, showIndex, articles, focusChangeValue, emotionTypes } = this.props
    let perspective = articles.length > 0 ? articles[showIndex].emotion.perspective : null
    let attitude = articles.length > 0 ? articles[showIndex].emotion.attitude : null
    let emotion = articles.length > 0 ? articles[showIndex].emotion.emotion : null
    let degree = articles.length > 0 ?  articles[showIndex].emotion.degree : null
    return (
        <Card style={{ height: "100%" }}>
          <Row style={{ height: "100%", textAlign: 'center' }} justify='space-around'>
            <Col span={6}>
              <span>分类：</span>
              <Select
                style={{ width: "50%", marginBottom: '20px', display: 'inline-block' }} 
                onChange={perspectiveChange}
                value={ perspective }
              >
                <Option value="subjective" key="subjective">主观句</Option>
                <Option value="objective" key="objective">客观句</Option>
                <Option value="disabled" key="disabled">无法判断</Option>
              </Select>
            </Col>
            <Col span={6}>
              <span>极性分类：</span>
              <Select
                style={{ width: "50%", marginBottom: '20px', display: 'inline-block' }} 
                onChange={attitudeChange}
                value = { attitude }
              >
                {emotionTypes.map(item => <Option value={item.symbol} key={item.symbol}>{item.name}</Option>)}
              </Select>            
            </Col>
            <Col span={6}>
              <span>情绪识别：</span>
              <Select 
                style={{ width: "50%", marginBottom: '20px', display: 'inline-block' }} 
                onChange={emotionChange}
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
            </Col>
            <Col span={6}>
              <span>情感强度：</span>
              <Select 
                style={{ width: "50%", marginBottom: '20px', display: 'inline-block' }} 
                onChange={degreeChange}
                value = { degree }
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="disabled">无法判断</Option>
              </Select>       
            </Col>
        </Row>
        <Row style={{textAlign: 'center'}}>
          <Button onClick={ save } type="primary">保存</Button>
          <Button onClick= { cancel } type="primary" style={{ marginLeft: '20px'}}>取消</Button>
        </Row>
      </Card>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.emotion
  }
}

let mapDispatchToProps = dispatch => {
  return {
    perspectiveChange: value => {
      let state = store.getState()
      let {showIndex, articles, focusChangeValue} = state.emotion
      articles[showIndex].emotion.perspective = value
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        articles,
        focusChangeValue: !focusChangeValue
      }})
    },
    attitudeChange: value => {
      let state = store.getState()
      let {showIndex, articles, focusChangeValue} = state.emotion
      articles[showIndex].emotion.attitude = value
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        articles,
        focusChangeValue: !focusChangeValue
      }})
    },
    degreeChange: value => {
      let state = store.getState()
      let {showIndex, articles, focusChangeValue} = state.emotion
      articles[showIndex].emotion.degree = value
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        articles,
        focusChangeValue: !focusChangeValue
      }})
    },
    emotionChange: value => {
      let state = store.getState()
      let {showIndex, articles, focusChangeValue} = state.emotion
      articles[showIndex].emotion.emotion = value
      dispatch({ type: "SET_EMOTION", emotion: {
        ...state.emotion,
        articles,
        focusChangeValue: !focusChangeValue
      }})
    },
    save: async () => {
      let state = store.getState()
      let {showIndex, articles} = state.emotion
      let article = articles[showIndex]
      let tips = message.loading('保存中...')
      let res = await axios.post(`${state.path}/api/emotion`, { ...article })
      console.log(res)
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterTable_UI)