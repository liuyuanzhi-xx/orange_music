// app.js
import PubSub from 'pubsub-js'
import request from './utils/request'
App({
  onLaunch() {
    // 展示本地存储能力
    this.globalData.backgroundAudioManager = wx.getBackgroundAudioManager()
    const userInfo = wx.getStorageSync('userInfo') || null;
    this.globalData.userInfo = userInfo;
    const playSong = wx.getStorageSync('playSong') || {
      current: 0,
      list: []
    };
    this.globalData.playSong = playSong;
    console.log(this.globalData.playSong)
    this.watch('playSong');
    this.watch('isPlay');
    this.watch('loading');

    PubSub.subscribe('addPlaySong', this.addPlaySong.bind(this))
    PubSub.subscribe('togglePlay', this.togglePlay.bind(this))
    PubSub.subscribe('toggleLoading', this.toggleLoading.bind(this))
    this.globalData.backgroundAudioManager.onCanplay(() => {
      this.globalData.loading = false;
      this.globalData.isPlay = true;
      // PubSub.publish('p_setDuration')

    })

  },
  globalData: {
    userInfo: null,
    _playSong: {
      current: 0,
      list: []
    },
    _isPlay: false,
    _loading: false,
    backgroundAudioManager: null,
    currentSong: null


  },

  addPlaySong: async function (msg, currentSong) {
    const backgroundAudioManager = this.globalData.backgroundAudioManager
    this.globalData.isPlay = false
    backgroundAudioManager.stop();
    PubSub.publish('pb_emptyPlaySong');

    const list = this.globalData.playSong.list;
    const curIndex = list.findIndex((item) => item.id == currentSong.id);
    if (curIndex != -1) {
      list.splice(curIndex, 1);
    }
    this.globalData.loading = true;
    list.push(currentSong)
    this.globalData.playSong = {
      current: list.length - 1,
      list: list
    }
    wx.setStorageSync('playSong', this.globalData.playSong)
    const res = await request("/song/url", {
      id: currentSong.id
    })
    if (res.data.code == 200) {
      backgroundAudioManager.title = currentSong.name
      backgroundAudioManager.src = res.data.data[0].url


    }


  },
  togglePlay(msg, value) {
    this.globalData.isPlay = value;
    if (value) {
      this.globalData.backgroundAudioManager.play()
    } else {
      this.globalData.backgroundAudioManager.pause()
    }

  },
  toggleLoading(msg, value) {
    this.globalData.loading = value;
  },
  watch: function (key) {
    var obj = this.globalData;
    Object.defineProperty(obj, key, { //这里的 data 对应 上面 globalData 中的 data
      configurable: true,
      enumerable: true,
      set: function (value) { //动态赋值，传递对象，为 globalData 中对应变量赋值
        this['_' + key] = value;
        if (key == 'playSong') {
          PubSub.publish('pb_addPlaysong', value);
          PubSub.publish('ml_setPlaySongId', value);
          // PubSub.publish('ml_setIsPlay', true);
        } else if (key == 'isPlay') {
          PubSub.publish('ml_setIsPlay', value);
          PubSub.publish('pb_togglePlay', value);
        } else if (key == 'loading') {
          PubSub.publish('ml_toggleLoading', value);
          PubSub.publish('pb_toggleLoading', value);

        }

      },
      get: function () { //获取全局变量值，直接返回全部
        return this['_' + key]
      }
    })
  },

})