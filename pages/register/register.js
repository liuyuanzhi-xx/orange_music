// pages/register/register.js
import rules from "../../utils/verify"
import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: "",
    password: "",
    Apassword: "",
    phone: "",
    captcha: '',
    countDown: 60,
    isTap: true,
    phoneTips: "",
    phoneFlag: false,
    ApasswordTips: "",
    ApasswordFlag: false,
    nicknameTips: "",
    nicknameFlag: false,
    passwordTips: "",
    passwordFlag: false,
    captchaTips: "",
    captchaFlag: false


  },
  async isRegister() {
    const res = await request('/cellphone/existence/check', {
      phone: this.data.phone
    })
    if (res.data.code == 200 && res.data.exist == 1) {
      this.setData({
        phoneTips: "该电话号码已注册",
        phoneFlag: false
      })
    }

  },
  isPhone() {
    const rule = rules.isPhone(this.data.phone);

    this.setData({
      phoneTips: rule.msg,
      phoneFlag: rule.flag
    })
    if (this.data.phoneFlag) {
      this.isRegister();
    }
  },
  isSame() {
    const rule = rules.isSame(this.data.password, this.data.Apassword);

    this.setData({
      ApasswordTips: rule.msg,
      ApasswordFlag: rule.flag
    })
  },
  isEmpty(e) {
    let type = e.currentTarget.dataset.type;
    const rule = rules.isEmpty(this.data[type]);

    this.setData({
      [type + 'Tips']: rule.msg,
      [type + 'Flag']: rule.flag
    })
  },
  async getCtcode() {

    if (this.data.phoneFlag) {
      const res = await request('/captcha/sent', {
        phone: this.data.phone
      })
      if (res.data.code == 200) {
        let timer = null;
        this.setData({
          isTap: false,
          countDown: 5
        })
        timer = setInterval(() => {
          this.setData({
            countDown: this.data.countDown - 1
          })
          if (this.data.countDown == -1) {
            clearInterval(timer)
            this.setData({
              countDown: 60,
              isTap: true
            })
          }
        }, 1000);
      }

    }
  },
  async register() {
    if (this.data.phoneFlag && this.data.passwordFlag && this.data.captchaFlag && this.data.ApasswordFlag && this.data.nicknameFlag) {
      const res = await request('/register/cellphone', {
        phone: this.data.phone,
        password: this.data.password,
        nickname: this.data.nickname,
        captcha: this.data.captcha
      })
      if (res.data.code == 200) {
        wx.showToast({
          title: '注册成功',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '请完善注册信息',
        icon: 'none',
        duration: 2000
      })
    }
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