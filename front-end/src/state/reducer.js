const initialState = {
  showArticle: { 
    id: null,
    title: '',
    content: '',
    separateWords: [],
    separateWordsProperty: [],
    markEntity: []
  },
  visible: false,
  selection: {
    content: '',
    start: 0,
    end: 0
  },
  radioValue: -1,
  wordsType: ['无', '名词', '动词', '形容词'],
  color: ['black', 'red', 'green', 'blue'],
  typeArr: [0, 1, 2, 3],
  page: 1,
  path: 'http://localhost:3000',
  articles: [
    { 
      id: null,
      title: '',
      content: '',
      separateWords: [],
      separateWordsProperty: [],
      markEntity: []
    }
  ]
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
    default:
      return state;
  }
}

export default reducer