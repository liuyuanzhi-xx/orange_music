// components/musicList/musicList.js
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
    listHeight: 0

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {
      console.log(e)
      this.triggerEvent('play', e.currentTarget.dataset.index, {})
    }

  },
  attached: function () {
    const query = this.createSelectorQuery().in(this);
    let height = 0;
    console.log(query.selectAll('.listItem'))
    query.selectAll('.listItem').boundingClientRect(function (rects) {
      console.log(rects)
      rects.forEach(item => {
        height += item.height;
      })
    }).exec();
    this.setData({
      listHeight: height
    })

  }

})