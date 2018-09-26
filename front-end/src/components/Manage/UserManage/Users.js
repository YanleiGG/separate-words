import React from 'react'
import { path } from '../../../config'
import { Row, Col, Input, Select, message, Table, Button } from 'antd'
import { connect } from "react-redux"
import store from '../../../state/store'
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
              <Column title="用户权限" key="id" dataIndex="roleName"/>
              <Column 
                title="操作" 
                key="action" 
                dataIndex="action"
                render={(text, record) => (
                  <span>
                    {1}
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
  return state.users
}

let mapDispatchToProps = dispatch => {
  return {
    created: async () => {
      let state = store.getState()
      let res = await axios.get(`${path}/api/user`)
      res.data.data.forEach(item => {
        item.roleName = item.roles.map((i, index) => {
          return index === item.roles.length-1 ? i.name : i.name + '、'
        })
      })
      if (res.data.code === 0) {
        dispatch({
          type: 'SET_USERS',
          users: {
            ...state.users,
            data: res.data.data
          }
        })
      }
      console.log(res.data.data)
    },
    refresh: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksShow)