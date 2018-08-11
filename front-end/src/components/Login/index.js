import React from 'react'
import { Input, Icon, Layout, Button } from 'antd';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from '../../state/store'

const { Header, Content } = Layout;

class Login extends React.Component {
  render () {
    const {login} = this.props
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header>
          <div style={{ color: 'white', fontSize: '20px' }}>XX 系统</div>
        </Header>
        <Content style={{ padding: '15% 30%' }}>
          <Input
            style={{marginBottom: '20px'}}
            placeholder="账号 / admin"
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)' }} />}
          />
          <Input
            style={{marginBottom: '20px'}}
            placeholder="密码 / 123456"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type='password'
          />
          <Button type="primary" style={{width: '100%'}} onClick={login}><Link to='/WorkTable/separate-words'>登录</Link></Button>
        </Content>
      </Layout>
    )
  }
}

let mapStateToProps = state => {
  return {}
}

let mapDispatchToProps = dispatch => {
  return {
    login: () => {
      dispatch({ type: 'SET_IS_LOGIN', isLogin: true })
      console.log(store.getState().isLogin)
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)