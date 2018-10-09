export const initialState = {
  isLogin: true,
  visible: false,
  typeArr: [0, 1, 2, 3],
  page: 1,
  totalCount: 0,
  path: 'http://localhost:3000',
  selectedKeys: [],
  selection: {
    content: '',
    start: 0,
    end: 0
  },
  username: 'admin',
  password: '123',
  emotion: {
    articles: [],
    SiderNavData: [],
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
    },
    filter: 'all',
    spinning: true,
    focusChangeValue: false
  },
  sepWordsPro: {
    articles: [],
    SiderNavData: [],
    totalCount: 1,
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
    propertys: [],
    visible: false,
    radioValue: '',
    wordIndex: null,
    filter: 'all',
    spinning: true
  },
  markEntity: {
    articles: [],
    SiderNavData: [],
    totalCount: 1,
    page: 1,
    selectedKeys: [],
    showIndex: 0,
    headerNavData: {
      title: '实体标注',
      data: [
        { name: '实体标注', path: '/table/markEntity', key: '实体标注' }
      ]
    },
    propertys: [],
    visible: false,
    start: 0,
    end: 0,
    radioValue: '',
    labels: ['无', '人名', '地名', '组织机构名'],
    colors: ['black', '#f50', '#389e0d', '#108ee9'],
    filter: 'all',
    spinning: true
  },
  createTask: {
    name: '',
    instruction: '',
    type: '',
    labels: [],
    labelsShow: false,
    selectedLabelsId: null,
    docs: [],
    markUsers: [],
    selectedUsers: []
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
  },
  tasks: {
    data: [],
    type: ''
  },
  taskId: 44, //设一个默认值，方便调试，实际设为null
  user: {
    id: 1,  //设一个默认值，方便调试，实际设为null
    name: ''
  },
  users: {
    data: []
  },
  createUser: {
    username: '',
    password: '',
    selectAuthIds: [],
    auths: []
  },
  home: {
    collapsed: false
  }
};