import * as React from "react";
import { Modal, Radio, Pagination } from "antd";
import { Layout } from "antd";
import SiderNav from './SiderNav'
import FooterBtn_Table from './FooterBtn_Table'

const { Content, Footer, Sider } = Layout;
const RadioGroup = Radio.Group;

class Table extends React.Component {
  render() {
    let { article, color, selection, property_visible, handleOk, handleCancel, pickWords, radioOnChange, radioValue, wordsType, totalCount, pageChange } = this.props 

    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <SiderNav></SiderNav>
          <Pagination style={{marginTop: "-60px"}} onChange={ pageChange } defaultCurrent={1} total={totalCount} simple />
        </Sider>
        <Layout>
          <Content style={{ padding: '15px' }}>
            <div onMouseUp={ pickWords } style={{ fontSize: 20 + 'px' } }>
              { 
                article.map((i, index) => {
                  return <span key={index} id={index} style={{color: color[i.type]}}>{ i.content }</span>
                })
              }
            </div>
            <Modal
              title={ selection.content }
              visible={ property_visible }
              onOk={ handleOk }
              onCancel={ handleCancel }
            >
              <RadioGroup onChange={radioOnChange} value={radioValue}>
                { 
                  wordsType.map((i, index) => {
                    return <Radio value={index} key={index}>{ i }</Radio>
                  }) 
                }
              </RadioGroup>
            </Modal>        
          </Content>
          <Footer>
            <FooterBtn_Table></FooterBtn_Table> 
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Table