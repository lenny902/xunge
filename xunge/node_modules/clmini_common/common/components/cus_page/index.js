
// components/cus_page/index.js
Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 下啦刷新颜色拼接
    topBg:{
      type:String,
      value:'#f5f5f5'
    },
    // 是否为系统tabbar
    is_system_Tababar:{
      type:Boolean,
      value:false
    },
    // 是否为自定义tabbar
    isTabbar:{
      type:Number,
      value:false
    },
    // isHeader 是否有默认header 没有默认的header的时候将可以将第二header设置为header高度可以自定，如果也不需要第二header可以在scrollview中设置一个statusbar高度过度
    isHeader:{
      type:Number,
      value:true
    },
    //left_btn按钮图片 默认为返回按钮
    left_img: {
      type: String,
      value: null
    },
    // 图片的大小
    img_size:{
      type:Number,
      value:40
    },
    //左边图标做icon
    left_icon: {
      type: String,
      value: "back"
    },
    // 图片size
    icon_size: {
      type: Number,
      value: 11
    },
    // 默认
    title: {
      type: String,
      value: ""
    },
    // 默认为0直接返回页面 如果不为0将触发事件由页面自行处理
    operate_type: {
      type: Number,
      value: 0
    },
    // 是否展示返回或者其他left——btn 按钮
    is_show_back: {
      type: Boolean,
      value: true
    },
    //标题是否居中显示
    is_title_center: {
      type: Boolean,
      value: false
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
    },
    //第二header高度 决定着它是否显示和scrollview的高度
    second_header_height:{
      type:Number,
      value:0
    },
    //第一个间隙之间的高度
    first_space_height:{
      type:Number,
      value:20
    },
    //第二个间隙之间的高度
    second_space_height: {
      type: Number,
      value: 20
    },
    //底边view
    bottom_view_height:{
      type:Number,
      value:0
    },
    //设置滚动条位置
    scrollPostion:{
      type:Number,
      value:0
    },
    // 滚动是否动画
    scrollPostionAnimation:{
      type:Boolean,
      value:true
    },
    // 是否开启下拉刷新 开启下拉刷新之后 监听refresh事件， 监听事件之后执行要执行的代码完成之后调用EndRefresh结束下拉刷新
    isOpenRefresh:{
      type:Boolean,
      value:false      
    },
    // 是否开启上拉加载功能 默认不开启 此功能通过触发bindscrolltolower这个事件显示底部的加载view 上一层监听 "scrollToLower"事件  通过在使用的地方执行代码之后调用EndScrolltolower函数结束上拉加载
    isMore:{
      type:Boolean,
      value:false
    },
    // 是否支持flex布局
    isFlex:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  
    // 是否结束下拉刷新
    isEnd:false,
    // 是否正在加载更多数据
    isMoring:false,
    // 是否展示alert
    isShowAlert:false,
    alertTop:'',
    alertText:'',
  },
  /**
   * 组件的方法列表
   */
  lifetimes:{
    attached:function(e){
      //初始化适配问题
      console.log("attached初始化页面高度")
      this.updateSrc_top();
    },

  },
  

  methods: {
    // 初始化设置适配位置信息
    updateSrc_top: function () {

      
      var systeminfo = wx.getSystemInfoSync()
      var statusHeight = parseInt(systeminfo.statusBarHeight) + 'px'
      var barH = parseInt(systeminfo.statusBarHeight)  + 44 + 'px'
      
      if(!this.data.isHeader){
        //当没有默认header的时候
        //第一个间隙无用
        this.setData({
          first_space_height:0
        })
        barH = '0px'
        if(this.data.second_header_height <= 0){
          //第二个header也没有
          this.setData({
            second_space_height:0
          }) 
        }
      }
      var scr_top;
      if (this.data.second_header_height > 0) {
        scr_top = "calc(" + barH + " + " + (this.data.first_space_height + this.data.second_space_height) + "rpx + " + this.data.second_header_height + "rpx)";
      } else {
        scr_top = "calc(" + barH + " + " + this.data.first_space_height + "rpx)";
      }

      
      // 安全区域高度 x xr 之类的有值 普通可能为 0
      var src_bottom = parseFloat(systeminfo.screenHeight) - parseFloat(systeminfo.safeArea.bottom)
      
      //当isTabbar为true的时候 表示是自定义tabbar 需要减去安全区域以及tabbar 49  当有tabbar 不是自定义 的时候 下部不应该减少数值
      if(this.data.is_system_Tababar){
        src_bottom = 0
      }
      if(this.data.isTabbar){
        src_bottom  = src_bottom + 49
      }

      // var scroll_view_height = ""
      // if(this.data.second_header_height > 0){
      //   scroll_view_height = "calc(" + parseFloat(systeminfo.screenHeight) + "px - " +  barH + " - " +  (this.data.first_space_height + this.data.second_space_height) + "rpx  - "  +  this.data.second_header_height + "rpx - " + src_bottom + "px)" 
      // }else{
      //   scroll_view_height = "calc(" + parseFloat(systeminfo.screenHeight) + "px - " + barH + " - " +  this.data.first_space_height + "rpx  - "   + src_bottom + "px)" 
      // }
      // console.log(scroll_view_height + "scrollviewheight")
      this.setData({
        statusHeight:statusHeight,
        barH:barH,
        scr_top: scr_top,
        src_bottom:src_bottom + 'px',
        alertTop:barH,
        // scroll_view_height:scroll_view_height
      })
      
    },
    // 滚动到底部 可能触发上拉函数 当isMore为true 的时候触发上拉事件  同事不管isMore 都会触发距离底部的事件
    bindscrolltolower:function(e){
      
      this.triggerEvent("to_bottom",{},{ bubbles: true, composed: true })
      // 没开启上拉加载或者正在加载
      if(!this.data.isMore || this.data.isMoring){return}

      this.setData({
        isMoring:true
      })
      this.triggerEvent("scrollToLower", {}, { bubbles: true, composed: true })
    },
    //结束上拉刷新
    EndScrolltolower:function(e){
      this.setData({
        isMoring:false
      })
    },
    
    // 下拉的时候触发 这个时候不管是否isopenrefresh开启 都将触发距离顶部的事件
    bindscrolltoupper:function(e){
      this.triggerEvent("to_top",{},{ bubbles: true, composed: true })
    },


    // 当下拉刷新被触发的时候
    refresh:function(e){
      this.triggerEvent("refresh",{}, { bubbles: true, composed: true })
    },
    //结束下拉刷新
    EndRefresh:function(e){
      var that = this
      setTimeout(() => {
        that.setData({
          isEnd:false
        })
      }, 1000);
    },

    // 滑动到底部 enhanced暂时不用 无法设置高度 无法下拉刷新
    Scroll_to_top:function(duration = 0){
      const query = this.createSelectorQuery()
      query.select("#scrollView").node()
      query.exec(res=>{
        var scrollView  = res[0].node
        var data  = {
          top:0,
        }
        if(duration > 0){
          data.animated = true
          data.duration = duration
        }
        scrollView.scrollTo(data)
      })
      
    },

    // 滑动到底部 enhanced暂时不用 无法设置高度 无法下拉刷新
    Scroll_to_bottom:function(duration = 0){
      const query = this.createSelectorQuery()
      query.select("#scrollView").boundingClientRect()
      query.selectViewport().scrollOffset()
      query.select("#scrollView").node()
      query.exec(res=>{
        var scrollView  = res[2].node
        var data  = {
          top:res[1].scrollHeight,
        }
        if(duration > 0){
          data.animated = true
          data.duration = duration
        }
        scrollView.scrollTo(data)
      })
      
    },
    Scroll_to_selector:function(selector){
      const query = this.createSelectorQuery()


      query.select("#scrollView").node()
      query.exec(res=>{
        var scrollView  = res[0].node
        scrollView.scrollIntoView(selector)
      })
    },

    //设置scrollview滑动到哪里
    // posDic:{
    //   top:710, 距离头部距离
    //   ani:false，滚动的时候是否有动画
    // }
    SetScrolloPosition:function(posDic){
      if(typeof(posDic["ani"])  != 'undefined' ){
        this.setData({
          scrollPostionAnimation:posDic["ani"]
        })
      }else{
        this.setData({
          scrollPostionAnimation:true
        })
      }
      this.setData({
        scrollPostion:posDic["top"]
      })
      
    },
    // 运行中关闭返回按钮
    HiddIsShowBack:function(posDic){
      this.setData({
        
        is_show_back:posDic.isback
        
      })
      this.selectComponent("#header").UpdateTitlecenter()
    },
    //更新位置
    UpdatePosition:function(posDic){

      if (posDic.second_header_height){
        this.setData({
          second_header_height: posDic.second_header_height
        })
      }
      if (posDic.first_space_height) {
        this.setData({
          first_space_height: posDic.first_space_height
        })
      }
      if (posDic.second_space_height) {
        this.setData({
          second_space_height: posDic.second_space_height
        })
      }
      if (posDic.bottom_view_height) {
        this.setData({
          bottom_view_height: posDic.bottom_view_height
        })
      }

      this.updateSrc_top();
    },
    
    // 显示headerAlert标签
    ShowAlert:function(title){
      this.setData({
        alertText:title,
        isShowAlert:true
      })
      setTimeout(() => {
        this.setData({
          isShowAlert:false
        })
      }, 1300);
    },
    // 显示没有操作的疑问标签
    ShowNoOperateAlert:function(param){
      this.selectComponent("#noOperateAlert").Show(param)
    }
  }
})
