// pages/tabbar/stock/stockBig.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topItems:['日K','周K','月K','年K'],
    topIndex:0,
    stockCode:'',
    key:1,
    stockInfo:{},
    todayInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let stockCode = options.stockCode
    let stockInfo = JSON.parse(options.info)
    this.setData({
      stockCode:stockCode,
      stockInfo:stockInfo
    })
    console.log(stockInfo)
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
    let index = e.currentTarget.dataset.index
    this.setData({
      topIndex:index
    })
    this.data.key = index + 1
    this.getList()
  },
  close_btn(e){
    wx.navigateBack({
      delta: -1,
    })
  },

  getList(){
    let that = this
    wx.http.http_stock_getStock({
      data:{
        stockCode:this.data.stockCode,
        pageNo:1,
        key:this.data.key
      },
      success:res=>{
        that.doneData(res.data)
      }
    })
  },
  doneData(list){
    let xs = []
    let ys1 = []
    let miny = 0
    let maxy = 0
    let todayInfo = {}
    list.reverse().forEach(element => {
      let str = element.date
      let arr = str.split('-')
      xs.push(arr[0]+"/"+arr[1]+"/"+arr[2])
      ys1.push([element.open,element.close,element.low,element.high])
      miny = Math.min(miny,element.low)
      maxy = Math.max(maxy,element.high)
      todayInfo = element
    });

    let kline = this.selectComponent("#kline")
    if (kline) {
      kline.refresh({
        xs:xs,
        ys1:ys1,
        maxy:maxy,
        miny:miny
      })
    }
    this.setData({
      todayInfo:todayInfo
    })
  },
})