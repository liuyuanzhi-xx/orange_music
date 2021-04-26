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
    isPlay: false,
    loading: false,
    handle_ani: null,
    isOpen: false,
    showList: null


  },
  setShowList() {
    const value = app.globalData.playSong;
    let list = [];
    for (let i = value.current; i < value.list.length; i++) {
      list.push(value.list[i])
    }
    for (let j = 0; j < value.current; j++) {
      list.push(value.list[j])
    }
    this.setData({
      showList: list
    })

  },

  handle_ani() {
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: "30rpx 3rpx"
    });
    if (this.data.isPlay) {
      animation.rotate(20).step()
    } else {
      animation.rotate(0).step()

    }


    this.setData({
      handle_ani: animation.export()
    })

  },
  toggleOpen() {
    this.setData({
      isOpen: !this.data.isOpen
    })

  },

  setPlaySong() {
    this.setData({
      isPlay: app.globalData.isPlay,
      loading: app.globalData.loading,
      playSong: app.globalData.playSong
    })
    if (this.data.isPlay && !this.data.loading) {
      this.handle_ani()
    }
    if (this.data.playSong.list.length == 0) {
      this.setData({
        id: "",
        songName: "",
        singer: "",
        picUrl: "",
        duration: ""

      })

    } else {
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
  },
  togglePlaySong(e) {
    if (this.data.playSong.list.length == 0) {
      wx.showToast({
        title: '暂无音乐',
        icon: 'none'
      })


      return;
    }
    // PubSub.publish('togglePlay', !this.data.isPlay)

    PubSub.publish('togglePlaySong', e.mark.type)

  },
  togglePlay(msg, value) {
    if (this.data.playSong.list.length == 0) {
      wx.showToast({
        title: '暂无音乐',
        icon: 'none'
      })

      return;
    }
    this.setData({
      isPlay: value
    })

    if (value) {
      this.handle_ani()

    } else {
      this.handle_ani()

    }
  },
  toggleLoading(msg, value) {
    this.setData({
      loading: value
    })
  },
  playTap() {
    if (this.data.playSong.list.length == 0) {
      wx.showToast({
        title: '暂无音乐',
        icon: 'none'
      })

      return;
    }

    PubSub.publish('togglePlay', !this.data.isPlay)
  },
  playListTap(e) {

    if (e.mark.type == 'play') {
      PubSub.publish('togglePlaySong', e.mark.value)
    } else if (e.mark.type == 'delete') {
      PubSub.publish('delePlaySong', e.mark.value)
    } else if (e.mark.type == 'empty') {
      wx.showModal({
        title: "清空提示",
        content: "你确定要清空播放列表吗？",
        success(res) {
          if (res.confirm) {
            PubSub.publish('emptyPlaySong')
          }
        }
      })
    }
  },
  // setTitle() {
  //   wx.setNavigationBarTitle({
  //     title: this.data.songName
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    PubSub.subscribe('p_togglePlay', this.togglePlay.bind(this))
    PubSub.subscribe('p_toggleLoading', this.toggleLoading.bind(this))
    PubSub.subscribe('p_setPlaySong', this.setPlaySong.bind(this))
    PubSub.subscribe('p_setShowList', this.setShowList.bind(this))


    this.setPlaySong();
    this.setShowList();
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

    PubSub.unsubscribe('p_togglePlay')
    PubSub.unsubscribe('p_toggleLoading')
    PubSub.unsubscribe('p_setPlaySong')






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