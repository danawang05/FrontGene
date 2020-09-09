import axios from 'axios';
import { addMsg, loginIM, onSendMsg, uploadPic, getHistoryMsg,logout } from './chat'
import { wxPay } from './wxPay'
import { doctorwxPay } from './doctorwxPay'
// import { } from './../apis';
// let mchId=''
// const { url, appId ,mchId,urlNoApi} = require('./config.js')
const { aurl,url, appId ,urlNoApi} = require('./config.js')
// let url  = "/api"
let recentSessMap = {}
let abc = 20
const successCode = 0
export const axiosRequest = (query, callback) => {
  let dispatch = query.dispatch;
  let request_name = query.request_name;
  let request_api = query.request_api;
  let request_param = query.request_param;
  let request_type = query.request_type;
  dispatch({
    type: request_name,
    status: 'pending'
  })
  switch (request_type) {
    case 'GET':
      axios.get(request_api).then(({ data }) => {
        if (callback) {
          callback(data)
        }
        if (data.code == successCode) {
          dispatch({
            type: `${request_name}_SUCCESS`,
            data: query.saveDate ? query.saveDate : data.data,
            status: 'succ'
          })
        } else {
          dispatch({
            type: `${request_name}_FAILED`,
            msg: data.msg,
            status: 'failed'
          })
        }
      })
      return
    case 'POST':
      axios.post(request_api, request_param).then(({ data }) => {
        if (callback) {
          callback(data)
        }
        if (data.code == successCode) {
          if (request_name == 'LOGIN') {
            // localStorage.setItem("token", data.data.token)
            // localStorage.setItem("code", data.data.code)
            // sessionStorage.setItem("openId",data.data.entity.wxOpenId)
            sessionStorage.setItem("userId", data.data.entity.id)
            // sessionStorage.setItem("gene_user_type", data.data.entity.type)
            sessionStorage.setItem("gene_user_type", 1)
            
          }
          dispatch({
            type: `${request_name}_SUCCESS`,
            data: query.saveDate ? query.saveDate : data.data,
            status: 'succ'
          })
        } else {
          dispatch({
            type: `${request_name}_FAILED`,
            msg: data.msg,
            status: 'failed'
          })
        }
      })
      return
    default:
      return
  }
}


//获取openid 
//  sessionStorage.setItem("openId", 'o1SiC56E34qGifxdR1jqYMxFNUnI')
export const getOpnid = (query) => (dispatch) => {
  dispatch({
    type: 'GET_OPENID',
    status: 'pending'
  })
  axios.get(`${url}/login/${query.code}`).then(({ data }) => {
    if (data.code == 8001) {
      console.log(data.data.openId)

      sessionStorage.setItem("openId", data.data.openId)
      localStorage.setItem("openId", data.data.openId)
      dispatch({
        type: `GET_OPENID_FAILED`,
        openId: data.data.openId,
        status: 'failed'
      })
    } else {
      dispatch({
        type: `GET_OPENID_FAILED`,
        msg: data.msg,
        status: 'failed'
      })
    }
    if(data.code==successCode){

      sessionStorage.setItem("openId",data.openId)
      localStorage.setItem("openId", data.openId)
      sessionStorage.setItem("userId",data.data.user.id)
      // sessionStorage.setItem("gene_user_type",data.data.user.type)
      sessionStorage.setItem("gene_user_type",1)
      dispatch({
        type: `GET_OPENID_SUCCESS`,
        data:data.data,
        status: 'succ'
      })
    }else{


    }
    console.log('', '')
  })
  
}

//登录 /api/loginNew
export const newLogin = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'LOGIN',
    request_api: `${url}/loginNew`,
    request_param: query,
    request_type: 'POST'
  },function(data){
    // 绑定openid
    // bind/binduserwx//bind/{wxopenid}
    console.log(data)
    localStorage.setItem("token",data.data.token)
    localStorage.setItem("openId",data.data.openId)
    axiosRequest({
      dispatch: dispatch,
      request_name: 'BANDING_OPENID',
      request_api: `${url}/bind/binduserwx/bind/${sessionStorage.getItem('openId')}`,
      request_param: {},
      request_type: 'GET'
    })
  })
}

export const reg = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_OPENID',
    request_api: `${url}/register`,
    request_param: query,
    request_type: 'POST'
  })
}
//订单确认 api/gene/geneorder/orderValiLogin
// export const isCorfirm = (query) => (dispatch) => {
//   dispatch({
//     type: 'GET_isCorfirm',
//     status: 'pending'
//   })
//   axios.get(`${url}/gene/geneorder/orderValiLogin`).then(({ data }) => {
//     if (data.code == 8001) {
//       sessionStorage.setItem("isCorfirm", data.data.isCorfirmeed)
//       dispatch({
//         type: `GET_isCorfirm_FAILED`,
//         isCorfirmeed: data.data.isCorfirmeed,
//         status: 'failed'
//       })
//     } else {
//       dispatch({
//         type: `GET_isCorfirm_FAILED`,
//         msg: data.msg,
//         status: 'failed'
//       })
//     }
//   })
// }

//订单确认 api/gene/geneorder/orderValiLogin
export const isLogin = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'IS_LOGIN',
    request_api: `${url}/gene/geneorder/orderValiLogin`,
    request_param: query,
    request_type: 'GET'
  })
}
//患者查询已绑定的医生
export const getMydoctor = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_OPENID',
    request_api: `${url}/personal/mydoctor`,
    request_param: query,
    request_type: 'POST'
  })
}

//患者信息
export const getPatient = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_OPENID',
    request_api: `${url}/personal/information`,
    request_param: query,
    request_type: 'POST'
  })
}
// //获取code
// export const getQueryString(name){  
//   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
//   var r = window.location.search.substr(1).match(reg);  
//   if (r != null) return unescape(r[2]); return null;              
// }  
    

