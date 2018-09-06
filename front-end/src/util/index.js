import store from '../state/store'
import axios from 'axios'

export function formatWithoutProperty (data) {
  let str = '', res = ''
  data.forEach(item => {
    str += item.content
  })
  str.split('|').forEach(item => {
    if (item.length == 1) res += item + "S"
    if (item.length > 1) {
      res += item[0] + "B"
      for (let i = 0; i < item.length-2; i++) {
        res += item[i+1] + "I"
      }
      res += item[item.length-1] + "E"
    }
  })
  return res
}

export function unformatWithoutProperty (formatedStr) {
  let start, end, count = 0, content = '', format = ''
  for (let i = 0;i <formatedStr.length;i++) {
    if (i % 2 == 0) {
      content += formatedStr[i]
    } else {
      format += formatedStr[i]
    }
  }
  let arr = format.split('').map((item, index) => {
    return { id: index, content: content[index] }
  })
  for (let i = 0; i < arr.length; i++) {
    if (format[i] == 'S') arr.splice(i + count + 1, 0, { id: i + arr.length + count++, content: '|' })
    if (format[i] == 'B') start = i + count
    if (format[i] == 'E') {
      end = i + count
      arr.splice(end+1, 0, { id: i + arr.length + count++, content: '|' })
    }
  }
  return arr
}

export function formatWithProperty (data) {
  let str = '', res = '', typeArr = []
  data.forEach((item, index) => {
    if (item.content == '|') typeArr.push(data[index-1].type)
    str += item.content
  })
  str.split('|').forEach((item, index) => {
    if (item.length == 1) res += "S" + typeArr[index]
    if (item.length > 1) {
      res += "B" + typeArr[index]
      for (let i = 0; i < item.length-2; i++) {
        res += "I" + typeArr[index]
      }
      res += "E" + typeArr[index]
    }
  })
  return res
} 

export function unformatWithProperty (content, formatedStr) {
  let typeArr = [], count = 0, start = 0, end = 0
  let arr = formatedStr.split('')
  for (let i = 1;i < arr.length;i+=2) {
    typeArr.push(arr[i])
  }
  let str = arr.filter((item, index) => {
    return index % 2 == 0
  }).join('')
  let res = arr.filter((item, index) => {
    return index % 2 == 0
  }).map((item, index) => {
    return { id: index, content: content[index], type: typeArr[index] }
  })
  for (let i = 0; i < res.length; i++) {
    if (str[i] == 'S') res.splice(i + count + 1, 0, { id: i + res.length + count++, content: '|', type: 0 })
    if (str[i] == 'B') start = i + count
    if (str[i] == 'E') {
      end = i + count
      res.splice(end+1, 0, { id: i + arr.length + count++, content: '|', type: 0 })
    }
  }
  return res
}

let emptyArticle = { 
  id: null,
  title: '',
  content: '',
  separateWords: [],
  separateWordsProperty: [],
  markEntity: []
}

// 初始化 & 更新数据
export let refresh = async dispatch => {
  let state = store.getState()
  let res = await axios.get(`${state.path}/api/article?offset=${(state.page-1)*10}&pageSize=10`)
  if (res.data.articles) {
    let articles = res.data.articles.map(item => {
      return {
        ...item,
        separateWords: item.separateWords ? unformatWithoutProperty(item.content, item.separateWords, state.typeArr) : [],
        separateWordsProperty: item.separateWordsProperty ? unformatWithProperty(item.content, item.separateWordsProperty, state.typeArr) : [],
        markEntity: item.markEntity ? unformatWithoutProperty(item.content, item.markEntity, state.typeArr) : []
      }
    })
    dispatch({ type: "SET_ARTICLES", articles })
    dispatch({ type: "SET_TOTAL_COUNT", totalCount: res.data.totalCount })      
    dispatch({ type: "SET_SHOWARTICLE", showArticle: articles[0] || emptyArticle })
    dispatch({ type: "SET_SELECTED_KEYS", selectedKeys: articles[0] ? [articles[0].id.toString()] : null })
  }
}