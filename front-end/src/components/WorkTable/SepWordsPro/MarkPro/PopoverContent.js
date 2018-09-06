import React from 'react'
import { Row, Col, Radio } from 'antd'
import { connect } from "react-redux"
import store from '../../../../state/store'

const RadioGroup = Radio.Group

class PopoverContent extends React.Component {
  render () {
    let { options, selectedProperty, optionsChange } = this.props
    return (
      <Row style={{width: 400}}>
        <RadioGroup options={options} onChange={optionsChange} value={selectedProperty} />
      </Row>
    )
  }
}

let mapStateToProps = state => {
  return {
    options: state.sepWordsPro.propertys,
    selectedProperty: state.sepWordsPro.selectedProperty
  }
}

let mapDispatchToProps = dispatch => {
  let state = store.getState()
  return {
    optionsChange: e => {
      dispatch({ type: "SET_SEP_WORDS_PRO", sepWordsPro: {
        ...state.sepWordsPro,
        selectedProperty: e.target.value
      }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopoverContent)