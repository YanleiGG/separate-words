import React from 'react'
import { Layout, Row, Col, Tree } from "antd";
import { connect } from "react-redux";
import { path } from '../../../config';
import axios from 'axios';
import store from '../../../state/store';
import FooterBtn from './FooterBtn'
import HeaderNav from './HeaderNav'

const { Content, Footer } = Layout;
const { TreeNode } = Tree;

class Main extends React.Component {
  render () {
    let {articles, showIndex, treeData, onSelect} = this.props
    const loop = data => data.map((item) => {
      if (item.child) {
        return (
          <TreeNode key={item.key} title={item.title}>
            {loop(item.child)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.title} />;
    });

    return (
      <Layout style={{ minHeight: '100vh', marginLeft: '200px' }}>
        <HeaderNav/>
        <Content style={{ padding: '15px', fontSize: '20px'}}>
          { articles.length ? 
            <Row>
              <Col span={16}>
                { articles[showIndex].text }
              </Col>
              <Col span={6} offset={2}>
                <Tree selectedKeys={articles[showIndex].treeSelectedKeys} onSelect={onSelect} multiple defaultExpandedKeys={articles[showIndex].treeSelectedKeys}>
                  { loop(treeData) }
                </Tree>
              </Col>
            </Row>
          : null }
        </Content>
        <Footer>
          <FooterBtn/>
        </Footer>
      </Layout>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.contentType,
  }
};

let mapDispatchToProps = dispatch => {
  return {
    onSelect: (treeSelectedKeys) => {
      let state = store.getState()
      let { articles, showIndex, focusRender } = state.contentType
      articles[showIndex].treeSelectedKeys = treeSelectedKeys
      dispatch({ type: "SET_CONTENT_TYPE", contentType: {
        ...state.contentType,
        articles,
        focusRender: !focusRender
      }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)