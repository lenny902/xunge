
var touch_rate = 2.0;
var auto_rate = 2
//判断系统 参数不同 滑动的速度有差异
if (wx.getSystemInfoSync().system.indexOf("Android") != -1){
  //android
  touch_rate = 1.0
  auto_rate = 4
}else{
  //其他
  touch_rate = 2.0
  auto_rate = 2
}

//参数说明
// 1.radius 圆角尺寸
// 2.idx item的标识
// 3.slide_or_longtap 操作类型

// 事件说明
// 1.change_scro_event 当滑动操作为X的时候触发的事件 去关闭上层scrollview的y轴滑动 没有scrollview的时候 可以不用接收这个事件
// 2.deleteEvent 核心删除事件
// 3.tapEvent item的普通点击事件，在组件中中转，如果在组件内部用包裹一层view来接收可以不监听此事件


Component({
  //属性
  properties: {
    // 是否圆角
    radius:{
      type:String,
      value:"0rpx;"
    },
    // idx为标识当前item 一般情况为列表的item下标，在事件中传递
    idx: {
      type: Number, 
      value: 0
    },
    //滑动或者longtap（android和ios风格）
    // 1 slide ios风格（适用ios 和android）
    // 2 slide||longpress 兼容ios和android风格 ios会被重设为1 android会被重设为3
    // 3 longpress 强制为长按方式 不推荐（问题：ios 在longtap的情况下悬浮框dialog 只会被显示在scrollview里面，所以暂时只开启android）
    slide_or_longtap:{
      type:Number,
      value:2
    },
    showMessage:{
      type:String,
      value:"删除该记录"
    }
  },
  //参数
  data: {
    right:0,
    isFirst:false,
    direction:"X"
  },

  // 方法
  methods: {
    // tap事件
    // { currentTarget: { dataset: data } }
    handleTap:function({currentTarget :{ dataset:data }}){
      this.triggerEvent("tapEvent",{
        type: data.type,
        idx: this.data.idx
      })
    },
    //longtapevent事件
    handleLongPress: function (e) {
      // longpress 和longtap区别在于
      // longpress 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发
      // longtap 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）
      if(this.data.slide_or_longtap === 1){
        return
      }
      var longPressX = e.touches[0].pageX
      var longPressY = e.touches[0].pageY
      longPressX = longPressX * 750 / wx.getSystemInfoSync().windowWidth;
      longPressY = longPressY * 750 / wx.getSystemInfoSync().windowWidth
      //偏移量为30rpx
      var offset = 30;
      var dialog = this.selectComponent("#dialog")
      
      dialog.Show({
        type:"type_offset",
        offset:30,
        point: {
          x: longPressX,
          y: longPressY
        }
      });
    },
    //touchStart事件
    handleTouchStart(e) {
      //禁止滑动
      if(this.data.slide_or_longtap === 3){
        return
      }
      this.setData({
        isFirst:false,
        direction:'X'
      })
      this.touchStartX = e.touches[0].pageX
      this.touchStartY = e.touches[0].pageY
    },
    // touchMove事件
    handleTouchMove: function (e) {
      //禁止滑动
      if(this.data.slide_or_longtap === 3){
        return
      }
      this.touchMoveX = e.touches[0].pageX
      this.touchMoveY = e.touches[0].pageY

      this.moveX = this.touchMoveX - this.touchStartX
      this.moveY = this.touchMoveY - this.touchStartY

      if(!this.data.isFirst) {
        // 一次触摸事件第一次触发move的时候判断是横向 还是竖向
        // 横向就一直保持横向，横向的时候触发事件去禁止父srollview的y滚动方式
        // 竖向的时候，禁止掉所有横向的滑动
        if (Math.abs(this.moveY) > Math.abs(this.moveX)) {
          this.setData({
            direction:'Y'
          })
        }else{
          this.setData({
            direction: 'X'
          })
          //触发去关闭外层的y轴滑动
          this.triggerEvent("change_scro_event",{is_scroll_y:false})
        }
        //关闭设置direction入口
        this.setData({
          isFirst:true
        })
      }
      // 通过direction来做相应的处理
      if(this.data.direction === "Y"){
        //抛出事件(但是无用)
        // this.triggerEvent('touchmove', {}, { bubbles: true })
        //不处理，由父scrollivew处理
      }
      //通过横向的偏移量right来做对应的滑动操作
      if(this.data.direction === "X") {
        var right = this.data.right;
        //处理事件并且吞并
        if(this.moveX  > 0){
          //向右
          if(right <= 0){
            //圆点不管
          }else{
            right = right - Math.abs(this.moveX / touch_rate );
            if(right <= 0){
              right = 0
            }
            this.setData({
              right:right
            })
          }
        }else if(this.moveX < 0){
          //向左
          if (right >= 120){
            return;
          }else{
            this.setData({
              right: Math.abs(this.moveX / touch_rate)
            })
          }
        }else{

        }
      }
    },

    //touchEnd事件
    handleTouchEnd: function (e) {
      //禁止滑动
      if (this.data.slide_or_longtap === 3) {
        return
      }
      this.triggerEvent("change_scro_event", { is_scroll_y: true })
      this.setData({
        isFirst:false
      })
      if(this.data.direction === "Y"){
        //y方向不做处理
        return
      }
      var right =this.data.right;

      if(this.moveX >0){
        //向右 
        if(right <= 0){
          //起点位置不用管
        }else {
          if (Math.abs(this.moveX) < 24){
            this._auto_change_width(false)
          }else{
            this._auto_change_width(true)
          }
          
        }
      }else if(this.moveX < 0){
        //向左
        if(right <= 60){
          if(Math.abs(this.moveX) > 60){
            this._auto_change_width(false)
          }else{
            this._auto_change_width(true)
          }
          
        }else if(right < 120){
          this._auto_change_width(false)
        }else{
          //>=120不用管
        }
      }else{

      }
    },

    
    //自动滑动
    _auto_change_width(isClose){
      var rightwidth = this.data.right
      var that = this;
      if (isClose){
        var timer = setInterval(function () {
          if (rightwidth <= auto_rate) {
            rightwidth = 0;
            clearInterval(timer)
          } else {
            rightwidth = rightwidth - auto_rate;
          }
          that.setData({
            right: rightwidth
          })
        }, 1);
      }else{
        var timer = setInterval(function () {
          if (rightwidth >= 120) {
            rightwidth = 120;
            clearInterval(timer)
          } else {
            rightwidth = rightwidth + auto_rate;
          }
          that.setData({
            right: rightwidth
          })
        }, 1);
      }
    },

    //点击删除该条
    handDeleteTap({currentTarget:{dataset: data } }) {
      if (data.type === "longpress_del"){
        this.selectComponent("#dialog").Hide();
      }
      this._auto_change_width(true)
      this.triggerEvent('deleteEvent', {
        type: data.type,
        idx: this.data.idx
      })
    }
  },
  ready() {
    //初始的时候对 slide_or_longtap进行处理主要处理 为2 的情况
    if(this.data.slide_or_longtap === 1 || this.data.slide_or_longtap === 3){

    }else{
      //2的情况下分别设置
      //判断系统
      if (wx.getSystemInfoSync().system.indexOf("Android") != -1) {
        //2的情况android重新设置为3
        this.setData({
          slide_or_longtap:3
        })
      } else {
        //2的情况android重新设置为1
        this.setData({
          slide_or_longtap: 1
        })
      }
    }
    
  }
})