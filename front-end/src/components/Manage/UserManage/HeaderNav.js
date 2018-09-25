import { connect } from "react-redux";
import HeaderNav_UI from '../../public/HeaderNav_UI'

let mapStateToProps = state => {
  return {
    headerNavData: {
      name: 'file',
      title: '任务管理',
      data: [
        { name: '用户总览', path: '/manage/user/users', key: '用户总览' },
        { name: '创建用户', path: '/manage/user/create', key: '创建用户' }
      ]
    }
  }
}

export default connect(mapStateToProps)(HeaderNav_UI)