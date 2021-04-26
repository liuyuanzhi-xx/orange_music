// pages/video/video.js
import request from "../../utils/request"
import moment from "moment"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navId: "",
    navGroupList: [],
    videoGroupList: [],
    videoUrl: "",
    vid: '',
    isPlay: false,
    listLoading: false,
    videoLoading: false,
    isTriggered: false,
    offset: 0

  },
  changeNavId(e) {
    if (e.mark.id) {
      this.setData({
        navId: e.mark.id
      })
      this.getvideoGroupList()
    }
  },
  async play(e) {
    // this.setData({
    //   videoLoading: true
    // })
    const res = await request('/video/url', {
      id: e.mark.vid
    });

    if (res.data.code == 200) {

      this.setData({
        vid: e.mark.vid,
        videoUrl: res.data.urls[0].url,
        isPlay: true
      })


    }


  },
  // canPlay() {
  //   this.setData({
  //     videoLoading: false,
  //     isPlay: true,
  //   })
  // },
  async getvideoGroupList(value) {

    this.setData({
      offset: 0,
      listLoading: true,
    })
    if (!value) {
      this.setData({
        videoGroupList: []
      })
    }
    const res = await request('/video/group', {
      id: this.data.navId
    });


    if (res.data.code == 200) {
      const list = res.data.datas.map((item, index) => {
        item.id = index;
        item.data.duration = moment(item.data.durationms).format('mm:ss');
        return item
      })
      this.setData({
        videoGroupList: list,
        offset: this.data.offset + 8,
        listLoading: false
      })
    } else if (res.data.code == 301) {
      wx.showModal({
        title: "登陆提醒",
        content: "请先登陆",
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: "/pages/index/index"
            })
          }
        }

      })
    }


  },
  refresh() {


    this.getvideoGroupList('re');

    this.setData({
      isPlay: false,
      videoUrl: "",
      isTriggered: false
    })
  },
  async getMore() {
    if (this.data.listLoading) {
      return;

    }
    this.setData({
      listLoading: true
    })
    const res = await request('/video/group', {
      id: this.data.navId,
      offset: this.data.offset
    });


    if (res.data.code == 200) {
      const list = res.data.datas.map((item) => {
        item.id = item.data.vid;
        item.data.duration = moment(item.data.durationms).format('mm:ss');
        return item
      })
      this.setData({
        videoGroupList: this.data.videoGroupList.concat(list),
        offset: this.data.offset + 8,
        listLoading: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res = await request('/video/group/list');
    console.log(res)
    if (res.data.code == 200) {
      this.setData({
        navGroupList: res.data.data.slice(0, 14),
        navId: res.data.data[0].id
      })
      this.getvideoGroupList()

    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})