

//通用型存储
function getValueForKey(key) {
  try {
      var value = wx.getStorageSync(key)
      if (value) {
          // Do something with return value
          return value;
      }
  } catch (e) {
      // Do something when catch error
  }
}
function setValueForKey(key,value){
  if(value) {
      try {
          wx.setStorageSync(key, value)
      } catch (e) {    
      }
  }else{
      try {
          wx.removeStorageSync(key);
      } catch(e) {

      }
  }
}
//清除本地数据
function clean() {
  try {
    wx.removeStorageSync('phone');
  } catch (e) {
  // Do something when catch error
  }
}

// object排序 {arr,type('<' '>'),key,}
function sortFun(dic){
  var arr = dic.arr
  var type = dic.type
  if(type == '<'){
    arr.sort(function(a,b){
			return a[dic.key] - b[dic.key];
		})
  }
  if(type == ">"){
    arr.sort(function(a,b){
			return b[dic.key] - a[dic.key];
		})
  }
  return arr
}

// 两点之间的距离
function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
}

// 解析类似20200311这种时间返回2020-03-11
function get_dateStr_from_datein(dateint){
  var datestr = dateint+ "";
  return datestr.substring(0, 4) + "-" + datestr.substring(4, 6) + "-" + datestr.substring(6,8);
}
//将类似2020-03-11解析为20200311
function get_datein_from_dateStr(datestr){
  var curdate = new Date(datestr)
  const curyear = curdate.getFullYear()
  const curmonth = curdate.getMonth() + 1
  const curday = curdate.getDate()
  return parseInt("" + curyear + get0str(curmonth) +  get0str(curday))
}
// 获取当前日期字符串类似2020-03-11
function getCurrentDate(){
  var curdate = new Date()
  const curyear = curdate.getFullYear()
  const curmonth = curdate.getMonth() + 1
  const curday = curdate.getDate()
  return curyear + '-' + get0str(curmonth) + "-" + get0str(curday)
}

// 是否添加0
function get0str(n) {
  if(n<10){
    return '0' + n;
  }
  return n;
}

// 通过10位时间戳返回时间类似 03-11 10:30
function getTimeStrByInv(inv) {
  var prodate = new Date(inv * 1000)
  var curdate = new Date()

  var proyear = prodate.getFullYear()
  var promonth = prodate.getMonth() + 1
  var proday = prodate.getDate()
  var prohour = prodate.getHours()
  var prominute = prodate.getMinutes()
  var prosecond = prodate.getSeconds()

  

  var curyear = curdate.getFullYear()
  var curmonth = curdate.getMonth() + 1
  var curday = curdate.getDate()
  var curhour = curdate.getHours()
  var curminute = curdate.getMinutes()
  var cursecond = curdate.getSeconds()

  var dat1 = new Date(proyear + '/' + get0str(promonth) + "/" + get0str(proday))
  var dat2 = new Date(curyear + '/' + get0str(curmonth) + "/" + get0str(curday))



  var dayStr = ""
  var i = (dat2.getTime() - dat1.getTime()) / 1000 / 3600 / 24;
  if(i == 0 )
  {
    dayStr = "今天" + " " + get0str(prohour) + ":" + get0str(prominute)

  }else if(i == 1){
    dayStr = "昨天" + " " + get0str(prohour) + ":" + get0str(prominute)
  }else if(i == 2){
    dayStr = "前天" + " " + get0str(prohour) + ":" + get0str(prominute)
  } else if (i == -1) {
    dayStr = "明天" + " " + get0str(prohour) + ":" + get0str(prominute)
  } else if (i == -2) {
    dayStr = "后天" + " " + get0str(prohour) + ":" + get0str(prominute)
  }else{
    dayStr = get0str(promonth) + "/" + get0str(proday) + " " + get0str(prohour) + ":" + get0str(prominute)
  }
  return dayStr
}
// 通过字符串获取10位时间戳
function getTimeIn(str){

  if(str.indexOf('-') != -1){
    const str1 = str.replace(/-/g, '/');
    return parseInt((new Date(str1).getTime()) / 1000)
  }else{
    return parseInt((new Date(str).getTime()) / 1000)
  }
  
}
//获取当前时间时间戳10位
function getCurTimeIn(){
  return parseInt((new Date().getTime()) / 1000)
}
// 通过10位时间戳获取类似2020-03-11字符串 默认返回2020-03-11 还可以设置type返回不同的格式
function getproTimeStrByInv(inv,type){
  var prodate = new Date(inv * 1000)
  var proyear = prodate.getFullYear()
  var promonth = prodate.getMonth() + 1
  var proday = prodate.getDate()
  var prohour = prodate.getHours()
  var prominute = prodate.getMinutes()
  var prosecond = prodate.getSeconds()
  if(type == "yyyy-mm-dd hh:mm"){
    return get0str(proyear) + "-" +get0str(promonth) + "-" + get0str(proday) + " " + get0str(prohour) + ":" + get0str(prominute)
  }else if(type == "yyyy-mm-dd hh:mm:ss"){
    return get0str(proyear) + "-" +get0str(promonth) + "-" + get0str(proday) + " " + get0str(prohour) + ":" + get0str(prominute) + ":" + get0str(prosecond)
  }else if(type == "mm-dd hh:mm"){
    return get0str(promonth) + "-" + get0str(proday) + " " + get0str(prohour) + ":" + get0str(prominute)
  }else{
    return  get0str(proyear) + "-" +get0str(promonth) + "-" + get0str(proday)
  }
}
//判断权限
function checkWxAuth(param){
  wx.getSetting({
    success: function (res) {
      var authSetting = res.authSetting;
      if (authSetting) {
        if(param.type === "location"){
          if (authSetting.hasOwnProperty("scope.userLocation")) {
            var userLocation = res.authSetting["scope.userLocation"]
            if (!userLocation) {
              wx.showModal({
                title: '提示',
                content: '请开启位置授权，以更好的使用小程序',
                showCancel:false,
                success:res=>{
                  wx.openSetting({
                    complete: res => {
                      
                    }
                  })
                }
              })
              
            } else {
             
              //直接开启
              param.success()

            }
          } else {
            //第一次开启测试一次
            wx.getLocation({
              success: function(res) {
                param.success()
              },
              fail:function(res){
                wx.showModal({
                  title: '提示',
                  content: '请开启位置授权，以更好的使用小程序',
                  showCancel: false,
                  success: res => {
                    wx.openSetting({
                      complete: res => {

                      }
                    })
                  }
                })
              }
            })
          }
        }else if(param.type === "saveimage"){
          if (authSetting.hasOwnProperty("scope.writePhotosAlbum")) {
            var userLocation = res.authSetting["scope.writePhotosAlbum"]
            if (!userLocation) {
              wx.showModal({
                title: '提示',
                content: '请开启相册授权',
                showCancel:false,
                success:res=>{
                  wx.openSetting({
                    complete: res => {
                      
                    }
                  })
                }
              })
              
            } else {
             
              //直接开启
              param.success()

            }
          } else {
            //直接开启
            param.success()
          }
        }else{

        }
        
      } else {
        //直接开启
        param.success()

      }
    },
    fail:res=>{
      wx.log.log("fail")
    }
  })
}
// 将base64的图片转换为path
function binaryTopath(imageStr,fun){
  
  imageStr=imageStr.replace(/[\r\n]/g,"");//去掉回车换行

  var fsm = wx.getFileSystemManager(),  //文件管理器
  FILE_BASE_NAME = 'tmp_base64src', //文件名
  format = 'png', //文件后缀
  base64Str = (imageStr) //base64字符串
  var buffer = wx.base64ToArrayBuffer(base64Str), //base 转二进制
  filePath = `${wx.env.USER_DATA_PATH}/www`+ new Date().getTime() +`.${format}`; //文件名
  
  fsm.writeFile({ //写文件
    filePath,
    data: buffer,
    encoding: 'binary',
    success(res) {
      wx.getImageInfo({ //读取图片
        src: filePath,
        success: function(res) {
          fun(res)
        },
        error(res) {
          
        }
      })
    }
  })
}

