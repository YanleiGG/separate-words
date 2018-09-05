import React from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from "react-router-dom";

class Entry extends React.Component {
  render () {
    let toEmotion = () => document.getElementById('toEmotion').click()
    let toTextContent = () => document.getElementById('toTextContent').click()
    let toSepWordsPro = () => document.getElementById('toSepWordsPro').click()
    let toEntity = () => document.getElementById('toEntity').click()
    return (
      <Row  type="flex" justify="space-around" style={{ padding: '15% 5% 0 5%' }}>
        <Col span={4}>
          <Button 
            onClick={toSepWordsPro} 
            type='primary' 
            style={{ width: "100%", height: "300px", fontSize: '18px' }}  
          >
            <Link to='/table/sepWordsPro' id='toSepWordsPro'></Link>
            分词和词性标注
          </Button>
        </Col>
        <Col span={4}>
          <Button 
            onClick={toTextContent} 
            type='primary' 
            style={{ width: "100%", height: "300px", backgroundColor: '#3949AB', fontSize: '18px' }}
          >
            <Link to='/table/textContent' id='toTextContent'></Link>
            文本内容分类标注
          </Button>
        </Col>
        <Col span={4}>
          <Button 
            onClick={toEmotion} 
            type='primary' 
            style={{ width: "100%", height: "300px", backgroundColor: '#388E3C', fontSize: '18px' }}
          >
            <Link to='/table/emotion' id='toEmotion'></Link>
            情感标注
          </Button>
        </Col>
        <Col span={4}>
          <Button 
            onClick={toEntity} 
            type='primary' 
            style={{ width: "100%", height: "300px", backgroundColor: '#8D6E63', fontSize: '18px' }}
          >
            <Link to='/table/entity' id='toEntity'></Link>
            实体标注
          </Button>
        </Col>
      </Row>
    )
  }
}

export default Entry