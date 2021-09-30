// pages/tabbar/opt/opt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topItems:['自选基金','自选股票'],
    topIndex:0,
    list:[]
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
  tap_topIndex(e){
    let index = e.detail
    this.setData({
      topIndex:index,
      list:[]
    })
    this.getList()
  },

  getList(){
    let topIndex = this.data.topIndex
    if (topIndex == 0) {
      this.getFund()
    }else {
      this.getSocket()
    }
  },

  getFund(){

    let that = this
    wx.http.http_fund_getOptional({
      data:{},
      success:function(res){
        that.setData({
          list:res.data
        })
      }
    })
  },
  getSocket(){
    let that = this
    wx.http.http_stock_getOptionalList({
      data:{},
      success:function(res){
        that.setData({
          list:res.data
        })
      }
    })
  },
  go_to_fundInfo(e){
    let index = e.currentTarget.dataset.index
    let item = this.data.list[index]
    wx.navigateTo({
      url: '/pages/tabbar/fund/fundInfo?fundCode='+item.fundCode,
    })
  },
  go_to_stockInfo(e){
    let index = e.currentTarget.dataset.index
    let item = this.data.list[index]
    wx.navigateTo({
      url: '/pages/tabbar/stock/stockInfo?stockCode='+item.stockCode +"&info="+JSON.stringify(item),
    })
  }
})