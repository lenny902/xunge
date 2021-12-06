const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

var doneTime = function(res){
  let str = ""
  if (res) {
    let arr = res.split(/:| |-/)
    if (arr.length == 6) {
      str = arr[1] + "/" + arr[2] + " " + arr[3] + ":" + arr[4]
    }else {
      str = res
    }
  }
  return str
}

var setTheArr = (arr,index,value)=>{
  arr[index]['value'] = value
}

var isCurrMonth = (date,month) => {

  let now = new Date().toLocaleDateString()
  let time = Date.parse(new Date(date))
  let space = month * 30 * 24 * 3600 * 1000
  return (Date.parse(now) - time) < space
}

var num2 = function(str){ 
  if (str == null){
    return 0
  }
  return Number(str).toFixed(2)
}

//数组中包含某个元素
var arrHas = function(arr,item) {
  if (arr) {
    return arr.indexOf(item) 
  }
  return -1
}


module.exports = {
  formatTime,
  doneTime:doneTime,
  setTheArr:setTheArr,
  isCurrMonth:isCurrMonth,
  num2:num2,
  arrHas:arrHas
}
