import React from 'react'
import { path } from '../../../../config'
import { Row, Col, Input, Select, message, Table, Button } from 'antd'
import { connect } from "react-redux"
import store from '../../../../state/store'
import axios from 'axios'

const Option = Select.Option;
const { Column } = Table;

class TasksShow extends React.Component {
  componentWillMount() {
    this.props.created()
  }
  render() {
    let { data, refresh } = this.props
    return (
      <div style={{textAlign: 'left', marginTop: '50px'}}>
        <Row type='flex' justify='space-around' style={{ marginBottom: '15px', textAlign: 'left' }}>
          <Col span={16}>
            <Table dataSource={data}>
              <Column title="用户名" key="name" dataIndex="name"/>
              <Column title="用户权限" key="auth" dataIndex="auth"/>
              <Column 
                title="操作" 
                key="action" 
                dataIndex="action"
                render={(text, record) => (
                  <span>
                    {record}
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return state.tasks
}

let mapDispatchToProps = dispatch => {
  return {
    created: () => {
    },
    refresh: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksShow)