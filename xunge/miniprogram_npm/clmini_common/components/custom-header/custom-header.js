

// component/custom-header/custom-header.js
Component({
  
  /**
   * 组件的属性列表
   */
  properties: {
    //left_btn按钮图片 默认为返回按钮
    left_img:{
      type:String,
      value:null
    },
    // 图片的大小
    img_size:{
      type:Number,
      value:40
    },
    //左边图标做icon
    left_icon:{
      type:String,
      value:"back"
    },
    icon_size:{
      type:Number,
      value:11
    },
    // 默认
    title:{
      type:String,
      value:""
    },
    // 默认为0直接返回页面 如果不为0将触发事件由页面自行处理
    operate_type:{
      type:Number,
      value:0
    },
    // 是否展示返回或者其他left——btn 按钮
    is_show_back:{
      type:Boolean,
      value:true
    },
    //标题是否居中显示
    is_title_center:{
      type:Boolean,
      value:false
    },
    //header背景色
    bg_color:{
      type:String,
      value:"black"
    },
    //header文字颜色
    color:{
      type:String,
      value:'white'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    color:"black"
  },
  /**
   * 组件的方法列表
   */
  attached:function(e){
    // 初始化配置适配
    var systeminfo = wx.getSystemInfoSync()
    var statusHeight = parseInt(systeminfo.statusBarHeight) + 'px'
    var barH = parseInt(systeminfo.statusBarHeight)  + 44 + 'px'

    var is_show_back = this.data.is_show_back;
    var left_image = this.data.left_image;
    var is_title_center = this.data.is_title_center;

    var titStyle ;
    if (is_title_center){
      //有返回
      titStyle = "display: flex;justify-content: center;align-items: center;";
    }else{
      titStyle = "display: flex;justify-content: flex-start;align-items: center;";
    }

    if(is_show_back){
      titStyle = titStyle + "width:calc(100% - 180rpx);background-color:" + this.data.bg_color;
    }else{
      titStyle = titStyle + "width:calc(100% - 60rpx);margin-left:30rpx;background-color:" + this.data.bg_color;
    }

    this.setData({
      titStyle:titStyle,
      statusHeight:statusHeight,
      barH:barH,
    })
  },

  methods: {
    // 左按钮被点击
    _pressToLeft:function(){ 
      if (this.data.operate_type == 0){
        wx.navigateBack({
          
        })
      }else{
        //事件冒泡
        this.triggerEvent("tap_left", {}, { bubbles: true, composed: true })
      }
    },
    //动态变化leftbtn按钮的显示状态
    change_back_show_state:function(isShow){
      //
      this.setData({
        show_back:isShow
      })
    },
    UpdateTitlecenter:function(){
      var titStyle = "display: flex;justify-content: center;align-items: center;" + "width:calc(100% - 180rpx);background-color:" + this.data.bg_color;
      this.setData({
        titStyle:titStyle
      })
    },
    change_title:function(title){
      this.setData({
        title:title
      })
    }
  }
})
