// index.js
// 获取应用实例
import request from "../../utils/request"
import getSystem from "../../utils/getSystem"
import getRandomArrayElements from "../../utils/getRandomArrayElements"
import group from "../../utils/group"
const app = getApp()

Page({
  data: {
    system: null,
    bannerList: [],
    sheets: [],
    shortSheets: [],
    newSong: [],
    shortNewSong: [],
    newSongCut: []
  },
  toDaily() {
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: "/pages/musicPage/musicPage"
      })
    } else {
      wx.showToast({
        title: "请先登陆",
        icon: 'none'
      })
    }

  },



  async onLoad() {

    const system = getSystem();
    this.setData({
      system: system
    })
    const banner = request('/banner', {
      type: this.data.system || 1
    })
    const newSong = request('/personalized/newsong', {
      limit: 15
    });
    let sheet = null;
    if (!app.globalData.userInfo) {
      sheet = request('/personalized', {
        limit: 15
      })
    } else {
      sheet = request('/recommend/resource')
    }
    Promise.all([banner, sheet, newSong]).then((result) => {
      if (result[0].data.code == 200) {
        this.setData({
          bannerList: result[0].data.banners
        })
      }
      if (result[1].data.code == 200) {
        let data = null;
        if (result[1].data.result) {

          data = result[1].data.result
        } else {

          data = result[1].data.recommend;
        }
        this.setData({
          sheets: data.map((item) => {

            if (item.playcount) {
              item.playcount = item.playcount > 10000 ? Math.floor(item.playcount / 10000) + "万" : item.playcount;
            } else {
              item.playCount = item.playCount > 10000 ? Math.floor(item.playCount / 10000) + "万" : item.playCount;
            }
            return item;
          })
        })
      }
      if (result[2].data.code == 200) {
        const res = result[2].data.result.map((item) => {
          const singer = item.song.artists.reduce((prev, cur, index) => {
            if (index == item.song.artists.length - 1) {
              return prev + cur.name;
            } else {
              return prev + cur.name + '/';
            }

          }, '')
          item.singer = singer;
          return item;
        })
        this.setData({
          newSong: res,
          newSongCut: group(res, 3)
        })
      }
    }).catch((error) => {
      console.log(error)
    })

  }

})