//获取验证码
export const getCode = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_CODE',
    request_api: `${url}/sendMsgCode`,
    request_param: query,
    request_type: 'POST'
  })
}
//获取IP
// export const getIP = (query) => (dispatch) => {
//   axiosRequest({
//     dispatch: dispatch,
//     request_name: 'GET_IP',
//     request_api: `${url}/gene/geneorder/ip`,
//     request_param: query,
//     request_type: 'POST'
//   })
// }
// export const getIP = (query) => (dispatch) => {
//   console.log('2222222222222222222222222222')
//   dispatch({
//     type: 'GET_GETIP',
//     status: 'pending'
//   })
//   axios.get(`${url}/gene/geneorder/ip`).then(({ data }) => {
//     if (data.code == 0) {
//       console.log('1111',data.data)
//       sessionStorage.setItem("getIP", data.data)

//       dispatch({
//         type: `GET_GETIP_FAILED`,
//         getIP: data.data,
//         status: 'failed'
//       })
//     } else {
//       dispatch({
//         type: `GET_GETIP_FAILED`,
//         msg: data.msg,
//         status: 'failed'
//       })
//     }
//     if(data.code==successCode){
//       // sessionStorage.setItem("token",data.data.token)
//       // sessionStorage.setItem("openId",data.data.user.wxOpenId)
//       sessionStorage.setItem("getIP",data.data)
//       // sessionStorage.setItem("gene_user_type",data.data.user.type)
//       // sessionStorage.setItem("gene_user_type",1)
//       dispatch({
//         type: `GET_GETIP_SUCCESS`,
//         data:data.data,
//         status: 'succ'
//       })
//     }else{


//      }
//     console.log('', '')
//   })
  
// }
export const getIp = (query) => (dispatch) => {
  dispatch({
    type: 'GET_GETIP',
    status: 'pending'
  })
  axios.get(`${url}/gene/geneorder/ip`).then(({ data }) => {
    if (data.code == 0) {
      console.log(data.data)
      sessionStorage.setItem("getIp", data.data)

      dispatch({
        type: `GET_GETIP_FAILED`,
        getIp: data.data,
        status: 'failed'
      })
    } else {
      dispatch({
        type: `GET_GETIP_FAILED`,
        msg: data.msg,
        status: 'failed'
      })
    }
    if(data.code==successCode){
      // sessionStorage.setItem("token",data.data.token)
      // sessionStorage.setItem("openId",data.data.user.wxOpenId)
      sessionStorage.setItem("getIp",data.data)
      dispatch({
        type: `GET_GETIP_SUCCESS`,
        data:data.data,
        status: 'succ'
      })
    }else{


    }
    console.log('', '')
  })
  
}
//登陆 /api/register
export const login = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'LOGIN',
    request_api: `${url}/register`,
    request_param: query,
    request_type: 'POST'
  })
}

//获取用户信息 api/user/userInfo
export const userInfo = (query) => (dispatch) => {
  dispatch({
    type: 'LOGIN',
    status: 'pending'
  })
  axios.get(`${url}/userInfo`).then(({ data }) => {
    if (data.code == successCode) {
      // sessionStorage.setItem("openId",data.data.entity.wxOpenId)
      sessionStorage.setItem("userId", data.data.entity.id)
      // sessionStorage.setItem("gene_user_type", data.data.entity.type)
      sessionStorage.setItem("gene_user_type", 1)
      console.log("====",data.data)
      dispatch({
        type: `LOGIN_SUCCESS`,
        data: data.data,
        status: 'succ'
      })
      if (data.data.entity.userSig) {
        loginIM(data.data.entity, dispatch)
      }

    } else {
      dispatch({
        type: `LOGIN_FAILED`,
        msg: data.msg,
        status: 'failed'
      })
    }
  })
}

//检查token是否失效 api/user/userInfo
export const userInfotoken = (query) => (dispatch) => {
  dispatch({
    type: 'LOGIN',
    status: 'pending'
  })
  axios.get(`${url}/userInfo`).then(({ data }) => {
    if (data.code == successCode) {
      // sessionStorage.setItem("openId",data.data.entity.wxOpenId)
      sessionStorage.setItem('scodeToken',data.code)
      sessionStorage.setItem("userId", data.data.entity.id)
      // sessionStorage.setItem("gene_user_type", data.data.entity.type)
      sessionStorage.setItem("gene_user_type", 1)
       //this.props.history.push('/agreement')
      dispatch({
        type: `LOGIN_SUCCESS`,
        data: data.data,
        status: 'succ'
      })
      if (data.data.entity.userSig) {
        loginIM(data.data.entity, dispatch)
      }

    } else {
      sessionStorage.setItem('fcodeToken',data.code)
      dispatch({
        type: `LOGIN_FAILED`,
        msg: data.msg,
        status: 'failed'
      })
      // this.props.history.push('/login')
    }
  })
}
//获取用户信息但不调用TIM

