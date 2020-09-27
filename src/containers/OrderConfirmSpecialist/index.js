import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {CITY_DATA} from "../../stores/cityData";
import { Form, Icon,Radio,Input,Checkbox, Row, Col} from 'antd';
import { Drawer, Toast, ActivityIndicator,Picker,Button,DatePicker,List,TextareaItem } from 'antd-mobile';
import GButton from '../../components/GButton';
import GoodsListtwo from '../../components/GoodsListtwo';
import GoodsListSpecialist from '../../components/GoodsListSpecialist';
import {HOSP_NUMBER} from "../../actions/config";
import selectYes from '../../sources/yes.png'
import Rinput from '../../components/RegInput'
import Rinputp from '../../components/RegInputPicker'
import Rinputt from '../../components/RegTextarea'
import RinputDoc from '../../components/RegInputDoc'
import './index.scss';
import * as actions from './../../actions';
import SearchBar from '../../components/SearchBar'
import SelectDoctorList from '../../components/SelectDoctorList'
import ceshi from '../../sources/ceshi.jpeg'
import 'antd-mobile/dist/antd-mobile.css';
import {appId} from './../../actions/config';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {WXKEY} from './../../actions/config';
const FormItem = Form.Item;
// let WXKEY=sessionStorage.getItem('mchKey');

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.height = 0
    this.state = {
      //门诊
      patientName:'',
      patientMobile:'',
      idNum:'',//身份证号
      sex:"1", //患者性别
      localDoctorName:'', //本地医生姓名
      localDoctorMobile:'',  //本地医生电话
      localDoctorEmail:'',//本地医生邮箱
      localDoctorHospId:'',  //本地医生医院ID
      localDoctorHospital:'', //本地医生医院


      checked: false,//多选初始化
      stepbnt:1,//拆分页面
      volunteerList:[],
      volunteer:[],//志愿者列表
      isUse:false,//是否使用优惠券
      open: false,
      searchValue: "",
      serDoctorList: [],
      animating: false,
      text: '',
      doctorId: '',
      doctorName: '',

      price:'',//付款金额



      doctor:'',

      birthNum:'',

      hospList: [],
      hospId:'',


      extra:"",
      id:"",  //医院id
      email:"",
      remark:"",

      form:{
        samplingTime:"",//取样时间
        Birthday: "", //出生日期
        // samplingTime:localStorage.getItem('samplingTime')?this.formatTime(localStorage.getItem('samplingTime')).replace(/-/g, '/'):'',//取样时间
        // Birthday: localStorage.getItem('Birthday')?this.formatTime(localStorage.getItem('Birthday')).replace(/-/g, '/'):'', //出生日期
        hzEmergency: "",//紧急联系电话
        hzGender: "1",//性别
        hzHomeAddr: "",
        userMail: "",
        username: "",

        localDoctorHospital:'',
        localDoctorHospId:'',
        ysHospital: "",
        ysHospitalName: '',
        ysProvince: "",
        diagnosticTime:"",
        department:'',
        dpname:'',

        hzProvince:"",
        hzCity:"",
        hzRegion:"",


        extra:"",
    },

  }
    this.getSign = this.getSign.bind(this)
  }
  componentWillReceiveProps(nextprops) {
    if (this.props.getHospState != nextprops.getHospState && nextprops.getHospState == 'succ') {
      this.setState({
          animating: false,
          hospList: nextprops.hospList.list
      })

  }
    if (this.props.searchDoctorState != nextprops.searchDoctorState && nextprops.searchDoctorState == 'succ') {
      this.setState({
        animating: false,
        serDoctorList: nextprops.serDoctorList
      })

    }
    if (this.props.searchDoctorState != nextprops.searchDoctorState && nextprops.searchDoctorState == 'failed') {
      this.setState({
        animating: false
      })
      Toast.fail(nextprops.msg, 2)
    }
    if(this.props.addHosp!=nextprops.addHosp&&nextprops.addHosp=='succ'){
      this.setState({
          animating: false,
          open:false
      })
      Toast.success('您的医院信息已添加', 5)
  }
  if(this.props.addHosp!=nextprops.addHosp&&nextprops.addHosp=='failed'){
      this.setState({
          animating: false
      })
      Toast.fail(nextprops.msg, 2)
  }

    if(this.props.loginState!=nextprops.loginState&&nextprops.loginState=='succ'){
      let user = nextprops.user
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端



      if(user.sparephone){
          let sparephoneArr = []
          user.sparephone.map((item)=>{
              sparephoneArr.push(item.phone)
          })
          this.setState({
              sparePhones:sparephoneArr
          })
      }
  }

    //
    console.log(this.props.tdoctororderState)
    console.log(nextprops.tdoctororderState)
    if (this.props.tdoctororderState != nextprops.tdoctororderState && nextprops.tdoctororderState == 'succ') {
      this.setState({
        animating: false
      })
      Toast.success('提交成功，正在打开微信支付', 2)
      // this.props.history.goBack()
    }
    if (this.props.tdoctororderState != nextprops.tdoctororderState && nextprops.tdoctororderState == 'failed') {
      this.setState({
        animating: false
      })
      Toast.fail(nextprops.msg, 2)
    }
    // if(this.props.geneConponState!=nextprops.geneConponState&&nextprops.geneConponState=='succ'){
    //     this.setState({
    //         isUse:true,
    //         animating:false,
    //         conponPrice:this.state.price*(nextprops.conpon.coupon/100)
    //     })
    //     console.log("【优惠券参数】",this.state.price,nextprops.conpon.coupon/100,)
    //     Toast.success("使用成功，折扣价："+this.state.price*(nextprops.conpon.coupon/100), 2)
    // }
    // if(this.props.geneConponState!=nextprops.geneConponState&&nextprops.geneConponState=='failed'){
    //     this.setState({
    //         animating:false
    //     })
    //     Toast.fail(nextprops.msg, 2)
    // }
    if(this.props.doctorwxPayStateNew != nextprops.doctorwxPayStateNew &&nextprops.doctorwxPayStateNew=='succ'){
      this.props.history.push('/orderListSpecialist')
      Toast.success('支付成功',3)
    }
    if(this.props.doctorwxPayStateNew != nextprops.doctorwxPayStateNew &&nextprops.doctorwxPayStateNew=='failed'){
      this.setState({
        animating: false
      })
      Toast.fail(nextprops.msg,3)
      console.log(nextprops.msg)
    }
    if(this.props.doctorwxPayState!=nextprops.doctorwxPayState&&nextprops.doctorwxPayState=='succ'){
      let _this = this
      window.wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        let nonceStr = Math.random().toString(36).slice(2)
        let pack ="prepay_id="+nextprops.doctorwxPay
        console.log(pack)
        let signType ='MD5'
        let timeStamp = new Date().getTime()
        let params = {
          appId,
          nonceStr,
          package:pack,
          signType,
          timeStamp
        }
        let paySign = _this.getSign(params)
        // alert(paySign)
        console.log(paySign)

        window.wx.chooseWXPay({
          timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
          package: pack, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign, // 支付签名 appId,  nonceStr,package,signType,  timeStamp.
          success: function (res) {
            // 支付成功后的回调函数
            _this.props.history.push('/orderListSpecialist')
            Toast.success('支付成功',3)
          }
        });
      });
    }
    // if (this.props.saveOrderState != nextprops.saveOrderState && nextprops.saveOrderState == 'succ') {
    //   this.setState({
    //     animating: false
    //   })
    //   Toast.success('提交成功，正在打开微信支付', 2)
    //   // this.props.history.goBack()
    // }
    // if (this.props.saveOrderState != nextprops.saveOrderState && nextprops.saveOrderState == 'failed') {
    //   this.setState({
    //     animating: false
    //   })
    //   Toast.fail(nextprops.msg, 2)
    // }
    //
    // if(this.props.wxPayStateNew != nextprops.wxPayStateNew &&nextprops.wxPayStateNew=='succ'){
    //   this.props.history.push('/orderList')
    //   Toast.success('支付成功',3)
    // }
    // if(this.props.wxPayStateNew != nextprops.wxPayStateNew &&nextprops.wxPayStateNew=='failed'){
    //   this.setState({
    //     animating: false
    //   })
    //   Toast.fail(nextprops.msg,3)
    // }
    // if(this.props.wxPayState!=nextprops.wxPayState&&nextprops.wxPayState=='succ'){
    //   let _this = this
    //   window.wx.ready(function(){
    //     // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //     let nonceStr = Math.random().toString(36).slice(2)
    //     let pack ="prepay_id="+nextprops.wxPay
    //     console.log(pack)
    //     let signType ='MD5'
    //     let timeStamp = new Date().getTime()
    //     let params = {
    //       appId,
    //       nonceStr,
    //       package:pack,
    //       signType,
    //       timeStamp
    //     }
    //     let paySign = _this.getSign(params)
    //     console.log(paySign)
    //
    //       window.wx.chooseWXPay({
    //         timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    //         nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
    //         package: pack, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    //         signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    //         paySign: paySign, // 支付签名 appId,  nonceStr,package,signType,  timeStamp.
    //         success: function (res) {
    //         // 支付成功后的回调函数
    //         _this.props.history.push('/orderList')
    //            Toast.success('支付成功',3)
    //         }
    //       });
    //   });
    // }

  }
  componentWillMount() {
    this.height = window.screen.height;
    if(this.props.geneDetail.code=='003' ||this.props.geneDetail.code=='005' ||this.props.geneDetail.code=='006'){

        this.setState({
          displaycode: 'none',
        });

    }


    document.title = '预约申请'
    const { match, actions } = this.props;
    const { params: { packageId,openId } } = match;

    sessionStorage.removeItem('drug');
    if(openId===localStorage.getItem('openId')){
      // this.setState({
      //   //doctor:this.localStorage.getItem('doctor')
      //   this.state.doctor
      // })



    }

    actions.findForPids({
      pid:[HOSP_NUMBER]
   })
   actions.getProvince({})
        if (localStorage.getItem('token')) {
            this.getUserInfo()

  }
    // if (!this.props.geneDetail.id) {
    //   this.props.history.push(`/detail/${packageId}`)
    // }
    actions.myDoctor()
    this.setState({
      price: this.props.geneDetail.price,
      conponPrice:this.props.geneDetail.price
    })
  //   let newArr = []
  //       let _this = this
  //       CITY_DATA.forEach((province,index) => {
  //           newArr.push({
  //               key:{index},
  //               label: province.name,
  //               value: province.name,
  //               children: _this.getCity(province.sons)
  //           })
  //       })
  //   this.setState({
  //     cityListqy:newArr,
  //     cityListbill:newArr,
  //     cityListlakuai:newArr
  // })
  window.wx.ready(function(){
    window.wx.hideMenuItems({
      menuList: ['menuItem:share:appMessage','menuItem:share:timeline','menuItem:favorite','menuItem:share:QZone','menuItem:openWithSafari','menuItem:copyUrl']
    });
  });
  }
  componentDidMount() {

  }

  phone(phone) {
    let phoneText = /^1[123456789]\d{9}$/
    if ((phoneText.test(phone))) {
      return { result: true }
    } else {
      return { result: false, msg: '手机号格式错误' }
    }
  }
  //获取md5签名
  getSign(params){
    let WXKEY=sessionStorage.getItem('mchKey');
    let string = ""
    for(let key in params){
      if(key=='appId'){
        string+= key+"="+params[key]
      }else{
        string+="&"+key+"="+params[key]
      }
    }
    string += `&key=${WXKEY}`
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');
    md5.update(string);
    let str = md5.digest('hex');
    console.log('WXKEY',WXKEY);
    return str.toUpperCase()
}
  goBack() {
    this.props.history.goBack()
  }
  goBackH = () => {
    this.setState({
        open:false,
        showAddHosp:false
    })
}
  getUserInfo () {
    const { actions } = this.props
    actions.userInfo({})
  }

  rules() {
    if (!this.state.patientName) {
      Toast.fail('请输入患者姓名', 2)
      return false
    }
    // if (!this.state.form.Birthday && !localStorage.getItem('Birthday')) {
    //   Toast.fail('请选择出生日期', 2)
    //   return false
    // }
    if (!this.state.sex && !localStorage.getItem('sex')) {
      Toast.fail('请选择性别', 2)
      return false
    }
    if (!this.checkIdNo(this.state.idNum).result) {
      Toast.fail('身份证输入有误请重新输入', 2)
      return false
    }
    if (!this.state.form.ysHospitalName && !this.state.form.ysHospital) {
      Toast.fail('请输入医院', 2)
      return false
    }
    if (!this.state.department) {
      Toast.fail('请输入科室', 2)
      return false
    }
    if (!this.state.localDoctorName) {
      Toast.fail('请输入医生姓名', 2)
      return false
    }
    if (!this.isPoneAvailable(this.state.patientMobile).result && !this.isPoneAvailable(sessionStorage.getItem('patientMobile')).result) {
      Toast.fail('请正确输入11位患者电话', 2)
      return false
    }

    if (!this.isPoneAvailable(this.state.localDoctorMobile).result && !this.isPoneAvailable(sessionStorage.getItem('localDoctorMobile')).result) {
        Toast.fail('请正确输入11位本地医生电话', 2)
        return false
      }
    return true
  }


  checkIdNo = (value) => {
    const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const q = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/;
    if (value && value.length===18 && p.test(value)) {
      const factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
      const parity = [ '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2' ];
      const code = value.substring(17);
      let sum = 0;
      for(let i=0; i < 17; i+=1) {
        sum += value[i] * factor[i];
      }
      if(parity[sum % 11] === code.toUpperCase()) {
        return  { result: true };
      }
    }
    if (value && value.length===15 && q.test(value)) {
      return  { result: true };
    }
    return  { result: false };
  };
  isPoneAvailable = (value) => {
    var myreg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(value)) {
        return {result:false};
    } else {
        return {result:true};
    }
};
 isChinese = (value) => {
     if(!value){
         return {result:false};
     }
         var myregg= /^[^\d.]+$/;
         if (!myregg.test(value)) {
             return {result:false};
         } else {
             return {result:true};
         }


};
  analyzeIDCard = (IDCard) => {
    let sexAndAge = {};
    //获取用户身份证号码
    let userCard = IDCard;
    //如果身份证号码为undefind则返回空
    if(!userCard){
      return sexAndAge;
    }
    //获取性别
    if(parseInt(userCard.substr(16,1)) % 2 == 1){
      sexAndAge.sex = '1（男）'
    }else{
      sexAndAge.sex = '0（女）'
    }
    //获取出生年月日
    //userCard.substring(6,10) + "-" + userCard.substring(10,12) + "-" + userCard.substring(12,14);
    let yearBirth = userCard.substring(6,10);
    let monthBirth = userCard.substring(10,12);
    let dayBirth = userCard.substring(12,14);
    //获取当前年月日并计算年龄
    let myDate = new Date();
    let monthNow = myDate.getMonth() + 1;
    let dayNow = myDate.getDay();
    let age = myDate.getFullYear() - yearBirth;
    if(monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)){
      age--;
    }
    //得到年龄
    sexAndAge.age = age;
    //返回性别和年龄
    return sexAndAge;
  };
  StringToDate =(str) =>{
    let strDate = str.split(" ");

    let strDatepart = strDate[0].split("-");

    var dtDate = new Date(strDatepart[0],strDatepart[1]-1,strDatepart[2]);

    return dtDate;
  };
    //  '若因患者自身原因导致咨询终止\n' +
    //                 '平台会根据进度扣除相应的费用\n' +
    //                 '（1）预约下单后未上传资料需扣除500元；\n' +
    //                 '（2）已上传资料专家未确认咨询时间，需扣除1000元；\n' +
    //                 '（2）专家已确认咨询时间，需扣除总咨询费用的50%。'
  goNext() {
      alert(
          '温馨提示:\n'+
          '若因患者自身原因导致咨询终止\n'+
          '平台会根据进度扣除相应的费用\n'+
          '（1）预约下单后未上传资料需扣除500元；\n'+
          '（2）已上传资料专家未确认咨询时间，需扣除1000元；\n'+
          '（3）专家已确认咨询时间，需扣除总咨询费用的50%。'
      )
    const { actions } = this.props
    if (!this.rules()) {
      return
    }
    actions.tdoctororder({

      price:localStorage.getItem('price'),
      userId:sessionStorage.getItem('userId'),
      doctorId:sessionStorage.getItem('packageId'),
      patientName:this.state.patientName,
      patientMobile:this.state.patientMobile,
      idNum:this.state.idNum,
      sex:this.state.sex,
      localDoctorName:this.state.localDoctorName,
      localDoctorMobile:this.state.localDoctorMobile,
      localDoctorEmail:this.state.localDoctorEmail,
      localDoctorHospId:this.state.form.ysHospital,
      localDoctorHospital:this.state.form.ysHospitalName,          //'医院名'
      department:this.state.form.department[0],
    })
    this.setState({
      animating: true,
      text: '正在提交...'
    })


      // actions.saveOrder({
      //   form:{
      //     email:this.state.email,
      //     packageName:this.props.geneDetail.title,       //'套餐名称'
      //     packageCode:this.props.geneDetail.code,      //'套餐代码'
      //     name:this.state.name,              //'受检人姓名'
      //     gender:this.state.gender,            //'性别0女，1男'
      //     birthday:this.formatTime(this.StringToDate(this.state.idNum.substring(6,10) + "-" + this.state.idNum.substring(10,12) + "-" + this.state.idNum.substring(12,14))),
      //     //birthday:this.state.idNum.substring(6,10) + "-" + this.state.idNum.substring(10,12) + "-" + this.state.idNum.substring(12,14),
      //     //birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(localStorage.getItem('Birthday')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('Birthday')):''),
      //     //birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(this.getCookie('Birthday'))?this.formatTime(this.getCookie('Birthday')):''),          //'年龄'
      //     idNum:this.state.idNum,             //'身份证号'
      //     phone:this.state.phone,             //'电话'
      //     doctor:this.state.doctor,            //'医生姓名'
      //     hospital:this.state.form.ysHospitalName,          //'医院名'
      //     //department:JSON.stringify(this.state.form.department),
      //     department:this.state.form.department[0],        //'科室'
      //     // sampleType:this.state.valuetype,
      //     sampleType:this.state.sampleType,
      //     //bloodNum:this.state.bloodNum,          //'血液数量（管）'
      //     sampleNum:this.state.sampleNum,
      //     sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.sampleTime):(this.formatTime(localStorage.getItem('sampleTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('sampleTime')):''),
      //     // bloodSampleTime:this.formatTime(this.state.form.bloodSampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.bloodSampleTime):(this.formatTime(this.getCookie('bloodSampleTime')).indexOf('0NaN')=='-1'?this.formatTime(this.getCookie('bloodSampleTime')):''),
      //     //bloodSampleTime:this.formatTime(this.state.form.bloodSampleTime) ?this.formatTime(this.state.form.bloodSampleTime):this.formatTime(this.getCookie('bloodSampleTime')),   //'血液采样时间'
      //     // sampleTime:this.state.form.sampleTime==''?this.formatTime(this.state.form.sampleTime):'',        //'组织采样时间'
      //     // sample:this.state.sample,            //'0：白；1：蜡块；2：蜡卷；3：胸腹水；4：其他'
      //     // sampleNum:this.state.sampleNum,         //'样本数量'
      //     // addressee:this.state.addressee,         //'收件人'
      //     // addressPhone:this.state.addressPhone,      // '收件人电话'
      //     // address:this.state.address,           //'收件人地址'
      //     // tissueSampleType:this.state.tissueSampleType,
      //     diagnosticCancer:this.state.diagnosticCancer?this.state.diagnosticCancer:localStorage.getItem('diagnosticCancer'),  //'0：肺癌；1：肺腺癌；2：肺鳞癌；3：肺大细胞癌；4：腺鳞混合型；5：其他'
      //     otherCancerName:this.state.otherCancerName,
      //     targetDrugName:this.state.targetDrugName,
      //     remark:this.state.remark,
      //     diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):'',
      //     //diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):'',   //'其他癌名称'
      //     //diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):(this.formatTime(localStorage.getItem('diagnosticTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('diagnosticTime')):''),
      //     //diagnosticTime:toString(this.formatTime(this.state.form.diagnosticTime)).indexOf('NaN-0NaN-0NaN 0NaN:0NaN:0NaN')==='-1'?'':this.formatTime(this.state.form.diagnosticTime) ,    //'确诊时间'    //'确诊时间'
      //     drug:(this.state.drug).toString(),
      //     //drug:this.getCookie('drug')?this.getCookie('drug'):this.state.drug,           //'0：化疗；1：放疗；2：靶向治疗；3：免疫治疗‘
      //     otherDrugName:this.state.otherDrugName,     //'其他药名称'
      //     initial:this.state.valuechuzhi,           //'是否是初始患者0：否；1：是'
      //     resistance:this.state.resistance,         //'1：是，有影像检测证明疾病进展；2：是，仅为经验判断；3：否'
      //     paperUser:this.state.displaypaper=='block'?this.state.paperUser:'',       //'纸质报告收件人',
      //     paperPhone:this.state.displaypaper=='block'?this.state.paperPhone:'',      //'纸质报告收件检点',
      //     paperAddr:this.state.displaypaper=='block'?((this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:''):'',
      //     //paperUser:this.state.paperUser,       //'纸质报告收件人',
      //     //paperPhone:this.state.paperPhone,      //'纸质报告收件检点',
      //
      //     //paperAddr:this.getCookie('addr3')?this.getCookie('addr3')this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr,    //'纸质报告接受地址',
      //     //paperAddr:localStorage.getItem('addr3')?localStorage.getItem('addr3')+this.state.paperAddr:localStorage.getItem('addr1')+this.state.paperAddr,    //'纸质报告接受地址',
      //     //paperAddr:this.state.displaypaper=='block'?((this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:''):'',
      //     samplingAddress:(this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail).indexOf('0NaN')=='-1'?this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail:'',    //'取样地址',
      //     samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
      //     //samplingTime:this.formatTime(this.state.form.samplingTime)?this.formatTime(this.state.form.samplingTime):this.formatTime(this.getCookie('bloodSampleTime')),    //'取样时间',
      //     samplingUser:this.state.samplingUser,      //'取样联系人',
      //     samplingPhone:this.state.samplingPhone,      //'取样电话',
      //     //samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
      //
      //     hospId:this.state.form.ysHospital,      //'医院名称',
      //     pickupStartTime:(localStorage.getItem('wuliu').slice(0,5)).toString(),
      //     pickupEndTime:(localStorage.getItem('wuliu').slice(6,11)).toString(),
      //     province:this.state.form.hzProvince,
      //     city:this.state.form.hzCity
      //   },
      //   order:{
      //     number:this.props.geneDetail.code,      //'套餐号',
      //     title:this.props.geneDetail.title,      //'订单标题',
      //     doctorId:'',   //'医生Id',
      //     patientId:'',    //'购买人id',
      //     prepayId:'',      //'prepay_id',
      //     patientName:'',      //'购买人姓名',
      //     barcodeNumber:'',      //'条形码号',
      //
      //     coupon:this.state.coupon,            //'优惠券',
      //     statu:'',           //'0'  '订单状态0:已下单 1:已支付 2:检测完成',
      //     isPaper:'',       //'0'  '是否使用纸质报告',
      //
      //     overInvoice:'' ,   //'0'  '发票是否已开具',
      //     logisticsType:'',     //'物流运输方式',
      //     logisticsCode:'',      //'物流单号',
      //     testingCompanyEmail:'',
      //
      //     deptId:'',            //'0'  '创建者dept_id',
      //     creator:'',          //'创建人Id',
      //     updater:'',          //'更新人',
      //     updateTime:'',     //'更新时间',
      //     createrTime:'',    //'新建时间',
      //     isDel:'',         //'0'  '删除标识',
      //     createDate:'',
      //     payTime:'',       //'付费时间',
      //     orderMoney:this.state.coupon? this.state.conponPrice:this.state.price,  //'订单金额',
      //     geneCompany:this.props.geneDetail.testingCompany,      //'检测公司',
      //     isUploadReport:'',  //'0'  '是否上传了检测报告',
      //
      //     samplingBeizhu:'',      //'取样备注',
      //     geneFormId:'',    //'电子申请单ID',
      //     geneCompanyId:'',    //'检测公司ID',
      //     paperWaybillNo:'',      //'纸质报告运单号',
      //     isInvoice:this.state.valuepaper,         //'0'  '0：不需要，1：需要',
      //   }
      // })

//
//     // sessionStorage.removeItem('drug');
//     sessionStorage.removeItem('addressdetail');
//     sessionStorage.removeItem('samplingUser');
//     sessionStorage.removeItem('name');
//     sessionStorage.removeItem('samplingPhone');
//     sessionStorage.removeItem('paperAddr');
//     sessionStorage.removeItem('addressee');
//     sessionStorage.removeItem('paperPhone');
//     sessionStorage.removeItem('paperUser');
//     sessionStorage.removeItem('addressPhone');
//     sessionStorage.removeItem('address');
//     sessionStorage.removeItem('addr1');
//
//     localStorage.removeItem('tissueSampleType');
//     localStorage.removeItem('valueback');
//     localStorage.removeItem('address');
//     localStorage.removeItem('drug');
//     localStorage.removeItem('addressee');
//     localStorage.removeItem('addressPhone');
//     localStorage.removeItem('addressdetail');
//     localStorage.removeItem('addr1');
//     localStorage.removeItem('addr2');
//     localStorage.removeItem('addr3');
//     localStorage.removeItem('name');
//     localStorage.removeItem('Birthday');
//     localStorage.removeItem('gender');
//     localStorage.removeItem('idNum');
//     localStorage.removeItem('ysHospitalName');
//     localStorage.removeItem('ysHospital');
//     localStorage.removeItem('doctor');
//     localStorage.removeItem('diagnosticCancer');
//     localStorage.removeItem('diagnosticTime');
//     localStorage.removeItem('checkeddrug3');
//     localStorage.removeItem('paperAddr');
//     localStorage.removeItem('paperPhone');
//     localStorage.removeItem('paperUser');
//     localStorage.removeItem('sampleNum');
//     localStorage.removeItem('sampleTime');
//     localStorage.removeItem('sampleType');
//     localStorage.removeItem('samplingPhone');
//     localStorage.removeItem('samplingTime');
//     localStorage.removeItem('samplingUser');
//     //localStorage.removeItem('ysHospital');
//     //localStorage.removeItem('ysHospitalName');
//     //localStorage.removeItem('wuliu');
//     localStorage.removeItem('otherSample');
//
//
//
//     // actions.wechatPay()
//
//     // this.props.history.push('/orderFinishPay')
   }



  //更改性别
  changeBnt(bnt){
    this.setState(Object.assign(this.state.form, { ['hzGender']: bnt}))
}
  // 改变查询内容
  changeSearch(e) {
    this.setState({
      searchValue: e.target.value
    })
  }
  changeInput(types, e) {
    this.setState(Object.assign(this.state, { [types]: e }))
    console.log('changeInput',this.setState(Object.assign(this.state, { [types]: e })))
  }
  search() {
    if (!this.state.searchValue) {
        Toast.fail('请输入医院名称', 2)
        return
    }
    this.setState({
        animating: true,
        text: '搜索中...'
    })
    const { actions } = this.props
    actions.getHosp({
        page: 1,
        limit: 40,
        hospitalName: this.state.searchValue
    })
}
selectHosp(item) {
    this.setState({
        hospId: item.id

    })
}
subSelectDoctor(item) {
    // 放进去医院名称，就职城市
    console.log(item)
    //localStorage.setItem('ysHospitalName',item.hospitalName)
    // this.setCookie("ysHospitalName", item.hospitalName, 30);
    // this.setCookie("ysHospital", item.id, 30);
    // this.setCookie("ysHospitalName", item.hospitalName, 30);
    // this.localStorage.setItem("ysHospitalName",item.hospitalName)
    //localStorage.setItem("ysHospital",item.id)
    // this.setCookie("ysHospital", item.id, 30);
    this.setState(Object.assign(this.state.form, { ['ysHospitalName']: item.hospitalName, ['ysHospital']: item.id, ['ysProvince']: item.provinceName || "" + "  " + item.cityName || "" + "  " + item.districtName || "" }))
    this.setState({
        open: !this.state.open,
    })
}
addHosp = () => {
  this.setState({
      province:'',
      provinceName:'',
      city:'',
      cityName:'',
      district:'',
      districtName:'',
      level:'',
      hospitalName:'',
      hospId:'',
      showAddHosp: true
  })
}
selectP = (id,name,type) => {
  const {actions} = this.props
  console.log(id,name)
  if(type == 'pro'){
      this.setState({
          province:id,
          provinceName:name,
          city:"",
          cityName:'',
          district:"",
          districtName:''
      })
      actions.getCity({
          id:id
      })
  }
  if(type == 'city'){
      this.setState({
          city:id,
          cityName:name,
          district:"",
          districtName:''
      })
      actions.getArea({
          id:id
      })
  }
  if(type == 'reg'){
      this.setState({
          district:id,
          districtName:name
      })
  }
}
subHosp = () => {
  const { province,provinceName,city,cityName,district,districtName,level,hospitalName } = this.state
  if(!province){
      Toast.fail('请选择省份')
      return
  }
  if(!city){
      Toast.fail('请选择城市')
      return
  }
  if(!district){
      Toast.fail('请选择地区')
      return
  }
  if(!hospitalName){
      Toast.fail('请输入医院名称')
      return
  }
  if(!level){
      Toast.fail('请选择医院等级')
      return
  }
  const {actions} = this.props
  this.setState({
      text:'正在提交',
      animating:true
  })
  actions.pubhospital({
      province,provinceName,city,cityName,district,districtName,level,hospitalName
  })
}
  formatTime(time) {
    let newTime = new Date(time)
    let year = newTime.getFullYear()
    let month = (newTime.getMonth() + 1) > 9 ? (newTime.getMonth() + 1) : '0' + (newTime.getMonth() + 1)
    let day = newTime.getDate() > 9 ? newTime.getDate() : '0' + newTime.getDate()
    let hour = newTime.getHours() > 9 ? newTime.getHours() : '0' + newTime.getHours()
    let minute = newTime.getMinutes() > 9 ? newTime.getMinutes() : '0' + newTime.getMinutes()
    let second = newTime.getSeconds() > 9 ? newTime.getSeconds() : '0' + newTime.getSeconds()
    let reTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    // let reTime = year + '-' + month + '-' + day;
    return reTime
  }
  // isFree(){
  //   if(this.state.isUse){
  //     return
  //   }
  //   if(this.state.coupon){
  //     (this.state.coupon).slice(0,1)=='W',
  //     this.setState({
  //       display: 'none',
  //     });
  //   }
  // }
  handelforceUpdate = (displaypaper,disappear) => {
    this.state.displaypaper = displaypaper;
    this.state.disappear = disappear;
    this.forceUpdate();
  }



  onChangeback = e => {
    console.log('radio checked', e.target.value);
    //this.setCookie("valueback", e.target.value, 30);
    localStorage.setItem("valueback",e.target.value)
    this.setState({
      valueback: e.target.value,
    });
  };




