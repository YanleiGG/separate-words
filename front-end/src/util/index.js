function arrToCode (data) {
  let res = ''
  for (let i = 0; i < data.length; i++) {
    if (data[i].type == 0) {
      res += 'B'
    } else {
      if (data[i]) {}
    }
  }
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

export default { arrToCode, getType }