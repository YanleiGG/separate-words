import * as React from "react";
import { connect } from "react-redux";
import HeaderNav_UI from '../HeaderNav_UI'

let mapStateToProps = state => {
  return {
    headerNavData: state.emotion.headerNavData
  }
}

export default connect(mapStateToProps)(HeaderNav_UI)