//性别
onChangegender = e => {
  console.log('radio checked', e.target.value);
  // this.setCookie("gender", e.target.value, 30);
  localStorage.setItem('sex',e.target.value)
  this.setState({
    sex: e.target.value,

  });
};


onFocusyshospital=(yshospital,e)=>{
  e.preventDefault();
  e.stopPropagation();
  console.log('yshospital',yshospital)
  localStorage.setItem('yshospital',this.item.hospitalName)
}
onBlurName = (patientName,e) => {
 //this.setCookie("name", name, 30);
//  sessionStorage.setItem('name',this.state.name)
localStorage.setItem('name',this.state.patientName)
}
onBluridNum = (idNum,e) => {
  // this.setCookie("idNum", idNum, 30);
  localStorage.setItem('menzhenidNum',this.state.idNum)
 }
onBlurDoctor = (localDoctorName,e) => {
  // this.setCookie("doctor", doctor, 30);
  localStorage.setItem('localDoctorName',this.state.localDoctorName)
 }

  onBlurpatientMobile=(patientMobile,e)=>{
    localStorage.setItem('patientMobile',this.state.patientMobile)
    //this.setCookie("samplingPhone", samplingPhone, 30);
    sessionStorage.setItem('patientMobile',this.state.patientMobile);
  }
  onBlurlocalDoctorMobile=(localDoctorMobile,e)=>{
    localStorage.setItem('localDoctorMobile',this.state.localDoctorMobile)
    //this.setCookie("samplingPhone", samplingPhone, 30);
    sessionStorage.setItem('localDoctorMobile',this.state.localDoctorMobile);
  }



