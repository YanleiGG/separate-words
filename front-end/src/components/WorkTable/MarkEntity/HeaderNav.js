import * as React from "react";
import { connect } from "react-redux";
import HeaderNav_UI from '../../public/HeaderNav_UI'

let mapStateToProps = state => {
  return {
    headerNavData: state.markEntity.headerNavData
  }
}

export default connect(mapStateToProps)(HeaderNav_UI)