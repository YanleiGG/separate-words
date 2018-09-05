export const initialState = {
  isLogin: true,
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
  createArticleTitle: '',
  createArticleSelected: [],
  username: 'admin',
  password: '123456',
  classData: [],
  ClassListAddInputValue: '',
  addClassVisible: false,
  addClassInputValue: '',
  addClassId: '',
  emotion: {
    emotions: [],
    SiderLeftData: [],
    totalCount: 0,
    page: 1,
    selectedKeys: [],
    showIndex: 0
  }
};