export const getUserInfoNotUseTMI = (query) => (dispatch) => {
  dispatch({
    type: 'LOGIN',
    status: 'pending'
  })
  axios.get(`${url}/userInfo`).then(({ data }) => {
    if (data.code == successCode) {
      // sessionStorage.setItem("openId",data.data.entity.wxOpenId)
      sessionStorage.setItem("userId", data.data.entity.id)
      //sessionStorage.setItem("gene_user_type", data.data.entity.type)
      sessionStorage.setItem("gene_user_type", 1)
      dispatch({
        type: `LOGIN_SUCCESS`,
        data: data.data,
        status: 'succ'
      })

    } else {
      dispatch({
        type: `LOGIN_FAILED`,
        msg: data.msg,
        status: 'failed'
      })
    }
  })
}
//查询医生 /api/personal/searchDoctor
export const searchDoctor = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SAARCH_DOCTOR',
    request_api: `${url}/personal/searchDoctor?name=${query.name}`,
    request_param: "",
    request_type: 'GET'
  })
}
//医生补充资料
export const docInformation = (query) => (dispatch) => {
  dispatch({
    type: 'INFORMATION',
    status: 'pending'
  })
  axios.post(`${url}/information`, query.information).then((informationData) => {
    if (informationData.data.code == successCode) {
      dispatch({
        type: `INFORMATION_SUCCESS`,
        status: 'succ'
      })
      dispatch({
        type: `LOGIN_SUCCESS`,
        data: informationData.data.data,
        status: 'succ'
      })
      axiosRequest({
        dispatch: dispatch,
        request_name: 'saveDoctorIdImg',
        request_api: `${url}/doctor/saveDoctorIdImg`,
        request_param: query.saveDoctorIdImg,
        request_type: 'POST'
      })
    } else {
      dispatch({
        type: `INFORMATION_FAILED`,
        msg: informationData.data.msg,
        status: 'failed'
      })
    }
  })
}
//补充资料 /api/information
export const information = (query) => (dispatch) => {

  dispatch({
    type: 'ADD_CODTOR',
    status: 'pending'
  })
  axios.post(`${url}/personal/addDoctor`, query.addDoctor).then(({ data }) => {
    if (data.code == successCode) {
      dispatch({
        type: `ADD_CODTOR_SUCCESS`,
        status: 'succ'
      })
      dispatch({
        type: 'SPARE_PHONE',
        status: 'pending'
      })
      axios.post(`${url}/sparePhone/sparephone`, query.sparePhones).then((sparephoneData) => {
        if (sparephoneData.data.code == successCode) {
          dispatch({
            type: `SPARE_PHONE_SUCCESS`,
            status: 'succ'
          })
          dispatch({
            type: 'INFORMATION',
            status: 'pending'
          })
          axios.post(`${url}/information`, query.information).then((informationData) => {
            if (informationData.data.code == successCode) {
              dispatch({
                type: `INFORMATION_SUCCESS`,
                status: 'succ'
              })
              dispatch({
                type: `LOGIN_SUCCESS`,
                data: informationData.data.data,
                status: 'succ'
              })
            } else {
              dispatch({
                type: `INFORMATION_FAILED`,
                msg: informationData.data.msg,
                status: 'failed'
              })
            }
          })
        } else {
          dispatch({
            type: `SPARE_PHONE_FAILED`,
            msg: sparephoneData.data.msg,
            status: 'failed'
          })
        }
      })

    } else {
      dispatch({
        type: `ADD_CODTOR_FAILED`,
        msg: data.msg,
        status: 'failed'
      })
    }
  })
}
//绑定医生 /api/personal/addDoctor
export const addDoctor = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'ADD_CODTOR',
    request_api: `${url}/personal/addDoctor`,
    request_param: query,
    request_type: 'POST'
  })
}
//主页面获取 /api/main/list
export const mainList = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'MAIN_LIST',
    request_api: `${url}/main/list`,
    request_param: "",
    request_type: 'GET'
  })
}
//页面滚动提示 /api/pub/pubhometips/page
export const pubhometips = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'PUB_HOME_TIPS',
    request_api: `${url}/pub/pubhometips/page`,
    request_param: "",
    request_type: 'GET'
  })
}


/**
 * 我的医生 /api/personal/mydoctor
 */
export const myDoctor = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'MEY_DOCTOR',
    request_api: `${url}/personal/mydoctor`,
    request_param: "",
    request_type: 'GET'
  })
}
/**
 * @description 获取医生职业资格证 /api/doctor/getDoctorIdImg/{id}
 */
export const getDoctorIdImg = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_DOC_IMG',
    request_api: `${url}/doctor/getDoctorIdImg/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}

/**
 * 
 * 字典 
 * POST /api/main/findForPids 字典
 */

export const findForPids = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SETTING',
    request_api: `${url}/main/findForPids`,
    request_param: query,
    request_type: 'POST'
  })
}

/**
 * 
 * 检测公司
 * GET /api/gene/genecompany/findAll
 */
export const genecompany = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GENE_COMPANY',
    request_api: `${url}/gene/genecompany/findAll`,
    request_param: query,
    request_type: 'GET'
  })
}
/**
 * 
 * 检测公司
 * GET /api/gene/genecompany/{id}
 */
export const genecompanyId = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GENECOMPANY_ID',
    request_api: `${url}/gene/genecompany/${query.id}`,
    request_param: "",
    request_type: 'GET'
  },function(data){
    console.log('callback', data)
    let mchId=sessionStorage.setItem('mchId',data.data.mchId)
    let mchKey=sessionStorage.setItem('mchKey',data.data.mchKey)
  })
}
/**
 *
 * 订单回显
 * api/gene/geneorder/getOrderAndForm/{orderId}
 */
export const getOrderAndForm = (query) => (dispatch) => {
    axiosRequest({
        dispatch: dispatch,
        request_name: 'GENE_GENEORDERANDFORM',
        request_api: `${url}/gene/geneorder/getOrderAndForm/${query.orderId}`,
        request_param: "",
        request_type: 'GET'
    },function(data){
        console.log('callback', data)
        
        sessionStorage.setItem('1',data.data.createrTime)
    })
}

/**
 * 套餐相关 
 * @description GET 套餐模糊查询 /api/gene/genepackage/searchname
 * @description GET 套餐详情 /api/gene/genepackage/{id}
 * @description GET 分页查询套餐 /api/gene/genepackage/page  废弃
 * @description GET 套餐列表 /api/gene/genepackage/alllist
 * @description GET 获取套餐所有id /api/gene/genepackage/isShouCangs
 */
export const searchname = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SEARCH_NAME',
    request_api: `${url}/gene/genepackage/searchname&&name=${query.name}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const genepackage = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GENEPACK',
    request_api: `${url}/gene/genepackage/${query.id}`,

    request_param: "",
    request_type: 'GET'
  })
}
export const genepackageSpecialist = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GENEPACK_SPECIALIST',
    // request_api: `${url}/gene/tdoctor/${query.id}`,
    request_api: `http://jiyin-test.sagacityidea.cn/gene-api/api/gene/tdoctor/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const genepackPage = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_GENEPACK',
    request_api: `${url}/gene/genepackage/alllist?page=${query.page}&limit=${query.limit}&company=${query.company}&geneType=${query.geneType}&type=${query.type}&cancerType=${query.cancerType}&name=${query.name}&orderBy=${query.orderBy}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const genepackPageSpecialist = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_GENEPACK_SPECIALIST',
    // request_api: `${url}/gene/tdoctor/page?page=${query.page}&limit=${query.limit}&company=${query.company}&geneType=${query.geneType}&type=${query.type}&cancerType=${query.cancerType}&name=${query.name}&orderBy=${query.orderBy}`,
    // request_api: `${url}/gene/tdoctor/page`,
    request_api: `http://jiyin-test.sagacityidea.cn/gene-api/api/gene/tdoctor/page`,
    request_param: "",
    request_type: 'GET'
  })
}
export const isShouCangs = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SHOU_CANG_LIST',
    request_api: `${url}/gene/genepackage/isShouCangs`,
    request_param: "",
    request_type: 'GET'
  })
}
/**
 * @description GET 根据患者查看推荐 /api/news/pubrecommendnews/listByPatient
 * @description GET 分页 /api/news/pubrecommendnews/page
 */
export const listByPatient = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_GENEPACK',
    request_api: `${url}/news/pubrecommendnews/listByPatient`,
    request_param: "",
    request_type: 'GET'
  })
}
export const pubrecommendnewsPage = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_GENEPACK',
    request_api: `${url}/news/pubrecommendnews/page`,
    request_param: "",
    request_type: 'GET'
  })
}


/**
* 
*收藏相关
* GET /api/gene/genepackage/shouCang/{packageId} 收藏
* GET /api/gene/genepackage/shouCangDel/{packageId} 取消收藏
* GET /api/gene/genepackage/isShouCang/{packageId}  是否收藏
* GET /api/gene/genepackage/findCollection 获取自己绑定医生的套餐
* GET /api/gene/genepackage/ShouCangsPackage //医生收藏的套餐
* GET /api/gene/genepackage/searchIsTop 置顶页面（患者端）
*/

export const searchIsTop = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SEARCH_IS_TOP',
    request_api: `${url}/gene/genepackage/searchIsTop?title=${query.name||''}&orderby=${query.orderby}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const shouCang = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SHOU_CANG',
    request_api: `${url}/gene/genepackage/shouCang/${query.packageId}`,
    request_param: "",
    request_type: 'GET'
  }, function () {
    dispatch({
      type: `IS_COLLECT_SUCCESS`,
      data: true,
      status: 'succ'
    })
  })
}
export const shouCangDel = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SHOU_CANG',
    request_api: `${url}/gene/genepackage/shouCangDel/${query.packageId}`,
    request_param: "",
    request_type: 'GET'
  }, function (data) {
    if (data.code == successCode) {
      dispatch({
        type: `IS_COLLECT_SUCCESS`,
        data: false,
        status: 'succ'
      })
    }

  })
}
export const isShouCang = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'IS_COLLECT',
    request_api: `${url}/gene/genepackage/isShouCang/${query.packageId}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const findCollection = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_GENEPACK',
    request_api: `${url}/gene/genepackage/findCollection`,
    request_param: "",
    request_type: 'GET'
  })
}
export const ShouCangsPackage = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SHOU_CANG_PACK',
    request_api: `${url}/gene/genepackage/ShouCangsPackage?title=${query.name||''}&orderby=${query.orderby}`,
    request_param: "",
    request_type: 'GET'
  })
}
/**
 * 新闻管理
 * @description GET 查询单个文章详情  /api/demo/news/info/{id}
 * @description GET 通过分页查找  /api/demo/news/listByUser
 * @description GET 分页  /api/demo/news/page
 */
export const newsInfo = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'NEWS_INFO',
    request_api: `${url}/demo/news/info/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const listByUser = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'LIST_BY_USER',
    request_api: `${url}/demo/news/listByUser`,
    request_param: "",
    request_type: 'GET'
  })
}
export const newsPage = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'NEWS_PAGE',
    request_api: `${url}/demo/news/page?page=${query.page}&limit=${query.limit}&title=${query.title || ""}&classfly=${query.classfly || ""}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const newsPage1 = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'NEWS_PAGE',
    request_api: `${url}/demo/news/page?page=1&limit=9000&title=&classfly=1290621277424242690`,
    request_param: "",
    request_type: 'GET'
  })
}
export const newsPage2 = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'NEWS_PAGE',
    request_api: `${url}/demo/news/page?page=1&limit=9000&title=&classfly=1290621406860464129`,
    request_param: "",
    request_type: 'GET'
  })
}

//获取微信用户信息 api/user/wxuserinfo
// export const wxuserinfo = (query) => (dispatch) => {
//   dispatch({
//     type: 'WXUSERINFO',
//     status: 'pending'
//   })
//   axios.get(`${url}/wxuserinfo/${query.openid}`).then(({data}) => {
//     return
//     console.log('111111')
//     console.log("headImgUrl", data.headImgUrl)
//     // if (data.code == successCode) {
//     //   // sessionStorage.setItem("openId",data.data.entity.wxOpenId)
//     //   sessionStorage.setItem("headImgUrl", data.headImgUrl)
//     //   console.log("headImgUrl", data.headImgUrl)
//     //   // sessionStorage.setItem("gene_user_type", data.data.entity.type)
//     //   sessionStorage.setItem("nickname", data.nickname)
//     //   console.log("====",data)
//     //   dispatch({
//     //     type: `LOGIN_SUCCESS`,
//     //     data: data.data,
//     //     status: 'succ'
//     //   })
//     //
//     // } else {
//     //   dispatch({
//     //     type: `LOGIN_FAILED`,
//     //     msg: data.msg,
//     //     status: 'failed'
//     //   })
//     // }
//   })
// }

export const wxuserinfo = (query) => (dispatch)=> {
  dispatch({
    type: 'WXUSERINFO',
    status: 'pending'
  })
  axios.get(`${url}/wxuserinfo/${query.openid}`).then(({ data }) => {
    // if (data.code == 8001) {
    //   console.log(data.data.openId)
    //   sessionStorage.setItem("openId", data.data.openId)
    //
    //   dispatch({
    //     type: `GET_OPENID_FAILED`,
    //     openId: data.data.openId,
    //     status: 'failed'
    //   })
    // } else {
    //   dispatch({
    //     type: `GET_OPENID_FAILED`,
    //     msg: data.msg,
    //     status: 'failed'
    //   })
    // }
    // if(data.code==successCode){
    //   // sessionStorage.setItem("token",data.data.token)
    //   // sessionStorage.setItem("openId",data.data.user.wxOpenId)
    //   sessionStorage.setItem("openId",data.openId)
    //   sessionStorage.setItem("userId",data.data.user.id)
    //   // sessionStorage.setItem("gene_user_type",data.data.user.type)
    //   sessionStorage.setItem("gene_user_type",1)
    //   dispatch({
    //     type: `GET_OPENID_SUCCESS`,
    //     data:data.data,
    //     status: 'succ'
    //   })
    // }else{
    //
    //
    // }
    // console.log('', '')
    console.log('data',data)
    sessionStorage.setItem("openId",data.openId)
    sessionStorage.setItem("headImgUrl", data.headImgUrl)
    console.log("headImgUrl", data.headImgUrl)
    sessionStorage.setItem("nickname", data.nickname)
  })

}
export const saveuserinfo = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SAVE_USER_INFO',
    request_api: `${aurl}/weixin/live/live-action.jhtml`,
    request_param: query,
    request_type: 'POST'
  })
}

/**
 * @description 患者相关 GET /api/doctor/mypatient
 */
export const mypatient = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'MY_PATient',
    request_api: `${url}/doctor/mypatient?name=${query ? query.name : ''}`,
    request_param: "",
    request_type: 'GET'
  })
}
/**
 * @description 批量添加手机号 POST /api/sparePhone/sparephone
 */
export const sparephone = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SPARE_PHONE',
    request_api: `${url}/sparePhone/sparephone`,
    request_param: query,
    request_type: 'POST'
  })
}
/**
 * @description 订单
 * 分页查询 GET /api/gene/geneorder/page
 * 订单详情 GET /api/gene/geneorder/{id}
 * 确认支付 GET /api/gene/geneorder/isPay/{id}
 * 保存申请单照片 POST /api/gene/geneorder/saveApplicationImg
 * 绑定条形码 POST /api/gene/geneorder/saveOrderBarCode
 * 是否上传申请单 GET /api/gene/geneorder/isUploadApplicationImg/{id}
 * 获取申请单照片  GET /api/gene/geneorder/getApplicationImg/{id}
 * 1电子申请单新增接口
 * gene-api/api/gene/geneorder/saveOrder

 * 2.查询套餐详情接口
gene-api/api/gene/genepackage/{id}
用于获取套餐名，代码，新增商户号（mchId）	

查询订单详情接口
gene-api/api/gene/geneorder/{id}

查询电子申请单详情接口
gene-api/api/gene/geneform/{id}

 */
export const geneorderIsPay = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'IS_PAY',
    request_api: `${url}/gene/geneorder/isPay/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const isUploadApplicationImg = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'IS_UPLOAD_APPLICATION_IMG',
    request_api: `${url}/gene/geneorder/isUploadApplicationImg/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const getApplicationImg = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_ORDER_URL',
    request_api: `${url}/gene/geneorder/getApplicationImg/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const saveOrderBarCode = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SAVE_ORDER_CODE',
    request_api: `${url}/gene/geneorder/saveOrderBarCode`,
    request_param: query,
    request_type: 'POST'
  })
}
export const saveApplicationImg = (query) => (dispatch) => {
  var fileFormData = new FormData();
  fileFormData.append('file', query.file);
  axiosRequest({
    dispatch: dispatch,
    request_name: 'UPLOAD',
    request_api: `${url}/pub/pubfile/upload`,
    request_param: fileFormData,
    request_type: 'POST'
  }, function (data) {
    if (data.code == successCode) {
      let arrs = query.fileId
      arrs.push(data.data.id)
      let Obj = {
        files: arrs,
        relationId: query.relationId
      }
      axiosRequest({
        dispatch: dispatch,
        request_name: 'SAVE_APP_IMG',
        request_api: `${url}/gene/geneorder/saveApplicationImg`,
        request_param: Obj,
        request_type: 'POST'
      })
    }
  })

}

export const geneorderList = (query) => (dispatch) => {

  axiosRequest({
    dispatch: dispatch,
    request_name: 'ORDER_LIST',
    request_api: `${url}/gene/geneorder/page?page=${query.page}&limit=${query.limit}${query.statu ? '&statu=' + query.statu : ''}${query.patientId?'&patientId='+query.patientId:''}`,
    request_param: "",
    request_type: 'GET'
  })
}

export const geneorderListSpecialist = (query) => (dispatch) => {

  axiosRequest({
    dispatch: dispatch,
    request_name: 'SPECIALISTORDER_LIST',
    request_api: `${url}/gene/tdoctororder/list/${query.userId}`,
    request_param: "",
    request_type: 'GET'
  })
}

export const geneorderdetail = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'ORDER_DETAIL',
    request_api: `${url}/gene/geneorder/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}

export const tdoctorgeneorderdetail = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'TDOCTORORDER_DETAIL',
    request_api: `${url}/gene/tdoctororder/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const refundPrice = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'REFUNDPRICE_DETAIL',
    request_api: `${url}/gene/tdoctororder/refundPrice/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}
export const wxRefund = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'WXREFUND_DETAIL',
    request_api: `${url}/gene/tdoctororder/wxRefund/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}
/**
 * @description 确认订单 POST /api/gene/geneorder/saveOrder
 */
export const saveOrder = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SAVE_ORDER',
    request_api: `${url}/gene/geneorder/saveOrder`,
    request_param: query,
    request_type: 'POST'
  }, function ({ data }) {
    // api/gene/geneorder/isPay/{id}
    console.log("=======",{ data })
    console.log("=======",data)
    if(!data){
      return
    }
    if(query.order.orderMoney == 0){

      console.log("11111")
      if(data){
        axiosRequest({
          dispatch: dispatch,
          request_name: 'WX_PAY_NEW',
          request_api: `${url}/gene/geneorder/isPay/${data.id}`,
          request_param: "",
          request_type: 'GET'
        })
      }
    }else{
      console.log("22222")
      console.log(data)
    dispatch({
      type: 'WX_PAY',
      status: 'pending'
    })
    let body, amount, out_trade_no
    body = data.title || '基因套餐'
    amount = parseInt(query.order.orderMoney * 100)
    out_trade_no = data.id

    let trade_type = 'JSAPI'//交易类型
    let nonce_str = Math.random().toString(36).slice(2) //随机字符串
    let openid = sessionStorage.getItem('openId') || localStorage.getItem('openId') //用户openid 当JSAPI时必传递
    // let openid='o1SiC56E34qGifxdR1jqYMxFNUnI'
    let notify_url = `${url}/gene/geneorder/wxIsPay` //通知地址
    let sign_type = "MD5"
    let mch_id=sessionStorage.getItem('mchId')
    let mch_Key=sessionStorage.getItem('mchKey')
    let getIP = sessionStorage.getItem('getIp')
    let weChatParams = {
      appid:appId,
      body,
      mch_id,
      mch_Key,
      nonce_str,
      notify_url,
      openid,
      sign_type, 
      total_fee:amount,
      spbill_create_ip:getIP, 
      out_trade_no,
      trade_type
    }
    wxPay(weChatParams,function(callbackData){
      console.log('-------', callbackData)
      axios.post(`${url}/main/wxPay`, { wxPay: callbackData }).then(({ data }) => {
        var parseString = require('xml2js').parseString;
        var rexml = data.data
        parseString(rexml, function (err, result) {
          if (result.xml.return_code[0] == 'SUCCESS') {
            dispatch({
              type: 'WX_PAY_SUCCESS',
              data: result.xml.prepay_id[0],
              status: 'succ'
            });
          } else {
            dispatch({
              type: 'WX_PAY_FAILED',
              msg: result.xml.return_msg[0],
              status: 'failed',
            });
          }
        });
      })
      console.log('-------', callbackData)
    })
    }
    
    
  })
}
/**
 * @description 确认门诊订单 POST api/gene/tdoctororder
 */
export const tdoctororder = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'TDOCTORORDER_ORDER',
    request_api: 'http://jiyin-test.sagacityidea.cn/gene-api/api/gene/tdoctororder',
    request_param: query,
    request_type: 'POST'
  }, function ({ data }) {
    // api/gene/geneorder/isPay/{id}
    console.log("=======",{ data })
    console.log("=======",data)
    if(!data){
      return
    }
    // if(query.order.orderMoney == 0){
    //
    //   console.log("11111")
    //   if(data){
    //     axiosRequest({
    //       dispatch: dispatch,
    //       request_name: 'WX_PAY_NEW',
    //       request_api: `${url}/gene/geneorder/isPay/${data.id}`,
    //       request_param: "",
    //       request_type: 'GET'
    //     })
    //   }
    // }else{
      console.log("22222")
      console.log(data)
      dispatch({
        type: 'DOCTORWX_PAY',
        status: 'pending'
      })
      let body, amount, out_trade_no
      body = data.title || '门诊预约'
      amount = parseInt(query.price * 100)
      out_trade_no = data.id

      let trade_type = 'JSAPI'//交易类型
      let nonce_str = Math.random().toString(36).slice(2) //随机字符串
      let openid = sessionStorage.getItem('openId') || localStorage.getItem('openId') //用户openid 当JSAPI时必传递
      // let openid='o1SiC56E34qGifxdR1jqYMxFNUnI'
      let notify_url = `${url}/gene/tdoctororder/wxIsDoctorPayOrder` //通知地址
      let sign_type = "MD5"
      let mch_id=sessionStorage.getItem('mchId')
      let mch_Key=sessionStorage.getItem('mchKey')
      let getIP = sessionStorage.getItem('getIp')
      let weChatParams = {
        appid:appId,
        body,
        mch_id,
        mch_Key,
        nonce_str,
        notify_url,
        openid,
        sign_type,
        total_fee:amount,
        spbill_create_ip:getIP,
        out_trade_no,
        trade_type
      }
      doctorwxPay(weChatParams,function(callbackData){
        console.log('-------', callbackData)
        axios.post(`${url}/main/doctorwxPay`, { doctorwxPay: callbackData }).then(({ data }) => {
          var parseString = require('xml2js').parseString;
          var rexml = data.data
          parseString(rexml, function (err, result) {
            if (result.xml.return_code[0] == 'SUCCESS') {
              dispatch({
                type: 'DOCTORWX_PAY_SUCCESS',
                data: result.xml.prepay_id[0],
                status: 'succ'
              });
            } else {
              dispatch({
                type: 'DOCTORWX_PAY_FAILED',
                msg: result.xml.return_msg[0],
                status: 'failed',
              });
            }
          });
        })
        console.log('-------', callbackData)
      })
    // }


  })
}

/**
 * @description 医生收藏页
 * GET /api/collection/usercollection/page
 */
//  export const geneorderdetail = (query) => (dispatch) => {
//   axiosRequest({
//     dispatch:dispatch,
//     request_name:'SPARE_PHONE', 
//     request_api :`${url}/collection/usercollection/page`,
//     request_param :"",
//     request_type :'GET'
//   })
//  }

/**
 * 分享文章 
 * POST /api/news/pubrecommendnews/recommended
 * GET /api/demo/news/listByDoctorId/{doctorId}
 */

export const recommended = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'RECOMMEN',
    request_api: `${url}/news/pubrecommendnews/recommended`,
    request_param: query,
    request_type: 'POST'
  })
}
export const recommenListByPatient = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'RECOMMEN_LIST',
    request_api: `${url}/demo/news/listByDoctorId/${query.doctorId}`,
    request_param: "",
    request_type: 'GET'
  })
}

/**
 * 
 *  查询医院
 * GET /api/pub/pubhospital/page  
 */

export const getHosp = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_HOST',
    request_api: `${url}/pub/pubhospital/page?page=${query.page}&limit=${query.limit}&hospitalName=${query.hospitalName}`,
    request_param: "",
    request_type: 'GET'
  })
}


/**
 * @description 文件上传
 * POST /api/pub/pubfile/upload
 */
export const upload = (query) => (dispatch) => {
  var fileFormData = new FormData();
  fileFormData.append('file', query.file);
  axiosRequest({
    dispatch: dispatch,
    request_name: 'UPLOAD',
    request_api: `${url}/pub/pubfile/upload`,
    request_param: fileFormData,
    request_type: 'POST'
  })
}
export const saveDoctorIdImg = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'UPLOAD',
    request_api: `${url}/doctor/saveDoctorIdImg`,
    request_param: query,
    request_type: 'POST'
  })
}
/**
 * @description  获取ticket
 * GET /api/ticket
 */
export const ticket = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'TICKET',
    request_api: `${url}/ticket`,
    request_param: "",
    request_type: 'GET'
  }, function (data) {
    console.log('callback', data)
    let timestamp = Math.round(new Date().getTime() / 1000).toString();
    let nonceStr = Math.random().toString(36).substr(2)
    let urls = ''
    if (sessionStorage.getItem("init_url")) {
      urls = sessionStorage.getItem('init_url')
    } else {
      urls = window.location.href.split('#')[0]
    }
    var crypto = require("crypto");
    let signature = "jsapi_ticket=" + data.data.ticket + "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + urls
    let signatureNew = crypto.createHash('sha1').update(signature).digest('hex')
    window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signatureNew,// 必填，签名
      jsApiList: ['scanQRCode',
        'chooseWXPay',
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'previewImage',
        'hideMenuItems',
      ] // 必填，需要使用的JS接口列表
    });
  })
}

/**
 * 
 *根据医生获取绑定的志愿者 
 /api/doctor/getVolunteer/{doctorId}
 */
export const getVolunteer = (query) => (dispatch) => {
  if(query.isHengrui){
    axiosRequest({
      dispatch: dispatch,
      request_name: 'GET_VOLUNTEER',
      request_api: `${url}/doctor/getVolunteerByHengRui/${query.doctorId}`,
      request_param: "",
      request_type: 'GET'
    })
  }else{
    axiosRequest({
      dispatch: dispatch,
      request_name: 'GET_VOLUNTEER',
      request_api: `${url}/doctor/getVolunteer/${query.doctorId}`,
      request_param: "",
      request_type: 'GET'
    })
  }
  
}

/**
 * @description 纸质报告
 * POST /api/gene/geneorder/savePaper
 */
export const genepaperinvoice = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GENE_PAPER',
    request_api: `${url}/gene/geneorder/savePaper`,
    request_param: query,
    request_type: 'POST'
  })
}
/**
 * @description 获取订单检测报告图片 /api/gene/geneorder/getReport/{id}
 * 
 */
export const getReportUrl = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_ORDER_URL',
    request_api: `${url}/gene/geneorder/getReport/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}
/**
 * @description 优惠券相关
 * GET /api/gene/genecoupon/{code} 优惠券校验
 */
export const geneConpon = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GENE_COUPON',
    request_api: `${url}/gene/genecoupon/${query.code}`,
    request_param: "",
    request_type: 'GET'
  })
}

/**
 * 发票相关
 * POST /api/gene/geneinvoice  保存发票信息
 * GET /api/gene/geneinvoice/{id} 获取发票详情
 * GET /api/gene/geneorder/getInvoiceImg/{id} 查看发票图片
 * GET /api/gene/geneorder/getInvoicePdf/{id} 查看发票pdf
 */
export const getInvoiceImg = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_INVOIVCE_IMG',
    request_api: `${url}/gene/geneorder/getInvoiceImg/${query.orderId}`,
    request_param: "",
    request_type: 'GET'
  })
}


export const getInvoicePdf = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_INVOIVCE_PDF',
    request_api: `${url}/gene/geneorder/getInvoicePdf/${query.orderId}`,
    request_param: "",
    request_type: 'GET'
  })
}


export const geneinvoice = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GENEINVOICE',
    request_api: `${url}/gene/geneinvoice/save`,
    request_param: query,
    request_type: 'POST'
  })
}
export const geneinvoiceData = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GENEINVOICE_DATA',
    request_api: `${url}/gene/geneinvoice/${query.id}`,
    request_param: "",
    request_type: 'GET'
  })
}

export const updateeneinvoice = (query) => (dispatch) => {

  dispatch({
    type: 'GENEINVOICE',
    status: 'pending'
  })
  axios.post(`${url}/gene/geneinvoice/update`, query).then(({ data }) => {
    if (data.code == successCode) {
      dispatch({
        type: `GENEINVOICE_SUCCESS`,
        data: data.data,
        status: 'succ'
      })
    } else {
      dispatch({
        type: `GENEINVOICE_FAILED`,
        msg: data.msg,
        status: 'failed'
      })
    }
  })
}



// 保存openid bind/binduserwx//bind/{wxopenid}


//发送报告 /api/gene/geneorder/sendTheReport
export const sendTheReport = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'SEND_THE_REPORT',
    request_api: `${url}/gene/geneorder/sendTheReport`,
    request_param: query,
    request_type: 'POST'
  })
}


/**
 * 
 * 查看物流信息 GET /api/gene/geneorder/getExpressInfo/{orderId}
 */

export const getExpressInfo = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_EXPRESS_INFO',
    request_api: `${url}/gene/geneorder/getExpressInfo/${query.orderId}`,
    request_param: query,
    request_type: 'GET'
  })
}


/**
 * 
 * 查看报告物流信息 GET /api/gene/geneorder/getReportExpressInfo/{orderId}
 */

export const getReportExpressInfo = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_REPORTEXPRESS_INFO',
    request_api: `${url}/gene/geneorder/getReportExpressInfo/${query.orderId}`,
    request_param: query,
    request_type: 'GET'
  })
}



/**
 * 微信相关-微信支付
 */

export const wechatPay = (query) => (dispatch) => {
  dispatch({
    type: 'WX_PAY',
    status: 'pending'
  })
  wxPay(dispatch)
}




/**
 * @description
 * 聊天相关
 */
//监听新消息事件
//newMsgList 为新消息数组，结构为[webim.Msg]
//如果有新消息进来，更改消息数组，
let groupId = sessionStorage.getItem("chat_id")
let webim = window.webim
let selSess = null
export const onMsgNotify = (query) => (dispatch) => {
  var sess, newMsg;
  var newMsgList = query.msg
  //获取所有聊天会话

  for (var j in newMsgList) {//遍历新消息
    newMsg = newMsgList[j];
    if (newMsg.getSession().id() == sessionStorage.getItem("chat_id")) {// 为当前聊天对象的消息，selToID 为全局变量，表示当前正在进行的聊天 ID，当聊天类型为私聊时，该值为好友帐号，否则为群号。
      sess = newMsg.getSession();
      console.log("【消息】:", sess)
      console.log("【消息(newMsg)】:", newMsg)
    }
  }
}

// 获取未读群消息条数
export const getSessMap = (query) => (dispatch) => {
  var skey = `GROUP${groupId}`;    // 拼装 skey
  var sessMap = webim.MsgStore.sessMap();    // 获取 sessMap
  // console.log("【未读群消息】:",sessMap)
  // sessMap[skey].unread();
}

//获取群历史消息
export const getSessMapHistory = (query) => (dispatch) => {
  console.log("【历史消息】")
  dispatch({
    type: 'GET_SESS_MAP_HISTORY',
    status: 'pending'
  })
  getHistoryMsg(query, dispatch)

}




//发送消息
export const userOnSendMsg = (query) => (dispatch) => {
  dispatch({
    type: 'SEND_MSG',
    status: 'pending'
  })
  console.log("【selToID】：", query.selToID)
  onSendMsg(query.msgtosend, query.selToID, query.identifier, query.friendHeadUrl, query.identifierNick)
}

//发送图片
export const userOnSendMsgPic = (query) => (dispatch) => {
  dispatch({
    type: 'SEND_MSG_PIC',
    status: 'pending'
  })
  uploadPic(dispatch, query.selToID, query.file, query.friendHeadUrl, query.identifier, query.identifierNick)
}

//更新聊天img
export const setChatImg = (query) => (dispatch) => {
  dispatch({
    type: 'CHANT_IMG',
    data: query
  })
}
//退出
export const replaceLoginState = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'BD',
    request_api: `${url}/bind/binduserwx/stopBind/${sessionStorage.getItem('openId')}`,
    request_param: {},
    request_type: 'GET'
  })
  logout()
}


//获取省市区

export const getProvince = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_PRO',
    request_api: `${urlNoApi}pub/pubaddr/province`,
    request_param: query,
    request_type: 'GET'
  })
}

export const getCity = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_CITY',
    request_api: `${urlNoApi}pub/pubaddr/city/${query.id}`,
    request_param: query,
    request_type: 'GET'
  })
}

export const getArea = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_AREA',
    request_api: `${urlNoApi}pub/pubaddr/area/${query.id}`,
    request_param: query,
    request_type: 'GET'
  })
}

export const pubhospital = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'ADD_HOSP',
    request_api: `${urlNoApi}api/pub/pubhospital`,
    request_param: query,
    request_type: 'POST'
  })
}

//获取医生信息

export const getDoc = (query) => (dispatch) => {
  axiosRequest({
    dispatch: dispatch,
    request_name: 'GET_DOC_DETAIL',
    request_api: `${url}/doctor/information/${query.id}`,
    request_param: {},
    request_type: 'GET'
  })
}