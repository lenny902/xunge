// pages/tabbar/mess/mess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topItems:[],
    secondTopItems:['规模','年华收益率','订阅数','成立日期','调仓频率'],
    fundType:"全部基金",
    order:"1", //1:规模，2:年化收益3:自选 4:时间
    pageNo:1,
    pageSize:12,
    list:[],
    wxId:"x"
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
    console.log(wx.ls.getAccount())
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

  typeTapIndex(e){
    let index = e.detail
    this.setData({
      fundType:this.data.topItems[index]
    })
    this.getFundList()
  },
  orderTapIndex(e){
    let index = e.detail
    this.setData({
      order:index
    })
    this.getFundList()
  },

  getList(){
    this.getTypeList()
  },

  getTypeList(){
    let that = this
    wx.http.http_fund_getFundType({
      success:res=>{
        that.setData({
          topItems:res.data,
          fundType:res.data[0]
        })
        that.getFundList()
      }
    })
  },
  getFundList(){
    let that = this
    wx.http.http_fund_getFundList({
      data:{
        fundType:this.data.fundType,
        order:this.data.order,
        pageNo:this.data.pageNo,
        pageSize:this.data.pageSize
      },
      success:res=>{
        that.setData({
          list:res.data.list
        })
      }
    })
  },
  like(e){
    let that = this
    let index = e.currentTarget.dataset.index
    let item = this.data.list[index]
    wx.http.http_fund_addSubscribe({
      data:{
        fundCode:item.targetCode,
        wxId:this.data.wxId
      },
      success:res=>{
        wx.showToast({
          title: '添加成功',
          icon:'none'
        })

        item.wxId = that.data.wxId
        that.data.list[index] = item
        that.setData({
          list:that.data.list
        })
      }
    })
  },
  unlike(e){
    let that = this
    let index = e.currentTarget.dataset.index
    let item = this.data.list[index]
    wx.http.http_fund_delSubscribe({
      data:{
        fundCode:item.targetCode,
        wxId:this.data.wxId
      },
      success:res=>{
        wx.showToast({
          title: '删除成功',
          icon:'none'
        })

        item.wxId = ""
        that.data.list[index] = item
        that.setData({
          list:that.data.list
        })
      }
    })
  },
  go_to_fundInfo(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabbar/fund/fundInfo?fundCode='+item.targetCode,
    })
  }
})