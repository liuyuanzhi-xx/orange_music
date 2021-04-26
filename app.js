// app.js
import PubSub from 'pubsub-js'
import request from './utils/request'
App({
  onLaunch() {
    // 展示本地存储能力
    this.watch('playSong');
    this.watch('isPlay');
    this.watch('loading');
    this.globalData.backgroundAudioManager = wx.getBackgroundAudioManager()
    const userInfo = wx.getStorageSync('userInfo') || null;
    this.globalData.userInfo = userInfo;
    const playSong = wx.getStorageSync('playSong') || {
      current: 0,
      list: []
    };

    this.globalData.playSong = playSong;



    PubSub.subscribe('addPlaySong', this.addPlaySong.bind(this))
    PubSub.subscribe('togglePlay', this.togglePlay.bind(this))
    PubSub.subscribe('toggleLoading', this.toggleLoading.bind(this))
    PubSub.subscribe('togglePlaySong', this.togglePlaySong.bind(this))
    PubSub.subscribe('delePlaySong', this.delePlaySong.bind(this))
    PubSub.subscribe('emptyPlaySong', this.emptyPlaySong.bind(this))
    PubSub.subscribe('addNextPlay', this.addNextPlay.bind(this))




    this.globalData.backgroundAudioManager.onCanplay(() => {
      this.globalData.loading = false;
      // this.globalData.isPlay = true;

    })
    this.globalData.backgroundAudioManager.onPlay(() => {
      // this.globalData.loading = false;
      this.globalData.isPlay = true;
    })
    this.globalData.backgroundAudioManager.onEnded(() => {
      this.globalData.isPlay = false;
      this.togglePlaySong('', 'next')
    })
    this.globalData.backgroundAudioManager.onPause(() => {
      this.globalData.isPlay = false;
    })
    this.globalData.backgroundAudioManager.onStop(() => {
      this.globalData.isPlay = false;
    })
    this.globalData.backgroundAudioManager.onNext(() => {
      this.togglePlaySong('', 'next')
    })
    this.globalData.backgroundAudioManager.onPrev(() => {
      this.togglePlaySong('', 'prev')
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
    // currentSong: null


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
    const res = await request("/song/url", {
      id: currentSong.id
    })
    if (res.data.code == 200) {
      backgroundAudioManager.title = currentSong.name
      backgroundAudioManager.src = res.data.data[0].url


    }


  },
  addNextPlay(msg, value) {
    let currentIndex = this.globalData.playSong.current;
    let list = this.globalData.playSong.list;
    const curIndex = list.findIndex((item) => item.id == value.id);
    if (curIndex != -1) {
      if (curIndex == currentIndex) {
        wx.showToast({
          title: '当前为该歌曲',
          icon: 'none'
        })
        return
      } else {
        list.splice(curIndex, 1)
        if (curIndex < currentIndex) {
          currentIndex--;
        }

      }

    }
    list.splice(currentIndex + 1, 0, value)
    this.globalData.playSong = {
      list: list,
      current: currentIndex
    }
    wx.showToast({
      title: '添加成功',
      icon: 'none'
    })

  },
  delePlaySong(msg, value) {
    let currentIndex = this.globalData.playSong.current;
    let list = this.globalData.playSong.list;
    const deleIndex = list.findIndex((item) => {
      return item.id == value;
    })

    if (deleIndex != -1) {
      list.splice(deleIndex, 1)
      if (deleIndex < currentIndex) {
        currentIndex--;
      } else if (deleIndex == currentIndex) {
        currentIndex--;
        if (list.length) {
          PubSub.publish('togglePlaySong', currentIndex)
        } else {
          const backgroundAudioManager = this.globalData.backgroundAudioManager
          PubSub.publish('pb_emptyPlaySong');
          this.globalData.isPlay = false
          backgroundAudioManager.stop();
        }

      }
      this.globalData.playSong = {
        current: currentIndex,
        list: list
      }



    }


  },
  emptyPlaySong(mas, value) {
    const backgroundAudioManager = this.globalData.backgroundAudioManager
    PubSub.publish('pb_emptyPlaySong');
    this.globalData.isPlay = false
    backgroundAudioManager.stop();
    this.globalData.playSong = {
      list: [],
      current: 0
    }
  },
  togglePlaySong: async function (msg, value) {
    const backgroundAudioManager = this.globalData.backgroundAudioManager
    let currentIndex = this.globalData.playSong.current;
    let list = this.globalData.playSong.list;

    if (value == 'next') {
      currentIndex += 1;
    } else if (value == 'prev') {
      currentIndex -= 1;
    } else if (typeof (value) == 'number') {

      currentIndex = list.findIndex((item) => {
        return item.id == value;
      })


    }
    if (currentIndex < 0) {
      currentIndex = list.length - 1;
    } else if (currentIndex >= list.length) {
      currentIndex = 0;
    }
    this.globalData.loading = true;
    this.globalData.isPlay = false;

    const res = await request("/song/url", {
      id: list[currentIndex].id
    })
    if (res.data.code == 200) {
      backgroundAudioManager.title = list[currentIndex].name
      backgroundAudioManager.src = res.data.data[0].url
      this.globalData.playSong = {
        current: currentIndex,
        list: list
      }

    }
  },
  async togglePlay(msg, value) {
    const backgroundAudioManager = this.globalData.backgroundAudioManager
    const currentSong = this.globalData.playSong.list[this.globalData.playSong.current]


    if (value) {
      if (backgroundAudioManager.title != currentSong.name) {
        this.globalData.loading = true;
        const res = await request("/song/url", {
          id: currentSong.id
        })
        if (res.data.code == 200) {
          backgroundAudioManager.title = currentSong.name
          backgroundAudioManager.src = res.data.data[0].url
        }

      } else {
        this.globalData.isPlay = value;
        this.globalData.backgroundAudioManager.play()

      }

    } else {
      this.globalData.isPlay = value;
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
          PubSub.publish('pb_addPlaySong', value);
          PubSub.publish('ml_setPlaySongId', value);
          PubSub.publish('p_setPlaySong');
          PubSub.publish('p_setShowList');
          wx.setStorageSync('playSong', value)


          // PubSub.publish('ml_setIsPlay', true);
        } else if (key == 'isPlay') {
          PubSub.publish('ml_setIsPlay', value);
          PubSub.publish('pb_togglePlay', value);
          PubSub.publish('p_togglePlay', value);

        } else if (key == 'loading') {
          PubSub.publish('ml_toggleLoading', value);
          PubSub.publish('pb_toggleLoading', value);
          PubSub.publish('p_toggleLoading', value);


        }

      },
      get: function () { //获取全局变量值，直接返回全部
        return this['_' + key]
      }
    })
  },

})