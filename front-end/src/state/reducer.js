import { initialState } from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL": 
      return Object.assign({}, state, {
        ...state, 
        property_visible: true    // 需要修改的值放在后面，覆写前面 state 中相同的值
      })
    case "CLOSE_PROPERTY_MODAL": 
      return Object.assign({}, state, {
        ...state,
        property_visible: false
      })
    case "SET_SELECTION":
      return Object.assign({}, state, {
        ...state,
        selection: action.selection
      })   
    case "SET_RADIO_VALUE":
      return Object.assign({}, state, {
        ...state,
        radioValue: action.radioValue
      }) 
    case "SET_SHOWARTICLE": {
      return Object.assign({}, state, {
        ...state,
        showArticle: action.showArticle
      })
    }
    case "SET_ARTICLES": {
      return Object.assign({}, state, {
        ...state,
        articles: action.articles
      })      
    }
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
    case "SET_CREATE_ARTICLE": {
      return Object.assign({}, state, {
        ...state,
        createArticle: action.createArticle
      })  
    }
    case "SET_CREATE_ARTICLE_TITLE": {
      return Object.assign({}, state, {
        ...state,
        createArticleTitle: action.createArticleTitle
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
    case "SET_CLASS_DATA": {
      return Object.assign({}, state, {
        ...state,
        classData: action.classData
      }) 
    }
    case "SET_CLASS_LIST_ADD_VALUE": {
      return Object.assign({}, state, {
        ...state,
        ClassListAddInputValue: action.ClassListAddInputValue
      }) 
    }
    case "SET_ADD_CLASS_VISIBLE": {
      return Object.assign({}, state, {
        ...state,
        addClassVisible: action.addClassVisible
      })
    }
    case "SET_ADD_CLASS_INPUT_VALUE": {
      return Object.assign({}, state, {
        ...state,
        addClassInputValue: action.addClassInputValue
      })
    }
    case "SET_ADD_CLASS_ID": {
      return Object.assign({}, state, {
        ...state,
        addClassId: action.addClassId
      })
    }
    default:
      return state;
  }
}

export default reducer