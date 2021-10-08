// pages/tabbar/mine/myTiQuestion/myTiQuestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fkContent:''
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
  addQues(){

    let con = this.data.fkContent
    if (con.length == 0) {
      wx.showToast({
        title: '请输入内容',
        icon:'none'
      })
      return
    }

    wx.http.http_feedback_addFeedback({
      data:{
        fkContent:con
      },
      success:res=>{
        wx.showToast({
          title: '提交成功',
          icon:'success'
        })
        wx.navigateBack({
          delta: -1,
        })
      }
    })
  },

  bindinput(e){
    
    this.setData({
      fkContent:e.detail.value   
    }) 
  }
})