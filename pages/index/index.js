// index.js
// 获取应用实例
import request from "../../utils/request"
import getSystem from "../../utils/getSystem"
const app = getApp()

Page({
  data: {
    system: null,
    bannerList: []

  },
  async onLoad() {

    const system = getSystem();
    this.setData({
      system: system
    })
    const res = await request('/banner', {
      type: this.data.system || 1
    })
    if (res.data.code = 200) {
      this.setData({
        bannerList: res.data.banners
      })
    }
    // console.log(res)

  }

})