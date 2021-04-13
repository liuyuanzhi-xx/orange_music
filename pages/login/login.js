// pages/login/login.js

import request from "../../utils/request"
import rules from "../../utils/verify"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "19117692297",
    password: "302822945Haiai",
    phoneFlag: false,
    phoneTips: "",
    passwordFlag: false,
    passwordTips: "",
    loading: false,
    isTap: true

  },
  async login() {
    if (this.data.phoneFlag && this.data.passwordFlag) {
      this.setData({
        loading: true,
        isTap: false

      })
      const res = await request('/login/cellphone', {
        phone: this.data.phone,
        password: this.data.password
      })

      if (res.data.code == 400) {
        wx.showToast({
          title: '手机号错误',
          icon: 'none',
          duration: 2000
        })
      } else if (res.data.code == 502) {
        wx.showToast({
          title: '密码错误',
          icon: 'none',
          duration: 2000
        })
      } else if (res.data.code == 200) {
        this.setData({
          loading: false,
        })
        wx.showToast({
          title: '登陆成功',
          icon: 'none',
          duration: 2000,
          success: function () {
            wx.setStorageSync('userInfo', res.data)
            app.globalData.userInfo = res.data;
            console.log(app.globalData.userInfo);
            wx.switchTab({
              url: "/pages/mine/mine"
            })
          }
        })
        return
      } else {
        wx.showToast({
          title: '登陆失败',
          icon: 'none',
          duration: 2000
        })
      }
      this.setData({
        loading: false,
        isTap: true
      })
    }
  },
  isPhone() {
    const rule = rules.isPhone(this.data.phone);
    console.log(rule.msg);
    this.setData({
      phoneTips: rule.msg,
      phoneFlag: rule.flag
    })
  },
  isEmpty(e) {
    let type = e.currentTarget.dataset.type;
    const rule = rules.isEmpty(this.data[type]);
    console.log(rule.msg);
    this.setData({
      [type + 'Tips']: rule.msg,
      [type + 'Flag']: rule.flag
    })
  },

  forget() {
    wx.navigateTo({
      url: "/pages/forget/forget"
    })
  },
  register() {
    wx.navigateTo({
      url: "/pages/register/register"
    })
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