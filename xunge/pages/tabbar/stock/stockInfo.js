// pages/tabbar/stock/stockInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topItems:['日K','周K','月K','年K'],
    topIndex:0,
    stockCode:'',
    key:1,
    list:[],
    showSubList:false,
    subList:[],
    currIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let stockCode = options.stockCode
    // let stockInfo = JSON.parse(options.info)
    this.setData({
      stockCode:stockCode,
      // stockInfo:stockInfo
    })
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
    this.data.key = index + 1
    this.getList()
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
  
    this.getSubList('')
    // wx.http.http_stock_getStockByFundType({
    //   data:{
    //     stockCode:this.data.stockCode,
    //     pageNo:1,
    //     key:this.data.key
    //   },
    //   success:res=>{
        // that.setData({
        //   list:res.data
        // })
    //   }
    // })
  },
  doneData(list){
    let xs = []
    let ys1 = []
    let miny = 100000
    let maxy = 0
    list.reverse().forEach(element => {
      let str = element.date
      let arr = str.split('-')
      xs.push(arr[0]+"/"+arr[1]+"/"+arr[2])
      ys1.push([wx.u.num2(element.open),wx.u.num2(element.close),wx.u.num2(element.low),wx.u.num2(element.high)])
      miny = Math.min(miny,element.low)
      maxy = Math.max(maxy,element.high)
    });


    let minSize = this.sizeOfInt(miny)
    let pw = Math.pow(10,minSize-2)
    maxy += pw
    miny -= pw    

    let kline = this.selectComponent("#kline")
    if (kline) {
      kline.refresh({
        xs:xs,
        ys1:ys1,
        maxy:maxy.toFixed(2),
        miny:miny.toFixed(2)
      })
    }
  },

  //数字为几位数
  sizeOfInt(i){
    let l = 0
    while(i >= 1) {
      i = i / 10
      l += 1
    }
    return l
  },

  tap_item(e){
    let row = e.currentTarget.dataset.row
    let item = this.data.list[row]
    this.setData({
      showSubList:!this.data.showSubList,
      currIndex:row,
      subList:item.details
    })

  },
  getSubList(fundType){

    console.log('lsifsf---23')
    let that = this 
    wx.http.http_stock_getStockOfFund({
      data:{
        stockCode:this.data.stockCode,
        // fundType:fundType
      },
      success:res=>{

        let info = res.data
        var arr = []
        for (const key in info) {
          if (Object.hasOwnProperty.call(info, key)) {
            const element = info[key];
            var dic = element;
            dic["name"] = key
            arr.push(dic)
          }
        }
        that.setData({
          list:arr,
        })
      }
    })
  },
  go_to_fund(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/tabbar/fund/fundInfo?fundCode='+item.fundCode,
    })

    // wx.http.http_stock_getStockChangeOfFund({
    //   data:{
    //     stockCode:this.data.stockCode,
    //     fundCode:item.fundCode,
    //     key:this.data.key
    //   },
    //   success:res=>{
        
    //   }
    // })
  },
  tap_big(){
    wx.navigateTo({
      url: './stockBig?stockCode='+this.data.stockCode + "&info="+ JSON.stringify(this.data.stockInfo),
    })
  }
})