// pages/search/search.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    hotList: [],
    searchRes: null,
    inputValue: "",
    loadingHot: false,
    loadingRes: false


  },
  selected: function (e) {
    this.setData({
      inputValue: e.mark.value
    })
    this.search();
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  input: function () {
    this.setData({
      searchRes: null
    })

  },
  search: async function () {
    this.setHistoryList();
    this.setData({
      loadingRes: true
    })
    const res = await request('/search', {
      keywords: this.data.inputValue,
      type: 1018
    })

    if (res.data.code == 200) {
      console.log(res.data.result.song.songs)
      res.data.result.song.songs = res.data.result.song.songs.map((item) => {
        const singer = item.ar.reduce((prev, cur, index) => {
          if (index == item.ar.length - 1) {
            return prev + cur.name;
          } else {
            return prev + cur.name + '/';
          }

        }, '')
        item.singer = singer;
        return item;
      })
      console.log(res.data.result)
      this.setData({
        searchRes: res.data.result
      })
    }
    this.setData({
      loadingRes: false
    })
  },
  emptyValue() {
    this.setData({
      inputValue: "",
      searchRes: null
    })
  },
  setHistoryList() {
    const index = this.data.historyList.indexOf(this.data.inputValue)
    if (index != -1) {
      this.data.historyList.splice(index, 1);
    }
    this.data.historyList.unshift(this.data.inputValue)
    if (this.data.historyList.length > 15) {
      this.data.historyList.pop()
    }
    this.setData({
      historyList: this.data.historyList
    })
    wx.setStorageSync('historyList', this.data.historyList)
  },
  getHistoryList() {
    const value = wx.getStorageSync('historyList') || [];
    return value;
  },
  emptyHistory() {
    const that = this;
    wx.showModal({
      title: "清空提醒",
      content: "你确定要清空历史记录吗？",
      success(res) {
        if (res.confirm) {
          that.setData({
            historyList: []
          })
          wx.setStorageSync('historyList', [])
        }
      },
      fail() {
        return;
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      historyList: this.getHistoryList()
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    this.setData({
      loadingHot: true
    })
    const res = await request('/search/hot/detail');
    this.setData({
      loadingHot: false
    })
    console.log(res)
    if (res.data.code == 200) {
      this.setData({
        hotList: res.data.data
      })
    }

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