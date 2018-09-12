import { connect } from "react-redux";
import HeaderNav_UI from '../../WorkTable/HeaderNav_UI'

let mapStateToProps = state => {
  return {
    headerNavData: {
      name: 'file',
      title: '任务管理',
      data: [
        { name: '任务管理', path: '/manage/task/tasks', key: '任务总览' },
        { name: '标签管理', path: '/manage/task/labels', key: '标签管理' }
      ]
    }
  }
}

export default connect(mapStateToProps)(HeaderNav_UI)