
// isLog 是否打印日志
// istimer 是否开启实时位置监听
// isbackground 是否开启实时位置监听的后台监听

class Location {
  constructor(dic){
    // 构造函数配置信息
    this.isLog = dic.isLog
    this.istimer = dic.istimer
    this.isbackground = dic.isbackground
    this.latitude = -10000
    this.longitude = -10000
    // 是否开始实时更新位置信息 初始化为未开始
    this.isLocation =false 
  }

  // 进入程序之后第一次获取位置信息 去检测是否开启位置授权，
  getLocation(dic){
    // 当开启了timer 并且已经开启过监听函数
    if(this.istimer && this.isLocation ) {
      //有值
      dic.success({
        latitude:this.latitude,
        longitude:this.longitude
      })
    }else{
      // 去获取
      var that = this
      // 检测是否授权
      wx.fun.checkWxAuth({
        type:"location",
        success:res=>{
          // 已经成功授权 第一次获取位置信息
          wx.getLocation({
            success:res=>{
              if(that.isLog){
                wx.log.log({name:"第一次获取位置信息",latitude:res.latitude,longitude:res.longitude})
              }
              that.latitude = res.latitude
              that.longitude = res.longitude
              
              dic.success({
                latitude:that.latitude,
                longitude:that.longitude
              })
            }
          })
          //如果开启了timer
          if(this.istimer){
            //开始监听位置变化 已经经过了验证 开始实时更新位置信息  
            wx.startLocationUpdate({
              success: (res) => {
                if(that.isLog){
                  wx.log.log("is pro")
                }
                //在前台接收实时位置
                //开启成功
                if(this.isbackground){
                  wx.startLocationUpdateBackground({
                    success: (res) => {

                      if(that.isLog){
                        wx.log.log("is background")
                      }
                      //后台开启成功
                      wx.onLocationChange((result) => {
                        if(that.isLog){
                          wx.log.log({name:"位置变化",latitude:result.latitude,longitude:result.longitude})
                        }
                        that.latitude = result.latitude
                        that.longitude  = result.longitude
                      })

                      this.isLocation = true
                    }
                  })
                }else{
                  wx.onLocationChange((result) => {
                    if(that.isLog){
                      wx.log.log({name:"位置变化",latitude:result.latitude,longitude:result.longitude})
                    }
                    that.latitude = result.latitude
                    that.longitude  = result.longitude
                  })
                }
                this.isLocation = true
              },
              fail:res=>{

              }
            })
           
            
          }
          
        }
      })
    }
  }


}
export default Location