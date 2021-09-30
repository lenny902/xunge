// component/custom-dilog/index.js

//参数说明
// 1.slot_width dialog的实际内容宽度
// 2.slot_height dialog的实际内容高度

//函数说明
// 1.Show 显示dialog
// 2.Hide 隐藏dialog



Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //slot的高宽
    slot_width:{
      type:Number,
      value:1
    },
    slot_height:{
      type:Number,
      value:1
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    top:'0rpx',
    left:'0rpx'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _presstoHide:function(e){
      this.setData({
        isShow:false
      })
    },
    handleTouchMove: function (e) {
      //无用 catch直接把touchmove吞没
    },


    // param 参数为非必须，当有的时候下面的必须参数成立
    // type:  位置类型（必须）
    //    type_offset 偏移类型(根据指定点偏移)
    //    type_center 中心类型 （中心点 可偏移）
    // offset: 偏移量 （必须）
    // point:  参考点

    //tap事件参考设置
    // var longPressX = e.touches[0].pageX
    // var longPressY = e.touches[0].pageY
    // longPressX = longPressX * 750 / wx.getSystemInfoSync().windowWidth;
    // longPressY = longPressY * 750 / wx.getSystemInfoSync().windowWidth
    // //偏移量为30rpx
    // var offset = -30;
    // this.selectComponent("#dialog1").Show({
    //   type: "type_offset",
    //   offset: offset,
    //   point: {
    //     x: longPressX,
    //     y: longPressY
    //   }
    // })
    Show(show_msg){
      console.log("show")
      //根据show_msg来显示内容
      this.setData({
        isShow: true
      })

      if(show_msg){
        var type = show_msg.type
        if(type === "type_offset"){
          var offset = show_msg.offset;
          var longPressX = show_msg.point.x;
          var longPressY = show_msg.point.y;
          var pointX;
          var pointY;
          if (longPressX - this.data.slot_width - offset > 0) {
            //可以显示在左边
            if (longPressY - this.data.slot_height - offset > 0) {
              //显示在上面
              //左上
              pointX = longPressX - this.data.slot_width - offset;
              pointY = longPressY - this.data.slot_height - offset;
            } else {
              // 显示在下面
              //左下
              pointX = longPressX - this.data.slot_width - offset;
              pointY = longPressY + offset;
            }
          } else {
            //显示在右边
            if (longPressY - this.data.slot_height - offset > 0) {
              //显示在上面
              //右上
              pointX = longPressX + offset;
              pointY = longPressY - this.data.slot_height - offset;
            } else {
              // 显示在下面
              //右下
              pointX = longPressX + offset;
              pointY = longPressY + offset;
            }
          }
          this.setData({
            top: pointY + 'rpx',
            left: pointX + 'rpx'
          })
        }else if(type === "type_center")
        {
          // rpx
          var  width = wx.getSystemInfoSync().windowWidth * 750 / wx.getSystemInfoSync().windowWidth;
          var  height = wx.getSystemInfoSync().windowHeight * 750 / wx.getSystemInfoSync().windowWidth
          this.setData({
            left:  (width  - this.data.slot_width) / 2 + 'rpx',
            top: (height - show_msg.offset - this.data.slot_height) / 2 + 'rpx'
          })
        }else{

        }
      }
    },
    Hide(){
      this.setData({
        isShow: false
      })
    }
  },
  ready(){
    //设置为总的size
    this.setData({
      slot_width:this.data.slot_width + 20,
      slot_height:this.data.slot_height + 20
    })

  }
})