onOpenChange = (...args) => {
  this.setState({
      hospId: '',
      open: !this.state.open,
      searchValue: '',
      hospList: [],
  });
  // const { input } = this.inputRef; // 如果是textArea的话，const { textAreaRef } = this.inputRef;
  // input.focus();
  // input.setSelectionRange(0, input.value.length);
  // setTimeout(function() {
  //   var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  // }, 100);
}
toggleCheckeddrug = () => {
  this.setState({ checkeddrug: !this.state.checked });
};

toggleDisable = () => {
  this.setState({ disabled: !this.state.disabled });
};
onChangeChecks=drug=>{
  console.log('checked = ',drug);
  this.setState({
    drug:drug,

  });
  sessionStorage.setItem('drug',drug);
  localStorage.setItem('drug',drug);
  // this.setCookie("drug", drug, 30);

};


//生日时间
dateFormatByPhone=(date)=>{
  let returnDate = ""
  //Android终端
  let isAndroid = /(Android)/i.test(navigator.userAgent);
 //Ios终端
  let isiOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
  console.log(date)
  if(date !==undefined){
  if(isiOS) {
      returnDate = new Date(date.replace(/-/g, "/"))
  }
}
  if(isAndroid){
      returnDate = new Date(date)
  }
  return returnDate
};


