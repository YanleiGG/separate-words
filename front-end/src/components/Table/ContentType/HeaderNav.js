import { connect } from "react-redux";
import HeaderNav_UI from '../../public/HeaderNav_UI'

let mapStateToProps = state => {
  return {
    headerNavData: state.contentType.headerNavData
  }
}

export default connect(mapStateToProps)(HeaderNav_UI)