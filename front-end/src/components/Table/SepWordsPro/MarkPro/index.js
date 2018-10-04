import * as React from "react";
import { Layout, Popover, Tag, Modal, Radio } from "antd";
import { connect } from "react-redux";
import HeaderNav from '../HeaderNav'
import FooterBtn from './FooterBtn'
import store from '../../../../state/store'

const { Content, Footer } = Layout;
const RadioGroup = Radio.Group

class MarkPro extends React.Component {
  componentWillMount() {
    this.props.created()
  }
  render() {
    let { articles, showIndex, visible, modalOk, modalCancel, radioValue, radioChange, openModal, propertys} = this.props
    let showPro = articles.length > 0 ? articles[showIndex].showPro : []
    return (
      <Layout style={{marginLeft: '200px'}}>
        <HeaderNav/>
        <Content style={{ padding: '15px', fontSize: '20px' }}>
          {showPro.map((item, index) => {
            return  <div key={item.id} style={{
                // cursor:'pointer',
                display: 'inline-block',
                textAlign: 'center'                      
              }}>
                <span>{ item.content }</span>
                <br/>
                <Tag onClick={() => openModal(index)} style={{marginBottom:'10px'}} color={item.label != '无' ? "#108ee9" : "grey"}>{item.label || '无'}</Tag>
              </div>
          })}
        </Content>
        <Modal
          title="选择词性"
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
        <Footer>
          <FooterBtn/>
        </Footer>
      </Layout>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.sepWordsPro
  }
}

let mapDispatchToProps = dispatch => {
  return {
    created: async () => {
    },
    modalOk: async () => {
      let state = store.getState()
      let {articles, showIndex, wordIndex, radioValue, propertys} = state.sepWordsPro
      articles[showIndex].showPro[wordIndex].type = radioValue
      articles[showIndex].showPro[wordIndex].label = propertys.find(item => item.value === radioValue).label
      console.log(radioValue, articles[showIndex].showPro[wordIndex])
      dispatch({
        type: "SET_SEP_WORDS_PRO",
        sepWordsPro: {
          ...state.sepWordsPro,
          articles,
          visible: false
        }
      })
    },
    modalCancel: async () => {
      let state = store.getState()
      dispatch({
        type: "SET_SEP_WORDS_PRO",
        sepWordsPro: {
          ...state.sepWordsPro,
          visible: false
        }
      })
    },
    radioChange: e => {
      let state = store.getState()
      dispatch({
        type: "SET_SEP_WORDS_PRO",
        sepWordsPro: {
          ...state.sepWordsPro,
          radioValue: e.target.value
        }
      })
    },
    openModal: index => {
      let state = store.getState()
      let {articles, showIndex} = state.sepWordsPro
      console.log(articles[showIndex].showPro[index])
      dispatch({
        type: "SET_SEP_WORDS_PRO",
        sepWordsPro: {
          ...state.sepWordsPro,
          visible: true,
          radioValue: articles[showIndex].showPro[index].type,
          wordIndex: index
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkPro)