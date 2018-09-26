import React from 'react'
import { path } from '../../../config'
import { Row, Col, Select, message, Table, Popconfirm } from 'antd'
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
    let { data, refresh, deleteUser } = this.props
    return (
      <div style={{textAlign: 'left'}}>
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
                  <Popconfirm title="确认删除吗?" onConfirm={() => deleteUser(record.id)} okText="确认" cancelText="取消">
                  <a href="#">删除</a>
                </Popconfirm>
                )}
              />
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}

let refresh = async () => {
  let state = store.getState()
  let res = await axios.get(`${path}/api/user`)
  res.data.data.forEach(item => {
    item.roleName = item.roles.map((i, index) => {
      return index === item.roles.length-1 ? i.name : i.name + '、'
    })
  })
  if (res.data.code === 0) {
    store.dispatch({
      type: 'SET_USERS',
      users: {
        ...state.users,
        data: res.data.data
      }
    })
  }
  console.log(res.data.data)
}

let mapStateToProps = state => {
  return state.users
}

let mapDispatchToProps = dispatch => {
  return {
    created: async () => {
      refresh()
    },
    deleteUser: async (id) => {
      let res = await axios({
        url: `${path}/api/user`,
        method: 'delete',
        data: { id }
      })
      refresh()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksShow)