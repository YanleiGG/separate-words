import React from 'react'
import store from '../../../state/store'
import { Button, Upload, Icon, message } from 'antd'
import { path } from '../../../config'

let pathname = path.replace('http://', '')

const uploadProps = {
  name: 'file',
  accept: '.xml',
  action: `//${pathname}/api/upload/labels`,
  withCredentials: true,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功！`)
      let state = store.getState(), {createLabels} = state
      let contentTypeLabels = createLabels.contentTypeLabels
      contentTypeLabels.push(info.file.response.data.fileName)
      store.dispatch({ 
        type: 'SET_CREATE_LABELS',
        createLabels: {
          ...createLabels,
          contentTypeLabels
        }
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败！`)
    }
  },
  onRemove(file) {
    let state = store.getState(), {createLabels} = state
    let name = file.response.data.fileName
    let contentTypeLabels = createLabels.contentTypeLabels.filter(item => item !== name)
    store.dispatch({ 
      type: 'SET_CREATE_LABELS',
      createLabels: {
        ...createLabels,
        contentTypeLabels
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