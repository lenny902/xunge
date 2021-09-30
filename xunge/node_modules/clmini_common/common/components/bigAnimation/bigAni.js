// components/gift/bigAni.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    animation_times:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scale:1,
    scaleBigBool:true,
    timer:null,
    times:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    EndAni(){
      this.setData({
        scale:1
      })
      if (this.data.timer != null){
        clearInterval(this.data.timer)
      }
    },

    StartAni(){
      
      if(this.data.animation_times > 0 && this.data.times >= this.data.animation_times){
        return;
      }
      this.setData({
        times:this.data.times + 1
      })
      let that = this;
      if (this.data.timer != null) {
        clearInterval(this.data.timer);
        this.data.timer = null;
      }
      this.data.timer = setInterval(() => {

        if (that.data.scaleBigBool) {
          that.data.scale += 0.1;
          if (that.data.scale > 1.3) {
            that.data.scaleBigBool = false
          }
        }else {
          that.data.scale -= 0.1;
          if (that.data.scale < 1) {
            that.data.scaleBigBool = true
          }
        }
        that.setData({
          scale:that.data.scale
        })
        
      }, 250);
    },
  }
})
