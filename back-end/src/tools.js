export function appendChild (arr, child) {
  for (let i = 0;i < arr.length;i++) {
    if (child.parentId == arr[i].id) {
      if (arr[i].child === undefined) arr[i].child = []
      arr[i].child.push(child)
      return true
    }
    if (arr[i].child && arr[i].child.length != 0) {
      if(appendChild(arr[i].child, child) === true) return true
    }
  }
  return arr
}