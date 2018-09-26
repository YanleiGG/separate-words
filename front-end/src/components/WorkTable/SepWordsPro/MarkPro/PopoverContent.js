import React from 'react'
import { Row, Col, Radio } from 'antd'
import { connect } from "react-redux"
import store from '../../../../state/store'

const RadioGroup = Radio.Group

class PopoverContent extends React.Component {
  render () {
    let { propertys, index, optionsChange, articles, showIndex } = this.props
    let showPro = articles[showIndex].showPro
    return (
      <Row style={{width: 400}}>
        <RadioGroup name="radiogroup" defaultValue={showPro[index].type} onChange={optionsChange.bind(this, index)}>
          {propertys.map(item => {
            return <Col span={6} key={item.value}>
                    <Radio key={item.value} value={item.value}>
                        { item.label }
                    </Radio>            
                  </Col>
          })}
        </RadioGroup>
      </Row>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.sepWordsPro
  }
}

let mapDispatchToProps = dispatch => {
  let state = store.getState()
  return {
    optionsChange: (index, e) => {
      let state = store.getState()
      let showIndex = state.sepWordsPro.showIndex
      let articles = state.sepWordsPro.articles
      articles[showIndex].showPro[index].type = e.target.value
      dispatch({ type: "SET_SEP_WORDS_PRO", sepWordsPro: {
        ...state.sepWordsPro,
        articles
      }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopoverContent)