// components/musicList/musicList.js
const app = getApp();
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
    listHeight: 0,
    playSongList: []

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {
      console.log(e)
      let index1 = Math.floor(e.currentTarget.dataset.index / 3);
      let index2 = e.currentTarget.dataset.index % 3;
      console.log(index1, index2)
      let currentSong = this.properties.list[index1][index2];
      // console.log(this.data.playSongList);
      this.data.playSongList.push({
        id: currentSong.id,
        name: currentSong.name,
        picUrl: currentSong.picUrl,
        singer: currentSong.song.artists,
        duration: currentSong.song.duration
      });


      this.setData({
        playSongList: this.data.playSongList
      })
      // console.log(this.data.playSongList);
      app.globalData.playSongList = {
        current: this.data.playSongList.length - 1,
        playSongList: this.data.playSongList
      }
      // this.triggerEvent('play', e.currentTarget.dataset.index, {})
    }

  },
  attached: function () {
    // const query = this.createSelectorQuery().in(this);
    // let height = 0;
    // console.log(query.selectAll('.listItem'))
    // query.selectAll('.listItem').boundingClientRect(function (rects) {
    //   console.log(rects)
    //   rects.forEach(item => {
    //     height += item.height;
    //   })
    // }).exec();
    // this.setData({
    //   listHeight: height
    // })

  }

})