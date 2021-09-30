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

module.exports = {
  formatTime,
  doneTime:doneTime,
  setTheArr:setTheArr,
  isCurrMonth:isCurrMonth
}
