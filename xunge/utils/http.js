
const host = "https://www.caijingxinge.cn/api/"

var http_POST = (url,param) => {
  let allUrl = host + url
  let data = param.data != null ? param.data : {}
  console.log("-------\nX-Auth-Token:",wx.ls.getToken(),"\n url:",allUrl,"\n param:",JSON.stringify(data),"\n-----------")
  wx.request({
    url: allUrl,
    method: 'POST',
    data:data,
    header:{
      'content-type': 'application/json',
      'X-Auth-Token': wx.ls.getToken()
    },
    success:res=>{
      let obj = res.data 
      let code = obj.code
      console.log(JSON.stringify(obj))
      if (code == 200) {
        if (param.success) {
          param.success(obj)
        }
      }else {
        if (param.fail){
          param.fail(obj)
        }
      }
    },
    fail:res=>{
      if (param.fail){
        param.fail(res)
      }
    }
  })
} 

var http_GET = (url,param) => {
  let allUrl = host + url
  let data = param.data != null ? param.data : {}
  wx.request({
    url: allUrl,
    method: 'GET',
    data:data,
    header:{
      'content-type': 'application/json'
    },
    success:res=>{
      if (param.success) {
        console.log(res)
        param.success(res)
      }
    },
    fail:res=>{
      if (param.fail){
        param.fail(res)
      }
    }
  })
}

var http_login = (param)=> {
  http_POST('user/userLogin',param)
}

var http_act = (param)=> {
  http_POST('document/getDocumentList',param)
}

var http_act_info = (param)=> {
  http_POST('document/getDocument',param)
}

var http_act_addHistory = (param) => {
  http_POST('document/addDocHistory',param)
}

var http_act_updateQuota = (param) => {
  http_POST('document/updateDocumentQuota',param)
}

var http_fund_getfundListOfSubscribe = (param) => {
  http_POST('fund/getfundListOfSubscribe',param)
}

var http_fund_getFundType = (param) => {
  http_POST('fund/getFundType',param)
}

//oder:1:规模，2:年化收益3:自选 4:时间
var http_fund_getFundList = (param) => {
  http_POST('fund/getFundList',param)
}

var http_user_getAccount = (param) => {
  http_POST('user/getAccount',param)
}

var http_fund_addSubscribe = (param) => {
  http_POST('fund/addSubscribe',param)
}

var http_fund_delSubscribe = (param) => {
  http_POST('fund/delSubscribe',param)
}

var http_fund_getFundDynamic = (param) => {
  http_POST('fund/getFundDynamic',param)
}

var http_fund_getFundDynamicDetails = (param) => {
  http_POST('fund/getFundDynamicDetails',param)
}

var http_fund_getOptional = (param) => {
  http_POST('fund/getOptional',param)
}

var http_stock_getOptionalList = (param) => {
  http_POST('stock/getOptionlList',param)
}

var http_fund_getFundInformation = (param) => {
  http_POST('fund/getFundInformation',param)
}

var http_fund_getFundOverview = (param) => {
  http_POST('fund/getFundOverview',param)
}

var http_fund_getFundManagerChange = (param) => {
  http_POST('fund/getFundManagerChange',param)
}

var http_fund_getFundManager = (param) => {
  http_POST('fund/getFundManager',param)
}

var http_fund_getFundStock = (param) => {
  http_POST('fund/getFundStock',param)
}

var http_stock_addStockOptional = (param) => {
  http_POST('stock/addStockOptional',param)
}

var http_stock_delStockOptional = (param) => {
  http_POST('stock/delStockOptional',param)
}

var http_fund_getFundScale = (param) => {
  http_POST('fund/getFundScale',param)
}

var http_fund_getFundProfit = (param) => {
  http_POST('fund/getFundProfit',param)
}

var http_stock_getOneStock = (param) => {
  http_POST('stock/getOneStock',param)
}

var http_stock_getStock = (param) => {
  http_POST('stock/getStock',param)
}

var http_stock_getStockChangeOfFund = (param) => {
  http_POST('stock/getStockChangeOfFund',param)
}

var http_stock_getStockByFundType= (param) => {
  http_POST('stock/getStockByFundType',param)
}

var http_stock_getStockOfFund= (param) => {
  http_POST('stock/getStockOfFund',param)
}

var http_msg_getMsgList= (param) => {
  http_POST('msg/getMsgList',param)
}

var http_document_getDocumentHistoryList= (param) => {
  http_POST('document/getDocumentHistoryList',param)
}

var http_feedback_list= (param) => {
  http_POST('feedback/getFeedbackList',param)
}

var http_feedback_addFeedback= (param) => {
  http_POST('feedback/addFeedback',param)
}

var http_user_getQuestion= (param) => {
  http_POST('user/getQuestion',param)
}

var http_user_improveAccount= (param) => {
  http_POST('user/improveAccount',param)
}






module.exports = {
  http_user_improveAccount:http_user_improveAccount,
  http_user_getQuestion:http_user_getQuestion,
  http_feedback_list:http_feedback_list,
  http_feedback_addFeedback:http_feedback_addFeedback,
  http_document_getDocumentHistoryList:http_document_getDocumentHistoryList,
  http_msg_getMsgList:http_msg_getMsgList,
  http_login:http_login,
  http_act:http_act,
  http_act_info:http_act_info,
  http_act_addHistory:http_act_addHistory,
  http_act_updateQuota:http_act_updateQuota,
  http_fund_getfundListOfSubscribe:http_fund_getfundListOfSubscribe,
  http_fund_getFundType:http_fund_getFundType,
  http_fund_getFundList:http_fund_getFundList,
  http_user_getAccount:http_user_getAccount,
  http_fund_addSubscribe:http_fund_addSubscribe,
  http_fund_delSubscribe:http_fund_delSubscribe,
  http_fund_getFundDynamic:http_fund_getFundDynamic,
  http_fund_getFundDynamicDetails:http_fund_getFundDynamicDetails,
  http_fund_getOptional:http_fund_getOptional,
  http_stock_getOptionalList:http_stock_getOptionalList,
  http_fund_getFundInformation:http_fund_getFundInformation,
  http_fund_getFundOverview:http_fund_getFundOverview,
  http_fund_getFundManagerChange:http_fund_getFundManagerChange,
  http_fund_getFundManager:http_fund_getFundManager,
  http_fund_getFundStock:http_fund_getFundStock,
  http_stock_addStockOptional:http_stock_addStockOptional,
  http_stock_delStockOptional:http_stock_delStockOptional,
  http_fund_getFundScale:http_fund_getFundScale,
  http_fund_getFundProfit:http_fund_getFundProfit,
  http_stock_getOneStock:http_stock_getOneStock,
  http_stock_getStock:http_stock_getStock,
  http_stock_getStockChangeOfFund:http_stock_getStockChangeOfFund,
  http_stock_getStockByFundType:http_stock_getStockByFundType,
  http_stock_getStockOfFund:http_stock_getStockOfFund
}