// component/top_bar/top_bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items:{
      type:Array,
      value:[]
    },
    high:{
      type:Number,
      value:100
    },
    textSize:{
      type:Number,
      value:30
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    topIndex:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap_topIndex(e){
      let index = e.currentTarget.dataset.index;
      this.setData({
        topIndex:index
      })
      this.triggerEvent('tapIndex',index)
    }
  }
})
