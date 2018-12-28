import React from 'react'
import { path } from '../../../config'
import { Row, Col, Input, Select, Button, message } from 'antd'
import { connect } from "react-redux";
import store from '../../../state/store'
import axios from 'axios'

const Option = Select.Option;

class CreateTask extends React.Component {
  componentWillMount() {
    this.props.created()
  }

  render() {
    let { nameChange, create, cancel, authChange, passwordChange, auths } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>账号：</div>
            <Input onChange={nameChange}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>密码：</div>
            <Input type='password' onChange={passwordChange}></Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={10} push={7}>
            <div style={{ marginBottom: '10px' }}>权限：</div>
            <Select 
              style={{ width: '100%' }} 
              onChange={authChange}
              mode="multiple"
            >
              {auths.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px', textAlign: 'center' }}>
          <Col span={10} push={7}>
            <Button onClick={ create } type="primary">创建</Button>
            <Button onClick= { cancel } type="primary" style={{ marginLeft: '20px'}}>取消</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.createUser
  }
}

let mapDispatchToProps = dispatch => {
  return {
    created: async () => {
      let res = await axios.get(`${path}/api/role`)
      let {createUser} = store.getState()
      dispatch({
        type: 'SET_CREATE_USER',
        createUser: {
          ...createUser,
          auths: res.data.data
        }
      })
    },
    nameChange: e => {
      let {createUser} = store.getState()
      dispatch({
        type: 'SET_CREATE_USER',
        createUser: {
          ...createUser,
          username: e.target.value
        }
      })
    },
    authChange: value => {
      let {createUser} = store.getState()
      dispatch({
        type: 'SET_CREATE_USER',
        createUser: {
          ...createUser,
          selectAuthIds: value
        }
      })
    },
    passwordChange: e => {
      let {createUser} = store.getState()
      dispatch({
        type: 'SET_CREATE_USER',
        createUser: {
          ...createUser,
          password: e.target.value
        }
      })
    },
    create: async () => {
      let { createUser } = store.getState()
      let { username, password, selectAuthIds } = createUser
      if (!username || !password || !selectAuthIds.length>0) return message.info('请将所有内容填写完整!', 1.5)
      let tips = message.loading('创建中...')
      let res = await axios.post(`${path}/api/user`, { username, password, selectAuthIds })
      message.destroy(tips)
      if (res.data.code == 0) {
        message.success('创建成功!', 1.5)
      } else {
        message.error(res.data.msg, 1.5)
      }
    },
    cancel: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)