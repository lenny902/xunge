// component/top_bar/top_bar_move.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items:{
      type:Array,
      value:[]
    },
    cellWidth:{
      type:Number,
      value:0
    },
    high:{
      type:Number,
      value:100
    },
    bgColor:{
      type:String,
      value:"white"
    },
    textColor:{
      type:String,
      value:'#333333'
    },
    textSelColor:{
      type:String,
      value:'var(--themeColor)'
    },
    lineColor:{
      type:String,
      value:'var(--themeColor)'
    },
    textSelSize:{
      type:Number,
      value:30
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
    scollLeft:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    tap_topIndex(e){

      let index = e.currentTarget.dataset.index;
      this.setData({
        topIndex:index,
      })

      let cellWidth = this.data.cellWidth;
      if (cellWidth > 0) {
        this.setAni(e.currentTarget.offsetLeft,cellWidth)
      }else {
        let that = this
        let query = wx.createSelectorQuery().in(this)
        let cell = query.select("#cell"+index)
        cell.boundingClientRect(function(res){
          if (res) {
            let cellWidth = res.width
            that.setAni(e.currentTarget.offsetLeft,cellWidth * 2)
          }
        }).exec()
      }

      this.triggerEvent('tapIndex',index)
    },

    setAni(currLeft,cellWidth){
      let scW = wx.getSystemInfoSync().windowWidth
      let move = currLeft + cellWidth / 4 - scW / 2
        let that = this
        let moveCell = this.data.scollLeft
        let add = true
        if (moveCell > move) {
          add = false
        }else {
          add = true
        }
        let timer = setInterval(() => {
          if (add) {
            moveCell += 5
            that.setData({
              scollLeft:moveCell
            })
            if (moveCell > move) {
              clearInterval(timer)
            }
          }else {
            moveCell -= 5
            that.setData({
              scollLeft:moveCell
            })
            if (moveCell < move) {
              clearInterval(timer)
            }
          }
        }, 20);
    }
  }
})
