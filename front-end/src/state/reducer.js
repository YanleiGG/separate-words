import { initialState } from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL": 
      return Object.assign({}, state, {
        ...state, 
        property_visible: true
      })
    case "SET_SELECTION":
      return Object.assign({}, state, {
        ...state,
        selection: action.selection
      })
    case "SET_SELECTED_KEYS": {
      return Object.assign({}, state, {
        ...state,
        selectedKeys: action.selectedKeys
      })      
    }
    case "SET_TOTAL_COUNT": {
      return Object.assign({}, state, {
        ...state,
        totalCount: action.totalCount
      })      
    }
    case "SET_PAGE": {
      return Object.assign({}, state, {
        ...state,
        page: action.page
      })  
    }
    case "SET_IS_LOGIN": {
      return Object.assign({}, state, {
        ...state,
        isLogin: action.isLogin
      }) 
    }
    case "SET_USERNAME": {
      return Object.assign({}, state, {
        ...state,
        username: action.username
      }) 
    }
    case "SET_PASSWORD": {
      return Object.assign({}, state, {
        ...state,
        password: action.password
      }) 
    }
    case "SET_EMOTION": {
      return Object.assign({}, state, {
        ...state,
        emotion: action.emotion
      })      
    }
    case "SET_SEP_WORDS_PRO": {
      return Object.assign({}, state, {
        ...state,
        sepWordsPro: action.sepWordsPro
      }) 
    }
    case "SET_CREATE_TASK": {
      return Object.assign({}, state, {
        ...state,
        createTask: action.createTask
      })
    }
    case "SET_CREATE_LABELS": {
      return Object.assign({}, state, {
        ...state,
        createLabels: action.createLabels
      })
    }
    case "SET_CREATE_LABEL": {
      return Object.assign({}, state, {
        ...state,
        createLabel: action.createLabel
      })
    }
    case "SET_LABEL_AND_LABELS": {
      return Object.assign({}, state, {
        ...state,
        labelAndLabels: action.labelAndLabels
      })      
    }
    case "SET_TASKS": {
      return Object.assign({}, state, {
        ...state,
        tasks: action.tasks
      })    
    }
    case "SET_TASK_ID": {
      return Object.assign({}, state, {
        ...state,
        taskId: action.taskId
      }) 
    }
    case "SET_USER": {
      return Object.assign({}, state, {
        ...state,
        user: action.user
      })
    }
    case "SET_MARK_ENTITY": {
      return Object.assign({}, state, {
        ...state,
        markEntity: action.markEntity
      })
    }
    case "SET_USERS": {
      return Object.assign({}, state, {
        ...state,
        users: action.users
      })
    }   
    case "SET_CREATE_USER": {
      return Object.assign({}, state, {
        ...state,
        createUser: action.createUser
      })
    }  
    default:
      return state;
  }
}

export default reducer