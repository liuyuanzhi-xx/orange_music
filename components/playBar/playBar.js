// components/playBar/playBar.js
import request from "../../utils/request"
import PubSub from "pubsub-js"
const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // song: {
    //   type: Object,
    //   value: null
    // }

  },

  /**
   * 组件的初始数据
   */
  data: {
    // backgroundAudioManager: null,
    isPlay: false,
    loading: false,
    playSongList: null,
    playSong: null

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapPlay() {
      PubSub.publish('togglePlay', !this.data.isPlay)


    },

    togglePlay(msg, value) {
      this.setData({
        isPlay: value,
      })


    },
    toggleLoading(msg, value) {
      this.setData({
        loading: value,
      })
    },
    emptyPlaySong() {
      this.setData({
        playSong: null
      })
    },
    async addPlaysong(msg, value) {
      this.setData({
        playSongList: value,
        playSong: value.list[value.current]
      });



    }

  },

  attached: function () {

    PubSub.subscribe('pb_addPlaysong', this.addPlaysong.bind(this))
    PubSub.subscribe("pb_togglePlay", this.togglePlay.bind(this))
    PubSub.subscribe("pb_toggleLoading", this.toggleLoading.bind(this))
    PubSub.subscribe("pb_emptyPlaySong", this.emptyPlaySong.bind(this))




  }
})