// pages/tabbar/mine/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zuArr:[],
    account:{},
    isShow:false,
    showInfo:{},
    inputName:""
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
      account:wx.ls.getAccount()
    })
    this.setZuArr()
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

  setZuArr(){
    let arr = []
    let account = this.data.account
    arr.push({
      name:"真实姓名",
      value:account.realName,
      type:1
    })
    arr.push({
      name:"手机号码",
      value:account.phone,
      type:2
    })
    arr.push({
      name:"邮箱地址",
      value:account.mailAddr,
      type:3
    })

    let arr1 = []
    arr1.push({
      name:"手机号绑定",
      value:account.phoneBinding
    })
    arr1.push({
      name:"公众号推送",
      value:account.pushNews
    })

    

    this.setData({
      zuArr:[{
        name:"基本资料",
        list:arr
      },{
        name:"推送设置",
        list:arr1
      }]
    })
  },

  bindchange(e){
    let row = e.currentTarget.dataset.row
    let value = e.detail.value

    let dic = this.data.account
    if (row == 0) {
      //绑定手机号
      dic["phoneBinding"] = Number(value)
    }else if (row == 1) {
      //公众号
      dic["pushNews"] = Number(value)
    }
    console.log(e,dic)
    this.updateData(dic)
  },
  updateData(dic){
    let that = this
    wx.http.http_user_improveAccount({
      data:dic,
      success:res=>{

        wx.http.http_user_getAccount({
          data:{},
          success:res=>{
            wx.ls.saveAccount(res.data)
            that.setData({
              account:wx.ls.getAccount()
            })
            that.setZuArr()
          }
        })

      }
    })
  },

  tap_show(e){
    let section = e.currentTarget.dataset.section
    let row = e.currentTarget.dataset.row
    if (section == 0) {
      let info = this.data.zuArr[section].list[row]
      this.setData({
        showInfo:info,
        inputName:info.value,
        isShow:true
      })
    }
  },
  tap_sure(){
    this.setData({
      isShow:false
    })
    let dic = this.data.account;
    if (this.data.showInfo.type == 1){
      //姓名
      dic["realName"] = this.data.inputName
    }else if (this.data.showInfo.type == 2) {
      //手机
      dic["phone"] = this.data.inputName
    }else if (this.data.showInfo.type == 3) {
      //邮箱
      dic["mailAddr"] = this.data.inputName
    }
    this.updateData(dic)
  },
  tap_cancel(){
    this.setData({
      isShow:false
    })
  },
  inputChange(e){
    this.setData({
      inputName:e.detail.value
    }) 
  }
})