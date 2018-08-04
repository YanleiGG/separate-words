import React from 'react'
import { Layout, Button } from "antd";

const { Footer } = Layout;

class FooterBtn extends React.Component {
  render () {
  const { save, cancel } = this.props
  return (
      <Footer style={{textAlign: 'center'}}>
        <Button onClick={ save } type="primary">保存</Button>
        <Button onClick= { cancel } type="primary" style={{ marginLeft: '20px'}}>取消</Button>
      </Footer>
    )
  }
}

export default FooterBtn