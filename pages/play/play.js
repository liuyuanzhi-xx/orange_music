// pages/play/play.js
import moment from 'moment'
import PubSub from 'pubsub-js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    songName: '',
    singer: '',
    picUrl: '',
    duration: '00:00',
    currentTimer: '00:00',
    playSong: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      playSong: app.globalData.playSong,
    })
    if (this.data.playSong.list.length) {
      const currentSong = this.data.playSong.list[this.data.playSong.current];
      const duration = moment(currentSong.duration).format('mm:ss');
      this.setData({
        id: currentSong.id,
        songName: currentSong.name,
        singer: currentSong.singer,
        picUrl: currentSong.picUrl,
        duration: duration

      })


    }
    wx.setNavigationBarTitle({
      title: this.data.songName
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
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