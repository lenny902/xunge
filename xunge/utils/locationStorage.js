

var getToken = ()=>{  
  let value = ''
  try {
    value = wx.getStorageSync('token')
  } catch (e) {
  }
  return value
}

var saveToken = token => {
  try {
    wx.setStorageSync('token', token)
  } catch (e) {
    
  }
}

var getAccount = ()=>{  
  let value = ''
  try {
    value = wx.getStorageSync('account')
  } catch (e) {
  }
  return value
}

var saveAccount = obj => {
  try {
    wx.setStorageSync('account', obj)
  } catch (e) {
    
  }
}

module.exports = {
  saveToken:saveToken,
  getToken:getToken,
  saveAccount:saveAccount,
  getAccount:getAccount
}