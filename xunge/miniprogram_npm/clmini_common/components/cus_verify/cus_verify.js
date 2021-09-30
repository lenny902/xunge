// common/components/cus_verify/cus_verify.js
var timer = null
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    width:{
      type:String,
      value:'200rpx'
    },
    height:{
      type:String,
      value:'80rpx'
    },
    color:{
      type:String,
      value:"black"
    },
    // 倒计时 是否等于0 等于0 可以发送验证不等于就不能发送验证并且为灰色
    timerIndex:{
      type:Number,
      value:0
    },
    //默认最大计时时间
    timeCount:{
      type:Number,
      value:60
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
    // 调用接口开始倒计时 根据不同返回是否开始请求
    Start(fun){
      if(this.data.timerIndex > 0){
        // 正在倒计时
        fun(false)
      }else{
        // 可以倒计时
        clearInterval(timer)
        this.setData({
          timerIndex:this.data.timeCount
        })
        fun(true)
        // 开启倒计时
        timer = setInterval(() => {
          if(this.data.timerIndex == 0){
            clearInterval(timer)
            return;
          }
          this.setData({
            timerIndex:this.data.timerIndex - 1
          })
        }, 1000);
      }
    },
  }
})
