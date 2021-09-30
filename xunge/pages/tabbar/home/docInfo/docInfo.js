// pages/tabbar/home/docInfo/docInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    item:{}
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
    return {
      title:"详情",
      path:"/pages/tabbar/home/docInfo/docInfo?id="+this.data.id,
      success:res=>{
        that.fenxiang()
      }
    }
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
        id:this.data.id
      },
      success:res=>{
        
      }
    })
    wx.http.http_act_info({
      data:{
        id:this.data.id
      },
      success:res=>{
        that.setData({
          item:res.data
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

  }
})