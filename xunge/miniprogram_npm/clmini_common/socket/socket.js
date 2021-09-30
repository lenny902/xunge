
/* 

  使用socket请配合event一起使用

  @params {}
  isLog: 是否开启socket的log
  url: socket 的url
  events: 获取到真实 数据时推送的通知列表 并且通过event 监听 此列表中的事件


  *注意 使用时请先挂载log 和event对象

  ex:
    // import Socket from "common/socket/socket.js"
    wx.socket = new Socket({
      isLog:true,
      url:"wss://xxxxxxx",
      events:["notify"]
    })
    // 请传入参数 identifier
    wx.socket.startSocket(
      {
        channel:"NotificationChannel",
        uuid:wx.ls.getAccount().uuid
      }
    )
*/
class Socket{
  constructor(dic) {
    if(typeof(dic.isLog) != "undefined"){
      this.isLog = dic.isLog;
    }else{
      this.isLog = false
    }
    this.url = dic.url
    this.events = dic.events
    this.ws = null
  }

  log(data){
    if(this.isLog){
      wx.log.log(data)
    }
  }

  startSocket(identifier) {
    this._identifier = identifier
    var that = this;
    //是否ing标示
    if(this._isSocketing){
      return
    }

    this.ws = wx.connectSocket({
      url: that.url,
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      success: (res)=>{
        that.log(res)
      },
      fail: (res) => {
        that.log(res)
      }
    })


    this.ws.onOpen(res=>{
      that.log('WebSocket连接已打开！')
      that._isSocketing = true
      var dic = {
        command:'subscribe',
        identifier:JSON.stringify(that._identifier)
      }
      var sendStr = JSON.stringify(dic)
      //链接成功验证订阅uuid
      that.sendSocketMessage(sendStr)
    })

    this.ws.onError(res=>{
      //cocket出错 等待结束 之后发起重链
      that.log(res)
    })
    this.ws.onMessage(res=>{
      //接收到socket消息
      var data = JSON.parse(res.data)
      that.log(data)
      if(data.type === "ping"){}else{
        that.log("real socket data")
        if(data.message && data.message.message){
          var msgData = JSON.parse(data.message.message)
          //判断是否与预设的通知信息相同 相同就推送 无一相同就丢弃
          for (let index = 0; index < that.events.length; index++) {
            const element = that.events[index];
            if(element === msgData.socket_type){
              //推送
              wx.event.emit(element,msgData.message)
              break;
            }
          }
          
        }
      }
    })

    this.ws.onClose(res=> {
      that.log('WebSocket 已关闭！')
      that._isSocketing = false
      //自动等待10秒重新开启 
      setTimeout(() => {
        that.startSocket(that._identifier)
      }, 5000);
    })


  }
  sendSocketMessage(msg) {
    if (msg) {
      this.log("socket 往服务端发送消息")
      this.log(msg)
      this.ws.send({
        data: msg,
        success:res=>{
          this.log(res)
        },
        fail:res=>{
          this.log(res)
        }
      })
    }
  }
}


export default Socket

