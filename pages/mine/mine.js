// pages/mine/mine.js
import request from "../../utils/request"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    weekData: null
  },
  toLogin() {
    if (!this.data.userInfo) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if (this.data.userInfo) {
      const res = await request('/user/record', {
        uid: this.data.userInfo.profile.userId,
        type: 1
      })
      if (res.data.code == 200) {
        this.setData({
          weekData: res.data.weekData.map((item) => {
            return {
              id: item.song.id,
              ...item
            }
          })
        })
      } else {
        wx.showToast({
          title: "获取最近播放失败",
          icon: "none",
          duration: 2000,

        })
      }

      console.log(this.data.weekData)
    }

  },
  toLogout() {
    if (!this.data.userInfo) {
      wx.showToast({
        title: "请先登陆",
        icon: "none",
        duration: 2000,
      })
      return;
    }
    wx.showModal({
      title: "注销提醒",
      content: "你确定要注销当前账号吗？",
      async success(res) {
        if (res.confirm) {
          const res = await request('/logout');
          if (res.data.code = 200) {
            app.globalData.userInfo = null;
            wx.removeStorage({
              key: 'userInfo',
              success(res) {
                wx.showToast({
                  title: "注销成功",
                  icon: "none",
                  duration: 2000,
                  success: function () {
                    wx.reLaunch({
                      url: "/pages/mine/mine",
                    })
                  }
                })
                console.log(res)
              }
            })

          }

        }

      },
      fail() {
        return;
      }

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

  }
})