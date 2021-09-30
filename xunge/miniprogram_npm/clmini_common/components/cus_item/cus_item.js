
//通用小item
// components/cus_item/cus_item.js
Component({
  options:{
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否监听点击事件
    is_tap_event:{
      type:Boolean,
      value:true
    },
    //item的高度
    height:{
      type:Number,
      value:100
    },
    
    // 左右padding距离
    pdlr:{
      type:Number,
      value:30
    },
    // 当有margin_value的时候设置左右margin_value
    margin_value:{
      type:Number,
      value:0
    },
    // 其他style
    ext_style:{
      type:String,
      value:""
    },
    //是否左边有图片
    imgUrl:{
      type:String,
      value:""
    },
    //是否底部线条
    isBottomBorder:{
      type:Boolean,
      value:true
    },
    //是否箭头
    arrowWidth:{
      type:Number,
      value:30
    },
    // 跳转下个页面url
    navUrl:{
      type:String,
      value:""
    },
    // 获取点击
    getTap:{
      type:Number,
      value:false
    },
    // 是否显示右边第二slot
    isrightTow:{
      type:Number,
      value:false
    },
    // 是否右边图片
    isRightImg:{
      type:Number,
      value:false
    },
    // 是否左边占多数 且当这个参数设置的时候 可以设置 leftPer 参数 占比
    isLeftMore:{
      type:Number,
      value:false
    },
    // 左边占比 默认百分之20%
    leftPer:{
      type:String,
      value:'80%'
    },
    // 右边占比默认百分之20
    rightPer:{
      type:String,
      value:'20%'
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
    tap_to_item(){
      if(this.data.navUrl.length > 0 && !this.data.getTap){
        wx.navigateTo({
          url: this.data.navUrl,
        })
      }else{
        this.triggerEvent("itemtap", {}, { bubbles: true, composed: true })
      }
    },
    long_tap_item:function(e){
      this.triggerEvent("longitemtap",{},{bubbles:true,composed: true })
    },
  }
})
