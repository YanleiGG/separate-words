import React from 'react'
import { Row, Col, Button } from 'antd'

class Entry extends React.Component {
  render () {
    return (
      <Row  type="flex" justify="space-around" style={{ padding: '15% 5% 0 5%' }}>
        <Col span={4}>
          <Button type='primary' style={{ width: "100%", height: "300px", fontSize: '18px' }}>分词和词性标注</Button>
        </Col>
        <Col span={4}>
          <Button type='primary' style={{ width: "100%", height: "300px", backgroundColor: '#3949AB', fontSize: '18px' }}>文本内容分类标注</Button>
        </Col>
        <Col span={4}>
          <Button type='primary' style={{ width: "100%", height: "300px", backgroundColor: '#388E3C', fontSize: '18px' }}>情感标注</Button>
        </Col>
        <Col span={4}>
          <Button type='primary' style={{ width: "100%", height: "300px", backgroundColor: '#8D6E63', fontSize: '18px' }}>实体标注</Button>
        </Col>
      </Row>
    )
  }
}

export default Entry