// import { } from './../apis';

const initState = {
  status: '',
  auth: {},
  getOpenidState:'',
  openid:{},
  msg:'',
  getCodestate:"",
  user:{},
  loginState:'',
  serDoctorList:[],
  searchDoctorState:"",
  informationState:"",
  information:[],
  addDoctorState:'',
  sparePhoneState:'',
  getGenelistState:'',
  geneList:[],
  getGenelistSpecialistState:'',
  geneSpecialistList:[],
  mainListState:'',
  mainList:[],
  getListByPatient:'',
  listByPatient:[],
  geneDetailState:'',
  geneDetailSpecialistState:'',
  geneDetail:{},
  geneDetailSpecialist:{},
  saveOrderState:'',
  tdoctororderState:'',
  orderListState:'',
  orderList:[],
  pubHomeTipsState:'',
  homeTips:[],
  getOrderDetailState:'',
  orderDetail:{},
  uploadState:'',
  upload:{},
  geneParerState:'',
  getOrderUrlState:"",
  orderUrl:{},
  getNrePageState:"",
  newPage:[],
  getNewsInfoState:'',
  newsInfo:{},
  getHospState:'',
  hospList:[],
  getMyPatientState:'',
  myPatient:[],
  geneConponState:'',
  conpon:{},
  getMyDoctoeState:'',
  myDoctor:[],
  getDocImgState:'',
  docImg:{},
  saveGeneinvoiceState:'',
  shoucangState:'',
  isCollectState:'',
  isCollect:'',
  setting:{},
  getSetting:'',
  geneCompanyState:'',
  geneCompany:[],
  wxPay:{},
  wxPayState:'',
  doctorwxPay:{},
  doctorwxPayState:'',
  wxPayStateNew:'',
  doctorwxPayStateNew:'',
  isShouCangList:'',
  shouCangArr:[],
  shoucangPackState:'',
  shouCangArrList:[],
  searchTop:[],
  searchTopState:'',
  recommenState:'',
  recommen:[],
  recommenListState:'',
  recommenList:[],
  saveAppImgState:'',
  saveOrderCodeState:'',
  isUploadApplocationImgState:'',
  isUploadApplocationImg:{},
  getApplocationImg:{},
  getApplocationImgState:'',
  getGeneInvoiceState:'',
  geneInvoiveData:{},
  sendEmail:'',
  getVolunteer:'',
  volunteer:[],
  getExpressInfo:'',
  ExpressInfo:[],
  getReportExpressInfo:'',
  ReportExpressInfo:[],
  getIncoivce:'',
  pdfUrl:'',
  getIncoivceimg:'',
  imgUrl:'',
  bangDing:'',
  proList:[],
  getPro:'',
  cityList:[],
  getCity:'',
  areaList:[],
  getArea:'',
  addHosp:'',
  doc_reg_Detail:{},
  getDocDetail:'',
  mchId:'',
  mchKey:'',
  getIp:'',
  getOrderAndFormState:'',
  getOrderAndForm:{}
} 

