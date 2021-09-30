// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  login_btn(){
    
    wx.getUserProfile({
      desc: '授权登录',
      success:res=>{
        let userInfo = res.userInfo;
        wx.login({
          success:res1=>{
            if (res1.errMsg == "login:ok") {
              let code = res1.code
              wx.ls.saveToken(code)
              let param = {}
              // param["code"] = code
              param["wxName"] = userInfo.nickName
              param["wxHeadPic"] = userInfo.avatarUrl
              wx.http.http_login({
                data:param,
                success:res=>{
                  wx.switchTab({
                    url: '/pages/tabbar/home/home',
                  })
                },
              })
            }else {
              wx.showToast({
                title: '微信授权失败',
              })
            }
          }
        })
        
        
      }
    })
    
  }
})