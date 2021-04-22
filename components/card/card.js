// components/sheetListCart/sheetListCard.js
Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    hasMore: {
      type: Boolean,
      value: true
    },
    linkTo: {
      type: String,
      value: ""
    },
    linkText: {
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


  }
})