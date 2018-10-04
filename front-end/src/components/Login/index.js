import React from 'react'
import { Input, Icon, Layout, Button, message, Tabs } from 'antd';
import { connect } from "react-redux";
import store from '../../state/store'
import axios from 'axios'
import { Link } from "react-router-dom";
import ictImg from '../../assets/ict.png'
import background from '../../assets/background.png'

const { Header, Content } = Layout;
const TabPane = Tabs.TabPane

class Login extends React.Component {
  render () {
    const { login, username, password, usernameChange, passwordChange} = this.props
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header>
          <img style={{height: '32px',margin: '16px'}} src={ictImg}/>
          <span style={{ 
            position: 'absolute', color: 'white',
            fontFamily: 'Microsoft Yahei', 
            Courier: 'monospace',fontSize: '16px'
          }}>
            分词系统
          </span>
        </Header>
        <Content 
          style={{ 
            padding: '10% 30%', 
            backgroundImage: `url(${background})`, 
            backgroundSize: 'cover',
            textAlign: 'center'
          }}
        >
          <Tabs defaultActiveKey="1" size="large">
            <TabPane tab="登录" key="1" style={{textAlign: 'left'}}>
              <div style={{marginBottom: '10px'}}>账号：</div>
              <Input
                style={{marginBottom: '20px'}}
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)' }} />}
                value={username}
                onChange={usernameChange}
              />
              <div style={{marginBottom: '10px'}}>密码：</div>
              <Input
                style={{marginBottom: '20px'}}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                value={password}
                onChange={passwordChange}
              />
              <Button type="primary" style={{width: '100%'}} onClick={login}>登录</Button>
              <Link to='/user/myTasks' id="login"></Link>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    )
  }
}

let mapStateToProps = state => {
  return state
}

let mapDispatchToProps = dispatch => {
  return {
    login: async () => {
      let state = store.getState()
      let { username, password } = state
      if (username == '' || password == '') return message.error('账号和密码不能为空！')
      let tips = message.loading('登录中...')
      let res = await axios({
        method: 'post',
        url: `${state.path}/api/login`,
        data: { username, password },
        withCredentials: true
      })
      message.destroy(tips)
      if (res.data.code != 0) return message.error('登录失败，账号或密码错误！')
      console.log(res)
      dispatch({ type: 'SET_IS_LOGIN', isLogin: true })
      dispatch({ type: 'SET_USER', user: res.data.user })
      document.getElementById('login').click()
      
    },
    usernameChange: e => dispatch({ type: "SET_USERNAME", username: e.target.value }),
    passwordChange: e => dispatch({ type: "SET_PASSWORD", password: e.target.value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)