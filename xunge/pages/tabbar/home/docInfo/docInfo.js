// pages/tabbar/home/docInfo/docInfo.js

var WxParse = require('../../../../components/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    item:{},
    subContents:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getList()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this
    that.fenxiang()
    return {
      title:"详情",
      path:"/pages/tabbar/home/docInfo/docInfo?id="+this.data.id,
      success:res=>{
        
      }
    }
  },
  doneData(allStr,urls){
    let that = this
    let index = 0
    let spArr = []
    while(index < urls.length) {
      let el = urls[index]
      let spStr = el.text
      if (spArr.length == 0) {
        let arr = that.fenGeStr(allStr,spStr)
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
          const eli = arr[i];
          if (i != 0) {
            newArr.push(spStr)
          }
          newArr.push(eli)
        }
        spArr = newArr
      }else {
        let newArr = []
        spArr.forEach(element => {
          let arr = that.fenGeStr(element,spStr)
          for (let i = 0; i < arr.length; i++) {
            const eli = arr[i];
            if (i != 0) {
              newArr.push(spStr)
            }
            newArr.push(eli)
          }
        });
        spArr = newArr
      }
      index += 1
    }
    return spArr
},

//分隔字符串
fenGeStr(resStr,spStr) {
  let arr = resStr.split(spStr)
  return arr
},

  tap_left(){
    wx.switchTab({
      url: '/pages/tabbar/home/home',
    })
  },

  getList(){
    let that = this
    wx.http.http_act_addHistory({
      data:{
        docId:this.data.id
      },
      success:res=>{
        
      }
    })
    wx.http.http_act_info({
      data:{
        id:this.data.id
      },
      success:res=>{
        let info = res.data
        info.showTime = wx.u.doneTime(info.createDt)
        let urls = info.urls
        let urlTexts = []
        urls.forEach(element => {
          urlTexts.push(element.text)
        });
        let arr = that.doneData(info.content,urls)
        
        let newArr = []
        if (arr.length == 0) {
          newArr.push({name:info.content})
        }else {
          for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            let dic = {
              name:element
            }
            let urlIndex = wx.u.arrHas(urlTexts,element)
            if (urlIndex > -1) {
              dic['type'] = 1
              dic['code'] = urls[urlIndex]['code']
            }
            newArr.push(dic)
          }
        }
        
        that.setData({
          item:info,
          subContents:newArr
        })
      }
    })
  },
  
  fenxiang(){
    
    wx.http.http_act_updateQuota({
      data:{
        id:this.data.id,
        forwardNum:1
      },
      success:res=>{

      }
    })
  },
  daochu(){

  },
  shoucang(){
    if (!this.data.isCollected) {
      wx.http.http_document_collection_add({
        data:{
          id:this.data.id
        },
        success:res=>{
  
        }
      })
    }else {
      wx.http.http_document_collection_del({
        data:{
          id:this.data.id
        },
        success:res=>{
  
        }
      })
    }
  },

  go_to_stock(e){
    let item = e.currentTarget.dataset.item
    console.log(item)
    wx.navigateTo({
      url: '/pages/tabbar/stock/stockInfo?stockCode='+item.code
    })
  }
})