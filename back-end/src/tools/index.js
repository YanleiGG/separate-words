var fs = require('fs')
var xml2js = require('xml2js')
var parser = new xml2js.Parser()

export function getContentLabelsTree (data, parentId = null) {
  let res = []
  for (let i = 0;i < data.length;i++) {
    let child = data[i]
    if (child.parentId === parentId) {
      res.push({
        title: child.name,
        key: child.mainId,
        child: getContentLabelsTree(data, child.mainId)
      })
    }
  }
  return res
}

export async function readAndParseXML(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) return reject(err)
      parser.parseString(data, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  })
}