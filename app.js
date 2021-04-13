// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const userInfo = wx.getStorageSync('userInfo') || null;
    this.globalData.userInfo = userInfo;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})