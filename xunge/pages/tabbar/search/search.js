// pages/tabbar/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputStr:'',
    funds:[],
    stocks:[],
    others:[],
    wxId:'',
    noData:false
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

    this.setData({
      wxId:wx.ls.getAccount().wxId
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

  bindinput(e){
    let that = this
    let str = e.detail.value
    this.setData({
      inputStr:str
    })
    wx.http.http_search({
      data:{
        keyword:str
      },
      success:res=>{
        let info = res.data.data
        if (!info) {
          that.setData({
            noData:true
          })
          return 
        }

        that.setData({
          noData:false
        })
        let funds = info.funds
        let others = info.others
        let stocks = info.stocks
        that.setData({
          funds:funds,
          others:others,
          stocks:stocks
        })
      }
    })
  },
  clear(){
    this.setData({
      inputStr:''
    })
  },

  like(e){
    let that = this
    let item = e.currentTarget.dataset.item
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    let arr = []
    if (type == 0) {
      arr = this.data.stocks
    }else if (type == 1) {
      arr = this.data.funds
    }

    if (type == 0) {
      wx.http.http_stock_addStockOptional({
        data:{
          stockCode:item.code
        },
        success:res=>{
          wx.showToast({
            title: '添加成功',
            icon:'none'
          })
          item.subscribed = true
          arr[index] = item
          that.setData({
            stocks:arr
          })
        }
      })
    }else if (type == 1){
      wx.http.http_fund_addSubscribe({
        data:{
          fundCode:item.code,
          wxId:this.data.wxId
        },
        success:res=>{
          wx.showToast({
            title: '添加成功',
            icon:'none'
          })
          item.subscribed = true
          arr[index] = item
          that.setData({
            funds:arr
          })
        }
      })
    }
    
  },
  unlike(e){
    let that = this
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    let arr = []
    if (type == 0) {
      arr = this.data.stocks
    }else if (type == 1) {
      arr = this.data.funds
    }

    if (type == 0) {
      wx.http.http_stock_delStockOptional({
        data:{
          stockCode:item.code
        },
        success:res=>{
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })
          item.subscribed = false
          arr[index] = item
          that.setData({
            stocks:arr
          })
        }
      })
    }else if (type == 1){

      wx.http.http_fund_delSubscribe({
        data:{
          fundCode:item.code,
          wxId:this.data.wxId
        },
        success:res=>{
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })
  
          item.subscribed = false
          arr[index] = item
          that.setData({
            funds:arr
          })
        }
      })
    }
    
  },

  go_to_doc(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabbar/home/docInfo/docInfo?id='+item.code,
    })
  },
  go_to_fund(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabbar/fund/fundInfo?fundCode='+item.code,
    })
  },
  go_to_stock(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabbar/stock/stockInfo?stockCode='+item.code,
    })
  }
})