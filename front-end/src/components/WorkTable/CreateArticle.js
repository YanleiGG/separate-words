import React from 'react'
import { Layout, Button } from "antd";
import { Input } from 'antd';

const { TextArea } = Input;
const { Footer, Content } = Layout;

class CreateArticle extends React.Component {
  render () {
    let { createArticle, createArticleTitle, create, cancel, contentChange, titleChange } = this.props
    return (
      <Layout>
        <Content style={{textAlign: 'center', marginTop: '5%'}}>
          <Input onChange={ titleChange } value={ createArticleTitle } placeholder="输入标题..." style={{ width: '60%', marginBottom: '2%' }}/>
          <TextArea onChange={ contentChange } value={ createArticle } autosize = {{ minRows: 15 }} style={{ width: '60%' }} placeholder = "输入文章内容..."/>
        </Content>
        <Footer style={{textAlign: 'center', marginTop: '3%'}}>
          <Button type="primary" onClick={create}>创建</Button>
          <Button type="primary" style={{ marginLeft: '20px'}} onClick={cancel}>取消</Button>
        </Footer>
      </Layout>
    ) 
  }
}

export default CreateArticle