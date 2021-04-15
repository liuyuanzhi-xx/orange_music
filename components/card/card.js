// components/sheetListCart/sheetListCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: ""
    },
    type: {
      type: String,
      value: ""
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
    play(e) {
      console.log(e.detail)
      this.triggerEvent('play', e.detail, {})
    }

  }
})