const initialState = {
  visible: false,
  radioValue: -1,
  wordsType: ['无', '名词', '动词', '形容词'],
  color: ['black', 'red', 'green', 'blue'],
  typeArr: [0, 1, 2, 3],
  page: 1,
  totalCount: 0,
  path: 'http://localhost:3000',
  selectedKeys: [],
  articles: [
    { 
      id: null,
      title: '',
      content: '',
      separateWords: [],
      separateWordsProperty: [],
      markEntity: []
    }
  ],
  selection: {
    content: '',
    start: 0,
    end: 0
  },
  showArticle: { 
    id: null,
    title: '',
    content: '',
    separateWords: [],
    separateWordsProperty: [],
    markEntity: []
  },
  createArticle: '',
  createArticleTitle: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL": 
      return Object.assign({}, state, {
        ...state, 
        visible: true    // 需要修改的值放在后面，覆写前面 state 中相同的值
      })
    case "CLOSE_MODAL": 
      return Object.assign({}, state, {
        ...state,
        visible: false
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
    default:
      return state;
  }
}

export default reducer