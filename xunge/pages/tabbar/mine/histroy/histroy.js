// pages/tabbar/mine/histroy/histroy.js
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
    wx.http.http_document_getDocumentHistoryList({
      data:{
        pageSize:10,
        pageNo:this.data.pageNo
      },
      success:res=>{

        let list = res.data.list
        list.forEach(element => {
          element.showTime = wx.u.doneTime(element.createDt)
        });
        that.setData({
          list:list
        })
      }
    })
  },
  tap_doc_info(e){
    let index = e.currentTarget.dataset.index
    let item = this.data.list[index];
    let id = item.id
    wx.navigateTo({
      url: '/pages/tabbar/home/docInfo/docInfo?id='+id,
    })
  },
})