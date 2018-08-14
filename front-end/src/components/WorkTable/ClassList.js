import * as React from "react";
import SiderNav_UI  from './SiderNav'
import { connect } from "react-redux";
import store from '../../state/store'
import { Layout, message  } from "antd";
const { Content, Footer, Sider } = Layout;

let SiderNav

export default class ClassList extends React.Component {
  componentWillMount () {
    let mapStateToSiderNav = state => {
      return {
        ...state,
        SiderNavData: this.props.classData
      }
    }
    let mapDispatchToSiderNav = dispatch => {
      return {
        handleClick: id => {
          let state = store.getState()
          dispatch({ type: "SET_SELECTED_KEYS", selectedKeys: [id.toString()]})
        }
      }
    }
    SiderNav = connect(mapStateToSiderNav, mapDispatchToSiderNav)(SiderNav_UI)
  }
  
  render () {
    return (
      <Sider>
       <SiderNav></SiderNav>
      </Sider>
    )
  }
}