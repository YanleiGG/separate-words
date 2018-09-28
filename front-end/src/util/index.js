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

export function unformatWithoutProperty (formatedStr, firstFormat) {
  if (firstFormat) {
    let tempStr = ''
    for (let i = 0;i <formatedStr.length;i++) {
      tempStr += formatedStr[i] + 'S'
    }
    formatedStr = tempStr
  }
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
  let res = ''
  data.map(item => {
    let type = item.type || ''
    res += item.content + '/' + type + ' '
  })
  return res.substr(0, res.length-1)
} 

export function unformatWithProperty (formatedStr, propertys) {
  let label = ''
  let arr = formatedStr.split(' ')
  let res = arr.map((item, index) => {
    let data = item.split('/')
    if (!data[1]) {
      label = '无'
    } else {
      label = propertys.find(item => {
        return item.symbol === data[1]
      }).name
    }
    return {
      id: index,
      content: data[0],
      type: data[1],
      label
    }
  })
  return res  
}

export function showContentToShowPro (showContent, showPro) {
  let word = '', res = [], id = 0
  for (let i = 0;i < showContent.length;i++) {
    if (showContent[i].content !== '|') {
      word += showContent[i].content
    } else {
      res.push({id, content: word, type: "", label: "无"})
      id++
      word = ''
    }
  }

  if(showPro) {
    let longLen = 0, shortLen = 0, proIndex = 0
    for (let i = 0;i < res.length; i++) {
      // console.log(res[i].content, showPro[proIndex].content)
      if (!res[i].content || !showPro[proIndex].content) return res
      if (res[i].content === showPro[proIndex].content) {
        res[i] = showPro[proIndex]
        res[i].id = id + showPro[proIndex].id // 保证 id 不重复
        proIndex++
      } else {
        // 核心：把 i 调整到合理位置，使 res 和 showPro 回到同一起跑线
        // 取更长的那个字符串的长度
        if (res[i].content.length > showPro[proIndex].content.length) {
          longLen = res[i].content.length
          shortLen = showPro[proIndex].content.length
          while(longLen != shortLen) {
            if (longLen > shortLen) shortLen += showPro[proIndex++].content.length
            if (longLen < shortLen) longLen += res[i++].content.length
          }
        } else {
          longLen = showPro[proIndex].content.length
          shortLen = res[i++].content.length
          while(longLen != shortLen) {
            if (longLen > shortLen) shortLen += res[i++].content.length
            if (longLen < shortLen) longLen += showPro[proIndex++].content.length
          } 
        }
        longLen = 0
        shortLen = 0
        proIndex++
      }
    }
  }
  return res
}