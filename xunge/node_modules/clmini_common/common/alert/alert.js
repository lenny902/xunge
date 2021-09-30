
//不带cancel的函数
function show(content,fun) {
  wx.showModal({
    showCancel:false,
    title:"提示",
    content:content,
    complete:res=>{
      if(fun && typeof(fun) != "undefined"){
        fun(res)
      }
    }
  })
}
//带cancel的函数
function showCancel(content,fun) {
  wx.showModal({
    title:"提示",
    content:content,
    success:res=>{
      if(fun && typeof(fun) != "undefined"){
        fun(res)
      }
    }
  })
}


module.exports = {
  show:show,
  showCancel:showCancel
}