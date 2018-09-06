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
    showIndex: 0,
    headerNavData: {
      title: '情感标注',
      data: [
        { name: '情感分类', path: '/table/emotion/classify', key: '情感分类' },
        { name: '情感实体抽取', path: '/table/emotion/entity', key: '情感实体抽取' }
      ]
    }
  },
  sepWordsPro: {
    sep_words_propertys: [],
    SiderNavData: [],
    totalCount: 0,
    page: 1,
    selectedKeys: [],
    showIndex: 0,
    headerNavData: {
      title: '分词及词性标注',
      data: [
        { name: '分词', path: '/table/sepWordsPro/sepWords', key: '分词' },
        { name: '词性标注', path: '/table/sepWordsPro/markWordsPro', key: '词性标注' }
      ]
    }
  }
};