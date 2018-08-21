import { Input } from 'antd';
import React from 'react'

class ClassListAddInput extends React.Component {
  render () {
    let { value, onChange } = this.props
    return (
      <Input placeholder="Basic usage" value = { value } onChange = { onChange } />
    )
  }
}

export default ClassListAddInput