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
  username: 'admin',
  password: '123456',
  classData: [
    { id: 1, title: '单一类别标注', child: [{ id: 11, title: '11' }, { id: 12, title: '12' }] }, 
    { id: 2, title: '多类别标注', child: [ {id: 21, title: '21'}, {id: 22, title: '22'}]}, 
    { id: 3, title: '层类别标注', child: [{id: 31, title: '31', child: [{ id: 311, title: '311' }, { id: 312, title: '312' }]}, ] }, 
  ]
};