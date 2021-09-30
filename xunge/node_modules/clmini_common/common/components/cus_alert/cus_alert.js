// 自定义弹出框
// components/cus_alert/cus_alert.js
Component({
  options:{
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

    // 是否为自适应
    is_self_adaption:{
      type:Boolean,
      value:false
    },

    // 是否为可操作/通用alert
    isOperateAlert:{
      type:Boolean,
      value:true
    },


    /*********可操作/通用型alert***********/
    isMark:{
      type:Boolean,
      value:true
    },
    // 自定义弹出框显示区域宽
    width:{
      type:String,
      value:"75%"
    },
    // 自定义弹出框显示区域高
    height:{
      type:String,
      value:"50%"
    },
    
    // 是否有header 默认有
    isHeader:{
      type:Number,
      value:true,
    },
    // 是否自定义header
    isHeaderSetting:{
      type:Number,
      value:false
    },
    // 标题高度 
    headerHeight:{
      type:Number,
      value:100
    },
    // 非自定义标题的title
    title:{
      type:String,
      value: "提醒"
    },
    // 自定义弹出框是否显示取消按钮
    isCancel:{
      type:Boolean,
      value:false
    },
    // 自定义弹出框取消按钮文字
    cancel:{
      type:String,
      value:"取消"
    },
    // 自定义弹出框确认按钮文字
    sure:{
      type:String,
      value:"确定"
    },
    // 自定义弹出框取消按钮文字颜色
    cancelColor:{
      type:String,
      value:"#a5a5a5"
    },
    // 自定义弹出框确认按钮文字颜色
    sureColor:{
      type:String,
      value:"black"
    },
    // 自定义弹出框按钮之上的多余按钮
    bottomHeight:{
      type:Number,
      value:0
    },
    //最下面的确定取消是否现实
    opHeight:{
      type:Number,
      value:98
    },
    // 是否点击空白消失弹窗
    isHideAlertByBg:{
      type:Number,
      value:false
    },
    //弹窗出现的位置,默认在中间 0在中间 -1 在top 1在bottom
    alertPosIndex:{
      type:Number,
      value:0
    },

    /*********不可操作/展示型alert***********/
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 是否展示不可操作/展示型alert
    isShowNoOperateAlert:false,
    noOperateAlertHeaderText:'',
    noOperateAlertText:'',
    noOperateAlertColor:"#656565"
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /****************** */
    //取消事件
    tap_to_cancel(){
      //事件冒泡
      this.triggerEvent("cancel", {}, { bubbles: false, composed: false })
    },
    //确认事件
    tap_to_sure(){
      //事件冒泡
      this.triggerEvent("sure", {}, { bubbles: false, composed: false })
    },
    tap_to(){
      //过滤掉不必要的点击冒泡到tap_to_cancel 可以使用mut-bind的方式 
    },

    /****************** */
    tap_to_close:function(e){
      this.setData({
        isShowNoOperateAlert:false
      })
    },
    Show(param){
      this.setData({
        isShowNoOperateAlert:true,
        noOperateAlertText:param.text,
        noOperateAlertColor:param.headercolor,
        noOperateAlertHeaderText:param.header
      })
    }
  }
})
