// app.js

const http = require('./utils/http.js')
const ls = require('./utils/locationStorage.js');
const util = require('./utils/util.js');
const uitl = require('./utils/util.js');


App({
  onLaunch() {
    // 展示本地存储能力

    wx.http = http;
    wx.ls = ls;
    wx.u = util;
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
    if (wx.ls.getToken().length > 0) {
      wx.switchTab({
        url: '/pages/tabbar/home/home',
      })
    }

  },
  globalData: {
    userInfo: null
  }
})
