function formatWithoutProperty (data) {
  let str = '', res = ''
  data.forEach(item => {
    str += item.content
  })
  str.split('/').forEach(item => {
    if (item.length == 1) res += "S"
    if (item.length > 1) {
      res += "B"
      for (let i = 0; i < item.length-2; i++) {
        res += "I"
      }
      res += "E"
    }
  })
  return res
} 

// 此方法与 getType 方法耦合，待优化
function unformatWithoutProperty (content, formatedStr, typeArr) {
  let start, end, count = 0
  let arr = formatedStr.split('').map((item, index) => {
    return { id: index, content: content[index], type: 0 }
  })
  for (let i = 0; i < arr.length; i++) {
    if (formatedStr[i] == 'S') arr.splice(i + count + 1, 0, { id: i + arr.length + count++, content: '/', type: 0 })
    if (formatedStr[i] == 'B') start = i + count
    if (formatedStr[i] == 'E') {
      end = i + count
      let type = getType(arr, typeArr, start, end)
      for (let j = start; j <= end; j++) {
        arr[j].type = type
      }
      arr.splice(end+1, 0, { id: i + arr.length + count++, content: '/', type: 0 })
    }
  }
  return arr
}

function formatWithProperty (data) {
  let str = '', res = '', typeArr = []
  data.forEach((item, index) => {
    if (item.content == '/') typeArr.push(data[index-1].type)
    str += item.content
  })
  str.split('/').forEach((item, index) => {
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

function unformatWithProperty (content, formatedStr) {
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
    if (str[i] == 'S') res.splice(i + count + 1, 0, { id: i + res.length + count++, content: '/', type: 0 })
    if (str[i] == 'B') start = i + count
    if (str[i] == 'E') {
      end = i + count
      res.splice(end+1, 0, { id: i + arr.length + count++, content: '/', type: 0 })
    }
  }
  return res
}


// 传入字符数组、类型数组、开始位置、终止位置，返回一个与前后都不相同的 type
function getType (data, typeArr, start, end) {
    // 利用递归，过滤黑名单内的字符
    let blacklist = [' ', '/']
    if (blacklist.indexOf(data[start-1] ? data[start-1].content : null) != -1 || blacklist.indexOf(data[end+1] ? data[end+1].content : null) != -1) {
      if (blacklist.indexOf(data[end+1] ? data[end+1].content : null) != -1) {
        return getType(data, typeArr, start-1, end+1)  
      } else {
        return getType(data, typeArr, start-1, end)
      }
    }
    let startIndex = data[start-1] ? typeArr.indexOf(data[start-1].type) : null
    let endIndex = data[end+1] ? typeArr.indexOf(data[end+1].type) : null
    let index = Math.ceil(Math.random()*(typeArr.length-1))
    while (index == startIndex || index == endIndex || index == 0) {
      index = Math.ceil(Math.random()*(typeArr.length-1))
    }
    return typeArr[index]
}

export default { formatWithoutProperty, unformatWithoutProperty, getType, formatWithProperty, unformatWithProperty }