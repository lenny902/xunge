// pages/tabbar/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topItems:['原创','消息','热门'],
    topIndex:0,
    pageNo:1,
    pageSize:12,
    list:[],
    showSubs:[false,false,false,false,false],
    subIndex:-1,
    subList:[],
    isShowSub:false,
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
    wx.http.http_user_getAccount({
      data:{},
      success:res=>{
        wx.ls.saveAccount(res.data)
      }
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
      this.getYuanChuang()
    }else if (topIndex == 2) {
      this.getHot()
    }else if (topIndex == 1) {
      this.getMessage()
    }
  },
  getYuanChuang(){
    let that = this
    wx.http.http_act({
      data:{
        "originalFlag":1,
        "pageSize":this.data.pageSize,
        "pageNo":this.data.pageNo
      },
      success:res=>{
        let list = res.data.list
        list.forEach(element => {
          element.showTime = wx.u.doneTime(element.createDt)
        });

        let newList = []
        if (that.data.pageNo == 1) {
          newList = list
        }else {
          newList = that.data.list.concat(list)
        }

        that.setData({
          list:newList
        })
      }
    })
  },
  getHot(){
    let that = this
    wx.http.http_act({
      data:{
        "hotFlag":1,
        "pageSize":this.data.pageSize,
        "pageNo":this.data.pageNo
      },
      success:res=>{
        let list = res.data.list
        list.forEach(element => {
          element.showTime = wx.u.doneTime(element.createDt)
        });
        
        let newList = []
        if (that.data.pageNo == 1) {
          newList = list
        }else {
          newList = that.data.list.concat(list)
        }

        that.setData({
          list:newList
        })
      }
    })
  },
  getMessage(){
    let that = this
    wx.http.http_fund_getFundDynamic({
      data:{
        pageNo:this.data.pageNo,
        pageSize:this.data.pageSize
      },
      success:res=>{
        let list = res.data.list
        list.forEach(element => {
          element.showTime = wx.u.doneTime(element.nowTime)
        });
        let newList = []
        if (that.data.pageNo == 1) {
          newList = list
        }else {
          newList = that.data.list.concat(list)
        }

        that.setData({
          list:newList
        })
      }
    })
  },
  getFoundDetail(fundCode,type){
    //1建，2增，3减，4清，5前10
    let that = this
    wx.http.http_fund_getFundDynamicDetails({
      data:{
        "dynamicType":type,
        "fundCode":fundCode
      },
      success:res=>{
        let list = res.data 
        list.forEach(element => {
          element.showTime = wx.u.doneTime(element.fetchTime)
        });
        that.setData({
          subList:list
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
  tap_sub_index(e){
    let index = e.currentTarget.dataset.index;
    let section = e.currentTarget.dataset.section;
    let array = this.data.showSubs;

    if (this.data.subIndex > -1 && this.data.subIndex != section ) {
      
      for (let i = 0; i < array.length; i++) {
        array[i] = false
      }
      this.setData({
        subIndex:-1,
        showSubs:array
      })
      return
    }

    
    array[index] = !array[index]
    let isshow = false
    for (let i = 0; i < array.length; i++) {
      if (i!=index) {
        array[i] = false
      }
      if (array[i]) {
        isshow = true
      }
    }
    this.setData({
      showSubs:array,
      subIndex:section,
      isShowSub:isshow
    })

    let item = this.data.list[section];
    this.getFoundDetail(item.fundCode,Number(index) + 1)

    this.selectComponent("#home").SetScrolloPosition({
      top:130 * section
    })
  },
  go_to_fundInfo(e){
    console.log(e)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabbar/fund/fundInfo?fundCode='+item.fundCode,
    })
  },
  go_to_stock(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabbar/stock/stockInfo?stockCode='+item.stockCode +"&info="+JSON.stringify(item),
    })
  },
  refresh(){
    this.data.pageNo = 1
    this.getList()
    this.selectComponent("#home").EndRefresh()
  },
  bindscrollToLower(){
    this.data.pageNo += 1
    this.getList()
    this.selectComponent("#home").EndScrolltolower()
  }
})