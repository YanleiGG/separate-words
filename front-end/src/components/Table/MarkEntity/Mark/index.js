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
            { propertys.map((item, index) => <Tag key={index} color={colors[index]}>{item.label}</Tag>) }
          </div>
          <Content onMouseUp={pickWords} style={{ padding: '15px', fontSize: '20px' }} id="content">
              {showPro.map((i, index) => {
                let color = colors[propertys.findIndex(item => item.label === i.label)]
                // let showTip = !Boolean(i.type && showPro[index-1] && showPro[index-1].type != '')  
                return (
                  <span key={index+'content'} style={{display: 'inline-block'}}>
                    { i.type ?
                      <Tooltip title={i.label}>
                        <span id={index} style={{color}}>{i.content}</span>
                      </Tooltip>
                      : <span id={index} style={{color}}>{i.content}</span> }
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
    ...state.markEntity
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
          type: "SET_MARK_ENTITY",
          markEntity: {
            ...state.markEntity,
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
      let {articles, showIndex, start, end, radioValue, propertys} = state.markEntity
      for (let i = start; i < end; i++) {
        articles[showIndex].showPro[i].type = radioValue
        let property = propertys.find(item => item.value === radioValue)
        articles[showIndex].showPro[i].label = property ? property.label : '无'
      }
      console.log(articles[showIndex].showPro)
      dispatch({
        type: "SET_MARK_ENTITY",
        markEntity: {
          ...state.markEntity,
          articles,
          visible: false
        }
      })
    },
    modalCancel: () => {
      let state = store.getState()
      dispatch({
        type: "SET_MARK_ENTITY",
        markEntity: {
          ...state.markEntity,
          visible: false
        }
      })
    },
    radioChange: e => {
      let state = store.getState()
      dispatch({
        type: "SET_MARK_ENTITY",
        markEntity: {
          ...state.markEntity,
          radioValue: e.target.value
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SepWords)