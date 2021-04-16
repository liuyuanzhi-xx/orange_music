// components/playBar/playBar.js
import request from "../../utils/request"

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    song: {
      type: Object,
      value: null
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    backgroundAudioManager: null,
    isPlay: false,
    playSongList: null,
    playSong: null

  },

  /**
   * 组件的方法列表
   */
  methods: {
    play() {
      if (this.data.backgroundAudioManager) {
        this.data.backgroundAudioManager.play()
        this.setData({
          isPlay: true,

        })
      }
    },
    pause() {
      if (this.data.backgroundAudioManager) {
        this.data.backgroundAudioManager.pause()
        this.setData({
          isPlay: false,

        })
      }
    },
    watchBack: async function (value) { //这里的value 就是 app.js 中 watch 方法中的 set, 返回整个 globalData
      console.log(this)
      this.setData({
        playSongList: value,
        playSong: value.playSongList[value.current]
      });
      const backgroundAudioManager = wx.getBackgroundAudioManager()
      const res = await request("/song/url", {
        id: this.data.playSong.id
      })
      if (res.data.code == 200) {
        console.log(res.data.data[0].url)
        backgroundAudioManager.title = this.data.playSong.name
        backgroundAudioManager.src = res.data.data[0].url
        this.setData({
          isPlay: true,
          backgroundAudioManager: backgroundAudioManager
        })
      }
      console.log(this.data.playSongList)
      console.log(this.data.playSong)
    }
  },
  // observers: {
  //   'song': async function (val) {
  //     if (val) {
  //       const backgroundAudioManager = wx.getBackgroundAudioManager()
  //       const res = await request("/song/url", {
  //         id: val.id
  //       })
  //       if (res.data.code == 200) {
  //         console.log(res.data.data[0].url)
  //         backgroundAudioManager.title = val.name
  //         backgroundAudioManager.src = res.data.data[0].url

  //         this.setData({
  //           isPlay: true,
  //           backgroundAudioManager: backgroundAudioManager
  //         })
  //       }


  //     }

  //   }
  // },
  attached: function () {
    const that = this;
    console.log(that)
    getApp().watch(that.watchBack.bind(that));

    // 是否遵循系统静音开关
    // this.setData({
    //   audioContext: wx.getBackgroundAudioManager()
    // })
    // const res = await request("/song/url", {
    //   id: this.properties.song.id
    // })
    // if (res.data.code == 200) {
    //   this.data.audioContext.src = res.data.url
    // }
    // this.data.audioContext.src = 
    // this.data.audioContext=this.properties.
    // audioContext.obeyMuteSwitch = false
    // // 监听播放
    // audioContext.onPlay(() => {
    //   this.paused = false
    //   console.log('播放中。。。')
    // })
    // // 监听暂停
    // audioContext.onPause(() => {
    //   this.paused = true
    // })
    // // 监听播放结束
    // audioContext.onEnded(() => {
    //   // 是否需要 自动播放下一首
    //   if (this.nextAudio) {
    //     this.next()
    //   } else {
    //     // 暂停
    //     this.paused = true
    //   }
    // })
    // // 监听 进度更新
    // audioContext.onTimeUpdate(() => {
    //   // 获取总进度
    //   this.duration = audioContext.duration
    //   // 当前进度 非拖动时
    //   if (!this.seek) {
    //     this.current = audioContext.currentTime
    //   }
    // })
    // //监听 进度更改完成
    // audioContext.onSeeked(() => {
    //   this.seek = false
    // })
    // // 音频播放失败
    // this.errMsg()
  }
})