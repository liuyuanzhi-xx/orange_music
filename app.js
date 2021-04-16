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
    userInfo: null,
    playSongList: {
      current: 0,
      songList: []
    }

  },
  watch: function (method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "playSongList", { //这里的 data 对应 上面 globalData 中的 data
      configurable: true,
      enumerable: true,
      set: function (value) { //动态赋值，传递对象，为 globalData 中对应变量赋值
        this.current = value.current;
        this.songList = value.songList;
        method(value);
      },
      get: function () { //获取全局变量值，直接返回全部
        return this.globalData;
      }
    })
  },
})