// pages/tabbar/fund/fundInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen:false,
    isRenOpen:false,
    zuAllArr:[],
    fenList:[
      {
        name:"近1月",
        isSelect:true,
        value:0
      },
      {
        name:"近3月",
        isSelect:false,
        value:1
      },
      {
        name:"近6月",
        isSelect:false,
        value:2
      },
      {
        name:"近1年",
        isSelect:false,
        value:3
      },
      {
        name:"近3年",
        isSelect:false,
        value:4
      },
      {
        name:"最大",
        isSelect:false,
        value:5
      }
    ],
    profit:{},
    nowTime:'',
    stockList:[],
    fundCode:'',
    baseInfo:{},
    overInfo:{},
    overArr:[],
    managers:[],
    managerInfo:{},
    baseList:[
      {
        name:"基金全称",
        value:""
      },
      {
        name:"基金代码",
        value:""
      },
      {
        name:"成立日期",
        value:""
      },
      {
        name:"资产规模",
        value:""
      },
      {
        name:"基金类型",
        value:""
      },
      {
        name:"跟踪标的",
        value:""
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fundCode:options.fundCode
    })
    this.getData()
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
  getData(){

  
    let that = this
    let fundCode = this.data.fundCode;


    wx.http.http_fund_getFundProfit({
      data:{
        fundCode:fundCode
      },
      success:res=>{

        let list = res.data.profitList
        that.setData({
          profit:res.data
        })
        let oneMonths = []
        let thereMonths = []
        let sixMonths = []
        let alls = []
        let oneYears = []
        let thereYears = []

        list.reverse().forEach(element => {
          alls.push(element)
          if (wx.u.isCurrMonth(element.date,1)) {
            oneMonths.push(element)
          }
          if (wx.u.isCurrMonth(element.date,3)) {
            thereMonths.push(element)
          }
          if (wx.u.isCurrMonth(element.date,6)) {
            sixMonths.push(element)
          }
          if (wx.u.isCurrMonth(element.date,12)) {
            oneYears.push(element)
          }
          if (wx.u.isCurrMonth(element.date,12 * 3)) {
            thereYears.push(element)
          }
        });

        that.data.zuAllArr = [oneMonths,thereMonths,sixMonths,oneYears,thereYears,alls]
        that.getCurrList(0)
      }
    })

    wx.http.http_fund_getFundScale({
      data:{
        fundCode:fundCode
      },
      success:res=>{
        let xArr = []
        let yArr = []
        let list = res.data;
        list.forEach(element => {
          xArr.push(element.date)
          yArr.push(Number(element.netAsset))
        });
        let bar = that.selectComponent("#bar")
        bar.refresh({
          xs:xArr,
          ys:yArr
        })

        
        let date = new Date().toLocaleDateString()
        that.setData({
          nowTime:date
        })
      }
    })

    wx.http.http_fund_getFundStock({
      data:{
        fundCode:fundCode
      },
      success:res=>{
        that.setData({
          stockList:res.data
        })
      }
    })

    wx.http.http_fund_getFundManager({
      data:{
        fundCode:fundCode
      },
      success:res=>{
        let arr = res.data
        if (arr.length > 0) {
          that.setData({
            managerInfo:arr[0]
          })
        }
      }
    })

    wx.http.http_fund_getFundManagerChange({
      data:{
        fundCode:fundCode
      },
      success:res=>{
        that.setData({
          managers:res.data
        })
      }
    })

    wx.http.http_fund_getFundOverview({
      data:{
        fundCode:fundCode
      },
      success:res=>{
        that.setData({
          overInfo:res.data,
          overArr:res.data.keywords.split(',')
        })
      }
    })

    wx.http.http_fund_getFundInformation({
      data:{
        fundCode:fundCode
      },
      success:res=>{
        let baseInfo = res.data
        let arr = that.data.baseList
        wx.u.setTheArr(arr,0,baseInfo.fundAddName)
        wx.u.setTheArr(arr,1,baseInfo.fundCode)
        wx.u.setTheArr(arr,2,baseInfo.issueDate)
        wx.u.setTheArr(arr,3,baseInfo.assetSize)
        wx.u.setTheArr(arr,4,baseInfo.fundType)
        wx.u.setTheArr(arr,5,baseInfo.trackingTarget)
      
        this.setData({
          baseInfo:baseInfo,
          baseList:arr
        })
      }
    })
  },

  addStock(e){
    let that = this
    let item = e.currentTarget.dataset.item
    wx.http.http_stock_addStockOptional({
      data:{
        stockCode:item.stockCode
      },
      success:res=>{
        wx.showToast({
          title: '添加自选成功', 
          icon: 'none'
        })
        that.getData()
      }
    })
  },
  subStock(e){
    let that = this
    let item = e.currentTarget.dataset.item
    wx.http.http_stock_delStockOptional({
      data:{
        stockCode:item.stockCode
      },
      success:res=>{
        wx.showToast({
          title: '取消自选成功', 
          icon: 'none'
        })
        that.getData()
      }
    })
  },

  tap_fen_select(e){
    let index = e.currentTarget.dataset.index;
    let arr = this.data.fenList
    arr.forEach(element => {
      element.isSelect = false
    });
    arr[index].isSelect = true
    this.setData({
      fenList:arr
    })
    this.getCurrList(arr[index].value)
  },

  getCurrList(index){

    let list = this.data.zuAllArr[index]
    let xArr = []
    let bFArr = []
    let ageArr = []
    let huArr = []
    list.forEach(element => {

      xArr.push(element.date)
      bFArr.push(Number(element.returnRate))
      ageArr.push(Number(element.avgReturn))
      huArr.push(Number(element.hs300))
    })
    let eline = this.selectComponent("#eline")
    eline.refresh({
      xs:xArr,
      ys1:bFArr,
      ys2:ageArr,
      ys3:huArr
    })
  },

  tap_open(){
    this.setData({
      isOpen:!this.data.isOpen
    })
  },

  tap_ren_open(){
    this.setData({
      isRenOpen:!this.data.isRenOpen
    })
  }
})