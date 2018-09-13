import React from 'react'
import store from '../../../../state/store'
import { Button, Upload, Icon, message } from 'antd'

const uploadProps = {
  name: 'file',
  accept: '.xml',
  action: `//localhost:3000/api/upload/docs`,
  withCredentials: true,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功！`)
      let state = store.getState(), {createTask} = state
      let docs = state.createTask.docs
      docs.push(info.file.response.data.fileName)
      store.dispatch({ 
        type: 'SET_CREATE_TASK',
        createTask: {
          ...createTask,
          docs
        }
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败！`)
    }
  },
  onRemove(file) {
    let state = store.getState(), {createTask} = state
    let docs = state.createTask.docs
    let name = file.response.data.fileName
    let index = docs.indexOf(name)
    docs.splice(index, 1)
    store.dispatch({
      type: 'SET_CREATE_TASK',
      createTask: {
        ...createTask,
        docs
      }
    })
  }
}

class UploadDocs extends React.Component {
  render() {
    return (
      <Upload {...uploadProps}>
        <Button style={{ width: '100%' }}>
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    )
  }
}

export default UploadDocs