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
        { name: '词性标注', path: '/table/sepWordsPro/markPro', key: '词性标注' }
      ]
    },
    propertys: [
      { label: '形容词', value: 'a' },
      { label: '副形词', value: 'ad' },
      { label: '形语素', value: 'ag' },
      { label: '名形词', value: 'an' },
      { label: '区别词', value: 'b' },
      { label: '连词', value: 'c' },
      { label: '副词', value: 'd' },
      { label: '副语素', value: 'dg' },
      { label: '叹词', value: 'e' },
      { label: '方位词', value: 'f' },
      { label: '语素', value: 'g' },
      { label: '前接成分', value: 'h' },
      { label: '成语', value: 'i' },
      { label: '简称略语', value: 'j' },
      { label: '后接成分', value: 'k' },
      { label: '习用语', value: 'l' },
      { label: '数词', value: 'm' },
      { label: '名词', value: 'n' },
      { label: '名语素', value: 'ng' },
      { label: '人名', value: 'nr' },
      { label: '地名', value: 'ns' },
      { label: '机构团体', value: 'nt' },
      { label: '字母专名', value: 'nx' },
      { label: '其他专名', value: 'nz' },
      { label: '拟声词', value: 'o' },
      { label: '介词', value: 'p' },
      { label: '量词', value: 'q' },
      { label: '代词', value: 'r' },
      { label: '处所词', value: 's' },
      { label: '时间词', value: 't' },
      { label: '时语素', value: 'tg' },
      { label: '助词', value: 'u' },
      { label: '结构助词', value: 'ud' },
      { label: '时态助词', value: 'ug' },
      { label: '结构助词的', value: 'uj' },
      { label: '时态助词了', value: 'ul' },
      { label: '结构助词地', value: 'uv' },
      { label: '时态助词着', value: 'uz' },
      { label: '动词', value: 'v' },
      { label: '副动词', value: 'vd' },
      { label: '动语素', value: 'vg' },
      { label: '名动词', value: 'vn' },
      { label: '标点符号', value: 'w' },
      { label: '非语素字', value: 'x' },
      { label: '语气词', value: 'y' },
      { label: '状态词', value: 'z' },
    ],
  },
  markEntity: {
    headerNavData: {
      title: '实体标注',
      data: [
        { name: '实体标注', path: '/table/markEntity', key: '实体标注' }
      ]
    },
  },
  tasks: {},
  createTask: {
    name: '',
    instruction: '',
    type: '',
    state: '进行中',
    labels: [{ id: 1, value: '分类标签一', content: '分类标签一'}],
    selectedLabelsId: null
  },
  createLabels: {
    type: '',
    labels: [],
    labelsValue: [],
    name: ''
  },
  createLabel: {
    type: '',
    name: '',
    symbol: ''
  },
  labelAndLabels: {
    label: {
      data: [],
      type: 'separateWordsProperty',
      page: 1
    },
    labels: {
      data: [],
      type: 'separateWordsProperty',
      page: 1
    }
  }
};