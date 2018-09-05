import * as React from "react";
import { connect } from "react-redux";
import HeaderNav from '../HeaderNav'

let mapStateToProps = state => {
  return {
    headerNavData: state.emotion.headerNavData
  }
}

export default connect(mapStateToProps)(HeaderNav)