//md5 算法
var MD5 = function (string) {

  function RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }

  function AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }

  function F(x, y, z) { return (x & y) | ((~x) & z); }
  function G(x, y, z) { return (x & z) | (y & (~z)); }
  function H(x, y, z) { return (x ^ y ^ z); }
  function I(x, y, z) { return (y ^ (x | (~z))); }

  function FF(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function GG(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function HH(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function II(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };

  function WordToHex(lValue) {
    var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  };

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }

    return utftext;
  };

  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

  string = Utf8Encode(string);

  x = ConvertToWordArray(string);

  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

  for (k = 0; k < x.length; k += 16) {
    AA = a; BB = b; CC = c; DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = AddUnsigned(a, AA);
    b = AddUnsigned(b, BB);
    c = AddUnsigned(c, CC);
    d = AddUnsigned(d, DD);
  }

  var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

  return temp.toLowerCase();
}


//检查是否为电话号码
function  validateMobile(param){
  if(!param || param.length<=0 ){
    return false;
  }else{
    if(!checkNum(param)){
      return false;
    }else{
      if(param.length != 11){
        return false;
      }else{
        if(param[0] != "1"){
          return false;
        }else{
          if (param[1] == '1' || param[1] == '2'){
            return false;
          }else{
            return true;
          }
        }
      }
    }
  }
}


// 检查是否为数字 
function checkNum(str) {
  return str.match(/\D/)==null
}

module.exports = {
  getValueForKey:getValueForKey,
  setValueForKey:setValueForKey,
  clean:clean,
  sortFun:sortFun,
  getDistance:getDistance,
  get_dateStr_from_datein:get_dateStr_from_datein,
  get_datein_from_dateStr:get_datein_from_dateStr,
  getCurrentDate:getCurrentDate,
  get0str:get0str,
  getTimeStrByInv:getTimeStrByInv,
  getTimeIn:getTimeIn,
  getCurTimeIn:getCurTimeIn,
  getproTimeStrByInv:getproTimeStrByInv,
  checkWxAuth:checkWxAuth,
  binaryTopath:binaryTopath,
  MD5:MD5,
  validateMobile:validateMobile,
  checkNum:checkNum
}