import React from 'react'
import { path } from '../../../config'
import { Row, Col, Select, message, Table, Button, Popconfirm } from 'antd'
import { connect } from "react-redux"
import store from '../../../state/store'
import axios from 'axios'
import moment from 'moment'

const Option = Select.Option;
const { Column } = Table;

class DocsManage extends React.Component {
  componentWillMount() {
    this.props.created()
  }

  render() {
    let { taskTypeChange, data, docsRefresh, deleteDocs } = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Row type='flex' justify='space-around' style={{ marginBottom: '15px', textAlign: 'left' }}>
          <Col span={20}>
            <Select 
              style={{ width: '20%', marginBottom: '15px' }} 
              onChange={taskTypeChange} 
              placeholder="语料类型" 
              defaultValue='all'
            >
              <Option value="all">全部</Option>
              <Option value="separateWordsProperty">分词及词性标注</Option>
              <Option value="contentType">文本内容分类</Option>
              <Option value="markEntity">实体标注</Option>
              <Option value="emotion">情感标注</Option>
            </Select>
          </Col>
          <Col span={20}>
            <Table dataSource={data} locale={{ emptyText: '无语料' }}>
              <Column title="语料名称" rowKey={(record)=> record.id+"name"} dataIndex="name"/>
              <Column title="语料类别" rowKey={(record)=> record.id+"type"} dataIndex="showType"/>
              <Column title="创建时间" rowKey={(record)=> record.id+"createTime"} dataIndex="createTime"/>              <Column 
                title="操作" 
                key="action" 
                dataIndex="action"
                render={(text, record) => (
                  <Popconfirm title="确认完成标注吗?" onConfirm={() => deleteDocs(record.id)} okText="确认" cancelText="取消">
                    <a>删除</a>
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

let mapStateToProps = state => {
  return state.docsManage
}

let mapDispatchToProps = dispatch => {
  return {
    created: async () => {
      refresh('all')
    },
    docsRefresh: () => {
      let {type} = store.getState().docsManage
      refresh(type)
    },
    taskTypeChange: async value => {
      refresh(value)
    },
    deleteDocs: async id => {
      let res = await axios({
        url: `${path}/api/docs`,
        method: 'delete',
        data: { id }
      })
      if (res.data.code === 0) {
        let {type} = store.getState().docsManage
        refresh(type)
      } else {
        message.error('删除失败！')
      }
    }
  }
}

async function refresh(value) {
  let state = store.getState()
  let res = await axios.get(`${path}/api/docs?type=${value}`)
  if (res.data.code === 0) {
    store.dispatch({
      type: "SET_DOCS_MANAGE",
      docsManage: {
        ...state.docsManage,
        type: value,
        data: format(res.data.docs)
      }
    })
  } else {
    message.error('获取语料信息失败！')
  }
}

function format(data) {
  return data.map(item => {
    item.showType = item.type.name
    item.createTime = moment(item.createdAt).format('YYYY-MM-DD HH:mm')
    return item
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(DocsManage)