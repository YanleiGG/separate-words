import * as React from "react";
import { Layout, Popover } from "antd";
import { connect } from "react-redux";

import FooterBtn from './FooterBtn'
import PopoverContent from './PopoverContent'

const { Content, Footer } = Layout;

class MarkPro extends React.Component {
  componentWillMount() {
    this.props.created()
  }
  render() {
    let { articles, showIndex } = this.props
    let showPro = articles.length > 0 ? articles[showIndex].showPro : []
    return (
      <Layout>
        <Layout>
          <Content style={{ padding: '15px', fontSize: '20px', marginLeft: '200px' }}>
            {showPro.map((item, index) => {
              return  <Popover placement='bottom' content={<PopoverContent index={index}/>} key={item.id} title={item.content}>
                        <span key={item.id} style={{cursor:'pointer'}}>{ item.content + '|' }</span>
                      </Popover>
            })}
          </Content>
          <Footer>
            <FooterBtn/>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.sepWordsPro
  }
}

let mapDispatchToProps = dispatch => {
  return {
    created: async () => {
      // let res = await axios.get()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkPro)