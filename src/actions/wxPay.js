import axios from 'axios';
// const {  WXKEY } = require('./config.js');

export const wxPay = (wxChatParams,callBack) => {
  let xml2js = require('xml2js');
  let params = {
    appid: wxChatParams['appid'],//公众账号ID
    body: wxChatParams['body'],//商品描述
    mch_id: wxChatParams['mch_id'],//商户号	
    nonce_str: wxChatParams['nonce_str'],//随机字符串
    notify_url: wxChatParams['notify_url'],//通知地址
    openid: wxChatParams['openid'],//用户openid 当JSAPI时必传递
    out_trade_no: wxChatParams['out_trade_no'],//商户订单号
    sign_type: wxChatParams['sign_type'],//加密方式
    spbill_create_ip: wxChatParams['spbill_create_ip'],//终端IP
    total_fee: wxChatParams['total_fee'], //总金额 单位是分
    trade_type: wxChatParams['trade_type'],//交易类型
    // scene_info:JSON.stringify(scene_info) ,//场景信息
  }

  let sign = getSign(params)
      params.sign = sign
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(params);
  callBack(xml)
}
//获取md5签名
function getSign(params) {
  let WXKEY=sessionStorage.getItem('mchKey');
  let string = ""
  for (let key in params) {
    if (key == 'appid') {
      string += key + "=" + params[key]
    } else {
      string += "&" + key + "=" + params[key]
    }
  }
  string += `&key=${WXKEY}`
  var crypto = require('crypto');
  var md5 = crypto.createHash('md5');

  md5.update(string);
  let str = md5.digest('hex');
  console.log('WXKEY',WXKEY);
  return str.toUpperCase();
  
}