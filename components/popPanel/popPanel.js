// components/playList/playList.js
const app = getApp()
import PubSub from "pubsub-js"
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isOpen: {
      type: Boolean,
      value: false
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
    tapHandle(e) {
      if (e.target.dataset.id == 'hover') {
        this.triggerEvent('close')
      }
    },



  },
  attached: function () {

  }
})