export default function user (state = initState, action) {
  switch (action.type) {
    case 'GET_OPENID':
    case 'GET_OPENID_SUCCESS':
    case 'GET_OPENID_FAILED':
      return Object.assign({}, state, { getOpenidState: action.status,user:action.data || {}, openid: action.openiId || "", msg: action.msg || '' })
      case 'GET_GETID':
      case 'GET_GETIP_SUCCESS':
      case 'GET_GETIP_FAILED':
      return Object.assign({}, state, { getIpState: action.status,user:action.data || {}, getIp: action.getIp || "", msg: action.msg || '' })
      case 'GET_CODE':
    case 'GET_CODE_SUCCESS':
    case 'GET_CODE_FAILED':
      return Object.assign({}, state, { getCodestate: action.status,  msg: action.msg || '' })
    case 'LOGIN':
    case 'LOGIN_SUCCESS':
    case 'LOGIN_FAILED':
      return Object.assign({}, state, { loginState: action.status,user:action.data || {},  msg: action.msg || '' })
    case 'SAARCH_DOCTOR':
    case 'SAARCH_DOCTOR_SUCCESS':
    case 'SAARCH_DOCTOR_FAILED':
      return Object.assign({}, state, { searchDoctorState: action.status,serDoctorList:action.data||[],  msg: action.msg || '' })
    case 'INFORMATION':
    case 'INFORMATION_SUCCESS':
    case 'INFORMATION_FAILED':
          return Object.assign({}, state, { informationState: action.status,information:action.data||[],  msg: action.msg || '' })
    case 'ADD_CODTOR':
    case 'ADD_CODTOR_SUCCESS':
    case 'ADD_CODTOR_FAILED':
          return Object.assign({}, state, { addDoctorState: action.status,  msg: action.msg || '' })
    case 'SPARE_PHONE':
    case 'SPARE_PHONE_SUCCESS':
    case 'SPARE_PHONE_FAILED':
          return Object.assign({}, state, { sparePhoneState: action.status,  msg: action.msg || '' })
    case 'GET_GENEPACK':
    case 'GET_GENEPACK_SUCCESS':
    case 'GET_GENEPACK_FAILED':
          return Object.assign({}, state, { getGenelistState: action.status,geneList:action.data||[],  msg: action.msg || '' })
    case 'GET_GENEPACK_SPECIALIST':
    case 'GET_GENEPACK_SPECIALIST_SUCCESS':
    case 'GET_GENEPACK_SPECIALIST_FAILED':
      return Object.assign({}, state, { getGenelistSpecialistState: action.status,geneSpecialistList:action.data||[],  msg: action.msg || '' })
    case 'MAIN_LIST':
    case 'MAIN_LIST_SUCCESS':
    case 'MAIN_LIST_FAILED':
          return Object.assign({}, state, { mainListState: action.status,mainList:action.data||[],  msg: action.msg || '' })
    case 'LIST_BY_PATIENT':
    case 'LIST_BY_PATIENT_SUCCESS':
    case 'LIST_BY_PATIENT_FAILED':
          return Object.assign({}, state, { getListByPatient: action.status,listByPatient:action.data||[],  msg: action.msg || '' })
    case 'GENEPACK':
    case 'GENEPACK_SUCCESS':
    case 'GENEPACK_FAILED':
          return Object.assign({}, state, { geneDetailState: action.status,geneDetail:action.data||{},  msg: action.msg || '' })
    case 'GENEPACK_SPECIALIST':
    case 'GENEPACK_SPECIALIST_SUCCESS':
    case 'GENEPACK_SPECIALIST_FAILED':
      return Object.assign({}, state, { geneDetailSpecialistState: action.status,geneDetailSpecialist:action.data||{},  msg: action.msg || '' })
    case 'TDOCTORORDER_ORDER':
    case 'TDOCTORORDER_ORDER_SUCCESS':
    case 'TDOCTORORDER_ORDER_FAILED':
          return Object.assign({}, state, { tdoctororderState: action.status,  msg: action.msg || '' })
    case 'SAVE_ORDER':
    case 'SAVE_ORDER_SUCCESS':
    case 'SAVE_ORDER_FAILED':
      return Object.assign({}, state, { saveOrderState: action.status,  msg: action.msg || '' })
    case 'ORDER_LIST':
    case 'ORDER_LIST_SUCCESS':
    case 'ORDER_LIST_FAILED':
          return Object.assign({}, state, { orderListState: action.status,orderList:action.data||[],  msg: action.msg || '' })
    case 'PUB_HOME_TIPS':
    case 'PUB_HOME_TIPS_SUCCESS':
    case 'PUB_HOME_TIPS_FAILED':
          return Object.assign({}, state, { pubHomeTipsState: action.status,homeTips:action.data||[],  msg: action.msg || '' })
    case 'ORDER_DETAIL':
    case 'ORDER_DETAIL_SUCCESS':
    case 'ORDER_DETAIL_FAILED':
          return Object.assign({}, state, { getOrderDetailState: action.status,orderDetail:action.data||{},  msg: action.msg || '' })
    case 'UPLOAD':
    case 'UPLOAD_SUCCESS':
    case 'UPLOAD_FAILED':
          return Object.assign({}, state, { uploadState: action.status,upload:action.data||{},  msg: action.msg || '' })
    case 'GENE_PAPER':
    case 'GENE_PAPER_SUCCESS':
    case 'GENE_PAPER_FAILED':
          return Object.assign({}, state, { geneParerState: action.status,  msg: action.msg || '' })
    case 'GET_ORDER_URL':
    case 'GET_ORDER_URL_SUCCESS':
    case 'GET_ORDER_URL_FAILED':
          return Object.assign({}, state, { getOrderUrlState: action.status, orderUrl:action.data||{}, msg: action.msg || '' })
    case 'NEWS_PAGE':
    case 'NEWS_PAGE_SUCCESS':
    case 'NEWS_PAGE_FAILED':
          return Object.assign({}, state, { getNrePageState: action.status, newPage:action.data||[], msg: action.msg || '' })
    case 'NEWS_INFO':
    case 'NEWS_INFO_SUCCESS':
    case 'NEWS_INFO_FAILED':
          return Object.assign({}, state, { getNewsInfoState: action.status, newsInfo:action.data||{}, msg: action.msg || '' })
    case 'GET_HOST':
    case 'GET_HOST_SUCCESS':
    case 'GET_HOST_FAILED':
          return Object.assign({}, state, { getHospState: action.status, hospList:action.data||[], msg: action.msg || '' })
    case 'MY_PATient':
    case 'MY_PATient_SUCCESS':
    case 'MY_PATient_FAILED':
          return Object.assign({}, state, { getMyPatientState: action.status, myPatient:action.data||[], msg: action.msg || '' })
    case 'GENE_COUPON':
    case 'GENE_COUPON_SUCCESS':
    case 'GENE_COUPON_FAILED':
          return Object.assign({}, state, { geneConponState: action.status, conpon:action.data||{}, msg: action.msg || '' })
    case 'MEY_DOCTOR':
    case 'MEY_DOCTOR_SUCCESS':
    case 'MEY_DOCTOR_FAILED':
          return Object.assign({}, state, { getMyDoctoeState: action.status, myDoctor:action.data||[], msg: action.msg || '' }) 
    case 'GET_DOC_IMG':
    case 'GET_DOC_IMG_SUCCESS':
    case 'GET_DOC_IMG_FAILED':
          return Object.assign({}, state, { getDocImgState: action.status, docImg:action.data||{}, msg: action.msg || '' })
    case 'GENEINVOICE':
    case 'GENEINVOICE_SUCCESS':
    case 'GENEINVOICE_FAILED':
          return Object.assign({}, state, { saveGeneinvoiceState: action.status, msg: action.msg || '' })
    case 'SHOU_CANG':
    case 'SHOU_CANG_SUCCESS':
    case 'SHOU_CANG_FAILED':
          return Object.assign({}, state, { shoucangState: action.status, msg: action.msg || '' })
    case 'IS_COLLECT':
    case 'IS_COLLECT_SUCCESS':
    case 'IS_COLLECT_FAILED':
          return Object.assign({}, state, { isCollectState: action.status,isCollect:action.data, msg: action.msg || '' })
    case 'SETTING':
    case 'SETTING_SUCCESS':
    case 'SETTING_FAILED':
          return Object.assign({}, state, { getSetting: action.status,setting:action.data||{}, msg: action.msg || '' })
    case 'GENE_COMPANY':
    case 'GENE_COMPANY_SUCCESS':
    case 'GENE_COMPANY_FAILED':
          return Object.assign({}, state, { geneCompanyState: action.status,geneCompany:action.data, msg: action.msg || '' })
    case 'GENE_GENEORDERANDFORM':
    case 'GENE_GENEORDERANDFORM_SUCCESS':
    case 'GENE_GENEORDERANDFORM_FAILED':
      return Object.assign({}, state, { getOrderAndFormState: action.status,getOrderAndForm:action.data, msg: action.msg || '' })
    case 'WX_PAY':
    case 'WX_PAY_SUCCESS':
    case 'WX_PAY_FAILED':
          return Object.assign({}, state, { wxPayState: action.status,wxPay:action.data, msg: action.msg || '' })
    case 'DOCTORWX_PAY':
    case 'DOCTORWX_PAY_SUCCESS':
    case 'DOCTORWX_PAY_FAILED':
      return Object.assign({}, state, { doctorwxPayState: action.status,doctorwxPay:action.data, msg: action.msg || '' })
    case 'WX_PAY_NEW':
    case 'WX_PAY_NEW_SUCCESS':
    case 'WX_PAY_NEW_FAILED':
          return Object.assign({}, state, { wxPayStateNew: action.status,msg: action.msg || '' })
    case 'DOCTORWX_PAY_NEW':
    case 'DOCTORWX_PAY_NEW_SUCCESS':
    case 'DOCTORWX_PAY_NEW_FAILED':
      return Object.assign({}, state, { doctorwxPayStateNew: action.status,msg: action.msg || '' })
    case 'SHOU_CANG_LIST':
    case 'SHOU_CANG_LIST_SUCCESS':
    case 'SHOU_CANG_LIST_FAILED':
          return Object.assign({}, state, { isShouCangList: action.status,shouCangArr:action.data||[], msg: action.msg || '' })
    case 'SHOU_CANG_PACK':
    case 'SHOU_CANG_PACK_SUCCESS':
    case 'SHOU_CANG_PACK_FAILED':
          return Object.assign({}, state, { shoucangPackState: action.status,shouCangArrList:action.data||[], msg: action.msg || '' })
    case 'SEARCH_IS_TOP':
    case 'SEARCH_IS_TOP_SUCCESS':
    case 'SEARCH_IS_TOP_FAILED':
          return Object.assign({}, state, {searchTopState: action.status, searchTop:action.data||[], msg: action.msg || '' })
    case 'RECOMMEN':
    case 'RECOMMEN_SUCCESS':
    case 'RECOMMEN_FAILED':
          return Object.assign({}, state, {recommenState: action.status, recommen:action.data||[], msg: action.msg || '' })
    case 'RECOMMEN_LIST':
    case 'RECOMMEN_LIST_SUCCESS':
    case 'RECOMMEN_LIST_FAILED':
          return Object.assign({}, state, {recommenListState: action.status, recommenList:action.data||[], msg: action.msg || '' })
    case 'SAVE_APP_IMG':
    case 'SAVE_APP_IMG_SUCCESS':
    case 'SAVE_APP_IMG_FAILED':
          return Object.assign({}, state, {saveAppImgState: action.status,msg: action.msg || '' })
    case 'SAVE_ORDER_CODE':
    case 'SAVE_ORDER_CODE_SUCCESS':
    case 'SAVE_ORDER_CODE_FAILED':
          return Object.assign({}, state, {saveOrderCodeState: action.status,msg: action.msg || '' })
    case 'IS_UPLOAD_APPLICATION_IMG':
    case 'IS_UPLOAD_APPLICATION_IMG_SUCCESS':
    case 'IS_UPLOAD_APPLICATION_IMG_FAILED':
          return Object.assign({}, state, {isUploadApplocationImgState: action.status,isUploadApplocationImg:action.data,msg: action.msg || '' })
    case 'GET_APPLICATION_IMG':
    case 'GET_APPLICATION_IMG_SUCCESS':
    case 'GET_APPLICATION_IMG_FAILED':
          return Object.assign({}, state, {getApplocationImgState: action.status,getApplocationImg:action.data||{},msg: action.msg || '' })
    case 'GENEINVOICE_DATA':
    case 'GENEINVOICE_DATA_SUCCESS':
    case 'GENEINVOICE_DATA_FAILED':
          return Object.assign({}, state, {getGeneInvoiceState: action.status,geneInvoiveData:action.data||{},msg: action.msg || '' })
    case 'SEND_THE_REPORT':
    case 'SEND_THE_REPORT_SUCCESS':
    case 'SEND_THE_REPORT_FAILED':
          return Object.assign({}, state, {sendEmail: action.status,msg: action.msg || '' })
    case 'GET_VOLUNTEER':
    case 'GET_VOLUNTEER_SUCCESS':
    case 'GET_VOLUNTEER_FAILED':
          return Object.assign({}, state, {getVolunteer: action.status,volunteer:action.data||[],msg: action.msg || '' })
    case 'GET_EXPRESS_INFO':
    case 'GET_EXPRESS_INFO_SUCCESS':
    case 'GET_EXPRESS_INFO_FAILED':
          return Object.assign({}, state, {getExpressInfo: action.status,ExpressInfo:action.data||{},msg: action.msg || '' })
    case 'GET_REPORTEXPRESS_INFO':
    case 'GET_REPORTEXPRESS_INFO_SUCCESS':
    case 'GET_REPORTEXPRESS_INFO_FAILED':
          return Object.assign({}, state, {getReportExpressInfo: action.status,ReportExpressInfo:action.data||{},msg: action.msg || '' })      
    case 'GET_INVOIVCE_PDF':
    case 'GET_INVOIVCE_PDF_SUCCESS':
    case 'GET_INVOIVCE_PDF_FAILED':
          return Object.assign({}, state, {getIncoivce: action.status,pdfUrl:action.data,msg: action.msg || '' })
    case 'GET_INVOIVCE_IMG':
    case 'GET_INVOIVCE_IMG_SUCCESS':
    case 'GET_INVOIVCE_IMG_FAILED':
          return Object.assign({}, state, {getIncoivceimg: action.status,imgUrl:action.data,msg: action.msg || '' })
    case 'BD':
    case 'BD_SUCCESS':
    case 'BD_FAILED':
          return Object.assign({}, state, {bangDing: action.status,msg: action.msg || '' })
    case 'GET_PRO':
    case 'GET_PRO_SUCCESS':
    case 'GET_PRO_FAILED':
          return Object.assign({}, state, {getPro: action.status,proList:action.data||[],msg: action.msg || '' })
    case 'GET_CITY':
    case 'GET_CITY_SUCCESS':
    case 'GET_CITY_FAILED':
          return Object.assign({}, state, {getCity: action.status,cityList:action.data||[],msg: action.msg || '' })
    case 'GET_AREA':
    case 'GET_AREA_SUCCESS':
    case 'GET_AREA_FAILED':
          return Object.assign({}, state, {getArea: action.status,areaList:action.data||[],msg: action.msg || '' })
    case 'ADD_HOSP':
    case 'ADD_HOSP_SUCCESS':
    case 'ADD_HOSP_FAILED':
          return Object.assign({}, state, {addHosp: action.status,msg: action.msg || '' })
    case 'GET_DOC_DETAIL':
    case 'GET_DOC_DETAIL_SUCCESS':
    case 'GET_DOC_DETAIL_FAILED':
          return Object.assign({}, state, {getDocDetail: action.status,doc_reg_Detail: action.data||{},msg: action.msg || '' })
    default:
      return state;
  }
}
