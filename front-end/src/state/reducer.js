let articleContent = `关于 React 应用加载的优化，其实网上类似的文章已经有太多太多了，随便一搜就是一堆，已经成为了一个老生常谈的问题。但随着 React 16 和 Webpack 4.0的发布，很多过去的优化手段其实都或多或少有些“过时”了，而正好最近一段时间，公司的新项目迁移到了React 16 和 Webpack4.0，做了很多这方面的优化，所以就写一篇文章来总结一下。`

const initialState = {
  showArticle: { 
    id: null,
    title: '',
    data: {
      separateWordsData: [],
      separateWordsPropertyData: [],
      markEntityData: []
    }
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
      id: 5,
      title: 'ccccc',
      content: 'cccccccccaaaaaaaaaa',
      data: {
        separateWordsData: 'cccccccccaaaaaaaaaa'.split('').map((i, index) => {
          return {
            id: index,
            content: i,
            type: 0,
          }
        }),
        separateWordsPropertyData: 'cccccccccaaaaaaaaaa'.split('').map((i, index) => {
          return {
            id: index,
            content: i,
            type: 0,
            groupIndex: 0
          }
        }),
        markEntityData: 'cccccccccaaaaaaaaaa'.split('').map((i, index) => {
          return {
            id: index,
            content: i,
            type: 0,
            groupIndex: 0
          }
        })
      }
    }, 
    { 
     id: 6 ,
     title: 'eeeee',
     content: articleContent,
     data: {
      separateWordsData: articleContent.split('').map((i, index) => {
        return {
          id: index,
          content: i,
          type: 0,
        }
      }),
      separateWordsPropertyData: articleContent.split('').map((i, index) => {
        return {
          id: index,
          content: i,
          type: 0,
        }
      }),
      markEntityData: articleContent.split('').map((i, index) => {
        return {
          id: index,
          content: i,
          type: 0,
        }
      })
    } 
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
    default:
      return state;
  }
}

export default reducer