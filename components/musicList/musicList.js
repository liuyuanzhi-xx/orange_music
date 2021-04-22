// components/musicList/musicList.js
const app = getApp();

import PubSub from 'pubsub-js'
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSongId: 0,
    playSong: null,
    loadingSongId: 0,
    isPlay: false,
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {

      const list = app.globalData.playSong.list;
      const current = app.globalData.playSong.current
      const playSong = this.properties.list[e.mark.index];
      console.log(playSong)
      this.setData({
        playSong: {
          id: playSong.id,
          name: playSong.name,
          picUrl: playSong.picUrl || playSong.al.picUrl,
          singer: playSong.singer,
          duration: playSong.dt || playSong.song.duration
        }
      })
      console.log(this.data.playSong)
      const currentSongId = this.data.playSong.id;
      const type = e.currentTarget.dataset.id;
      if (!this.data.isPlay) {
        if (list.length && (currentSongId == list[current].id)) {
          if (type == 'info') {
            wx.navigateTo({
              url: '/pages/play/play'
            })

          }
          PubSub.publish('togglePlay', true)
        } else {
          this.setData({
            loadingSongId: currentSongId
          })
          if (type == 'info') {
            wx.navigateTo({
              url: '/pages/play/play'
            })

          }
          PubSub.publish('addPlaySong', this.data.playSong)

        }

      } else {

        if (list.length && (currentSongId == list[current].id)) {
          if (type == 'info') {
            wx.navigateTo({
              url: '/pages/play/play'
            })
            return;
          }
          PubSub.publish('togglePlay', false)
        } else {
          this.setData({
            loadingSongId: currentSongId
          })
          if (type == 'info') {
            wx.navigateTo({
              url: '/pages/play/play'
            })

          }
          PubSub.publish('addPlaySong', this.data.playSong)

        }
      }



    },
    setPlaySongId(msg, value) {
      this.setData({
        playSongId: value.list[value.current].id
      })
      console.log(this.data.playSongId, this.data.isPlay)
    },
    setIsPlay(msg, value) {
      this.setData({
        isPlay: value
      })
      console.log(msg, this.data.playSongId, this.data.isPlay)
    },
    toggleLoading(msg, value) {
      this.setData({
        loading: value
      })
    }
  },
  attached: function () {
    const list = app.globalData.playSong.list;
    const current = app.globalData.playSong.current
    const isPlay = app.globalData.isPlay

    PubSub.subscribe('ml_setPlaySongId', this.setPlaySongId.bind(this));
    PubSub.subscribe('ml_setIsPlay', this.setIsPlay.bind(this));
    PubSub.subscribe('ml_toggleLoading', this.toggleLoading.bind(this));
    if (list.length) {
      this.setData({
        playSongId: list[current].id,
        isPlay: isPlay
      })
    }




  }


})