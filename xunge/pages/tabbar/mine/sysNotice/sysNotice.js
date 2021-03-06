// pages/tabbar/mine/sysNotice/sysNotice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pageNo:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getList()
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

  },

  getList(){
    let that = this
    wx.http.http_msg_getMsgList({
      data:{
        msgFlag:0,
        pageSize:10,
        pageNo:this.data.pageNo
      },
      success:res=>{

        res.data.list.forEach(element => {
          element.dateStr = wx.u.doneTime(element.createDt)
        });
        that.setData({
          list:res.data.list
        })
      }
    })
  }
})