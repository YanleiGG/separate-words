import { connect } from "react-redux";
import HeaderNav_UI from '../public/HeaderNav_UI'

let mapStateToProps = state => {
  return {
    headerNavData: {
      name: 'user',
      title: '用户',
      data: [
        { name: '我的任务', path: '/user/myTasks', key: '我的任务' },
      ]
    }
  }
}

export default connect(mapStateToProps)(HeaderNav_UI)