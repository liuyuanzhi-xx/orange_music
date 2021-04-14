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
    newSong: []

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
      limit: 9
    });
    let sheet = null;
    if (!app.globalData.userInfo) {
      sheet = request('/personalized', {
        limit: 6
      })
    } else {
      sheet = request('/recommend/resource', {
        limit: 6
      })
    }
    Promise.all([banner, sheet, newSong]).then((result) => {
      console.log(result);
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
          data = getRandomArrayElements(result[1].data.recommend, 6);
        }
        this.setData({
          sheets: data.map((item) => {
            console.log(item.playcount);
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
        this.setData({
          newSong: group(result[2].data.result, 3)
        })
      }
    }).catch((error) => {
      console.log(error)
    })

  }

})