import React from 'react'
import { connect } from "react-redux";
import { Table, Row, Col } from 'antd'
import axios from 'axios'
import store from '../../../../state/store'

const { Column } = Table;

class LabelAndLabels extends React.Component {
  componentWillMount () {
    this.props.labelRefresh()
  }

  render() {
    let { labels, label } = this.props

    return (
      <div>
        <Row>
          
        </Row>
        <Row type='flex' justify='space-around'>
          <Col span={10}>
            <Table dataSource={labels.data}>
              <Column
                title="标签名称"
                dataIndex="name"
                key="name"
              />
              <Column
                title="标签代号"
                dataIndex="symbol"
                key="symbol"
              />
            </Table>
          </Col>
          <Col span={10}>
            <Table dataSource={label.data}>
              <Column
                title="标签集合名称"
                dataIndex="name"
                key="name"
              />
              <Column
                title="操作"
              />
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
      let {label} = state.labelAndLabels
      let res = await axios.get(`${state.path}/api/${label.type}?offset=0&pageSize=10`)
      console.log(res)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelAndLabels)