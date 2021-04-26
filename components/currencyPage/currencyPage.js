// components/currencyPage/currencyPage.js
import PubSub from "pubsub-js"
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    canAllPlay: {
      type: Boolean,
      value: true
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    allPlay: true,
    title: "全部播放",
    count: "0"


  },

  /**
   * 组件的方法列表
   */
  methods: {
    setCount(msg, value) {
      this.setData({
        count: value
      })

    }

  },
  attached() {
    PubSub.subscribe('cp_setCount', this.setCount.bind(this))
  },
  detached() {
    PubSub.unsubscribe('cp_setCount')
  }
})