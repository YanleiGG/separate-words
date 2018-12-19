import * as React from "react";
import { Layout, Modal, Radio, Tag, Tooltip } from "antd";
import { connect } from "react-redux";
import store from '../../../../state/store'
import FooterBtn from './FooterBtn'
import HeaderNav from '../HeaderNav'

const { Content, Footer } = Layout;
const RadioGroup = Radio.Group

class SepWords extends React.Component {
  render() {
    let {
      pickWords, articles, showIndex, visible, 
      modalCancel, modalOk, radioChange, radioValue, 
      propertys, labels, colors } = this.props
    let showPro = articles.length > 0 ? articles[showIndex].showPro : []
    return (
      <Layout>
        <Layout style={{ marginLeft: '200px' }}>
          <HeaderNav/>
          <div style={{ padding: '10px 15px 0px' }}>
            { colors.map((item, index) => <Tag key={index} color={item}>{labels[index]}</Tag>) }
          </div>
          <Content onMouseUp={pickWords} style={{ padding: '15px', fontSize: '20px' }} id="content">
            {showPro.map((i, index) => {
              let color = colors[labels.indexOf(i.label)]
              return (
                <span key={index+'content'} style={{display: 'inline-block'}}>
                  { i.type ?
                    <Tooltip title={i.label}>
                      <span key={index+'tips'} id={index} style={{color}}>{i.content}</span>
                    </Tooltip>
                    : <span key={index+'tips'} id={index} style={{color}}>{i.content}</span> }
                </span>
              )
            })}
          </Content>
          <Footer>
            <FooterBtn/>
          </Footer>
          <Modal
            title="选择实体类型"
            visible={visible}
            onOk={modalOk}
            onCancel={modalCancel}
            okText="确认"
            cancelText="取消"
          >
            <RadioGroup onChange={radioChange} value={radioValue}>
              {propertys.map(item => {
                return <Radio key={item.value} value={item.value}>{item.label}</Radio>
              })}
            </RadioGroup>    
          </Modal>
        </Layout>
      </Layout>
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
    pickWords: () => {
      if (window.getSelection().toString()) {
        let state = store.getState()
        let start = window.getSelection().getRangeAt(0).startContainer.parentElement.id
        let end = + window.getSelection().getRangeAt(0).endContainer.parentElement.id + 1
        dispatch({
          type: "SET_EMOTION",
          emotion: {
            ...state.emotion,
            visible: true,
            start,
            end
          }
        })
        window.getSelection().removeAllRanges()
      }
    },
    modalOk: () => {
      let state = store.getState()
      let {articles, showIndex, start, end, radioValue, propertys} = state.emotion
      for (let i = start; i < end; i++) {
        articles[showIndex].showPro[i].type = radioValue
        let property = propertys.find(item => item.value === radioValue)
        articles[showIndex].showPro[i].label = property ? property.label : '无'
      }
      console.log(articles[showIndex].showPro)
      dispatch({
        type: "SET_EMOTION",
        emotion: {
          ...state.emotion,
          articles,
          visible: false
        }
      })
    },
    modalCancel: () => {
      let state = store.getState()
      dispatch({
        type: "SET_EMOTION",
        emotion: {
          ...state.emotion,
          visible: false
        }
      })
    },
    radioChange: e => {
      let state = store.getState()
      dispatch({
        type: "SET_EMOTION",
        emotion: {
          ...state.emotion,
          radioValue: e.target.value
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SepWords)