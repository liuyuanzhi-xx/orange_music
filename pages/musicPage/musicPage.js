// pages/musicPage/musicPage.js
import request from "../../utils/request"
import PubSub from "pubsub-js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPop: false,
    songDetail: null


  },
  togglePop(e) {

    this.setData({
      isPop: !this.data.isPop
    })
    if (e.detail) {
      this.setData({
        songDetail: e.detail
      })


    }

  },
  handleTap(e) {

    if (e.mark.type == 'next') {
      let song = {
        id: this.data.songDetail.id,
        name: this.data.songDetail.name,
        picUrl: this.data.songDetail.al.picUrl,
        singer: this.data.songDetail.singer,
        duration: this.data.songDetail.dt
      }
      PubSub.publish('addNextPlay', song)

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {



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