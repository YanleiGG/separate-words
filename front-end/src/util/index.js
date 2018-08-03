function formatWithoutProperty (data) {
  if (data.length == 1) return 'S'
  let res = ''
  data.forEach((item, index) => {
    if (item.type == 0) {
      res += 'S'
    } else {
      if (index == 0) {
        if (item.type == data[index+1].type) {
          res += 'B'
        } else {
          res += 'S'
        }
      } else if (index == data.length - 1) {
        if (item.type == data[index-1].type) {
          res += 'E'
        } else {
          res += 'S'
        }
      } else {
        if (item.type == data[index-1].type && item.type == data[index+1].type) {
          res += 'I'
        } else if (item.type == data[index-1].type && item.type !== data[index+1].type) {
          res += 'E'
        } else if (item.type !== data[index-1].type && item.type == data[index+1].type) {
          res += 'B'
        } else {
          res += 'S'
        }
      }    
    }
  });
  return res
}

// 此方法与 getType 方法耦合，待优化
function unformatWithoutProperty (content, formatedStr, typeArr) {
  let start, end
  let arr = formatedStr.split('').map((item, index) => {
    return { id: index, content: content[index], type: 0 }
  })
  for (let i = 0; i < arr.length; i++) {
    if (formatedStr[i] == 'B') {
      start = i
    }
    if (formatedStr[i] == 'E') {
      end = i
      let type = getType(arr, typeArr, start, end)
      for (let j = start; j <= end; j++) {
        arr[j].type = type
      }
    }
  }
  return arr
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

export default { formatWithoutProperty, unformatWithoutProperty, getType }