autoFocusInst
  render(){
  // let paperAddrlakuai=sessionStorage.getItem('address')
  // let paperUserlakuai=sessionStorage.getItem('addressee')
  // let oldcheckeddrug3=localStorage.getItem('checkeddrug3')
  // let oldcheckeddrug5=localStorage.getItem('checkeddrug5')
  // let oldaddress=sessionStorage.getItem('address')
  // let olddiagnosticCancer = sessionStorage.getItem('diagnosticCancer')
  //
  // const {cityListqy, form,cityListbill,cityListlakuai} = this.state
  // const {volunteer,contacts,contactsPhonee,volunteerList,showName} = this.state
  const { getFieldProps } = this.props.form;
  const genes = this.props.geneDetail
  const { setting ,proList,cityList,areaList,areaListbill,areaListlakuai} = this.props
  const { provinceName,cityName,districtName,level,hospitalName,hospId} = this.state
        let select1 = [[]]
        setting[HOSP_NUMBER] && setting[HOSP_NUMBER].map((v) => {
          select1[0].push({ label: v.dictName, value: v.dictName })
      })

        let select2 = [[]]
        proList&&proList.map((v) => {
            select2[0].push({ label: v.name, value: v.id+"*"+ v.name })
        })
        let select3 = [[]]
        cityList&&cityList.map((v) => {
            select3[0].push({ label: v.name, value: v.id+"*"+ v.name })
        })
        let select4 = [[]]
        areaList&&areaList.map((v) => {
            select4[0].push({ label: v.name, value: v.id+"*"+ v.name })
        })
        const SelectBox1 = ({ extra, onClick, children }) => (
            <Rinput label="省份" className="marginTop4" value={provinceName} onDivClick={onClick} disabled={true} placeholder="请选择省市区" icon="address" />
        )
        const SelectBox2 = ({ extra, onClick, children }) => (
            <Rinput label="城市" className="marginTop4" value={cityName} onDivClick={onClick} disabled={true} placeholder="请选择省市区" icon="address" />
        )
        const SelectBox3 = ({ extra, onClick, children }) => (
            <Rinput label="地区" className="marginTop4" value={districtName} onDivClick={onClick} disabled={true} placeholder="请选择省市区" icon="address" />
        )
        const SelectBox4 = ({ extra, onClick, children }) => (
            <Rinput label="医院级别" className="marginTop4" value={level} onDivClick={onClick} disabled={true} placeholder="请选择医院级别" />
        )
        const sidebar = (<div >
          {this.state.showAddHosp ? <div className="addHosp-row">
              <Picker
                  title="省份"
                  data={select2}
                  cascade={false}
                  onOk={e => this.selectP(e[0].split('*')[0],e[0].split('*')[1],'pro')}
                  onDismiss={e => console.log('dismiss', e)}
              >
                  <SelectBox1 />
              </Picker>
              <Picker
                  title="城市"
                  cascade={false}
                  data={select3}
                  onOk={e => this.selectP(e[0].split('*')[0],e[0].split('*')[1],'city')}
                  onDismiss={e => console.log('dismiss', e)}
              >
                  <SelectBox2 />
              </Picker>
              <Picker
                  title="地区"
                  cascade={false}
                  data={select4}
                  onOk={e => this.selectP(e[0].split('*')[0],e[0].split('*')[1],'reg')}
                  onDismiss={e => console.log('dismiss', e)}
              >
                  <SelectBox3 />
              </Picker>
              <Rinput label="医院名称" value={hospitalName} onChange={this.changeInput.bind(this, 'hospitalName')} className="marginTop4" placeholder="请输入医院名称" />
              <Picker
                 data={select1}
                 title="医院级别"
                 cascade={false}
                 //onChange={v => this.setState({ sValue: v })}
                 onOk={v =>this.setState({level:v[0]})}
              >
                  <SelectBox4 />
              </Picker>

                  <GButton name="提交" onClick={this.subHosp} />
                  <Button style={{marginTop:'.8rem'}} type="warning" onClick={this.goBackH}>取消</Button>

          </div> : <div>
                   <div className="close_icon" onClick={this.onOpenChange}><Icon type="close" /> </div>
                   <div className="Drawer_content">
                      <SearchBar backgroundColor="#ffffff" placeholder="请输入医院名称" value={this.state.searchValue} onChange={this.changeSearch.bind(this)} searchBnt={this.search.bind(this)} />
                      {
                          this.state.hospList.map((item, index) => {
                              return <SelectDoctorList onClick={this.selectHosp.bind(this, item)} select={this.state.hospId == item.id} onClickCertain={this.subSelectDoctor.bind(this, item)} key={index} src={ceshi} name={item.hospitalName} content={item.provinceName || "" + "  " + item.cityName || "" + "  " + item.districtName || ""} />
                          })
                      }
                      {
                          this.state.hospList.length == 0 ? <div className="add-hosp">医院库若无此医院，点击<span onClick={this.addHosp}>手动添加医院</span></div> : null
                      }
                  </div>
              </div>}

      </div>);

    let newDatesamplingTime = new Date(this.state.form.samplingTime)
    const CustomChildrensamplingTime = ({ extra, onClick, children }) => (
          <div className="year_select"  onClick={onClick}>
              <div className="year_select_one" style={{color:'#333'}}>{this.state.form.samplingTime?newDatesamplingTime.getFullYear():'年'}</div>
              <div className="year_select_line" >|</div>
              <div className="year_select_one" style={{color:'#333'}}>{this.state.form.samplingTime?(newDatesamplingTime.getMonth() + 1) > 9 ? (newDatesamplingTime.getMonth() + 1) : '0' + (newDatesamplingTime.getMonth() + 1):'月'}</div>
              <div className="year_select_line" >|</div>
              <div className="year_select_one" style={{color:'#333'}}>{this.state.form.samplingTime?(newDatesamplingTime.getDate() > 9 ? newDatesamplingTime.getDate() : '0' + newDatesamplingTime.getDate()):'日'}</div>
              {/* <div className="year_select_line" >|</div>
              <div className="year_select_one" style={{color:'#333'}}>{this.state.form.samplingTime?(newDatesamplingTime.getHours() > 9 ? newDatesamplingTime.getHours() : '0' + newDatesamplingTime.getHours()):'时'}</div> */}
          </div>
      //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    );

//   const SelectBoxqy =  ({ extra, onClick, children }) => (
//     <Rinput className="marginTop4" value={(form.hzProvince+form.hzCity+form.hzRegion)?(form.hzProvince+form.hzCity+form.hzRegion):'请选择省市区'} onDivClick = {onClick} disabled={true} placeholder="请选择省市区" icon = "address"/>
// );
//   const SelectBoxbill =  ({ extra, onClick, children }) => (
//   <Rinput className="marginTop4" value={(form.billProvince+form.billCity+form.billRegion)?(form.billProvince+form.billCity+form.billRegion):'请选择省市区'} onDivClick = {onClick} disabled={true} placeholder="请选择省市区" icon = "address"/>
// );
//   let addr1=sessionStorage.getItem('addr1')
//   let oldaddr=localStorage.getItem('addr1')
//   const SelectBoxlakuai =  ({ extra, onClick, children }) => (
//   <Rinput className="marginTop4" value={(form.lakuaiProvince+form.lakuaiCity+form.lakuaiRegion)?(form.lakuaiProvince+form.lakuaiCity+form.lakuaiRegion):'请选择省市区'} onDivClick = {onClick} disabled={true} placeholder="请选择省市区" icon = "address"/>
// );

  //受检者生日

  let newDate = new Date(this.state.form.Birthday)
  const CustomChildrenbir = ({ extra, onClick, children }) => (
    <div className="year_select"  onClick={onClick}>
        <div className="year_select_one" style={{color:'#333'}}>{this.state.form.Birthday?newDate.getFullYear():'年'}</div>
        <div className="year_select_line" >|</div>
        <div className="year_select_one" style={{color:'#333'}}>{this.state.form.Birthday?(newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : '0' + (newDate.getMonth() + 1):'月'}</div>
        <div className="year_select_line" >|</div>
        <div className="year_select_one" style={{color:'#333'}}>{this.state.form.Birthday?(newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()):'日'}</div>

    </div>
//   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
);


    let oldextra=localStorage.getItem('extra')
    const SelectBox5 =  ({ extra, onClick, children }) => (
      <Rinput label="*就诊科室" className="marginTop4" value={extra?extra:oldextra} onDivClick = {onClick} disabled={true} placeholder="请选择科室" />
)
const keshi = [[
  {
      label:'呼吸科',
      value:'1',
  },
  {
      label:'胸外科',
      value:'2',
  },
  {
      label:'肿瘤科',
      value:'3',
  },
  {
      label:'放疗科',
      value:'4',
  },
  {
      label:'其它',
      value:'5',
  },
]];

    return(
      <div>
      <Drawer
                className="my-drawer"
                style={{ minHeight: "100vh" }}
                sidebar={sidebar}
                open={this.state.open}
                position='bottom'
      >
      <div className="confirm_order">

      <div className="orderconfirm_title">基本信息</div>
      <div className="orderconfirm_subtitle">（申请单中*号项为必填项）</div>
      {/*<GoodsListtwo*/}
        {/*padding=".4rem 0"*/}
        {/*marginLeft="0"*/}
        {/*disPlayImg={true}*/}
        {/*redTab={genes.tab||''}*/}
        {/*no_code={genes.code||""}*/}
        {/*type='1'*/}
        {/*name={genes.title||""}*/}
        {/*mchId={genes.mchId||''}*/}
        {/*mchKey={genes.mchKey||''}*/}
        {/*money={genes.price}*/}
        {/*keyWord={genes.yellowTab&&genes.yellowTab.split('-|-')||[]*/}
    {/*} />*/}

        <Rinput label="*患者姓名" value={this.state.patientName} onChange={this.changeInput.bind(this, 'patientName')} className="marginTop4" placeholder="请输入患者姓名" onBlur={this.onBlurName.bind(this,this.state.patientName)}/>

        <div className="reg_label">*患者性别</div>
        <Radio.Group onChange={this.onChangegender}  value={this.state.sex} style={{width:'100%'}}>
        <Radio name="value" value={'1'} style={{width:'50%'}}>男</Radio>
        <Radio name="value" value={'0'} style={{display:'inline-block'}}>女</Radio>
        </Radio.Group>

        <Rinput label="*身份证号" value={this.state.idNum} onChange={this.changeInput.bind(this, 'idNum')} className="marginTop4" placeholder="请输入真实有效的身份证号英文符号一律大写" onBlur={this.onBluridNum.bind(this,this.state.idNum)}/>
        <Rinput type="number" label="*患者电话" value={this.state.patientMobile} onChange={this.changeInput.bind(this, 'patientMobile')} className="marginTop4" placeholder="请输入患者电话" onBlur={this.onBlurpatientMobile.bind(this,this.state.patientMobile)}/>
        <Rinput style={{color:'#333'}}  label="*主诊医生姓名" value={this.state.localDoctorName} onChange={this.changeInput.bind(this, 'localDoctorName')} className="marginTop4" placeholder="请输入主诊医生姓名" onBlur={this.onBlurDoctor.bind(this,this.state.localDoctorName)}/>
        <Rinput type="number" label="*主诊医生电话" value={this.state.localDoctorMobile} onChange={this.changeInput.bind(this, 'localDoctorMobile')} className="marginTop4" placeholder="请输入主诊医生电话" onBlur={this.onBlurlocalDoctorMobile.bind(this,this.state.localDoctorMobile)}/>
        <Rinput style={{color:'#333'}}  label="主诊医生邮箱" value={this.state.localDoctorEmail} onChange={this.changeInput.bind(this, 'localDoctorEmail')} className="marginTop4" placeholder="请输入主诊医生邮箱（选填）"/>
        {/*<Rinput label="*联系电话" value={this.state.phone} onChange={this.changeInput.bind(this, 'phone')} className="marginTop4" placeholder="请输入联系电话" />*/}
        <RinputDoc style={{color:'#333'}} label="*就诊医院" value={this.state.form.ysHospitalName} className="marginTop4" placeholder="请点击并搜索就诊医院" disabled={false} onClick={this.onOpenChange}/>
        {/*<Rinput label="*就诊科室" value={this.state.form.department} onChange={this.changeInput.bind(this, 'department')} className="marginTop4" placeholder="请输入科室" />*/}
        <Picker
          value={this.state.form.department}
          style={{color:'#333'}}
          data={keshi}
          cascade={false}
          onOk={
            e => {this.setState(Object.assign(this.state.form,{department:e}))
          // console.log(Object.assign(this.state.form,{department:e}),'=============')
          // this.setCookie("department", this.state.form.department, 30)
          localStorage.setItem('department',this.state.form.department)
          }
        }

         //onOk={e=>this.setState({extra:e[0]})}
        //  onOk={v =>this.setState({level:v[0]})}
          //onChange={e=>console.log('dpname',e)}
          onChange={e=>{console.log('extra',this.state.extra)

          //this.setCookie("extra", this.state.extra, 30)

        }}
          onDismiss={e => console.log('dismiss', e)}
        >
        <SelectBox5 />
        </Picker>


      </div>

  <div className="height15"></div>
        <div className="fooder_bnt displays confirm_order_food">

          <div style={{ flex: '1' }}></div>
          <div onClick={this.goNext.bind(this)} className="sub_button floatRight">
            提交
          </div>
        </div>
        <ActivityIndicator
          toast
          size="large"
          text={this.state.text}
          animating={this.state.animating}
        />
        </Drawer>
  </div>)

    }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you also have to
 *       adjust it here.
 */


const LoginForm = Form.create()(Login);

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  const props = {
    idNum:state.user.idNum,
    patientName:state.user.patientName,
    patientMobile:state.user.patientMobile,
    localDoctorName:state.user.localDoctorName,
    localDoctorMobile:state.user.localDoctorMobile,
    localDoctorEmail:state.user.localDoctorEmail,
    sex:state.user.sex,
    localDoctorHospId:state.user.localDoctorHospId,
    localDoctorHospital:state.user.localDoctorHospital,

    geneDetail: state.user.geneDetail,
    searchDoctorState: state.user.searchDoctorState,
    msg: state.user.msg,
    serDoctorList: state.user.serDoctorList,
    saveOrderState: state.user.saveOrderState,
    wxPayState: state.user.wxPayState,
    wxPayStateNew:state.user.wxPayStateNew,
    wxPay: state.user.wxPay,
    getVolunteer:state.user.getVolunteer,
    volunteer:state.user.volunteer,
    getMyDoctoeState:state.user.getMyDoctoeState,
    myDoctor:state.user.myDoctor,
    mchId:state.user.mchId,
    mchKey:state.user.mchKey,
    hospList: state.user.hospList,
    setting: state.user.setting,
    proList:state.user.proList,
    getPro:state.user.getPro,

    addHosp:state.user.addHosp,
    getHospState: state.user.getHospState,
    user: state.user.user,
    loginState: state.user.loginState,
    department:state.user.department,

    geneDetailSpecialist:state.user.geneDetailSpecialist,
    geneDetailSpecialistState:state.user.geneDetailSpecialistState,

    doctorwxPayState: state.user.doctorwxPayState,
    doctorwxPayStateNew:state.user.doctorwxPayStateNew,
    doctorwxPay: state.user.doctorwxPay,
    tdoctororderState: state.user.tdoctororderState
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
