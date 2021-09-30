// 使用时请将log挂载到wx上面，并且设置setInit函数 {}
var isLog  = false
var name = ""

//初始化函数设置基础信息
function setInit(params) {
  isLog = params.isLog
  name = params.name
}
//打印函数 
function log(param) {
  if(!isLog){
    return;
  }
  console.log("-----------------------------------------------" + name + "-------------------------------------------\n" + JSON.stringify(param) + '\n' + "----------------------------------------------------------------------------------------------------");
}

module.exports = {
  setInit:setInit,
  log: log
}

