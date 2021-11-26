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
    wxId:"x",
    //
    showSubs:[false,false,false,false,false],
    subIndex:-1,
    isShowSub:false
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

        let list = res.data.list

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
  like(e){
    let that = this
    let index = e.currentTarget.dataset.index
    let item = this.data.list[index]
    wx.http.http_fund_addSubscribe({
      data:{
        fundCode:item.fundCode,
        wxId:this.data.wxId
      },
      success:res=>{
        wx.showToast({
          title: '添加成功',
          icon:'none'
        })

        item.subscribed = true
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
        fundCode:item.fundCode,
        wxId:this.data.wxId
      },
      success:res=>{
        wx.showToast({
          title: '删除成功',
          icon:'none'
        })

        item.subscribed = false
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
      url: '/pages/tabbar/fund/fundInfo?fundCode='+item.fundCode,
    })
  },

  tap_sub_index(e){
    let dataset = e.currentTarget.dataset
    let section = dataset.section
    let index = dataset.index
    
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
  go_to_stock(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabbar/stock/stockInfo?stockCode='+item.stockCode +"&info="+JSON.stringify(item),
    })
  },
  refresh(){
    this.data.pageNo = 1
    this.getFundList()
    this.selectComponent("#mess").EndRefresh()
  },
  bindscrollToLower(){
    this.data.pageNo += 1
    this.getFundList()
    this.selectComponent("#mess").EndScrolltolower()
  }
})