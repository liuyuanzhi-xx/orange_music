// components/musicList/musicList.js
const app = getApp();

import PubSub from 'pubsub-js'
import request from "../../utils/request"
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
    canOperate: {
      type: Boolean,
      value: true
    },
    url: {
      type: String,
      value: ""
    },
    op: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSongId: 0,
    playSong: null,
    loadingSongId: 0,
    isPlay: false,
    loading: false,
    resLoading: false,
    musicList: [],
    isPop: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {

      const list = app.globalData.playSong.list;
      const current = app.globalData.playSong.current
      const playSong = this.data.musicList[e.mark.index];
      const type = e.mark.type;
      if (type == 'info' || type == 'img') {
        this.setData({
          playSong: {
            id: playSong.id,
            name: playSong.name,
            picUrl: playSong.picUrl || playSong.al.picUrl,
            singer: playSong.singer,
            duration: playSong.dt || playSong.song.duration
          }
        })
        const currentSongId = this.data.playSong.id;

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

      } else if (type == 'operate') {
        this.triggerEvent('pop', e.mark.value)

      }


    },
    setPlaySongId(msg, value) {
      this.setData({
        playSongId: value.list.length ? value.list[value.current].id : 0
      })

    },
    setIsPlay(msg, value) {
      this.setData({
        isPlay: value
      })

    },
    toggleLoading(msg, value) {
      this.setData({
        loading: value
      })
    },

  },
  observers: {
    'list': function (list) {
      if (list.length) {
        this.setData({
          musicList: list
        })
      }

    }
  },
  attached: async function () {
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
    if (this.properties.url && !this.properties.list.length) {
      this.setData({
        resLoading: true
      })
      const res = await request(this.properties.url, this.properties.op)
      if (res.data.code == 200) {
        this.setData({
          resLoading: false
        })
        const list = res.data.data.dailySongs.map((item) => {
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
        this.setData({
          musicList: list
        })
        PubSub.publish("cp_setCount", list.length)
      }
    } else {
      this.setData({
        musicList: this.properties.list
      })

    }

  },
  detached: function () {
    PubSub.unsubscribe('ml_setPlaySongId')
    PubSub.unsubscribe('ml_setIsPlay')
    PubSub.unsubscribe('ml_toggleLoading')
  }


})