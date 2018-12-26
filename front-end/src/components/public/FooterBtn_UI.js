import React from 'react'
import { Button } from "antd";


class FooterBtn extends React.Component {
  render () {
  const { save, cancel } = this.props
  return (
      <div style={{textAlign: 'center'}}>
        <Button onClick={ save } type="primary">保存</Button>
        {/* <Button onClick= { cancel } type="primary" style={{ marginLeft: '20px'}}>取消</Button> */}
      </div>
    )
  }
}

export default FooterBtn