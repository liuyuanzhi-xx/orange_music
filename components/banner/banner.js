// components/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bannerList: {
      type: Array,
      value: []
    },
    indicatorDots: {
      type: Boolean,
      value: true
    },
    autoplay: {
      type: Boolean,
      value: true
    },
    interval: {
      type: Number,
      value: 2000
    },
    duration: {
      type: Number,
      value: 500
    },
    circular: {
      type: Boolean,
      value: true
    },
    easingFunction: {
      type: String,
      value: "default"

    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})