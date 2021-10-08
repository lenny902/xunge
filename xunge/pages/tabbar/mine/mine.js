// pages/tabbar/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:{},
    zuArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setZuArr()
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
    this.setData({
      account:wx.ls.getAccount()
    })
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
  setZuArr(){
    let arr = []
    arr.push({
      name:"系统通知",
      icon:"xitongxiaoxi",
      page:"./sysNotice/sysNotice"
    })
    // arr.push({
    //   name:"我的收藏",
    //   icon:"shoucang"
    // })
    arr.push({
      name:"历史记录",
      icon:"lishijilu",
      page:"./histroy/histroy"
    })

    let arr1 = []
    arr1.push({
      name:"我的提问",
      icon:"tiwen",
      page:"./myQustion/myQustion"
    })
    arr1.push({
      name:"常见问题",
      icon:"changjianwenti",
      page:"./question/question"
    })

    let arr2 = []
    // arr2.push({
    //   name:"用户反馈",
    //   icon:"yijianfankui"
    // })
    arr2.push({
      name:"我的设置",
      icon:"shezhi",
      page:"./set/set"
    })

    this.setData({
      zuArr:[arr,arr1,arr2]
    })
  },
  go_to_next(e){
    let url = e.currentTarget.dataset.page
    wx.navigateTo({
      url: url,
    })
  }
})