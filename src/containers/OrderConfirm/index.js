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
import GoodsListthree from '../../components/GoodsListthree';
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
const FormItem = Form.Item;
let WXKEY=sessionStorage.getItem('mchKey');

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.height = 0
    this.state = {
      
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
      coupon: '',//优惠券
      samplingAddress: '',//取样地址
      useSamplingTime: '',//选择器值
      conponPrice:'',//优惠价格
      price:'',//付款金额
      contactsPhonee:'',//取样联系人电话
      contacts:'',//取样联系人
      //新增属性
      name:'',//受检人姓名
      idNum:'',//身份证号
      doctor:'',
      valuetype: '',//血液组织
      sample: '',//样本类型
      tissueSampleType:'',
      sampleType:'',
      addressee:'',
      addressPhone:'',
      address:'',
      
      valuejisong:'1',
      valuechuzhi: '',
      valueback:'',
      valuepaper: '',
      valuetest: '',
      diagnosticCancer:'',
      otherCancerName:'',
      drug:[],
      otherDrugName:'',
      cityListqy:[],
      cityListbill:[],
      cityListlakuai:[],
      hospList: [],
      hospId:'',
      displaypaper: 'block',
      // samplingUser:sessionStorage.getItem('addressee')?sessionStorage.getItem('addressee'):'',
      // samplingPhone:sessionStorage.getItem('addressPhone')?sessionStorage.getItem('addressPhone'):'',
      // addressdetail:sessionStorage.getItem('address')?sessionStorage.getItem('address'):'',

      // paperUser:sessionStorage.getItem('samplingUser')?sessionStorage.getItem('samplingUser'):sessionStorage.getItem('addressee')?sessionStorage.getItem('addressee'):'',       //'纸质报告收件人',
      // paperPhone:sessionStorage.getItem('samplingPhone')?sessionStorage.getItem('samplingPhone'):sessionStorage.getItem('addressPhone')?sessionStorage.getItem('addressPhone'):'',      //'纸质报告收件检点',
      // paperAddr:sessionStorage.getItem('addressdetail')?sessionStorage.getItem('addressdetail'):sessionStorage.getItem('address')?sessionStorage.getItem('address'):'',
      samplingUser:sessionStorage.getItem('addressee'),
      samplingPhone:sessionStorage.getItem('addressPhone'),
      addressdetail:sessionStorage.getItem('address'),


      paperUser:sessionStorage.getItem('addressee'),       //'纸质报告收件人',
      paperPhone:sessionStorage.getItem('addressPhone'),      //'纸质报告收件检点',
      paperAddr:sessionStorage.getItem('address'),
      // paperUser:sessionStorage.getItem('samplingUser'),       //'纸质报告收件人',
      // paperPhone:sessionStorage.getItem('samplingPhone'),      //'纸质报告收件检点',
      // paperAddr:sessionStorage.getItem('addressdetail'),
      extra:"",
      id:"",  //医院id
      email:"",
      remark:"",
      targetDrugName:"",
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

        bloodSampleTime:"",
        sampleTime:"", //组织取样时间
        // sampleTime:localStorage.getItem('sampleTime')?this.formatTime(localStorage.getItem('sampleTime')).replace(/-/g, '/'):'', //组织取样时间
        ysHospital: "",
        ysHospitalName: '',
        ysProvince: "",
        diagnosticTime:"",
        department:'',
        dpname:'',

        hzProvince:"",
        hzCity:"",
        hzRegion:"",

        billProvince:"",
        billCity:"",
        billRegion:"",

        lakuaiProvince:"",
        lakuaiCity:"",
        lakuaiRegion:"",

        extra:"",
        wuliutime:"",
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
     
      
      if(user.entity&&user.entity.Birthday){
          if (isAndroid) {
            user.entity.Birthday = new Date(user.entity.Birthday)
          }
          if (isIOS) {
            user.entity.Birthday = new Date(user.entity.Birthday.replace(/-/g, "/"))
          }
          console.log( user.entity)
          this.setState(Object.assign(this.state.form, user.entity))
      }
      if(user.entity&&user.entity.bloodSampleTime){
        if (isAndroid) {
          user.entity.bloodSampleTime = new Date(user.entity.bloodSampleTime)
        }
        if (isIOS) {
          user.entity.bloodSampleTime = new Date(user.entity.bloodSampleTime.replace(/-/g, "/"))
        }
        console.log( user.entity)
        this.setState(Object.assign(this.state.form, user.entity))
    }
    if(user.entity&&user.entity.samplingTime){
      if (isAndroid) {
        user.entity.samplingTime = new Date(user.entity.samplingTime)
      }
      if (isIOS) {
        user.entity.samplingTime = new Date(user.entity.samplingTime.replace(/-/g, "/"))
      }
      console.log( user.entity)
      this.setState(Object.assign(this.state.form, user.entity))
  }
    
    if(user.entity&&user.entity.sampleTime){
      if (isAndroid) {
        user.entity.sampleTime = new Date(user.entity.sampleTime)
      }
      if (isIOS) {
        user.entity.sampleTime = new Date(user.entity.sampleTime.replace(/-/g, "/"))
      }
      console.log( user.entity)
      this.setState(Object.assign(this.state.form, user.entity))
  }
      // if(user.doctors){
      //     let docArr = []
      //     user.doctors.map((item)=>{
      //         docArr.push(item.id)
      //     })
      //     this.setState({
      //         doctorItems:user.doctors,//绑定医生详情
      //         doctors:docArr,//绑定医生
      //     })
      // }
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

    if (this.props.saveOrderState != nextprops.saveOrderState && nextprops.saveOrderState == 'succ') {
      this.setState({
        animating: false
      })
      Toast.success('提交成功，正在打开微信支付', 2)
      // this.props.history.goBack()
    }
    if (this.props.saveOrderState != nextprops.saveOrderState && nextprops.saveOrderState == 'failed') {
      this.setState({
        animating: false
      })
      Toast.fail(nextprops.msg, 2)
    }
    if(this.props.geneConponState!=nextprops.geneConponState&&nextprops.geneConponState=='succ'){
      this.setState({
        isUse:true,
        animating:false,
        conponPrice:this.state.price*(nextprops.conpon.coupon/100)
      })
      console.log("【优惠券参数】",this.state.price,nextprops.conpon.coupon/100,)
      Toast.success("使用成功，折扣价："+this.state.price*(nextprops.conpon.coupon/100), 2)
    }
    if(this.props.geneConponState!=nextprops.geneConponState&&nextprops.geneConponState=='failed'){
      this.setState({
        animating:false
      })
      Toast.fail(nextprops.msg, 2)
    }
    if(this.props.wxPayStateNew != nextprops.wxPayStateNew &&nextprops.wxPayStateNew=='succ'){
      this.props.history.push('/orderList')
      Toast.success('支付成功',3)
    }
    if(this.props.wxPayStateNew != nextprops.wxPayStateNew &&nextprops.wxPayStateNew=='failed'){
      this.setState({
        animating: false
      })
      Toast.fail(nextprops.msg,3)
    }
    if(this.props.wxPayState!=nextprops.wxPayState&&nextprops.wxPayState=='succ'){
      let _this = this
      window.wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        let nonceStr = Math.random().toString(36).slice(2) 
        let pack ="prepay_id="+nextprops.wxPay
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
        console.log(paySign)
        
          window.wx.chooseWXPay({
            timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
            package: pack, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: paySign, // 支付签名 appId,  nonceStr,package,signType,  timeStamp.
            success: function (res) {
            // 支付成功后的回调函数
            _this.props.history.push('/orderList')
               Toast.success('支付成功',3)
            }
          });
      });
    }
    if(this.props.getVolunteer!=nextprops.getVolunteer&&nextprops.getVolunteer=='succ'){
      let newArr = [
        []
      ]
      let volunteerList = nextprops.volunteer || []
      console.log("this.props.geneDetail",this.props.geneDetail)
      volunteerList = volunteerList.map(v=>({username:v.username,mobile:v.mobile,showName:v.zyCompany =='AZ'?'平台志愿者':v.username}))
      nextprops.volunteer.map((item,index)=>{
        newArr[0].push({
          label:item.zyCompany =='AZ'?'平台志愿者':item.username,
          value:index
        })
      })
     let newArrTwo = [
       newArr[0].concat([{label:'客服专员1',value:newArr[0].length}])
     ] 
     let volunteerListTwo = volunteerList.concat([{username:'客服专员1',mobile:'13681505892',showName:'客服专员1'}])
 
      
      this.setState({
        volunteerList:volunteerListTwo,
        volunteer:newArrTwo
      })
      console.log(newArrTwo,volunteerListTwo)
    }
  }
  componentWillMount() {
    this.height = window.screen.height;
    console.log('000',this.formatTime(this.state.form.Birthday))
    console.log('111',this.state.form.Birthday)
  console.log('222',localStorage.getItem('Birthday'))
  console.log('333',this.formatTime(localStorage.getItem('Birthday')).replace(/-/g, '/'))
    console.log('mchId:',this.props.geneDetail.mchId);//获取mchId成功
    console.log('mchKey:',this.props.geneDetail.mchKey);//mchKey
    sessionStorage.setItem('mchId',this.props.geneDetail.mchId)
    sessionStorage.setItem('mchKey',this.props.geneDetail.mchKey)

    console.log('name',this.state.name)
    console.log('name',localStorage.getItem('name'))

    console.log('idNum',this.state.idNum)
    console.log('idNum',localStorage.getItem('idNum'))

    console.log('doctor',this.state.doctor)
    console.log('doctor',localStorage.getItem('doctor'))

    console.log('addressdetail',this.state.addressdetail)
    console.log('addressdetail',localStorage.getItem('addressdetail'))
    console.log('addressdetail',sessionStorage.getItem('addressdetail'))

    console.log('samplingUser',this.state.samplingUser)
    console.log('samplingUser',localStorage.getItem('samplingUser'))
    console.log('samplingUser',sessionStorage.getItem('samplingUser'))

    console.log('samplingPhone',this.state.samplingPhone)
    console.log('samplingPhone',localStorage.getItem('samplingPhone'))
    console.log('samplingPhone',sessionStorage.getItem('samplingPhone'))

    console.log('paperAddr',this.state.paperAddr)
    console.log('paperAddr',localStorage.getItem('paperAddr'))
    console.log('paperAddr',sessionStorage.getItem('paperAddr'))

    console.log('paperUser',this.state.paperUser)
    console.log('paperUser',localStorage.getItem('paperUser'))
    console.log('paperUser',sessionStorage.getItem('paperUser'))

    console.log('paperPhone',this.state.paperPhone)
    console.log('paperPhone',localStorage.getItem('paperPhone'))
    console.log('paperPhone',sessionStorage.getItem('paperPhone'))

    console.log('address',this.state.address)
    console.log('address',localStorage.getItem('address'))
    console.log('address',sessionStorage.getItem('address'))

    console.log('addressee',this.state.addressee)
    console.log('addressee',localStorage.getItem('addressee'))
    console.log('addressee',sessionStorage.getItem('addressee'))

    console.log('addressPhone',this.state.addressPhone)
    console.log('addressPhone',localStorage.getItem('addressPhone'))
    console.log('addressPhone',sessionStorage.getItem('addressPhone'))

    console.log('gender',this.state.gender)
    console.log('gender',localStorage.getItem('gender'))

    console.log('valuetype',this.state.valuetype)
    console.log('valuetype',localStorage.getItem('valuetype'))

    console.log('sampleType',this.state.sampleType)
    console.log('sampleType',localStorage.getItem('sampleType'))

    console.log('sampleNum',this.state.sampleNum)
    console.log('sampleNum',localStorage.getItem('sampleNum'))

    console.log('otherSample',this.state.otherSample)
    console.log('otherSample',localStorage.getItem('otherSample'))

    console.log('bloodNum',this.state.bloodNum)
    console.log('bloodNum',localStorage.getItem('bloodNum'))

    console.log('sample',this.state.sample)
    console.log('sample',localStorage.getItem('sample'))

    console.log('tissueSampleType',this.state.tissueSampleType)
    console.log('tissueSampleType',localStorage.getItem('tissueSampleType'))

    console.log('valueback',this.state.valueback)
    console.log('valueback',localStorage.getItem('valueback'))

    console.log('valuepaper',this.state.valuepaper)
    console.log('valuepaper',localStorage.getItem('valuepaper'))

    console.log('valuetest',this.state.samplingPhone)
    console.log('valuetest',localStorage.getItem('valuetest'))

    console.log('diagnosticCancer',this.state.diagnosticCancer)
    console.log('diagnosticCancer',localStorage.getItem('diagnosticCancer'))

    console.log('extra',this.state.extra)
    console.log('extra',localStorage.getItem('extra'))

    console.log('ysHospital',this.state.form.ysHospital)
    console.log('ysHospital',localStorage.getItem('ysHospital'))

    console.log('ysHospitalName',this.state.form.ysHospitalName)
    console.log('ysHospitalName',localStorage.getItem('ysHospitalName'))

    console.log('hospId',this.state.form.hospId)
    console.log('hospId',localStorage.getItem('hospId'))

    console.log('addr1',this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion)
    console.log('addr1',localStorage.getItem('addr1'))

    console.log('addr2',this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion)
    console.log('addr2',localStorage.getItem('addr2'))

    console.log('addr3',this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion)
    console.log('addr3',localStorage.getItem('addr3'))

    document.title = '电子申请单'
    const { match, actions } = this.props;
    const { params: { packageId,openId } } = match;
    this.checkLocalstorage()
    this.removeCookie('ysHospitalName')
    this.removeCookie('sampleType')
    this.removeCookie('Birthday')
    this.removeCookie('ysHospital')
    this.removeCookie('gender')
    this.removeCookie('name')
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
    if (!this.props.geneDetail.id) {
      this.props.history.push(`/detail/${packageId}`)
    }
    actions.myDoctor()
    this.setState({
      price: this.props.geneDetail.price,
      conponPrice:this.props.geneDetail.price
    })
    let newArr = []
        let _this = this
        CITY_DATA.forEach((province,index) => {
            newArr.push({
                key:{index},
                label: province.name,
                value: province.name,
                children: _this.getCity(province.sons)
            })
        })
    this.setState({
      cityListqy:newArr,
      cityListbill:newArr,
      cityListlakuai:newArr
  })
  window.wx.ready(function(){
    window.wx.hideMenuItems({
      menuList: ['menuItem:share:appMessage','menuItem:share:timeline','menuItem:favorite','menuItem:share:QZone','menuItem:openWithSafari','menuItem:copyUrl'] 
    });
  });
  }
  componentDidMount() {

  }
  phone(phone) {
    let phoneText = /^1[2345789]\d{9}$/
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
  // rules() {
  //   // if (!this.state.samplingTime) {
  //   //   Toast.fail('请选择取样时间', 2)
  //   //   return false
  //   // }
  //   // if (!this.state.doctorId) {

  //   //   Toast.fail('请绑定医生', 2)
  //   //   return false
  //   // }
  //   // if (!this.state.samplingAddress) {
  //   //   Toast.fail('请输入取样地址', 2)
  //   //   return false
  //   // }
    
  //   // if(!this.state.contacts){
  //   //   Toast.fail('请选择取样联系人', 2)
  //   //   return false
  //   // }
  //   // //新增属性
  //   if (!this.state.name) {
  //     Toast.fail('请输入受检人姓名', 2)
  //     return false
  //   }
  //   // if (!this.state.gender) {
  //   //   Toast.fail('请选择性别', 2)
  //   //   return false
  //   // }
  //   if (!this.state.form.Birthday) {
  //     Toast.fail('请选择出生日期', 2)
  //     return false
  //   }
    
  //   if (!this.checkIdNo(this.state.idNum).result) {
  //     Toast.fail('身份证输入有误请重新输入', 2)
  //     return false
  //   }
  //   // if (!this.state.idNum) {
  //   //   Toast.fail('请输入身份证号', 2)
  //   //   return false
  //   // }
  //   if (!this.state.doctor) {
  //     Toast.fail('请输入医生姓名', 2)
  //     return false
  //   }
  //   if (!this.state.department) {
  //     Toast.fail('请输入科室', 2)
  //     return false
  //   }
  //   if (!this.state.form.ysHospitalName) {
  //     Toast.fail('请输入医院', 2)
  //     return false
  //   }
  //   if (!this.state.department) {
  //     Toast.fail('请输入科室', 2)
  //     return false
  //   }
  //   if (!this.state.form.bloodSampleTime && !this.state.form.sampleTime) {
  //     Toast.fail('请选择样本采样时间', 2)
  //     return false
  //   }
  //   // if (!this.state.valuechuzhi) {
  //   //   Toast.fail('请选择样是否为初治患者', 2)
  //   //   return false
  //   // }
  //   // if (!this.state.resistance) {
  //   //   Toast.fail('请选择治疗方案', 2)
  //   //   return false
  //   // }
  //   if (!this.state.samplingUser) {
  //     Toast.fail('请输入收件人姓名', 2)
  //     return false
  //   }
  //   if (!this.state.samplingPhone) {
  //     Toast.fail('请输入收件人电话', 2)
  //     return false
  //   }
  //   // if (!this.state.samplingTime) {
  //   //   Toast.fail('请选择取样时间', 2)
  //   //   return false
  //   // }
  //   // if (!this.state.samplingAddress) {
  //   //   Toast.fail('请输入取样地址', 2)
  //   //   return false
  //   // }
    
  //   // if(!this.state.contacts){
  //   //   Toast.fail('请选择取样联系人', 2)
  //   //   return false
  //   // }
    
  //   return true
  // }
  rulesone() {
    if (!this.state.name) {
      Toast.fail('请输入受检人姓名', 2)
      return false
    }
    if (!this.state.form.Birthday && !localStorage.getItem('Birthday')) {
      Toast.fail('请选择出生日期', 2)
      return false
    }
    if (!this.state.gender && !localStorage.getItem('gender')) {
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
    if (!this.state.doctor) {
      Toast.fail('请输入医生姓名', 2)
      return false
    }
    
    if (this.state.coupon) {
      if(this.state.isUse==false){
        Toast.fail('请点击右侧按钮使用优惠券', 3)
      return false
      }
    }
    return true
  }
  rulestwo() {
    // if(this.state.valuetype=='1'){
    //   if (!this.state.form.bloodSampleTime && !this.getCookie('bloodSampleTime')) {
    //     Toast.fail('请选择血液采样时间', 2)
    //     return false
    //   }
    // }
    // if(this.state.valuetype=='2'){
    //   if (!this.state.form.sampleTime && !this.getCookie('sampleTime')) {
    //     Toast.fail('请选择样本采样时间', 2)
    //     return false
    //   }
    // }
    if(this.state.sampleType=='1'){
      if (!this.state.form.sampleTime && !localStorage.getItem('sampleTime')) {
        Toast.fail('请选择血液采样时间', 2)
        return false
      }
    }
    if(this.state.sampleType=='2'){
      if (!this.state.form.sampleTime && !localStorage.getItem('sampleTime')) {
        Toast.fail('请选择样本采样时间', 2)
        return false
      }
    }
    if(this.state.sampleType=='3'){
      if (!this.state.form.sampleTime && !localStorage.getItem('sampleTime')) {
        Toast.fail('请选择胸腹水采样时间', 2)
        return false
      }
    }
    if(this.state.sampleType=='4'){
      if (!this.state.form.sampleTime && !localStorage.getItem('sampleTime')) {
        Toast.fail('请选择其他样本采样时间', 2)
        return false
      }
    }
    if(this.state.sampleType=='5'){
      if (!this.state.form.sampleTime && !localStorage.getItem('sampleTime')) {
        Toast.fail('请选择脑脊液样本采样时间', 2)
        return false
      }
    }
    if (!this.state.diagnosticCancer) {
      Toast.fail('请选择您的病理诊断', 2)
      return false
    }
    
    
    if (!this.state.valuechuzhi) {
      Toast.fail('请选择是否接受过靶向治疗', 2)
      return false
    }
    // if (!this.state.targetDrugName) {
    //   Toast.fail('请输入靶向药物名称', 2)
    //   return false
    // }
    // if(this.state.valuechuzhi=='1'){
      
    //   if(!sessionStorage.getItem('drug')){
    //     Toast.fail('请选择治疗方案', 2)
    //     return false
    //   }
      // if((!this.drug) || (!this.state.drug)){
      //   Toast.fail('请选择治疗方案', 1)
      //   return false
      // }
    // }
    if (this.state.valuechuzhi=='1') {
      if(!this.state.resistance) {
        Toast.fail('请选择是否耐药', 2)
        return false
       } 
    }
    
    // if(this.state.checkeddrug3){
    //   if(!this.state.resistance) {
    //   Toast.fail('请选择是否耐药', 2)
    //   return false
    //  } 
    // }
    
    return true
  }
  rulesthree() {
    let reg = new RegExp("^[0-9]*$");

    if ((!(this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion) || !(this.state.addressdetail)) && (!localStorage.getItem('addr2') ||!(this.state.addressdetail))){
      Toast.fail('请输入取样地址', 2)
      return false
    }
    // if (!(sethis.state.addressdetail)) {
    //   Toast.fail('请输入取样地址', 2)
    //   return false
    // }
    if (!this.state.form.samplingTime && !localStorage.getItem('samplingTime')) {
      Toast.fail('请输入取样日期', 2)
      return false
    }
    if (!this.state.form.wuliutime) {
      Toast.fail('请选择物流预约时间',2)
      return false
    }
    if (!this.isChinese(this.state.samplingUser).result) {
      Toast.fail('请输入取样人中文姓名', 2)
      return false
    }
    // if ((!this.isChinese(sessionStorage.getItem('samplingUser').result))||(!this.isChinese(this.state.samplingUser).result)) {
    //   Toast.fail('请输入取样人中文姓名', 2)
    //   return false
    // }
    // !this.phone(this.state.mobile).result
    if (!this.isPoneAvailable(this.state.samplingPhone).result && !this.isPoneAvailable(sessionStorage.getItem('samplingPhone')).result) {
      Toast.fail('请正确输入11位取样人电话', 2)
      return false
    }
    if(this.state.displaypaper=='block'){
    if (!this.isChinese(this.state.paperUser).result) {
      Toast.fail('请输入纸质报告收件人中文姓名', 2)
      return false
    }
    if (!this.isPoneAvailable(this.state.paperPhone).result && !this.isPoneAvailable(sessionStorage.getItem('paperPhone')).result) {
      Toast.fail('请正确输入11位纸质报告收件人电话', 2)
      return false
    }
    
    if ((!(this.state.paperAddr) || !(this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion))&& (!localStorage.getItem('addr3') ||!(this.state.paperAddr))) {
      Toast.fail('请输入纸质报告收件人地址', 2)
      return false
    }
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
  var myregg= /^[^\d.]+$/;
  if (!myregg.test(value)) {
      return {result:false};
  } else {
      return {result:true};
  }
};    
  goNext() {
    const { actions } = this.props
    // if (!this.rules()) {
    //   return
    // }
    
    this.setState({
      animating: true,
      text: '正在提交...'
    })
    // if(this.state.valuetype=='1'){
    //   actions.saveOrder({
    //     form:{
    //       packageName:this.props.geneDetail.title,       //'套餐名称'
    //       packageCode:this.props.geneDetail.code,      //'套餐代码'
    //       name:this.state.name,              //'受检人姓名'
    //       gender:this.state.gender,            //'性别0女，1男'
    //       birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(this.getCookie('Birthday')).indexOf('0NaN')=='-1'?this.formatTime(this.getCookie('Birthday')):''),
    //       //birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(this.getCookie('Birthday'))?this.formatTime(this.getCookie('Birthday')):''),          //'年龄'
    //       idNum:this.state.idNum,             //'身份证号'
    //       phone:this.state.phone,             //'电话'
    //       doctor:this.state.doctor,            //'医生姓名'
    //       hospital:this.state.form.ysHospitalName,          //'医院名'
    //       //department:JSON.stringify(this.state.form.department), 
    //        department:this.state.form.department[0],        //'科室'
    //       sampleType:this.state.valuetype,
    //       bloodNum:this.state.bloodNum,          //'血液数量（管）'
    //       bloodSampleTime:this.formatTime(this.state.form.bloodSampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.bloodSampleTime):(this.formatTime(this.getCookie('bloodSampleTime')).indexOf('0NaN')=='-1'?this.formatTime(this.getCookie('bloodSampleTime')):''),
    //       //bloodSampleTime:this.formatTime(this.state.form.bloodSampleTime) ?this.formatTime(this.state.form.bloodSampleTime):this.formatTime(this.getCookie('bloodSampleTime')),   //'血液采样时间'
    //       // sampleTime:this.state.form.sampleTime==''?this.formatTime(this.state.form.sampleTime):'',        //'组织采样时间'
    //       // sample:this.state.sample,            //'0：白；1：蜡块；2：蜡卷；3：胸腹水；4：其他'
    //       // sampleNum:this.state.sampleNum,         //'样本数量'
    //       // addressee:this.state.addressee,         //'收件人'
    //       // addressPhone:this.state.addressPhone,      // '收件人电话'
    //       // address:this.state.address,           //'收件人地址'
    //       diagnosticCancer:this.state.diagnosticCancer?this.state.diagnosticCancer:this.getCookie('diagnosticCancer'),  //'0：肺癌；1：肺腺癌；2：肺鳞癌；3：肺大细胞癌；4：腺鳞混合型；5：其他'
    //       otherCancerName:this.state.otherCancerName,
    //       //diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):'',   //'其他癌名称'
    //       diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):(this.formatTime(this.getCookie('diagnosticTime'))?this.formatTime(this.getCookie('diagnosticTime')):''),
    //       //diagnosticTime:toString(this.formatTime(this.state.form.diagnosticTime)).indexOf('NaN-0NaN-0NaN 0NaN:0NaN:0NaN')==='-1'?'':this.formatTime(this.state.form.diagnosticTime) ,    //'确诊时间'    //'确诊时间'
    //       // drug:this.state.drug,   
    //       drug:this.getCookie('drug')?this.getCookie('drug'):this.state.drug,           //'0：化疗；1：放疗；2：靶向治疗；3：免疫治疗‘
    //       otherDrugName:this.state.otherDrugName,     //'其他药名称'
    //       initial:this.state.valuechuzhi,           //'是否是初始患者0：否；1：是'
    //       resistance:this.state.resistance,         //'1：是，有影像检测证明疾病进展；2：是，仅为经验判断；3：否'
    //       paperUser:this.state.paperUser,       //'纸质报告收件人',
    //       paperPhone:this.state.paperPhone,      //'纸质报告收件检点',
    //       //paperAddr:this.getCookie('addr3')?this.getCookie('addr3')this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr,    //'纸质报告接受地址',
    //       paperAddr:this.getCookie('addr3')?this.getCookie('addr3')+this.state.paperAddr:this.getCookie('addr1')+this.state.paperAddr,    //'纸质报告接受地址',
    //       samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(this.getCookie('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(this.getCookie('samplingTime')):''),
    //       //samplingTime:this.formatTime(this.state.form.samplingTime)?this.formatTime(this.state.form.samplingTime):this.formatTime(this.getCookie('bloodSampleTime')),    //'取样时间', 
    //       samplingUser:this.state.samplingUser,      //'取样联系人',
    //       samplingPhone:this.state.samplingPhone,      //'取样电话',
    //       samplingAddress:this.getCookie('addr2')?this.getCookie('addr2')+this.state.addressdetail:this.getCookie('addr1')+this.state.addressdetail,
    //       //samplingAddress:(this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail).indexOf('0NaN')=='-1'?this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail:'',    //'取样地址',
    //       hospId:this.state.form.ysHospital,      //'医院名称',
          
    //     },
    //     order:{
    //       number:this.props.geneDetail.code,      //'套餐号',
    //       title:this.props.geneDetail.title,      //'订单标题', 
    //       doctorId:'',   //'医生Id',
    //       patientId:'',    //'购买人id',
    //       prepayId:'',      //'prepay_id',
    //       patientName:'',      //'购买人姓名',
    //       barcodeNumber:'',      //'条形码号',
          
    //       coupon:this.state.coupon,            //'优惠券',
    //       statu:'',           //'0'  '订单状态0:已下单 1:已支付 2:检测完成',
    //       isPaper:'',       //'0'  '是否使用纸质报告',
          
    //       overInvoice:'' ,   //'0'  '发票是否已开具',
    //       logisticsType:'',     //'物流运输方式',
    //       logisticsCode:'',      //'物流单号',
    //       testingCompanyEmail:'',   
          
    //       deptId:'',            //'0'  '创建者dept_id',
    //       creator:'',          //'创建人Id',
    //       updater:'',          //'更新人',
    //       updateTime:'',     //'更新时间',
    //       createrTime:'',    //'新建时间',
    //       isDel:'',         //'0'  '删除标识',
    //       createDate:'',
    //       payTime:'',       //'付费时间',
    //       orderMoney:this.state.conponPrice,  //'订单金额',
    //       geneCompany:this.props.geneDetail.testingCompany,      //'检测公司',
    //       isUploadReport:'',  //'0'  '是否上传了检测报告',
          
    //       samplingBeizhu:'',      //'取样备注',
    //       geneFormId:'',    //'电子申请单ID',
    //       geneCompanyId:'',    //'检测公司ID',
    //       paperWaybillNo:'',      //'纸质报告运单号',
    //       isInvoice:this.state.valuepaper,         //'0'  '0：不需要，1：需要',
    //     }
    //   })
    // }if(this.state.valuetype=='2'){
    //   actions.saveOrder({
    //     form:{
    //       packageName:this.props.geneDetail.title,       //'套餐名称'
    //       packageCode:this.props.geneDetail.code,      //'套餐代码'
    //       name:this.state.name,              //'受检人姓名'
    //       gender:this.state.gender,            //'性别0女，1男'
    //       birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(this.getCookie('Birthday')).indexOf('0NaN')=='-1'?this.formatTime(this.getCookie('Birthday')):''), 
    //       //birthday:this.formatTime(this.state.form.Birthday)? this.formatTime(this.state.form.Birthday):this.getCookie('Birthday'),          //'年龄'
    //       idNum:this.state.idNum,             //'身份证号'
    //       phone:this.state.phone,             //'电话'
    //       doctor:this.state.doctor,            //'医生姓名'
    //       hospital:this.state.form.ysHospitalName,          //'医院名'
    //       //department:JSON.stringify(this.state.form.department),        //'科室'
    //       department:this.state.form.department[0], 
    //       sampleType:this.state.valuetype,    //血液，组织类型
    //       // bloodNum:this.state.bloodNum,          //'血液数量（管）'
    //       // bloodSampleTime:this.state.form.bloodSampleTime==''?this.formatTime(this.state.form.bloodSampleTime):'',   //'血液采样时间'
    //       //sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.sampleTime):this.formatTime(this.getCookie('sampleTime')),        //'组织采样时间'
    //       sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.sampleTime):(this.formatTime(this.getCookie('sampleTime')).indexOf('0NaN')=='-1'?this.formatTime(this.getCookie('sampleTime')):''),
    //       sample:this.state.sample,            //'0：白；1：蜡块；2：蜡卷；3：胸腹水；4：其他'
    //       sampleNum:this.state.sampleNum,         //'样本数量'
    //       addressee:this.state.addressee,         //'收件人'
    //       addressPhone:this.state.addressPhone,      // '收件人电话'
    //       address:this.getCookie('addr1').indexOf('0NaN')=='-1'?this.getCookie('addr1')+this.state.address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,
    //       //address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,           //'收件人地址'
    //       //diagnosticCancer:this.state.diagnosticCancer,  //'0：肺癌；1：肺腺癌；2：肺鳞癌；3：肺大细胞癌；4：腺鳞混合型；5：其他'
    //       diagnosticCancer:this.state.diagnosticCancer?this.state.diagnosticCancer:this.getCookie('diagnosticCancer'),
    //       otherCancerName:this.state.otherCancerName,   //'其他癌名称'
    //       diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):(this.formatTime(this.getCookie('diagnosticTime'))?this.formatTime(this.getCookie('diagnosticTime')):''),
    //       // diagnosticTime:toString(this.formatTime(this.state.form.diagnosticTime)).indexOf('NaN-0NaN-0NaN 0NaN:0NaN:0NaN')==='-1'?'':this.formatTime(this.state.form.diagnosticTime),
    //       //diagnosticTime:this.formatTime(this.state.form.diagnosticTime),    //'确诊时间'
    //       // drug:this.state.drug,
    //       drug:this.getCookie('drug')?this.getCookie('drug'):this.state.drug, 
    //       //drug:sessionStorage.getItem('drug'),           //'0：化疗；1：放疗；2：靶向治疗；3：免疫治疗‘
    //       otherDrugName:this.state.otherDrugName,     //'其他药名称'
    //       initial:this.state.valuechuzhi,           //'是否是初始患者0：否；1：是'
    //       resistance:this.state.resistance,         //'1：是，有影像检测证明疾病进展；2：是，仅为经验判断；3：否'
    //       paperUser:this.state.paperUser,       //'纸质报告收件人',
    //       paperPhone:this.state.paperPhone,      //'纸质报告收件检点',
    //       paperAddr:this.getCookie('addr3')?this.getCookie('addr3')+this.state.paperAddr:this.getCookie('addr1')+this.state.paperAddr,    //'纸质报告接受地址',
    //       //paperAddr:this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr,    //'纸质报告接受地址',
    //       samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(this.getCookie('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(this.getCookie('samplingTime')):''),
    //       //samplingTime:this.formatTime(this.state.form.samplingTime)?this.formatTime(this.state.form.samplingTime):this.formatTime(this.getCookie('bloodSampleTime')),    //'取样时间', 
    //       samplingUser:this.state.samplingUser,      //'取样联系人',
    //       samplingPhone:this.state.samplingPhone,      //'取样电话',
    //       samplingAddress:this.getCookie('addr2')?this.getCookie('addr2')+this.state.addressdetail:this.getCookie('addr1')+this.state.addressdetail,
    //       //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
    //       hospId:this.state.form.ysHospital,      //'医院名称',
    //     },
    //     order:{
    //       number:this.props.geneDetail.code,      //'套餐号',
    //       title:this.props.geneDetail.title,      //'订单标题',
    //       doctorId:'',   //'医生Id',
    //       patientId:'',    //'购买人id',
    //       prepayId:'',      //'prepay_id',
    //       patientName:'',      //'购买人姓名',
    //       barcodeNumber:'',      //'条形码号',
    //       samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(this.getCookie('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(this.getCookie('samplingTime')):''),
    //       //samplingTime:this.formatTime(this.state.form.samplingTime),    //'取样时间',
    //       coupon:this.state.coupon,            //'优惠券',
    //       statu:'',           //'0'  '订单状态0:已下单 1:已支付 2:检测完成',
    //       isPaper:'',  
    //       // hospitalId: this.state.hospitalId,     //'0'  '是否使用纸质报告',
    //       //hospId:this.state.hospId,      //'医院名称',
    //       overInvoice:'' ,   //'0'  '发票是否已开具',
    //       logisticsType:'',     //'物流运输方式',
    //       logisticsCode:'',      //'物流单号',
    //       testingCompanyEmail:'',    
    //       samplingUser:this.state.samplingUser,      //'取样联系人',
    //       samplingPhone:this.state.samplingPhone,      //'取样电话',
    //       //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
    //       samplingAddress:this.getCookie('addr2')?this.getCookie('addr2')+this.state.addressdetail:this.getCookie('addr1')+this.state.addressdetail,
    //       deptId:'',            //'0'  '创建者dept_id',
    //       creator:'',          //'创建人Id',
    //       updater:'',          //'更新人',
    //       updateTime:'',     //'更新时间',
    //       createrTime:'',    //'新建时间',
    //       isDel:'',         //'0'  '删除标识',
    //       createDate:'',
    //       payTime:'',       //'付费时间',
    //       orderMoney:this.state.conponPrice,  //'订单金额',
    //       geneCompany:this.props.geneDetail.testingCompany,      //'检测公司',
    //       isUploadReport:'',  //'0'  '是否上传了检测报告',
          
    //       samplingBeizhu:'',      //'取样备注',
          
    //       geneFormId:'',    //'电子申请单ID',
    //       geneCompanyId:'',    //'检测公司ID',
    //       paperWaybillNo:'',      //'纸质报告运单号',
    //       isInvoice:this.state.valuepaper,         //'0'  '0：不需要，1：需要',
    //     }
    //   })
    // }

    if(this.state.sampleType=='1'){
      actions.saveOrder({
        form:{
          email:this.state.email,
          packageName:this.props.geneDetail.title,       //'套餐名称'
          packageCode:this.props.geneDetail.code,      //'套餐代码'
          name:this.state.name,              //'受检人姓名'
          gender:this.state.gender,            //'性别0女，1男'
          birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(localStorage.getItem('Birthday')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('Birthday')):''),
          //birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(this.getCookie('Birthday'))?this.formatTime(this.getCookie('Birthday')):''),          //'年龄'
          idNum:this.state.idNum,             //'身份证号'
          phone:this.state.phone,             //'电话'
          doctor:this.state.doctor,            //'医生姓名'
          hospital:this.state.form.ysHospitalName,          //'医院名'
          //department:JSON.stringify(this.state.form.department), 
          department:this.state.form.department[0],        //'科室'
          // sampleType:this.state.valuetype,
          sampleType:this.state.sampleType,
          //bloodNum:this.state.bloodNum,          //'血液数量（管）'
          sampleNum:this.state.sampleNum,
          sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.sampleTime):(this.formatTime(localStorage.getItem('sampleTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('sampleTime')):''),
          // bloodSampleTime:this.formatTime(this.state.form.bloodSampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.bloodSampleTime):(this.formatTime(this.getCookie('bloodSampleTime')).indexOf('0NaN')=='-1'?this.formatTime(this.getCookie('bloodSampleTime')):''),
          //bloodSampleTime:this.formatTime(this.state.form.bloodSampleTime) ?this.formatTime(this.state.form.bloodSampleTime):this.formatTime(this.getCookie('bloodSampleTime')),   //'血液采样时间'
          // sampleTime:this.state.form.sampleTime==''?this.formatTime(this.state.form.sampleTime):'',        //'组织采样时间'
          // sample:this.state.sample,            //'0：白；1：蜡块；2：蜡卷；3：胸腹水；4：其他'
          // sampleNum:this.state.sampleNum,         //'样本数量'
          // addressee:this.state.addressee,         //'收件人'
          // addressPhone:this.state.addressPhone,      // '收件人电话'
          // address:this.state.address,           //'收件人地址'
          // tissueSampleType:this.state.tissueSampleType,
          diagnosticCancer:this.state.diagnosticCancer?this.state.diagnosticCancer:localStorage.getItem('diagnosticCancer'),  //'0：肺癌；1：肺腺癌；2：肺鳞癌；3：肺大细胞癌；4：腺鳞混合型；5：其他'
          otherCancerName:this.state.otherCancerName,
          targetDrugName:this.state.targetDrugName,
          remark:this.state.remark,
          diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):'',
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):'',   //'其他癌名称'
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):(this.formatTime(localStorage.getItem('diagnosticTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('diagnosticTime')):''),
          //diagnosticTime:toString(this.formatTime(this.state.form.diagnosticTime)).indexOf('NaN-0NaN-0NaN 0NaN:0NaN:0NaN')==='-1'?'':this.formatTime(this.state.form.diagnosticTime) ,    //'确诊时间'    //'确诊时间'
          drug:(this.state.drug).toString(),   
          //drug:this.getCookie('drug')?this.getCookie('drug'):this.state.drug,           //'0：化疗；1：放疗；2：靶向治疗；3：免疫治疗‘
          otherDrugName:this.state.otherDrugName,     //'其他药名称'
          initial:this.state.valuechuzhi,           //'是否是初始患者0：否；1：是'
          resistance:this.state.resistance,         //'1：是，有影像检测证明疾病进展；2：是，仅为经验判断；3：否'
          paperUser:this.state.displaypaper=='block'?this.state.paperUser:'',       //'纸质报告收件人',
          paperPhone:this.state.displaypaper=='block'?this.state.paperPhone:'',      //'纸质报告收件检点',
          paperAddr:this.state.displaypaper=='block'?((this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:''):'',
          //paperUser:this.state.paperUser,       //'纸质报告收件人',
          //paperPhone:this.state.paperPhone,      //'纸质报告收件检点',
          
          //paperAddr:this.getCookie('addr3')?this.getCookie('addr3')this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr,    //'纸质报告接受地址',
          //paperAddr:localStorage.getItem('addr3')?localStorage.getItem('addr3')+this.state.paperAddr:localStorage.getItem('addr1')+this.state.paperAddr,    //'纸质报告接受地址',
          //paperAddr:this.state.displaypaper=='block'?((this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:''):'',
          samplingAddress:(this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail).indexOf('0NaN')=='-1'?this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail:'',    //'取样地址',
          samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
          //samplingTime:this.formatTime(this.state.form.samplingTime)?this.formatTime(this.state.form.samplingTime):this.formatTime(this.getCookie('bloodSampleTime')),    //'取样时间', 
          samplingUser:this.state.samplingUser,      //'取样联系人',
          samplingPhone:this.state.samplingPhone,      //'取样电话',
          //samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
          
          hospId:this.state.form.ysHospital,      //'医院名称',
          pickupStartTime:(localStorage.getItem('wuliu').slice(0,5)).toString(),
          pickupEndTime:(localStorage.getItem('wuliu').slice(6,11)).toString(),
        },
        order:{
          number:this.props.geneDetail.code,      //'套餐号',
          title:this.props.geneDetail.title,      //'订单标题', 
          doctorId:'',   //'医生Id',
          patientId:'',    //'购买人id',
          prepayId:'',      //'prepay_id',
          patientName:'',      //'购买人姓名',
          barcodeNumber:'',      //'条形码号',
          
          coupon:this.state.coupon,            //'优惠券',
          statu:'',           //'0'  '订单状态0:已下单 1:已支付 2:检测完成',
          isPaper:'',       //'0'  '是否使用纸质报告',
          
          overInvoice:'' ,   //'0'  '发票是否已开具',
          logisticsType:'',     //'物流运输方式',
          logisticsCode:'',      //'物流单号',
          testingCompanyEmail:'',   
          
          deptId:'',            //'0'  '创建者dept_id',
          creator:'',          //'创建人Id',
          updater:'',          //'更新人',
          updateTime:'',     //'更新时间',
          createrTime:'',    //'新建时间',
          isDel:'',         //'0'  '删除标识',
          createDate:'',
          payTime:'',       //'付费时间',
          orderMoney:this.state.conponPrice,  //'订单金额',
          geneCompany:this.props.geneDetail.testingCompany,      //'检测公司',
          isUploadReport:'',  //'0'  '是否上传了检测报告',
          
          samplingBeizhu:'',      //'取样备注',
          geneFormId:'',    //'电子申请单ID',
          geneCompanyId:'',    //'检测公司ID',
          paperWaybillNo:'',      //'纸质报告运单号',
          isInvoice:this.state.valuepaper,         //'0'  '0：不需要，1：需要',
        }
      })
    }
    if(this.state.sampleType=='2'){
      actions.saveOrder({
        form:{
          email:this.state.email,
          packageName:this.props.geneDetail.title,       //'套餐名称'
          packageCode:this.props.geneDetail.code,      //'套餐代码'
          name:this.state.name,              //'受检人姓名'
          gender:this.state.gender,            //'性别0女，1男'
          birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(localStorage.getItem('Birthday')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('Birthday')):''), 
          //birthday:this.formatTime(this.state.form.Birthday)? this.formatTime(this.state.form.Birthday):this.getCookie('Birthday'),          //'年龄'
          idNum:this.state.idNum,             //'身份证号'
          phone:this.state.phone,             //'电话'
          doctor:this.state.doctor,            //'医生姓名'
          hospital:this.state.form.ysHospitalName,          //'医院名'
          //department:JSON.stringify(this.state.form.department),        //'科室'
          department:this.state.form.department[0], 
          // sampleType:this.state.valuetype,    //血液，组织类型
          sampleType:this.state.sampleType,
          // bloodNum:this.state.bloodNum,          //'血液数量（管）'
          // bloodSampleTime:this.state.form.bloodSampleTime==''?this.formatTime(this.state.form.bloodSampleTime):'',   //'血液采样时间'
          //sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.sampleTime):this.formatTime(this.getCookie('sampleTime')),        //'组织采样时间'
          sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.sampleTime):(this.formatTime(localStorage.getItem('sampleTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('sampleTime')):''),
          //sample:this.state.sample,            //'0：白；1：蜡块；2：蜡卷；3：胸腹水；4：其他'
          tissueSampleType:this.state.tissueSampleType,
          sampleNum:this.state.sampleNum,         //'样本数量'

          addressee:this.state.valueback =='1'?this.state.addressee:'',         //'收件人'
          addressPhone:this.state.valueback =='1'?this.state.addressPhone:'',      // '收件人电话'
          address:this.state.valueback =='1'? this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address:'',
          
          //address:localStorage.getItem('addr1')?localStorage.getItem('addr1')+this.state.address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,
          //address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,           //'收件人地址'
          //diagnosticCancer:this.state.diagnosticCancer,  //'0：肺癌；1：肺腺癌；2：肺鳞癌；3：肺大细胞癌；4：腺鳞混合型；5：其他'
          diagnosticCancer:this.state.diagnosticCancer?this.state.diagnosticCancer:localStorage.getItem('diagnosticCancer'),
          otherCancerName:this.state.otherCancerName,   //'其他癌名称'
          targetDrugName:this.state.targetDrugName,
          remark:this.state.remark,
          diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):'',
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):(this.formatTime(localStorage.getItem('diagnosticTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('diagnosticTime')):''),
          // diagnosticTime:toString(this.formatTime(this.state.form.diagnosticTime)).indexOf('NaN-0NaN-0NaN 0NaN:0NaN:0NaN')==='-1'?'':this.formatTime(this.state.form.diagnosticTime),
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime),    //'确诊时间'
          drug:(this.state.drug).toString(),
          //drug:this.getCookie('drug')?this.getCookie('drug'):this.state.drug, 
          //drug:sessionStorage.getItem('drug'),           //'0：化疗；1：放疗；2：靶向治疗；3：免疫治疗‘
          otherDrugName:this.state.otherDrugName,     //'其他药名称'
          initial:this.state.valuechuzhi,           //'是否是初始患者0：否；1：是'
          resistance:this.state.resistance,         //'1：是，有影像检测证明疾病进展；2：是，仅为经验判断；3：否'
          paperUser:this.state.displaypaper=='block'?this.state.paperUser:'',       //'纸质报告收件人',
          paperPhone:this.state.displaypaper=='block'?this.state.paperPhone:'',      //'纸质报告收件检点',
          paperAddr:this.state.displaypaper=='block'?((this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:''):'',
          // paperUser:this.state.paperUser,       //'纸质报告收件人',
          // paperPhone:this.state.paperPhone,      //'纸质报告收件检点',
          // paperAddr:this.state.displaypaper=='block'?((this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:''):'',
          //paperAddr:(this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:'',
          samplingAddress:(this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail).indexOf('0NaN')=='-1'?this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail:'',    //'取样地址',
          //paperAddr:localStorage.getItem('addr3')?localStorage.getItem('addr3')+this.state.paperAddr:localStorage.getItem('addr1')+this.state.paperAddr,    //'纸质报告接受地址',
          //paperAddr:this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr,    //'纸质报告接受地址',
          samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
          //samplingTime:this.formatTime(this.state.form.samplingTime)?this.formatTime(this.state.form.samplingTime):this.formatTime(this.getCookie('bloodSampleTime')),    //'取样时间', 
          samplingUser:this.state.samplingUser,      //'取样联系人',
          samplingPhone:this.state.samplingPhone,      //'取样电话',
          //samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
          //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
          //hospId:this.state.form.ysHospital,      //'医院名称',
          hospId:this.state.form.ysHospital,
          pickupStartTime:(localStorage.getItem('wuliu').slice(0,5)).toString(),
          pickupEndTime:(localStorage.getItem('wuliu').slice(6,11)).toString(),
        },
        order:{
          number:this.props.geneDetail.code,      //'套餐号',
          title:this.props.geneDetail.title,      //'订单标题',
          doctorId:'',   //'医生Id',
          patientId:'',    //'购买人id',
          prepayId:'',      //'prepay_id',
          patientName:'',      //'购买人姓名',
          barcodeNumber:'',      //'条形码号',
          samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
          //samplingTime:this.formatTime(this.state.form.samplingTime),    //'取样时间',
          coupon:this.state.coupon,            //'优惠券',
          statu:'',           //'0'  '订单状态0:已下单 1:已支付 2:检测完成',
          isPaper:'',  
          // hospitalId: this.state.hospitalId,     //'0'  '是否使用纸质报告',
          //hospId:this.state.hospId,      //'医院名称',
          overInvoice:'' ,   //'0'  '发票是否已开具',
          logisticsType:'',     //'物流运输方式',
          logisticsCode:'',      //'物流单号',
          testingCompanyEmail:'',    
          samplingUser:this.state.samplingUser,      //'取样联系人',
          samplingPhone:this.state.samplingPhone,      //'取样电话',
          //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
          samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
          deptId:'',            //'0'  '创建者dept_id',
          creator:'',          //'创建人Id',
          updater:'',          //'更新人',
          updateTime:'',     //'更新时间',
          createrTime:'',    //'新建时间',
          isDel:'',         //'0'  '删除标识',
          createDate:'',
          payTime:'',       //'付费时间',
          orderMoney:this.state.conponPrice,  //'订单金额',
          geneCompany:this.props.geneDetail.testingCompany,      //'检测公司',
          isUploadReport:'',  //'0'  '是否上传了检测报告',
          
          samplingBeizhu:'',      //'取样备注',
          
          geneFormId:'',    //'电子申请单ID',
          geneCompanyId:'',    //'检测公司ID',
          paperWaybillNo:'',      //'纸质报告运单号',
          isInvoice:this.state.valuepaper,         //'0'  '0：不需要，1：需要',
        }
      })
    }
    if(this.state.sampleType=='3'){
      actions.saveOrder({
        form:{
          email:this.state.email,
          packageName:this.props.geneDetail.title,       //'套餐名称'
          packageCode:this.props.geneDetail.code,      //'套餐代码'
          name:this.state.name,              //'受检人姓名'
          gender:this.state.gender,            //'性别0女，1男'
          birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(localStorage.getItem('Birthday')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('Birthday')):''), 
          //birthday:this.formatTime(this.state.form.Birthday)? this.formatTime(this.state.form.Birthday):this.getCookie('Birthday'),          //'年龄'
          idNum:this.state.idNum,             //'身份证号'
          phone:this.state.phone,             //'电话'
          doctor:this.state.doctor,            //'医生姓名'
          hospital:this.state.form.ysHospitalName,          //'医院名'
          //department:JSON.stringify(this.state.form.department),        //'科室'
          department:this.state.form.department[0], 
          // sampleType:this.state.valuetype,    //血液，组织类型
          sampleType:this.state.sampleType,
          // bloodNum:this.state.bloodNum,          //'血液数量（管）'
          // bloodSampleTime:this.state.form.bloodSampleTime==''?this.formatTime(this.state.form.bloodSampleTime):'',   //'血液采样时间'
          //sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.sampleTime):this.formatTime(this.getCookie('sampleTime')),        //'组织采样时间'
          sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.sampleTime):(this.formatTime(localStorage.getItem('sampleTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('sampleTime')):''),
          //sample:this.state.sample,            //'0：白；1：蜡块；2：蜡卷；3：胸腹水；4：其他'
          //tissueSampleType:this.state.tissueSampleType,
          sampleNum:this.state.sampleNum,         //'样本数量'
          //addressee:this.state.addressee,         //'收件人'
          //addressPhone:this.state.addressPhone,      // '收件人电话'
          //address:this.getCookie('addr1').indexOf('0NaN')=='-1'?this.getCookie('addr1')+this.state.address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,
          //address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,           //'收件人地址'
          //diagnosticCancer:this.state.diagnosticCancer,  //'0：肺癌；1：肺腺癌；2：肺鳞癌；3：肺大细胞癌；4：腺鳞混合型；5：其他'
          diagnosticCancer:this.state.diagnosticCancer?this.state.diagnosticCancer:localStorage.getItem('diagnosticCancer'),
          otherCancerName:this.state.otherCancerName,   //'其他癌名称'
          targetDrugName:this.state.targetDrugName,
          remark:this.state.remark,
          diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):'',
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):(this.formatTime(localStorage.getItem('diagnosticTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('diagnosticTime')):''),
          // diagnosticTime:toString(this.formatTime(this.state.form.diagnosticTime)).indexOf('NaN-0NaN-0NaN 0NaN:0NaN:0NaN')==='-1'?'':this.formatTime(this.state.form.diagnosticTime),
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime),    //'确诊时间'
          drug:(this.state.drug).toString(),
          //drug:this.getCookie('drug')?this.getCookie('drug'):this.state.drug, 
          //drug:sessionStorage.getItem('drug'),           //'0：化疗；1：放疗；2：靶向治疗；3：免疫治疗‘
          otherDrugName:this.state.otherDrugName,     //'其他药名称'
          initial:this.state.valuechuzhi,           //'是否是初始患者0：否；1：是'
          resistance:this.state.resistance,         //'1：是，有影像检测证明疾病进展；2：是，仅为经验判断；3：否'
          paperUser:this.state.displaypaper=='block'?this.state.paperUser:'',       //'纸质报告收件人',
          paperPhone:this.state.displaypaper=='block'?this.state.paperPhone:'',      //'纸质报告收件检点',
          paperAddr:this.state.displaypaper=='block'?((this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:''):'',
          // paperUser:this.state.paperUser,       //'纸质报告收件人',
          // paperPhone:this.state.paperPhone,      //'纸质报告收件检点',
          // paperAddr:this.state.displaypaper=='block'?((this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:''):'',
          //paperAddr:(this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:'',
          samplingAddress:(this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail).indexOf('0NaN')=='-1'?this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail:'',    //'取样地址',
          //paperAddr:localStorage.getItem('addr3')?localStorage.getItem('addr3')+this.state.paperAddr:localStorage.getItem('addr1')+this.state.paperAddr,    //'纸质报告接受地址',
          //paperAddr:this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr,    //'纸质报告接受地址',
          samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
          //samplingTime:this.formatTime(this.state.form.samplingTime)?this.formatTime(this.state.form.samplingTime):this.formatTime(this.getCookie('bloodSampleTime')),    //'取样时间', 
          samplingUser:this.state.samplingUser,      //'取样联系人',
          samplingPhone:this.state.samplingPhone,      //'取样电话',
          //samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
          //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
          //hospId:this.state.form.ysHospital,      //'医院名称',
          hospId:this.state.form.ysHospital,
          pickupStartTime:(localStorage.getItem('wuliu').slice(0,5)).toString(),
          pickupEndTime:(localStorage.getItem('wuliu').slice(6,11)).toString(),
        },
        order:{
          number:this.props.geneDetail.code,      //'套餐号',
          title:this.props.geneDetail.title,      //'订单标题',
          doctorId:'',   //'医生Id',
          patientId:'',    //'购买人id',
          prepayId:'',      //'prepay_id',
          patientName:'',      //'购买人姓名',
          barcodeNumber:'',      //'条形码号',
          samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
          //samplingTime:this.formatTime(this.state.form.samplingTime),    //'取样时间',
          coupon:this.state.coupon,            //'优惠券',
          statu:'',           //'0'  '订单状态0:已下单 1:已支付 2:检测完成',
          isPaper:'',  
          // hospitalId: this.state.hospitalId,     //'0'  '是否使用纸质报告',
          //hospId:this.state.hospId,      //'医院名称',
          overInvoice:'' ,   //'0'  '发票是否已开具',
          logisticsType:'',     //'物流运输方式',
          logisticsCode:'',      //'物流单号',
          testingCompanyEmail:'',    
          samplingUser:this.state.samplingUser,      //'取样联系人',
          samplingPhone:this.state.samplingPhone,      //'取样电话',
          //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
          samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
          deptId:'',            //'0'  '创建者dept_id',
          creator:'',          //'创建人Id',
          updater:'',          //'更新人',
          updateTime:'',     //'更新时间',
          createrTime:'',    //'新建时间',
          isDel:'',         //'0'  '删除标识',
          createDate:'',
          payTime:'',       //'付费时间',
          orderMoney:this.state.conponPrice,  //'订单金额',
          geneCompany:this.props.geneDetail.testingCompany,      //'检测公司',
          isUploadReport:'',  //'0'  '是否上传了检测报告',
          
          samplingBeizhu:'',      //'取样备注',
          
          geneFormId:'',    //'电子申请单ID',
          geneCompanyId:'',    //'检测公司ID',
          paperWaybillNo:'',      //'纸质报告运单号',
          isInvoice:this.state.valuepaper,         //'0'  '0：不需要，1：需要',
        }
      })
    }
    if(this.state.sampleType=='4'){
      actions.saveOrder({
        form:{
          email:this.state.email,
          packageName:this.props.geneDetail.title,       //'套餐名称'
          packageCode:this.props.geneDetail.code,      //'套餐代码'
          name:this.state.name,              //'受检人姓名'
          gender:this.state.gender,            //'性别0女，1男'
          birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(localStorage.getItem('Birthday')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('Birthday')):''), 
          //birthday:this.formatTime(this.state.form.Birthday)? this.formatTime(this.state.form.Birthday):this.getCookie('Birthday'),          //'年龄'
          idNum:this.state.idNum,             //'身份证号'
          phone:this.state.phone,             //'电话'
          doctor:this.state.doctor,            //'医生姓名'
          hospital:this.state.form.ysHospitalName,          //'医院名'
          //department:JSON.stringify(this.state.form.department),        //'科室'
          department:this.state.form.department[0], 
          // sampleType:this.state.valuetype,    //血液，组织类型
          sampleType:this.state.sampleType,
          // bloodNum:this.state.bloodNum,          //'血液数量（管）'
          // bloodSampleTime:this.state.form.bloodSampleTime==''?this.formatTime(this.state.form.bloodSampleTime):'',   //'血液采样时间'
          //sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.sampleTime):this.formatTime(this.getCookie('sampleTime')),        //'组织采样时间'
          sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.sampleTime):(this.formatTime(localStorage.getItem('sampleTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('sampleTime')):''),
          //sample:this.state.sample,            //'0：白；1：蜡块；2：蜡卷；3：胸腹水；4：其他'
          sampleNum:this.state.sampleNum,         //'样本数量'
          otherSample:this.state.otherSample,   //其他样本输入
          //tissueSampleType:this.state.tissueSampleType,
          //addressee:this.state.addressee,         //'收件人'
          //addressPhone:this.state.addressPhone,      // '收件人电话'
          //address:this.getCookie('addr1').indexOf('0NaN')=='-1'?this.getCookie('addr1')+this.state.address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,
          //address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,           //'收件人地址'
          //diagnosticCancer:this.state.diagnosticCancer,  //'0：肺癌；1：肺腺癌；2：肺鳞癌；3：肺大细胞癌；4：腺鳞混合型；5：其他'
          diagnosticCancer:this.state.diagnosticCancer?this.state.diagnosticCancer:localStorage.getItem('diagnosticCancer'),
          otherCancerName:this.state.otherCancerName,   //'其他癌名称'
          targetDrugName:this.state.targetDrugName,
          remark:this.state.remark,
          diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):'',
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):(this.formatTime(localStorage.getItem('diagnosticTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('diagnosticTime')):''),
          // diagnosticTime:toString(this.formatTime(this.state.form.diagnosticTime)).indexOf('NaN-0NaN-0NaN 0NaN:0NaN:0NaN')==='-1'?'':this.formatTime(this.state.form.diagnosticTime),
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime),    //'确诊时间'
          drug:(this.state.drug).toString(),
          //drug:this.getCookie('drug')?this.getCookie('drug'):this.state.drug, 
          //drug:sessionStorage.getItem('drug'),           //'0：化疗；1：放疗；2：靶向治疗；3：免疫治疗‘
          otherDrugName:this.state.otherDrugName,     //'其他药名称'
          initial:this.state.valuechuzhi,           //'是否是初始患者0：否；1：是'
          resistance:this.state.resistance,         //'1：是，有影像检测证明疾病进展；2：是，仅为经验判断；3：否'
          paperUser:this.state.displaypaper=='block'?this.state.paperUser:'',       //'纸质报告收件人',
          paperPhone:this.state.displaypaper=='block'?this.state.paperPhone:'',      //'纸质报告收件检点',
          paperAddr:this.state.displaypaper=='block'?((this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:''):'',
          //paperAddr:(this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:'',
          samplingAddress:(this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail).indexOf('0NaN')=='-1'?this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail:'',    //'取样地址',
          //paperAddr:localStorage.getItem('addr3')?localStorage.getItem('addr3')+this.state.paperAddr:localStorage.getItem('addr1')+this.state.paperAddr,    //'纸质报告接受地址',
          //paperAddr:this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr,    //'纸质报告接受地址',
          samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
          //samplingTime:this.formatTime(this.state.form.samplingTime)?this.formatTime(this.state.form.samplingTime):this.formatTime(this.getCookie('bloodSampleTime')),    //'取样时间', 
          samplingUser:this.state.samplingUser,      //'取样联系人',
          samplingPhone:this.state.samplingPhone,      //'取样电话',
          //samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
          //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
          //hospId:this.state.form.ysHospital,      //'医院名称',
          hospId:this.state.form.ysHospital,
          pickupStartTime:(localStorage.getItem('wuliu').slice(0,5)).toString(),
          pickupEndTime:(localStorage.getItem('wuliu').slice(6,11)).toString(),
        },
        order:{
          number:this.props.geneDetail.code,      //'套餐号',
          title:this.props.geneDetail.title,      //'订单标题',
          doctorId:'',   //'医生Id',
          patientId:'',    //'购买人id',
          prepayId:'',      //'prepay_id',
          patientName:'',      //'购买人姓名',
          barcodeNumber:'',      //'条形码号',
          samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
          //samplingTime:this.formatTime(this.state.form.samplingTime),    //'取样时间',
          coupon:this.state.coupon,            //'优惠券',
          statu:'',           //'0'  '订单状态0:已下单 1:已支付 2:检测完成',
          isPaper:'',  
          // hospitalId: this.state.hospitalId,     //'0'  '是否使用纸质报告',
          //hospId:this.state.hospId,      //'医院名称',
          overInvoice:'' ,   //'0'  '发票是否已开具',
          logisticsType:'',     //'物流运输方式',
          logisticsCode:'',      //'物流单号',
          testingCompanyEmail:'',    
          samplingUser:this.state.samplingUser,      //'取样联系人',
          samplingPhone:this.state.samplingPhone,      //'取样电话',
          //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
          samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
          deptId:'',            //'0'  '创建者dept_id',
          creator:'',          //'创建人Id',
          updater:'',          //'更新人',
          updateTime:'',     //'更新时间',
          createrTime:'',    //'新建时间',
          isDel:'',         //'0'  '删除标识',
          createDate:'',
          payTime:'',       //'付费时间',
          orderMoney:this.state.conponPrice,  //'订单金额',
          geneCompany:this.props.geneDetail.testingCompany,      //'检测公司',
          isUploadReport:'',  //'0'  '是否上传了检测报告',
          
          samplingBeizhu:'',      //'取样备注',
          
          geneFormId:'',    //'电子申请单ID',
          geneCompanyId:'',    //'检测公司ID',
          paperWaybillNo:'',      //'纸质报告运单号',
          isInvoice:this.state.valuepaper,         //'0'  '0：不需要，1：需要',
        }
      })
    }
    if(this.state.sampleType=='5'){
      actions.saveOrder({
        form:{
          email:this.state.email,
          packageName:this.props.geneDetail.title,       //'套餐名称'
          packageCode:this.props.geneDetail.code,      //'套餐代码'
          name:this.state.name,              //'受检人姓名'
          gender:this.state.gender,            //'性别0女，1男'
          birthday:this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.Birthday):(this.formatTime(localStorage.getItem('Birthday')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('Birthday')):''), 
          //birthday:this.formatTime(this.state.form.Birthday)? this.formatTime(this.state.form.Birthday):this.getCookie('Birthday'),          //'年龄'
          idNum:this.state.idNum,             //'身份证号'
          phone:this.state.phone,             //'电话'
          doctor:this.state.doctor,            //'医生姓名'
          hospital:this.state.form.ysHospitalName,          //'医院名'
          //department:JSON.stringify(this.state.form.department),        //'科室'
          department:this.state.form.department[0], 
          // sampleType:this.state.valuetype,    //血液，组织类型
          sampleType:this.state.sampleType,
          // bloodNum:this.state.bloodNum,          //'血液数量（管）'
          // bloodSampleTime:this.state.form.bloodSampleTime==''?this.formatTime(this.state.form.bloodSampleTime):'',   //'血液采样时间'
          //sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.sampleTime):this.formatTime(this.getCookie('sampleTime')),        //'组织采样时间'
          sampleTime:this.formatTime(this.state.form.sampleTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.sampleTime):(this.formatTime(localStorage.getItem('sampleTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('sampleTime')):''),
          //sample:this.state.sample,            //'0：白；1：蜡块；2：蜡卷；3：胸腹水；4：其他'
          //tissueSampleType:this.state.tissueSampleType,
          sampleNum:this.state.sampleNum,         //'样本数量'
          //addressee:this.state.addressee,         //'收件人'
          //addressPhone:this.state.addressPhone,      // '收件人电话'
          //address:this.getCookie('addr1').indexOf('0NaN')=='-1'?this.getCookie('addr1')+this.state.address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,
          //address:this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address,           //'收件人地址'
          //diagnosticCancer:this.state.diagnosticCancer,  //'0：肺癌；1：肺腺癌；2：肺鳞癌；3：肺大细胞癌；4：腺鳞混合型；5：其他'
          diagnosticCancer:this.state.diagnosticCancer?this.state.diagnosticCancer:localStorage.getItem('diagnosticCancer'),
          otherCancerName:this.state.otherCancerName,   //'其他癌名称'
          targetDrugName:this.state.targetDrugName,
          remark:this.state.remark,
          diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):'',
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime):(this.formatTime(localStorage.getItem('diagnosticTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('diagnosticTime')):''),
          // diagnosticTime:toString(this.formatTime(this.state.form.diagnosticTime)).indexOf('NaN-0NaN-0NaN 0NaN:0NaN:0NaN')==='-1'?'':this.formatTime(this.state.form.diagnosticTime),
          //diagnosticTime:this.formatTime(this.state.form.diagnosticTime),    //'确诊时间'
          drug:(this.state.drug).toString(),
          //drug:this.getCookie('drug')?this.getCookie('drug'):this.state.drug, 
          //drug:sessionStorage.getItem('drug'),           //'0：化疗；1：放疗；2：靶向治疗；3：免疫治疗‘
          otherDrugName:this.state.otherDrugName,     //'其他药名称'
          initial:this.state.valuechuzhi,           //'是否是初始患者0：否；1：是'
          resistance:this.state.resistance,         //'1：是，有影像检测证明疾病进展；2：是，仅为经验判断；3：否'
          paperUser:this.state.paperUser,       //'纸质报告收件人',
          paperPhone:this.state.paperPhone,      //'纸质报告收件检点',
          paperAddr:(this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr).indexOf('0NaN')=='-1'?this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr:'',
          samplingAddress:(this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail).indexOf('0NaN')=='-1'?this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail:'',    //'取样地址',
          //paperAddr:localStorage.getItem('addr3')?localStorage.getItem('addr3')+this.state.paperAddr:localStorage.getItem('addr1')+this.state.paperAddr,    //'纸质报告接受地址',
          //paperAddr:this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr,    //'纸质报告接受地址',
          samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
          //samplingTime:this.formatTime(this.state.form.samplingTime)?this.formatTime(this.state.form.samplingTime):this.formatTime(this.getCookie('bloodSampleTime')),    //'取样时间', 
          samplingUser:this.state.samplingUser,      //'取样联系人',
          samplingPhone:this.state.samplingPhone,      //'取样电话',
          //samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
          //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
          //hospId:this.state.form.ysHospital,      //'医院名称',
          hospId:this.state.form.ysHospital,
          pickupStartTime:(localStorage.getItem('wuliu').slice(0,5)).toString(),
          pickupEndTime:(localStorage.getItem('wuliu').slice(6,11)).toString(),
        },
        order:{
          number:this.props.geneDetail.code,      //'套餐号',
          title:this.props.geneDetail.title,      //'订单标题',
          doctorId:'',   //'医生Id',
          patientId:'',    //'购买人id',
          prepayId:'',      //'prepay_id',
          patientName:'',      //'购买人姓名',
          barcodeNumber:'',      //'条形码号',
          samplingTime:this.formatTime(this.state.form.samplingTime).indexOf('0NaN')=='-1'? this.formatTime(this.state.form.samplingTime):(this.formatTime(localStorage.getItem('samplingTime')).indexOf('0NaN')=='-1'?this.formatTime(localStorage.getItem('samplingTime')):''),
          //samplingTime:this.formatTime(this.state.form.samplingTime),    //'取样时间',
          coupon:this.state.coupon,            //'优惠券',
          statu:'',           //'0'  '订单状态0:已下单 1:已支付 2:检测完成',
          isPaper:'',  
          // hospitalId: this.state.hospitalId,     //'0'  '是否使用纸质报告',
          //hospId:this.state.hospId,      //'医院名称',
          overInvoice:'' ,   //'0'  '发票是否已开具',
          logisticsType:'',     //'物流运输方式',
          logisticsCode:'',      //'物流单号',
          testingCompanyEmail:'',    
          samplingUser:this.state.samplingUser,      //'取样联系人',
          samplingPhone:this.state.samplingPhone,      //'取样电话',
          //samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
          samplingAddress:localStorage.getItem('addr2')?localStorage.getItem('addr2')+this.state.addressdetail:localStorage.getItem('addr1')+this.state.addressdetail,
          deptId:'',            //'0'  '创建者dept_id',
          creator:'',          //'创建人Id',
          updater:'',          //'更新人',
          updateTime:'',     //'更新时间',
          createrTime:'',    //'新建时间',
          isDel:'',         //'0'  '删除标识',
          createDate:'',
          payTime:'',       //'付费时间',
          orderMoney:this.state.conponPrice,  //'订单金额',
          geneCompany:this.props.geneDetail.testingCompany,      //'检测公司',
          isUploadReport:'',  //'0'  '是否上传了检测报告',
          
          samplingBeizhu:'',      //'取样备注',
          
          geneFormId:'',    //'电子申请单ID',
          geneCompanyId:'',    //'检测公司ID',
          paperWaybillNo:'',      //'纸质报告运单号',
          isInvoice:this.state.valuepaper,         //'0'  '0：不需要，1：需要',
        }
      })
    }
    // sessionStorage.removeItem('drug');
    sessionStorage.removeItem('addressdetail');
    sessionStorage.removeItem('samplingUser');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('samplingPhone');
    sessionStorage.removeItem('paperAddr');
    sessionStorage.removeItem('addressee');
    sessionStorage.removeItem('paperPhone');
    sessionStorage.removeItem('paperUser');
    sessionStorage.removeItem('addressPhone');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('addr1');

    localStorage.removeItem('tissueSampleType');
    localStorage.removeItem('valueback');
    localStorage.removeItem('address');
    localStorage.removeItem('drug');
    localStorage.removeItem('addressee');
    localStorage.removeItem('addressPhone');
    localStorage.removeItem('addressdetail');
    localStorage.removeItem('addr1');
    localStorage.removeItem('addr2');
    localStorage.removeItem('addr3');
    localStorage.removeItem('name');
    localStorage.removeItem('Birthday');
    localStorage.removeItem('gender');
    localStorage.removeItem('idNum');
    localStorage.removeItem('ysHospitalName');
    localStorage.removeItem('ysHospital');
    localStorage.removeItem('doctor');
    localStorage.removeItem('diagnosticCancer');
    localStorage.removeItem('diagnosticTime');
    localStorage.removeItem('checkeddrug3');
    localStorage.removeItem('paperAddr');
    localStorage.removeItem('paperPhone');
    localStorage.removeItem('paperUser');
    localStorage.removeItem('sampleNum');
    localStorage.removeItem('sampleTime');
    localStorage.removeItem('sampleType');
    localStorage.removeItem('samplingPhone');
    localStorage.removeItem('samplingTime');
    localStorage.removeItem('samplingUser');
    //localStorage.removeItem('ysHospital');
    //localStorage.removeItem('ysHospitalName');
    //localStorage.removeItem('wuliu');
    localStorage.removeItem('otherSample');
    // actions.saveOrder({
    //   form:{
    //     packageName:this.props.geneDetail.title,       //'套餐名称'
    //     packageCode:this.props.geneDetail.code,      //'套餐代码'
    //     name:this.state.name,              //'受检人姓名'
    //     gender:this.state.gender,            //'性别0女，1男'
    //     birthday:this.formatTime(this.state.form.Birthday),          //'年龄'
    //     idNum:this.state.idNum,             //'身份证号'
    //     phone:this.state.phone,             //'电话'
    //     doctor:this.state.doctor,            //'医生姓名'
    //     hospital:this.state.form.ysHospitalName,          //'医院名'
    //     department:this.toString(this.state.form.department),        //'科室'
        
    //     bloodNum:this.state.bloodNum,          //'血液数量（管）'
    //     bloodSampleTime:this.state.form.bloodSampleTime==''?this.formatTime(this.state.form.bloodSampleTime):'',   //'血液采样时间'
    //     sampleTime:this.state.form.sampleTime==''?this.formatTime(this.state.form.sampleTime):'',        //'组织采样时间'
    //     sample:this.state.sample,            //'0：白；1：蜡块；2：蜡卷；3：胸腹水；4：其他'
    //     sampleNum:this.state.sampleNum,         //'样本数量'
    //     addressee:this.state.addressee,         //'收件人'
    //     addressPhone:this.state.addressPhone,      // '收件人电话'
    //     address:this.state.address,           //'收件人地址'
    //     diagnosticCancer:this.state.diagnosticCancer,  //'0：肺癌；1：肺腺癌；2：肺鳞癌；3：肺大细胞癌；4：腺鳞混合型；5：其他'
    //     otherCancerName:this.state.otherCancerName,   //'其他癌名称'
    //     diagnosticTime:this.state.form.diagnosticTime===null?this.formatTime(this.state.form.diagnosticTime):'',    //'确诊时间'
    //     drug:this.state.drug,   
    //     // drug:sessionStorage.getItem('drug'),           //'0：化疗；1：放疗；2：靶向治疗；3：免疫治疗‘
    //     otherDrugName:this.state.otherDrugName,     //'其他药名称'
    //     initial:this.state.valuechuzhi,           //'是否是初始患者0：否；1：是'
    //     resistance:this.state.resistance         //'1：是，有影像检测证明疾病进展；2：是，仅为经验判断；3：否'
    //   },
    //   order:{
    //     number:this.props.geneDetail.code,      //'套餐号',
    //     title:this.props.geneDetail.title,      //'订单标题',
    //     doctorId:'',   //'医生Id',
    //     patientId:'',    //'购买人id',
    //     prepayId:'',      //'prepay_id',
    //     patientName:'',      //'购买人姓名',
    //     barcodeNumber:'',      //'条形码号',
       
    //     coupon:this.state.coupon,            //'优惠券',
    //     statu:'',           //'0'  '订单状态0:已下单 1:已支付 2:检测完成',
    //     isPaper:'',       //'0'  '是否使用纸质报告',
        
    //     overInvoice:'' ,   //'0'  '发票是否已开具',
    //     logisticsType:'',     //'物流运输方式',
    //     logisticsCode:'',      //'物流单号',
    //     testingCompanyEmail:'',  
    //     hospId:this.state.hospId,      //'医院ID',  
    //     samplingUser:this.state.samplingUser,      //'取样联系人',
    //     samplingPhone:this.state.samplingPhone,      //'取样电话',
    //     samplingAddress:this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail,    //'取样地址',
    //     samplingTime:this.formatTime(this.state.samplingTime),    //'取样时间',
    //     paperUser:this.state.paperUser,       //'纸质报告收件人',
    //     paperPhone:this.state.paperPhone,      //'纸质报告收件检点',
    //     paperAddr:this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr,    //'纸质报告接受地址',
    //     deptId:'',            //'0'  '创建者dept_id',
    //     creator:'',          //'创建人Id',
    //     updater:'',          //'更新人',
    //     updateTime:'',     //'更新时间',
    //     createrTime:'',    //'新建时间',
    //     isDel:'',         //'0'  '删除标识',
    //     createDate:'',
    //     payTime:'',       //'付费时间',
    //     orderMoney:this.state.conponPrice,  //'订单金额',
    //     geneCompany:this.props.geneDetail.testingCompany,      //'检测公司',
    //     isUploadReport:'',  //'0'  '是否上传了检测报告',
        
    //     samplingBeizhu:'',      //'取样备注',
        
    //     geneFormId:'',    //'电子申请单ID',
    //     geneCompanyId:'',    //'检测公司ID',
    //     paperWaybillNo:'',      //'纸质报告运单号',
    //     isInvoice:this.state.valuepaper,         //'0'  '0：不需要，1：需要',
    //   }
    // })


      
  //       title: this.props.geneDetail.title,
  //       number: this.props.geneDetail.code,
  //       geneCompany:this.props.geneDetail.testingCompany,
  //       orderMoney:this.state.conponPrice,
  //       samplingUser:this.state.contacts,
  //       samplingPhone:this.state.contactsPhonee,
  //       samplingTime: this.formatTime(this.state.samplingTime),
  //       doctorId: this.state.doctorId,
  //       coupon: this.state.coupon,
  //       hospitalId: this.state.hospitalId,
  //       samplingAddress: this.state.samplingAddress,
  //       testingCompanyEmail:this.props.geneDetail.testingCompanyEmail,
  //       mchId:this.props.geneDetail.mchId,
  //       mchKey:this.props.geneDetail.mchKey,
  //       //新增属性
  //       name:this.state.name,//受检人姓名
  //       idNum:this.state.idNum,//身份证号
  //       doctor:this.state.doctor,
  //       department:this.state.department,
  //       stepbnt:this.state.stepbnt,
  //     //出生日期
  //     hzBirthday: "",
      
      
  //   form:{
  //     // hzBirthday: "",
  //     hzEmergency: "",//紧急联系电话
  //     hzGender: "1",//性别
  //     hzHomeAddr: "",
  //     userMail: "",
  //     username: "",
  //     hzProvince:"",
  //     hzCity:"",
  //     hzRegion:"",
  //     bloodSampleTime:"",
  //     sampleTime:""
  // },
    
    
    // actions.wechatPay()

    // this.props.history.push('/orderFinishPay')
  }
  getCity(cityListqy) {
    let cityArr = []
    let _this = this
    if (cityListqy) {
        cityListqy.forEach((item,index) => {
            cityArr.push({
                key:{index},
                label: item.name,
                value: item.name ,
                children: _this.getArea(item.sons)
            })
        })
    }

    return cityArr

}

getArea(areaList) {
    let areaArr = []
    if (areaList) {
        areaList.forEach((item,index) => {
            areaArr.push({
                key:{index},
                label: item.name,
                value: item.name,
            })
        })
    }
    return areaArr
}
//纸质报告
  getCitybill(cityListbill) {
    let cityArrbill = []
    let _thisbill = this
    if (cityListbill) {
        cityListbill.forEach((itembill,index) => {
            cityArrbill.push({
                key:{index},
                label: itembill.name,
                value: itembill.name ,
                children: _thisbill.getAreabill(itembill.sons),
                
            })
        })
    }

    return cityArrbill

  }

  getAreabill(areaListbill) {
    let areaArrbill = []
    if (areaListbill) {
        areaListbill.forEach((itembill,index) => {
            areaArrbill.push({
                key:{index},
                label: itembill.name,
                value: itembill.name,
            })
        })
    }
    return areaArrbill
  }
  //蜡块返回地址
  getCitylakuai(cityListlakuai) {
    let cityArrlakuai = []
    let _thislakuai = this
    if (cityListlakuai) {
        cityListlakuai.forEach((itemlakuai,index) => {
            cityArrlakuai.push({
                key:{index},
                label: itemlakuai.name,
                value: itemlakuai.name ,
                children: _thislakuai.getArealakuai(itemlakuai.sons),
                
            })
        })
    }

    return cityArrlakuai

  }

  getArealakuai(areaListlakuai) {
    let areaArrlakuai = []
    if (areaListlakuai) {
        areaListlakuai.forEach((itemlakuai,index) => {
            areaArrlakuai.push({
                key:{index},
                label: itemlakuai.name,
                value: itemlakuai.name,
            })
        })
    }
    return areaArrlakuai
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
  useCoupon(){
    if(this.state.isUse){
      return
    }
    if(this.state.coupon){
      if((this.state.coupon).slice(0,1)=='M'){
        this.setState({
          displaypaper: 'none',
        });
      }
      console.log(this.state.coupon)
      console.log((this.state.coupon).slice(0,1))
      
    }
    if(!this.state.coupon){
      Toast.success('请输入优惠券代码', 2)
      return
    }
    this.setState({
      text:"正在获取优惠",
      animating:true
    })
    const {actions} = this.props
    actions.geneConpon({
      code:this.state.coupon
    })
  }
  onChangeRadio = e => {
    console.log('radio checked', e.target.value);
    
    // this.setCookie("valuetype", e.target.value, 30);
    // this.setState({
    //   valuetype: e.target.value,
    // });
    // this.setCookie("sampleType", e.target.value, 30);
    localStorage.setItem("sampleType",e.target.value);
    this.setState({
      sampleType: e.target.value,
    });
  }
  onChangeRadioSmple = e => {
    console.log('radio checked', e.target.value);
    // this.setCookie("tissueSampleType", e.target.value, 30);
    localStorage.setItem("tissueSampleType",e.target.value)
    this.setState({
      tissueSampleType: e.target.value,
    });
    // this.setCookie("sample", e.target.value, 30);
    // this.setState({
    //   sample: e.target.value,
    // });
  };//样本类型：血液
  onChangechuzhi = e => {
    console.log('radio checked', e.target.value);
    //this.setCookie("valuechuzhi", e.target.value, 30);
    this.setState({
      valuechuzhi: e.target.value,
    });
  };
  //寄送方式
  onChangejisong = e => {
    console.log('radio checked', e.target.value);
    //this.setCookie("valuejisong", e.target.value, 30);
    this.setState({
      valuejisong: e.target.value,
    });
  };
  onChangeback = e => {
    console.log('radio checked', e.target.value);
    //this.setCookie("valueback", e.target.value, 30);
    localStorage.setItem("valueback",e.target.value)
    this.setState({
      valueback: e.target.value,
    });
  };
  //是否需要纸质报告
  onChangepaper = e => {
    console.log('radio checked', e.target.value);
    // this.setCookie("valuepaper", e.target.value, 30);
    localStorage.setItem("valuepaper",e.target.value)
    this.setState({
      valuepaper: e.target.value,
    });
  };
  
  onChangetest = e => {
    console.log('radio checked', e.target.value);
    // this.setCookie("valuetest", e.target.value, 30);
    localStorage.setItem("valuetest",e.target.value)
    this.setState({
      valuetest: e.target.value,
    });
  };
  changeStep(stepbnt){
    switch (stepbnt) {
      case 2:
        if (!this.rulesone()) {
          return
        }
        break;
      case 3:
        if (!this.rulestwo()) {
          let newDateblood = new Date();
          return
        }
        break;
      case 4:
        if (!this.rulesthree()) {
          return
        }
        break;
      
      
    }
    
    this.setState(Object.assign(this.state, {stepbnt}))
}
wuliuchoose(){
  if(this.formatTime(this.state.form.samplingTime).slice(0,11)!==this.formatTime(new Date()).slice(0,11)){
    return '1';
  }else{
    if(this.formatTime(new Date()).slice(11,13)=='08' && (this.formatTime(new Date()).slice(14,16)<=40)){
      console.log(8);
      return '8'; 
    }else if(this.formatTime(new Date()).slice(11,13)=='08' && (this.formatTime(new Date()).slice(14,16)>40)){
      console.log(9);
      return '9';
    }else if(this.formatTime(new Date()).slice(11,13)=='09' && (this.formatTime(new Date()).slice(14,16)<=40)){
      console.log(9);
      return '9';
    }else if(this.formatTime(new Date()).slice(11,13)=='09' && (this.formatTime(new Date()).slice(14,16)>40)){
      console.log(10);
      return '10';
    }else if(this.formatTime(new Date()).slice(11,13)=='10' && (this.formatTime(new Date()).slice(14,16)<=40)){
      console.log(10);
      return '10';
    }else if(this.formatTime(new Date()).slice(11,13)=='10' && (this.formatTime(new Date()).slice(14,16)>40)){
      console.log(11);
      return '11';
    }else if(this.formatTime(new Date()).slice(11,13)=='11' && (this.formatTime(new Date()).slice(14,16)<=40)){
      console.log(11);
      return '11';
    }else if(this.formatTime(new Date()).slice(11,13)=='11' && (this.formatTime(new Date()).slice(14,16)>40)){
      console.log(12);
      return '12';
    }else if(this.formatTime(new Date()).slice(11,13)=='12' && (this.formatTime(new Date()).slice(14,16)<=40)){
      console.log(12);
      return '12';
    }else if(this.formatTime(new Date()).slice(11,13)=='12' && (this.formatTime(new Date()).slice(14,16)>40)){
      console.log(13);
      return '13';
    }else if(this.formatTime(new Date()).slice(11,13)=='13' && (this.formatTime(new Date()).slice(14,16)<=40)){
      console.log(13);
      return '13';
    }else if(this.formatTime(new Date()).slice(11,13)=='13' && (this.formatTime(new Date()).slice(14,16)>40)){
      console.log(14);
      return '14';
    }else if(this.formatTime(new Date()).slice(11,13)=='14' && (this.formatTime(new Date()).slice(14,16)<=40)){
      return '14';
    }else if(this.formatTime(new Date()).slice(11,13)=='14' && (this.formatTime(new Date()).slice(14,16)>40)){
      return '15';
    }else if(this.formatTime(new Date()).slice(11,13)=='15' && (this.formatTime(new Date()).slice(14,16)<=40)){
      return '15';
    }else if(this.formatTime(new Date()).slice(11,13)=='15' && (this.formatTime(new Date()).slice(14,16)>40)){
      return '16';
    }else if(this.formatTime(new Date()).slice(11,13)=='16' && (this.formatTime(new Date()).slice(14,16)<=40)){
      return '16';
    }else if(this.formatTime(new Date()).slice(11,13)=='16' && (this.formatTime(new Date()).slice(14,16)>40)){
      return '17';
    }else if(this.formatTime(new Date()).slice(11,13)=='17' && (this.formatTime(new Date()).slice(14,16)<=40)){
      return '17';
    }else if(this.formatTime(new Date()).slice(11,13)=='17' && (this.formatTime(new Date()).slice(14,16)>40)){
      return '18';
    }else if(this.formatTime(new Date()).slice(11,13)=='18' && (this.formatTime(new Date()).slice(14,16)<=40)){
      return '18';
    }else if(this.formatTime(new Date()).slice(11,13)=='18' && (this.formatTime(new Date()).slice(14,16)>40)){
      return '1';
    }else {
      return '1';
    }
  }
  
}
//病理诊断
onChangebingli = e => {
  console.log('radio checked', e.target.value);
  // this.setCookie("diagnosticCancer", e.target.value, 30);
  localStorage.setItem('diagnosticCancer',e.target.value)
  this.setState({
    diagnosticCancer: e.target.value,
  });
};
//是否耐药
onChangetki = e => {
  console.log('radio checked', e.target.value);
  //this.setCookie("resistance", e.target.value, 30);
  this.setState({
    resistance: e.target.value,
  });
};
//性别
onChangegender = e => {
  console.log('radio checked', e.target.value);
  // this.setCookie("gender", e.target.value, 30);
  localStorage.setItem('gender',e.target.value)
  this.setState({
    gender: e.target.value,
    
  });
};

onChangebaxiang= e => {
  console.log('checked =', e.target.value);
  // this.setCookie("checked", e.target.value, 30);
  this.setState({
    checked: e.target.value,
  });
};
// onChangedrug= e => {
//   console.log(`checked = ${e.target.checked}`);
//   console.log('checked', this.drug);
//   this.setState({
//     drug: e.target.value,
//   });
// }
onFocusyshospital=(yshospital,e)=>{
  e.preventDefault();
  e.stopPropagation();
  console.log('yshospital',yshospital)
  localStorage.setItem('yshospital',this.item.hospitalName)
}
onBlurName = (name,e) => {
 //this.setCookie("name", name, 30);
//  sessionStorage.setItem('name',this.state.name)
localStorage.setItem('name',this.state.name)
}
onBluridNum = (idNum,e) => {
  // this.setCookie("idNum", idNum, 30);
  localStorage.setItem('idNum',this.state.idNum)
 }
onBlurDoctor = (doctor,e) => {
  // this.setCookie("doctor", doctor, 30);
  localStorage.setItem('doctor',this.state.doctor)
 }
// onBluraddressdetail=(addressdetail,e)=>{
//   this.setCookie("addressdetail", addressdetail, 30);
// }
// onBlursamplingUser=(samplingUser,e)=>{
//   this.setCookie("samplingUser", samplingUser, 30);
// }
// onBlurqyphone=(samplingPhone,e)=>{
//   this.setCookie("samplingPhone", samplingPhone, 30);
// }
onBlurbloodNum=(bloodNum,e)=>{
  // this.setCookie("bloodNum", bloodNum, 30);
  localStorage.setItem('bloodNum',this.state.bloodNum)
}
onBlursampleNum=(sampleNum,e)=>{
  // this.setCookie("sampleNum", sampleNum, 30);
  localStorage.setItem('sampleNum',this.state.sampleNum)
}
onBlurotherSample=(otherSample,e)=>{
  // this.setCookie("otherSample", otherSample, 30);
  localStorage.setItem('otherSample',this.state.otherSample)
}

onBluraddress=(address,e)=>{
  // this.setCookie("address", address, 30);
  sessionStorage.setItem('address',this.state.address);
  localStorage.setItem('address',this.state.address)
  //this.setCookie("address", address, 30);
  this.setState({
    addressdetail:sessionStorage.getItem('address'),
    paperAddr:sessionStorage.getItem('address')
  })
  
}
onBluraddressee=(addressee,e)=>{
  // this.setCookie("addressee", addressee, 30);
  localStorage.setItem('addressee',this.state.addressee)
  sessionStorage.setItem('addressee',this.state.addressee);
  //this.setCookie("addressee", addressee, 30);
  this.setState({
    samplingUser:sessionStorage.getItem('addressee'),
    paperUser:sessionStorage.getItem('addressee')
  })
}
onBluraddressPhone=(addressPhone,e)=>{
  localStorage.setItem('addressPhone',this.state.addressPhone)
  //this.setCookie("addressPhone", addressPhone, 30);
  sessionStorage.setItem('addressPhone',this.state.addressPhone);
  //this.setCookie("addressPhone", addressPhone, 30);
  this.setState({
    samplingPhone:sessionStorage.getItem('addressPhone'),
    paperPhone:sessionStorage.getItem('addressPhone')
  })
}


onBluraddressdetail=(addressdetail,e)=>{
  localStorage.setItem('addressdetail',this.state.addressdetail)
  //this.setCookie("addressdetail", addressdetail, 30);
  sessionStorage.setItem('addressdetail',this.state.addressdetail);
  //this.setCookie("addressdetail", addressdetail, 30);
}
onBlursamplingUser=(samplingUser,e)=>{
  localStorage.setItem('samplingUser',this.state.samplingUser)
  //this.setCookie("samplingUser", samplingUser, 30);
  sessionStorage.setItem('samplingUser',this.state.samplingUser);
  //this.setCookie("samplingUser", samplingUser, 30);
}
onBlursamplingPhone=(samplingPhone,e)=>{
  localStorage.setItem('samplingPhone',this.state.samplingPhone)
  //this.setCookie("samplingPhone", samplingPhone, 30);
  sessionStorage.setItem('samplingPhone',this.state.samplingPhone);
}


onBlurpaperAddr=(paperAddr,e)=>{
  localStorage.setItem('paperAddr',this.state.paperAddr)
  //this.setCookie("paperAddr", paperAddr, 30);
  sessionStorage.setItem('paperAddr',this.state.paperAddr);
}
onBlurpaperUser=(paperUser,e)=>{
  localStorage.setItem('paperUser',this.state.paperUser)
  //this.setCookie("paperUser", paperUser, 30);
  sessionStorage.setItem('paperUser',this.state.paperUser);
}
onBlurpaperPhone=(paperPhone,e)=>{
  localStorage.setItem('paperPhone',this.state.paperPhone)
  //this.setCookie("paperPhone", paperPhone, 30);
  sessionStorage.setItem('paperPhone',this.state.paperPhone);
  
}


onBlurqyphone=(samplingPhone,e)=>{
  localStorage.setItem('samplingPhone',this.state.samplingPhone)
  //this.setCookie("samplingPhone", samplingPhone, 30);
  sessionStorage.setItem('samplingPhone',this.state.samplingPhone);
}
onBlurbloodNum=(bloodNum,e)=>{
  //this.setCookie("bloodNum", bloodNum, 30);
  localStorage.setItem('bloodNum',this.state.bloodNum)
}
// 将用户输入数据存入cookie
//存储cookie
setCookie=(cname,cvalue,exdays) =>{
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//取到cookie
getCookie=(cname) =>{
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//查看cookie
checkLocalstorage =()=>{
  this.setState({
    name:(localStorage.getItem('name')!==null && localStorage.getItem('name')!=="null")? localStorage.getItem('name'):localStorage.setItem('name',''),
    idNum:(localStorage.getItem('idNum')!==null && localStorage.getItem('idNum')!=="null") ? localStorage.getItem('idNum'):localStorage.setItem('idNum',''),
    doctor:(localStorage.getItem('doctor')!==null && localStorage.getItem('doctor')!=="null") ? localStorage.getItem('doctor'):localStorage.setItem('doctor',''),

    addressdetail:((localStorage.getItem('addressdetail')!==null && localStorage.getItem('addressdetail')!=="null") && (sessionStorage.getItem('addressdetail')!==null && sessionStorage.getItem('addressdetail')!=="null")) ? (localStorage.getItem('addressdetail')?localStorage.getItem('addressdetail'):(sessionStorage.getItem('address'))):localStorage.setItem('addressdetail',''),
    samplingUser:((localStorage.getItem('samplingUser')!==null && localStorage.getItem('samplingUser')!=="null") && (sessionStorage.getItem('samplingUser')!==null && sessionStorage.getItem('samplingUser')!=="null")) ? (localStorage.getItem('samplingUser')?localStorage.getItem('samplingUser'):sessionStorage.getItem('addressee')):localStorage.setItem('samplingUser',''),
    samplingPhone:((localStorage.getItem('samplingPhone')!==null && localStorage.getItem('samplingPhone')!=="null") && (sessionStorage.getItem('samplingPhone')!==null && sessionStorage.getItem('samplingPhone')!=="null")) ? (localStorage.getItem('samplingPhone')?localStorage.getItem('samplingPhone'):sessionStorage.getItem('addressPhone')):localStorage.setItem('samplingPhone',''),

    //paperAddr:((localStorage.getItem('paperAddr')!==null && localStorage.getItem('paperAddr')!=="null") && (sessionStorage.getItem('paperAddr')!==null && sessionStorage.getItem('paperAddr')!=="null"))?(localStorage.getItem('paperAddr')?localStorage.getItem('paperAddr'):sessionStorage.getItem('address')):localStorage.setItem('paperAddr',''),
    paperUser:((localStorage.getItem('paperUser')!==null && localStorage.getItem('paperUser')!=="null") && (sessionStorage.getItem('paperUser')!==null && sessionStorage.getItem('paperUser')!=="null"))?(localStorage.getItem('paperUser')?localStorage.getItem('paperUser'):sessionStorage.getItem('addressee')):localStorage.setItem('paperUser',''),
    paperPhone:((localStorage.getItem('paperPhone')!==null && localStorage.getItem('paperPhone')!=="null") && (sessionStorage.getItem('paperPhone')!==null && sessionStorage.getItem('paperPhone')!=="null")) ? (localStorage.getItem('paperPhone')?localStorage.getItem('paperPhone'):sessionStorage.getItem('addressPhone')):localStorage.setItem('paperPhone',''),
    address:localStorage.getItem('address'),
    //address:(localStorage.getItem('address')!==null && localStorage.getItem('address')!=="null") ? localStorage.getItem('address'):localStorage.setItem('address',''),
    addressee:(localStorage.getItem('addressee')!==null && localStorage.getItem('addressee')!=="null") ? localStorage.getItem('addressee'):localStorage.setItem('addressee',''),
    addressPhone:(localStorage.getItem('addressPhone')!==null && localStorage.getItem('addressPhone')!=="null") ? localStorage.getItem('addressPhone'):localStorage.setItem('addressPhone',''),

    gender:(localStorage.getItem('gender')!==null && localStorage.getItem('gender')!=="null")? localStorage.getItem('gender'):localStorage.setItem('gender',''),
    valuetype:(localStorage.getItem('valuetype')!==null && localStorage.getItem('valuetype')!=="null") ? localStorage.getItem('valuetype'):localStorage.setItem('valuetype',''),
    sampleType:(localStorage.getItem('sampleType')!==null && localStorage.getItem('sampleType')!=="null") ? localStorage.getItem('sampleType'):localStorage.setItem('sampleType',''),
    // drug:this.getCookie('drug'),
    sampleNum:(localStorage.getItem('sampleNum')!==null && localStorage.getItem('sampleNum')!=="null") ? localStorage.getItem('sampleNum'):localStorage.setItem('sampleNum',''),
    otherSample:(localStorage.getItem('otherSample')!==null && localStorage.getItem('otherSample')!=="null") ? localStorage.getItem('otherSample'):localStorage.setItem('otherSample',''),
    bloodNum:(localStorage.getItem('bloodNum')!==null && localStorage.getItem('bloodNum')!=="null") ? localStorage.getItem('bloodNum'):localStorage.setItem('bloodNum',''),
    sample:(localStorage.getItem('sample')!==null && localStorage.getItem('sample')!=="null")? localStorage.getItem('sample'):localStorage.setItem('sample',''),
    tissueSampleType:(localStorage.getItem('tissueSampleType')!==null && localStorage.getItem('tissueSampleType')!=="null") ? localStorage.getItem('tissueSampleType'):localStorage.setItem('tissueSampleType',''),
    //valuechuzhi:this.getCookie('valuechuzhi'),
    valueback:(localStorage.getItem('valueback')!==null && localStorage.getItem('valueback')!=="null") ? localStorage.getItem('valueback'):localStorage.setItem('valueback',''),
    valuepaper:(localStorage.getItem('valuepaper')!==null && localStorage.getItem('valuepaper')!=="null") ? localStorage.getItem('valuepaper'):localStorage.setItem('valuepaper',''),
    valuetest:(localStorage.getItem('valuetest')!==null && localStorage.getItem('valuetest')!=="null") ? localStorage.getItem('valuetest'):localStorage.setItem('valuetest',''),
    diagnosticCancer:(localStorage.getItem('diagnosticCancer')!==null && localStorage.getItem('diagnosticCancer')!=="null") ? localStorage.getItem('diagnosticCancer'):localStorage.setItem('diagnosticCancer',''),
    //resistance:this.getCookie('resistance'),
    extra:(localStorage.getItem('extra')!==null && localStorage.getItem('extra')!=="null") ? localStorage.getItem('extra'):localStorage.setItem('extra',''),
    // sampleTime:localStorage.getItem('sampleTime')?this.formatTime(localStorage.getItem('sampleTime')).replace(/-/g, '/'):localStorage.getItem('sampleTime'),
    // samplingTime:localStorage.getItem('samplingTime')?this.formatTime(localStorage.getItem('samplingTime')).replace(/-/g, '/'):localStorage.getItem('samplingTime'),
    // sampleTime:localStorage.getItem('sampleTime'),
    // samplingTime:localStorage.getItem('samplingTime'),
    // department:this.getCookie('department'),
    //hospId:(localStorage.getItem('ysHospital')!==null && localStorage.getItem('ysHospital')!=="null") ? localStorage.getItem('ysHospital'):localStorage.setItem('ysHospital',''),
    //birthday:localStorage.getItem('Birthday'),
    // birthday:localStorage.getItem('Birthday')?this.formatTime(localStorage.getItem('Birthday')).replace(/-/g, '/'):localStorage.getItem('Birthday'),
    form:{
      //hospId:(localStorage.getItem('ysHospital')!==null && localStorage.getItem('ysHospital')!=="null") ? localStorage.getItem('ysHospital'):localStorage.setItem('ysHospital',''),
      //ysHospitalName:(localStorage.getItem('ysHospitalName')!==null && localStorage.getItem('ysHospitalName')!=="null") ? localStorage.getItem('ysHospitalName'):localStorage.setItem('ysHospitalName',''),
      //birthday:localStorage.getItem('Birthday'),
      //addr1:localStorage.getItem('addr1'),
      //addr2:(localStorage.getItem('addr2')!==null && localStorage.getItem('addr2')!=="null") ? localStorage.getItem('addr2'):localStorage.setItem('addr2',''),
      //addr3:(localStorage.getItem('addr3')!==null && localStorage.getItem('addr3')!=="null") ? localStorage.getItem('addr3'):localStorage.setItem('addr3',''),
      // bloodSampleTime:this.getCookie('bloodSampleTime'),
      // sampleTime:this.getCookie('sampleTime'),
      // diagnosticTime:this.getCookie('diagnosticTime'),
    },
  })
}
//用javascript删除某一个cookie的方法，该方法传入要删除cookie的名称
removeCookie=(cookieName)=> {
  var cookies = document.cookie.split(";");//将所有cookie键值对通过分号分割为数组

  //循环遍历所有cookie键值对
  for (var i = 0; i < cookies.length; i++) {
      //有些cookie键值对前面会莫名其妙产生一个空格，将空格去掉
      if (cookies[i].indexOf(" ") == 0) {
          cookies[i] = cookies[i].substring(1);
      }

      //比较每个cookie的名称，找到要删除的那个cookie键值对
      if (cookies[i].indexOf(cookieName) == 0) {
          var exp = new Date();//获取客户端本地当前系统时间
          exp.setTime(exp.getTime() - 60 * 1000);//将exp设置为客户端本地时间1分钟以前，将exp赋值给cookie作为过期时间后，就表示该cookie已经过期了, 那么浏览器就会将其立刻删除掉

          document.cookie = cookies[i] + ";expires=" + exp.toUTCString();//设置要删除的cookie的过期时间，即在该cookie的键值对后面再添加一个expires键值对，并将上面的exp赋给expires作为值(注意expires的值必须为UTC或者GMT时间，不能用本地时间），那么浏览器就会将该cookie立刻删除掉
          //注意document.cookie的用法很巧妙，在对其进行赋值的时候是设置单个cookie的信息，但是获取document.cookie的值的时候是返回所有cookie的信息

          break;//要删除的cookie已经在客户端被删除掉，跳出循环
      }
  }
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


onChangedrug1 = e => {
 
  this.setState({
   checkeddrug1: e.target.checked,
    
  });
  console.log(this.checkeddrug1)
};
onChangedrug2 = e => {
  
  this.setState({
    checkeddrug2: e.target.checked,
  });
  console.log(this.checkeddrug2)
};
onChangedrug3 = e => {
  
  this.setState({
    checkeddrug3: e.target.checked,
  });
  //this.setCookie("checkeddrug3", e.target.checked, 30);
  localStorage.setItem('checkeddrug3',e.target.checked)
};
onChangedrug4 = e => {
 
  this.setState({
    checkeddrug4: e.target.checked,
  });
};
onChangedrug5 = e => {
  
  this.setState({
    checkeddrug5: e.target.checked,
  });
  localStorage.setItem('checkeddrug5',e.target.checked)
  //this.setCookie("checkeddrug5", e.target.checked, 30);
};
//取样时间
dateFormatByqy=(date)=>{
  let returnDate = ""
  //Android终端
  let isAndroid = /(Android)/i.test(navigator.userAgent);
 //Ios终端
  let isiOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
  console.log(date)
  if(date){
  if(isiOS) {
      returnDate = new Date(date.replace(/-/g, "/"))
  }
}
  if(isAndroid){
      returnDate = new Date(date)
  }
  return returnDate
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
//血液时间
dateFormatByblood=(date)=>{
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
//样本
dateFormatBysample=(date)=>{
  let returnDate = ""
  //Android终端
  let isAndroid = /(Android)/i.test(navigator.userAgent);
 //Ios终端
  let isiOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
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
//胸腹水
dateFormatByxiongfushui=(date)=>{
  let returnDate = ""
  //Android终端
  let isAndroid = /(Android)/i.test(navigator.userAgent);
 //Ios终端
  let isiOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
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
//其他
dateFormatByother=(date)=>{
  let returnDate = ""
  //Android终端
  let isAndroid = /(Android)/i.test(navigator.userAgent);
 //Ios终端
  let isiOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
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
//确诊时间
dateFormatBydiagnosticTime=(date)=>{
  let returnDate = ""
  //Android终端
  let isAndroid = /(Android)/i.test(navigator.userAgent);
 //Ios终端
  let isiOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
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
  let paperAddrlakuai=sessionStorage.getItem('address')
  let paperUserlakuai=sessionStorage.getItem('addressee')
  let oldcheckeddrug3=localStorage.getItem('checkeddrug3')
  let oldcheckeddrug5=localStorage.getItem('checkeddrug5')
  let oldaddress=sessionStorage.getItem('address')
  let olddiagnosticCancer = sessionStorage.getItem('diagnosticCancer')
  const {cityListqy, form,cityListbill,cityListlakuai} = this.state
  const {volunteer,contacts,contactsPhonee,volunteerList,showName} = this.state
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
      //取样时间
  // const CustomChildren = ({ extra, onClick, children }) => (
  //   <Rinput selectBox={true} onDivClick={onClick} label="*取样时间" value={extra} onChange={this.changeInput.bind(this, 'samplingTime')} className="marginTop4" placeholder="请输入取样时间" />
  //   //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  // );

   //let datesamplingTime = this.dateFormatByqy(this.state.form.samplingTime)
  //  console.log('quyang',this.state.form.samplingTime)
  //  let datesamplingTime = this.state.form.samplingTime && this.dateFormatByqy( this.state.form.samplingTime)
  //  let newDatesamplingTime = new Date(datesamplingTime)    
  // //let newDatesamplingTime = new Date(this.state.form.samplingTime)
  // let oldDatesamplingTime = new Date(localStorage.getItem('samplingTime'))
  //   const CustomChildrensamplingTime = ({ extra, onClick, children }) => (
  //         <div className="year_select"  onClick={onClick}>
  //             <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('samplingTime')?(datesamplingTime?newDatesamplingTime.getFullYear():oldDatesamplingTime.getFullYear()):'年'}</div>
  //             <div className="year_select_line" >|</div>
  //             <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('samplingTime')?(datesamplingTime?(newDatesamplingTime.getMonth() + 1) > 9 ? (newDatesamplingTime.getMonth() + 1) : '0' + (newDatesamplingTime.getMonth() + 1):(oldDatesamplingTime.getMonth() + 1) > 9 ? (oldDatesamplingTime.getMonth() + 1) : '0' + (oldDatesamplingTime.getMonth() + 1)):'月'}</div>
  //             <div className="year_select_line" >|</div>
  //             <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('samplingTime')?(datesamplingTime?(newDatesamplingTime.getDate() > 9 ? newDatesamplingTime.getDate() : '0' + newDatesamplingTime.getDate()):(oldDatesamplingTime.getDate() > 9 ? oldDatesamplingTime.getDate() : '0' + oldDatesamplingTime.getDate())):'日'}</div>
  //             <div className="year_select_line" >|</div>
  //             <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('samplingTime')?(datesamplingTime?(newDatesamplingTime.getHours() > 9 ? newDatesamplingTime.getHours() : '0' + newDatesamplingTime.getHours()):(oldDatesamplingTime.getHours() > 9 ? oldDatesamplingTime.getHours() : '0' + oldDatesamplingTime.getHours())):'时'}</div>
  //         </div>
  //     //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  //   );
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
 
  const SelectBoxqy =  ({ extra, onClick, children }) => (
    <Rinput className="marginTop4" value={(form.hzProvince+form.hzCity+form.hzRegion)?(form.hzProvince+form.hzCity+form.hzRegion):'请选择省市区'} onDivClick = {onClick} disabled={true} placeholder="请选择省市区" icon = "address"/>
);
  const SelectBoxbill =  ({ extra, onClick, children }) => (
  <Rinput className="marginTop4" value={(form.billProvince+form.billCity+form.billRegion)?(form.billProvince+form.billCity+form.billRegion):'请选择省市区'} onDivClick = {onClick} disabled={true} placeholder="请选择省市区" icon = "address"/>
);
  let addr1=sessionStorage.getItem('addr1')
  let oldaddr=localStorage.getItem('addr1')
  const SelectBoxlakuai =  ({ extra, onClick, children }) => (
  <Rinput className="marginTop4" value={(form.lakuaiProvince+form.lakuaiCity+form.lakuaiRegion)?(form.lakuaiProvince+form.lakuaiCity+form.lakuaiRegion):'请选择省市区'} onDivClick = {onClick} disabled={true} placeholder="请选择省市区" icon = "address"/>
);

  //受检者生日
  // //let dateori = this.dateFormatByPhone(this.state.form.birthday)
  // let dateori = this.state.form.birthday && this.dateFormatByPhone( this.state.form.birthday)
  // let newDate = new Date(dateori)             
  // let oldDate = new Date(localStorage.getItem('Birthday'))
  // console.log('888',this.formatTime(newDate))
  // console.log('777',newDate)
  // console.log('999',oldDate)
  // console.log('1000',dateori)
  // console.log('000year',newDate.getFullYear())
  // console.log('000',oldDate.getFullYear())
  // console.log('000mo',newDate.getMonth())
  // console.log('000',oldDate.getMonth())
  // console.log('000',newDate.getDate())
  // console.log('000',oldDate.getDate())
  //   const CustomChildrenbir = ({ extra, onClick, children}) => (      
  //         <div className="year_select"  onClick={onClick}> 
  //             {/* <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('Birthday')?(this.state.form.Birthday==''?newDate.getFullYear():oldDate.getFullYear()):'年'}</div> */}
  //             <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('Birthday')?(dateori ? newDate.getFullYear():oldDate.getFullYear()):'年'}</div>
  //             {/* this.formatTime(this.state.form.Birthday).indexOf('0NaN')=='-1' */}
  //             {/* <div className="year_select_one" style={{color:'#333'}}>{this.state.form.Birthday==''?'年':(localStorage.getItem('Birthday')?oldDate.getFullYear():newDate.getFullYear())}</div> */}
  //             <div className="year_select_line">|</div>
  //             <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('Birthday')?(dateori ? (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : '0' + (newDate.getMonth() + 1):(oldDate.getMonth() + 1) > 9 ? (oldDate.getMonth() + 1) : '0' + (oldDate.getMonth() + 1)):'月'}</div>
  //             <div className="year_select_line" >|</div>
  //             <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('Birthday')?(dateori ? (newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()):(oldDate.getDate() > 9 ? oldDate.getDate() : '0' + oldDate.getDate())):'日'}</div>
  //         </div>
  //     //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  //   );
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
    
    //血液取样时间
    //let dateblood = this.dateFormatByblood(this.state.form.sampleTime)
    // let dateblood = this.state.form.samleTime && this.dataFormatByblood( this.state.form.samleTime)
    // let newDateblood = new Date(dateblood)  
     let newDateblood = new Date(this.state.form.sampleTime)
    //let oldDateblood = new Date(localStorage.getItem('sampleTime'))
    const CustomChildrenblood = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?newDateblood.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDateblood.getMonth() + 1) > 9 ? (newDateblood.getMonth() + 1) : '0' + (newDateblood.getMonth() + 1):'月'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDateblood.getDate() > 9 ? newDateblood.getDate() : '0' + newDateblood.getDate()):'日'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDateblood.getHours() > 9 ? newDateblood.getHours() : '0' + newDateblood.getHours()):'时'}</div>
      </div>
  //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  );


    // const CustomChildrenblood = ({ extra, onClick, children }) => (
    //       <div className="year_select"  onClick={onClick}>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(dateblood?newDateblood.getFullYear():oldDateblood.getFullYear()):'年'}</div>
    //           <div className="year_select_line">|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(dateblood?(newDateblood.getMonth() + 1) > 9 ? (newDateblood.getMonth() + 1) : '0' + (newDateblood.getMonth() + 1):(oldDateblood.getMonth() + 1) > 9 ? (oldDateblood.getMonth() + 1) : '0' + (oldDateblood.getMonth() + 1)):'月'}</div>
    //           <div className="year_select_line" >|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(dateblood?(newDateblood.getDate() > 9 ? newDateblood.getDate() : '0' + newDateblood.getDate()):(oldDateblood.getDate() > 9 ? oldDateblood.getDate() : '0' + oldDateblood.getDate())):'日'}</div>
    //           <div className="year_select_line" >|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(dateblood?(newDateblood.getHours() > 9 ? newDateblood.getHours() : '0' + newDateblood.getHours()):(oldDateblood.getHours() > 9 ? oldDateblood.getHours() : '0' + oldDateblood.getHours())):'时'}</div>
    //       </div>
    //   //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    // );
    //样本取样时间
    //let datesample = this.dateFormatBysample(this.state.form.sampleTime)
    // let datesample = this.state.form.samleTime && this.dateFormatBysample( this.state.form.samleTime)
    // let newDatesample = new Date(datesample)  
    //let oldDatesample = new Date(localStorage.getItem('sampleTime'))
    // const CustomChildrensample = ({ extra, onClick, children }) => (
    //       <div className="year_select"  onClick={onClick}>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(this.formatTime(newDatesample).indexOf('NaN')=='-1'?newDatesample.getFullYear():oldDatesample.getFullYear()):'年'}</div>
    //           <div className="year_select_line">|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(this.formatTime(newDatesample).indexOf('NaN')=='-1'?(newDatesample.getMonth() + 1) > 9 ? (newDatesample.getMonth() + 1) : '0' + (newDatesample.getMonth() + 1):(oldDatesample.getMonth() + 1) > 9 ? (oldDatesample.getMonth() + 1) : '0' + (oldDatesample.getMonth() + 1)):'月'}</div>
    //           {/*<div className="year_select_line" >|</div>
    //           <div className="year_select_one">{this.state.form.sampleTime?(newDatesample.getDate() > 9 ? newDatesample.getDate() : '0' + newDatesample.getDate()):'日'}</div>*/}
    //       </div>
    //   //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    // );

    let newDatesample = new Date(this.state.form.sampleTime)
    
    const CustomChildrensample = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?newDatesample.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatesample.getMonth() + 1) > 9 ? (newDatesample.getMonth() + 1) : '0' + (newDatesample.getMonth() + 1):'月'}</div>
          
          
      </div>
  //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  );
 
  //白片取样时间
  let newDatesamplebaipian = new Date(this.state.form.sampleTime)
    
    const CustomChildrensamplebaipian = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?newDatesamplebaipian.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatesamplebaipian.getMonth() + 1) > 9 ? (newDatesamplebaipian.getMonth() + 1) : '0' + (newDatesamplebaipian.getMonth() + 1):'月'}</div>
          
          
      </div>
  //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  );
  
  //蜡块取样时间
  let newDatesamplelakuai = new Date(this.state.form.sampleTime)
    
    const CustomChildrensamplelakuai = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?newDatesamplelakuai.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatesamplelakuai.getMonth() + 1) > 9 ? (newDatesamplelakuai.getMonth() + 1) : '0' + (newDatesamplelakuai.getMonth() + 1):'月'}</div>
          
          
      </div>
  //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  );

  //蜡卷取样时间
  let newDatesamplelajuan = new Date(this.state.form.sampleTime)
    
    const CustomChildrensamplelajuan = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?newDatesamplelajuan.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatesamplelajuan.getMonth() + 1) > 9 ? (newDatesamplelajuan.getMonth() + 1) : '0' + (newDatesamplelajuan.getMonth() + 1):'月'}</div>
          
          
      </div>
  //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  );

  //新鲜组织取样时间
  let newDatesamplexinxianzuzhi = new Date(this.state.form.sampleTime)
    
    const CustomChildrensamplexinxianzuzhi = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?newDatesamplexinxianzuzhi.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatesamplexinxianzuzhi.getMonth() + 1) > 9 ? (newDatesamplexinxianzuzhi.getMonth() + 1) : '0' + (newDatesamplexinxianzuzhi.getMonth() + 1):'月'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatesamplexinxianzuzhi.getDate() > 9 ? newDatesamplexinxianzuzhi.getDate() : '0' + newDatesamplexinxianzuzhi.getDate()):'日'}</div>
          
      </div>
  //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  );


    //胸腹水取样时间
    //let datexiongfushui = this.dateFormatByxiongfushui(this.state.form.sampleTime)
    //let datexiongfushui = this.state.form.samleTime && this.dateFormatByxiongfushui( this.state.form.samleTime)
    //let newDatexiongfushui = new Date(datexiongfushui)  
    let newDatexiongfushui = new Date(this.state.form.sampleTime)
    const CustomChildrenxiongfushui = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?newDatexiongfushui.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatexiongfushui.getMonth() + 1) > 9 ? (newDatexiongfushui.getMonth() + 1) : '0' + (newDatexiongfushui.getMonth() + 1):'月'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatexiongfushui.getDate() > 9 ? newDatexiongfushui.getDate() : '0' + newDatexiongfushui.getDate()):'日'}</div>
          
      </div>
  //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  );

  //脑脊液取样时间
    //let datexiongfushui = this.dateFormatByxiongfushui(this.state.form.sampleTime)
    //let datexiongfushui = this.state.form.samleTime && this.dateFormatByxiongfushui( this.state.form.samleTime)
    //let newDatexiongfushui = new Date(datexiongfushui)  
    let newDatenaojiye = new Date(this.state.form.sampleTime)
    const CustomChildrennaojiye = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?newDatenaojiye.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatenaojiye.getMonth() + 1) > 9 ? (newDatenaojiye.getMonth() + 1) : '0' + (newDatenaojiye.getMonth() + 1):'月'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDatenaojiye.getDate() > 9 ? newDatenaojiye.getDate() : '0' + newDatenaojiye.getDate()):'日'}</div>
          
      </div>
    );

    //let oldDatexiongfushui = new Date(localStorage.getItem('sampleTime'))
    // const CustomChildrenxiongfushui = ({ extra, onClick, children }) => (
    //       <div className="year_select"  onClick={onClick}>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(this.formatTime(newDatexiongfushui).indexOf('NaN')=='-1'?newDatexiongfushui.getFullYear():oldDatexiongfushui.getFullYear()):'年'}</div>
    //           <div className="year_select_line">|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(this.formatTime(newDatexiongfushui).indexOf('NaN')=='-1'?(newDatexiongfushui.getMonth() + 1) > 9 ? (newDatexiongfushui.getMonth() + 1) : '0' + (newDatexiongfushui.getMonth() + 1):(oldDatexiongfushui.getMonth() + 1) > 9 ? (oldDatexiongfushui.getMonth() + 1) : '0' + (oldDatexiongfushui.getMonth() + 1)):'月'}</div>
    //           <div className="year_select_line" >|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(this.formatTime(newDatexiongfushui).indexOf('NaN')=='-1'?(newDatexiongfushui.getDate() > 9 ? newDatexiongfushui.getDate() : '0' + newDatexiongfushui.getDate()):(oldDatexiongfushui.getDate() > 9 ? oldDatexiongfushui.getDate() : '0' + oldDatexiongfushui.getDate())):'日'}</div>
    //           {/* <div className="year_select_line" >|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{this.getCookie('bloodSampleTime')?(this.state.form.bloodSampleTime?(newDateblood.getHours() > 9 ? newDateblood.getHours() : '0' + newDateblood.getHours()):(oldDateblood.getHours() > 9 ? oldDateblood.getHours() : '0' + oldDateblood.getHours())):'时'}</div> */}
    //       </div>
    //   //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    // );
    //其他取样时间
    //let dateother = this.dateFormatByother(this.state.form.sampleTime)
    // let dateother = this.state.form.samleTime && this.dateFormatByother( this.state.form.samleTime)
    // let newDateother = new Date(dateother) 
    let newDateother = new Date(this.state.form.sampleTime)
    const CustomChildrenother = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?newDateother.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDateother.getMonth() + 1) > 9 ? (newDateother.getMonth() + 1) : '0' + (newDateother.getMonth() + 1):'月'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.sampleTime?(newDateother.getDate() > 9 ? newDateother.getDate() : '0' + newDateother.getDate()):'日'}</div>
          
      </div>
  //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  );
    //let oldDateother = new Date(localStorage.getItem('sampleTime'))
    // const CustomChildrenother = ({ extra, onClick, children }) => (
    //       <div className="year_select"  onClick={onClick}>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(this.formatTime(newDateother).indexOf('NaN')=='-1'?newDateother.getFullYear():oldDateother.getFullYear()):'年'}</div>
    //           <div className="year_select_line">|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(this.formatTime(newDateother).indexOf('NaN')=='-1'?(newDateother.getMonth() + 1) > 9 ? (newDateother.getMonth() + 1) : '0' + (newDateother.getMonth() + 1):(oldDateother.getMonth() + 1) > 9 ? (oldDateother.getMonth() + 1) : '0' + (oldDateother.getMonth() + 1)):'月'}</div>
    //           <div className="year_select_line" >|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('sampleTime')?(this.formatTime(newDateother).indexOf('NaN')=='-1'?(newDateother.getDate() > 9 ? newDateother.getDate() : '0' + newDateother.getDate()):(oldDateother.getDate() > 9 ? oldDateother.getDate() : '0' + oldDateother.getDate())):'日'}</div>
    //           {/* <div className="year_select_line" >|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{this.getCookie('bloodSampleTime')?(this.state.form.bloodSampleTime?(newDateblood.getHours() > 9 ? newDateblood.getHours() : '0' + newDateblood.getHours()):(oldDateblood.getHours() > 9 ? oldDateblood.getHours() : '0' + oldDateblood.getHours())):'时'}</div> */}
    //       </div>
    //   //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    // );
    //确诊时间
    //let datediagnosticTime = this.dateFormatBydiagnosticTime(this.state.form.diagnosticTime)
    //let datediagnosticTime = this.state.form.samleTime && this.dateFormatBydiagnosticTime( this.state.form.diagnosticTime)
    //let newDatediagnosticTime = new Date(datediagnosticTime) 
    let newDatediagnosticTime = new Date(this.state.form.diagnosticTime)
    const CustomChildrendiagnosticTime = ({ extra, onClick, children }) => (
      <div className="year_select"  onClick={onClick}>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.diagnosticTime?newDatediagnosticTime.getFullYear():'年'}</div>
          <div className="year_select_line" >|</div>
          <div className="year_select_one" style={{color:'#333'}}>{this.state.form.diagnosticTime?(newDatediagnosticTime.getMonth() + 1) > 9 ? (newDatediagnosticTime.getMonth() + 1) : '0' + (newDatediagnosticTime.getMonth() + 1):'月'}</div>
          
          
      </div>
  //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  );
    //let oldDatediagnosticTime = new Date(localStorage.getItem('diagnosticTime'))
    // const CustomChildrendiagnosticTime = ({ extra, onClick, children }) => (
    //       <div className="year_select"  onClick={onClick}>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('diagnosticTime')?(this.formatTime(newDatediagnosticTime).indexOf('NaN')=='-1'?newDatediagnosticTime.getFullYear():oldDatediagnosticTime.getFullYear()):'年'}</div>
    //           <div className="year_select_line">|</div>
    //           <div className="year_select_one" style={{color:'#333'}}>{localStorage.getItem('diagnosticTime')?(this.formatTime(newDatediagnosticTime).indexOf('NaN')=='-1'?(newDatediagnosticTime.getMonth() + 1) > 9 ? (newDatediagnosticTime.getMonth() + 1) : '0' + (newDatediagnosticTime.getMonth() + 1):(oldDatediagnosticTime.getMonth() + 1) > 9 ? (oldDatediagnosticTime.getMonth() + 1) : '0' + (oldDatediagnosticTime.getMonth() + 1)):'月'}</div>
    //           {/*<div className="year_select_line" >|</div>
    // <div className="year_select_one">{this.state.form.diagnosticTime?(newDatediagnosticTime.getDate() > 9 ? newDatediagnosticTime.getDate() : '0' + newDatediagnosticTime.getDate()):'日'}</div>*/}
    //       </div>
    //   //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    // );
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
const SelectBoxtimezone =  ({ extra, onClick, children }) => (
  <Rinputp label="*物流预约时间段选取(早8点至晚19点为有效预约时间)" className="marginTop4" value={extra} onDivClick = {onClick} disabled={true} placeholder="请选择物流预约时间" />
)

const wuliu1 = [[
  {
    label:'8时-9时',
    value:'08:00-09:00',
  },
  {
    label:'9时-10时',
    value:'09:00-10:00',
  },
  {
    label:'10时-11时',
    value:'10:00-11:00',
  },
  {
    label:'11时-12时',
    value:'11:00-12:00',
  },
  {
    label:'12时-13时',
    value:'12:00-13:00',
  },
  {
    label:'13时-14时',
    value:'13:00-14:00',
  },
  {
    label:'14时-15时',
    value:'14:00-15:00',
  },
  {
    label:'15时-16时',
    value:'15:00-16:00',
  },
  {
    label:'16时-17时',
    value:'16:00-17:00',
  },
  {
    label:'17时-18时',
    value:'17:00-18:00',
  },
  {
    label:'18时-19时',
    value:'18:00-19:00',
  },
  ]];
const wuliu8 = [[
{
  label:'8时-9时',
  value:'08:00-09:00',
},
{
  label:'9时-10时',
  value:'09:00-10:00',
},
{
  label:'10时-11时',
  value:'10:00-11:00',
},
{
  label:'11时-12时',
  value:'11:00-12:00',
},
{
  label:'12时-13时',
  value:'12:00-13:00',
},
{
  label:'13时-14时',
  value:'13:00-14:00',
},
{
  label:'14时-15时',
  value:'14:00-15:00',
},
{
  label:'15时-16时',
  value:'15:00-16:00',
},
{
  label:'16时-17时',
  value:'16:00-17:00',
},
{
  label:'17时-18时',
  value:'17:00-18:00',
},
{
  label:'18时-19时',
  value:'18:00-19:00',
},
]];
const wuliu9 = [[
  {
    label:'9时-10时',
    value:'09:00-10:00',
  },
  {
    label:'10时-11时',
    value:'10:00-11:00',
  },
  {
    label:'11时-12时',
    value:'11:00-12:00',
  },
  {
    label:'12时-13时',
    value:'12:00-13:00',
  },
  {
    label:'13时-14时',
    value:'13:00-14:00',
  },
  {
    label:'14时-15时',
    value:'14:00-15:00',
  },
  {
    label:'15时-16时',
    value:'15:00-16:00',
  },
  {
    label:'16时-17时',
    value:'16:00-17:00',
  },
  {
    label:'17时-18时',
    value:'17:00-18:00',
  },
  {
    label:'18时-19时',
    value:'18:00-19:00',
  },
  ]];
  const wuliu10 = [[
    
    {
      label:'10时-11时',
      value:'10:00-11:00',
    },
    {
      label:'11时-12时',
      value:'11:00-12:00',
    },
    {
      label:'12时-13时',
      value:'12:00-13:00',
    },
    {
      label:'13时-14时',
      value:'13:00-14:00',
    },
    {
      label:'14时-15时',
      value:'14:00-15:00',
    },
    {
      label:'15时-16时',
      value:'15:00-16:00',
    },
    {
      label:'16时-17时',
      value:'16:00-17:00',
    },
    {
      label:'17时-18时',
      value:'17:00-18:00',
    },
    {
      label:'18时-19时',
      value:'18:00-19:00',
    },
    ]];
    const wuliu11 = [[
      
      {
        label:'11时-12时',
        value:'11:00-12:00',
      },
      {
        label:'12时-13时',
        value:'12:00-13:00',
      },
      {
        label:'13时-14时',
        value:'13:00-14:00',
      },
      {
        label:'14时-15时',
        value:'14:00-15:00',
      },
      {
        label:'15时-16时',
        value:'15:00-16:00',
      },
      {
        label:'16时-17时',
        value:'16:00-17:00',
      },
      {
        label:'17时-18时',
        value:'17:00-18:00',
      },
      {
        label:'18时-19时',
        value:'18:00-19:00',
      },
      ]];
      const wuliu12 = [[
        
        {
          label:'12时-13时',
          value:'12:00-13:00',
        },
        {
          label:'13时-14时',
          value:'13:00-14:00',
        },
        {
          label:'14时-15时',
          value:'14:00-15:00',
        },
        {
          label:'15时-16时',
          value:'15:00-16:00',
        },
        {
          label:'16时-17时',
          value:'16:00-17:00',
        },
        {
          label:'17时-18时',
          value:'17:00-18:00',
        },
        {
          label:'18时-19时',
          value:'18:00-19:00',
        },
        ]];
        const wuliu13 = [[
          
          {
            label:'13时-14时',
            value:'13:00-14:00',
          },
          {
            label:'14时-15时',
            value:'14:00-15:00',
          },
          {
            label:'15时-16时',
            value:'15:00-16:00',
          },
          {
            label:'16时-17时',
            value:'16:00-17:00',
          },
          {
            label:'17时-18时',
            value:'17:00-18:00',
          },
          {
            label:'18时-19时',
            value:'18:00-19:00',
          },
          ]];
          const wuliu14 = [[
            
            {
              label:'14时-15时',
              value:'14:00-15:00',
            },
            {
              label:'15时-16时',
              value:'15:00-16:00',
            },
            {
              label:'16时-17时',
              value:'16:00-17:00',
            },
            {
              label:'17时-18时',
              value:'17:00-18:00',
            },
            {
              label:'18时-19时',
              value:'18:00-19:00',
            },
            ]];
            const wuliu15 = [[
              
              {
                label:'15时-16时',
                value:'15:00-16:00',
              },
              {
                label:'16时-17时',
                value:'16:00-17:00',
              },
              {
                label:'17时-18时',
                value:'17:00-18:00',
              },
              {
                label:'18时-19时',
                value:'18:00-19:00',
              },
              ]];
              const wuliu16 = [[
                {
                  label:'16时-17时',
                  value:'16:00-17:00',
                },
                {
                  label:'17时-18时',
                  value:'17:00-18:00',
                },
                {
                  label:'18时-19时',
                  value:'18:00-19:00',
                },
                ]];
                const wuliu17 = [[
              
                  {
                    label:'17时-18时',
                    value:'17:00-18:00',
                  },
                  {
                    label:'18时-19时',
                    value:'18:00-19:00',
                  },
                  ]];
                  const wuliu18 = [[
              
                    {
                      label:'18时-19时',
                      value:'18:00-19:00',
                    },
                    ]];
    return(
      <div>
      {
      this.state.stepbnt==1?<div>
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
      <GoodsListtwo 
        padding=".4rem 0" 
        marginLeft="0" 
        disPlayImg={true} 
        redTab={genes.tab||''} 
        no_code={genes.code||""} 
        type='1' 
        name={genes.title||""} 
        mchId={genes.mchId||''}
        mchKey={genes.mchKey||''}
        money={genes.price} 
        keyWord={genes.yellowTab&&genes.yellowTab.split('-|-')||[]
    } />
    <Rinput 
                label="优惠券"
                icon="text" 
                text={this.state.isUse?"已使用优惠券":"点击使用优惠券"}
                color={this.state.isUse?"#9b9b9b":"#fff"}
                background={this.state.isUse?"#fff":"#ffcb5c"}
                value={this.state.coupon} 
                onClick={this.useCoupon.bind(this)}
                className="marginTop4"
                onChange={this.changeInput.bind(this, 'coupon')} 
                placeholder="如有，请输入优惠券代码" 
          /> 
     <Rinput label="*受检人姓名" value={this.state.name} onChange={this.changeInput.bind(this, 'name')} className="marginTop4" placeholder="请输入受检人姓名" onBlur={this.onBlurName.bind(this,this.state.name)}/>
  
      <div className="reg_label">*出生日期</div>
        <DatePicker
            mode="date"
            minDate={new Date(1900, 1, 1, 0, 0, 0)}
            value={this.state.form.Birthday}
            format="YYYY-MM-DD"
            onChange={date => {
                this.setState(Object.assign(this.state.form, { ['Birthday']: date }))
                // console.log(date)
                // this.setCookie("Birthday", this.formatTime(this.state.form.Birthday), 30);
                // localStorage.setItem('BirthdayH',this.formatTime(this.state.form.Birthday).slice(11,13))
                // localStorage.setItem('BirthdayM',this.formatTime(this.state.form.Birthday).slice(14,16))
                // localStorage.setItem('cd',this.formatTime(new Date()).slice(0,10))
                // localStorage.setItem('ch',this.formatTime(new Date()).slice(11,13))
                // localStorage.setItem('cm',this.formatTime(new Date()).slice(14,16))
            }
          }
            
        >
         <CustomChildrenbir />
        </DatePicker>
        {/* <DatePicker
            mode="datetime"
            extra="出生日期"
            value={this.state.form.Birthday}
            format="YYYY-MM-DD"
            onChange={date => {
              this.setState(Object.assign(this.state.form, { ['Birthday']: date }))
              console.log(date)
            }}
          >
          <CustomChildrenbir/>
    </DatePicker>*/}
        <div className="reg_label">*性别</div>
        <Radio.Group onChange={this.onChangegender}  value={this.state.gender} style={{width:'100%'}}>
        <Radio name="value" value={'1'} style={{width:'50%'}}>男</Radio>
        <Radio name="value" value={'0'} style={{display:'inline-block'}}>女</Radio>
        </Radio.Group>
        <Rinput label="*身份证号" value={this.state.idNum} onChange={this.changeInput.bind(this, 'idNum')} className="marginTop4" placeholder="请输入真实有效的身份证号英文符号一律大写" onBlur={this.onBluridNum.bind(this,this.state.idNum)}/>
        <Rinput style={{color:'#333'}}  label="医生邮箱" value={this.state.email} onChange={this.changeInput.bind(this, 'email')} className="marginTop4" placeholder="请准确输入接收检测报告的医生邮箱（选填）"/>
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
        <Rinput style={{color:'#333'}}  label="*主治医生" value={this.state.doctor} onChange={this.changeInput.bind(this, 'doctor')} className="marginTop4" placeholder="请输入主治医生姓名" onBlur={this.onBlurDoctor.bind(this,this.state.doctor)}/>
        
      </div>
      
  <div className="height15"></div>
        <div className="fooder_bnt displays confirm_order_food">
          <div style={{ flex: '1' }}></div>
        {/*<div onClick={this.changeStep.bind(this,1)} className="close_bnt">
          取消
    </div>*/}
          <div style={{ flex: '1' }}></div>
          <div onClick={this.changeStep.bind(this,2)} className="sub_button floatRight">
            下一步
          </div>
        </div>
        <ActivityIndicator
          toast
          size="large"
          text={this.state.text}
          animating={this.state.animating}
        />
        </Drawer>
  </div>:null
            }
            {
                this.state.stepbnt==2?<div>
                {/*这一块写第二页的代码*/}
                
                <div className="confirm_order">
                <div className="orderconfirm_title">样本信息</div>
                <div className="orderconfirm_subtitle">（申请单中*号项为必填项）</div>
                <div className="reg_label">样本类型</div>
                {/* <Radio.Group onChange={this.onChangeRadio} value={this.state.valuetype} className="radio_info"> */}
                <Radio.Group onChange={this.onChangeRadio} value={this.state.sampleType} className="radio_info">
                
        <Radio className="radio_info marginTop4_radio" value={'1'}>
          *血液
          {this.state.sampleType === '1' ?
            <div>
              {/* <Rinput value={this.state.bloodNum} onChange={this.changeInput.bind(this, 'bloodNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlurbloodNum.bind(this,this.state.bloodNum)}/> */}
              <Rinput type="number" value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
                <span>管（数量）</span>
                <div className="reg_label">*血液采样日期</div>
          <DatePicker
                    className="date_picker_blood"
                    mode="datetime"
                    minDate={new Date(1900, 1, 1, 0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD HH"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                        console.log(date)
                        //this.setCookie("sampleTime", this.formatTime(this.state.form.sampleTime), 30);
                        //localStorage.setItem('sampleTime',this.formatTime(this.state.form.sampleTime))
                    }}
                    
                >
                 <CustomChildrenblood />
                </DatePicker>
                {/* <DatePicker
            mode="datetime"
            extra="血液取样日期"
            value={this.state.form.bloodSampleTime}
            format="YYYY-MM-DD HH:mm"
            onChange={date => {
              this.setState(Object.assign(this.state.form, { ['bloodSampleTime']: date }))
              console.log(date)
            }}
          >
          <CustomChildrenblood />
    </DatePicker> */}
            </div>
            : null}
          
        </Radio>
        <Radio className="radio_info marginTop4_radio" value={'2'}>
          *组织
          {this.state.sampleType === '2' ?
            <div>
            {/* <div className="reg_label">*组织采样日期</div>
          <DatePicker
                    mode="month"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                        console.log(date)
                        //this.setCookie("sampleTime", this.formatTime(this.state.form.sampleTime), 30);
                        //localStorage.setItem('sampleTime',this.formatTime(this.state.form.sampleTime))
                    }}
                >
                 <CustomChildrensample />
          </DatePicker> */}
          {/* <DatePicker
            mode="datetime"
            extra="组织采样日期"
            value={this.state.form.sampleTime}
            format="YYYY-MM-DD"
            onChange={date => {
              this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
              console.log(date)
            }}
          >
          <CustomChildrensample />
    </DatePicker> */}
              <Radio.Group className="radio_info marginTop4_radiotype" onChange={this.onChangeRadioSmple} value={this.state.tissueSampleType}>
              {/* <Radio.Group className="radio_info marginTop4_radiotype" onChange={this.onChangeRadioSmple} value={this.state.tissueSampleType}> */}
              <Radio className="radiostyle marginTop4_radiotype" value={'1'}>
                白&nbsp;&nbsp;&nbsp;&nbsp;片
                {this.state.tissueSampleType === '1' ?
          <div>
          <div className="reg_label">*白片采样日期</div>
          <DatePicker
                    mode="month"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                        console.log(date)
                        //this.setCookie("sampleTime", this.formatTime(this.state.form.sampleTime), 30);
                        //localStorage.setItem('sampleTime',this.formatTime(this.state.form.sampleTime))
                    }}
                >
                 <CustomChildrensamplebaipian />
          </DatePicker>
          <Rinput type="number" value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
          <span>张（数量）</span>
          </div>
          : null}
              </Radio>
              <Radio  className="radiostyle marginTop4_radiotype" value={'2'}>
                蜡&nbsp;&nbsp;&nbsp;&nbsp;块
                
                {this.state.tissueSampleType === '2' ?
          <div>
            <div className="reg_label">*蜡块采样日期</div>
          <DatePicker
                    mode="month"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                        console.log(date)
                        //this.setCookie("sampleTime", this.formatTime(this.state.form.sampleTime), 30);
                        //localStorage.setItem('sampleTime',this.formatTime(this.state.form.sampleTime))
                    }}
                >
                 <CustomChildrensamplelakuai />
          </DatePicker>
            <Rinput type="number" value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
                <span>块（数量）</span>
          <div style={{marginLeft:'0.4rem'}}>
                <div className="reg_label">蜡块是否需要返还</div> 
        <Radio.Group onChange={this.onChangeback}  value={this.state.valueback} style={{width:'100%'}}>
        <Radio name="value" value={'1'} style={{display:'block'}}>
        是
        {this.state.valueback === '1' ?
          <div>
          <Picker 
        data={cityListlakuai}
        onOk={e => {this.setState(Object.assign(this.state.form,{
            lakuaiProvince:e[0],
            lakuaiCity:e[1],
            lakuaiRegion:e[2], 
        }))
        localStorage.setItem('addr1',this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion)
        //this.setCookie("addr1", this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion, 30);
        sessionStorage.setItem('addr1',this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion)
        }}
        onDismiss={e => console.log('dismiss', e)}
    >
        <SelectBoxlakuai />
    </Picker>

          <Rinput  value={this.state.address} onChange={this.changeInput.bind(this, 'address')} className="marginTop4" placeholder="请输入详细地址,精准到门牌号" onBlur={this.onBluraddress.bind(this,this.state.address)}/>
          <Rinput  value={this.state.addressee} onChange={this.changeInput.bind(this, 'addressee')} className="marginTop4" placeholder="请输入收件人" onBlur={this.onBluraddressee.bind(this,this.state.addressee)}/>
          <Rinput  type="number" value={this.state.addressPhone} onChange={this.changeInput.bind(this, 'addressPhone')} className="marginTop4" placeholder="请输入电话" onBlur={this.onBluraddressPhone.bind(this,this.state.addressPhone)}/>
          
          </div>
          : null}
        </Radio>
        <Radio name="value" value={'0'} style={{display:'block'}}>
        否
        </Radio>
      
        </Radio.Group>
                
                </div>
          </div>
          : null}
                
              </Radio>
              <Radio className="radiostyle marginTop4_radiotype" value={'3'}>
                蜡&nbsp;&nbsp;&nbsp;&nbsp;卷
                {this.state.tissueSampleType === '3' ?
          <div>
          <div className="reg_label">*蜡卷采样日期</div>
          <DatePicker
                    mode="month"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                        console.log(date)
                        //this.setCookie("sampleTime", this.formatTime(this.state.form.sampleTime), 30);
                        //localStorage.setItem('sampleTime',this.formatTime(this.state.form.sampleTime))
                    }}
                >
                 <CustomChildrensamplelajuan />
          </DatePicker>
          <Rinput type="number" value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
          <span>卷（数量）</span>
          </div>
          : null}
               
              </Radio>
              <Radio className="radiostyle marginTop4_radiotype" value={'4'}>
                新鲜组织
                {this.state.tissueSampleType === '4' ?
          <div>
          <div className="reg_label">*新鲜组织采样日期</div>
          <DatePicker
                    mode="date"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                        console.log(date)
                        //this.setCookie("sampleTime", this.formatTime(this.state.form.sampleTime), 30);
                        //localStorage.setItem('sampleTime',this.formatTime(this.state.form.sampleTime))
                    }}
                >
                 <CustomChildrensamplexinxianzuzhi />
          </DatePicker>
          <Rinput type="number" value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
          <span>条（数量）</span>
          </div>
          : null}
               
              </Radio>
              {/* <Radio className="radiostyle marginTop4_radiotype" value={'4'}>
                胸腹水
                {this.state.sample === '4' ?
          <div>
          <Rinput type="number" value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
          <span>ml</span>
          </div>
          : null}
              </Radio>
              <Radio className="radiostyle marginTop4_radiotype marginBottom2 otherwidth" value={'5'}>
                其&nbsp;&nbsp;&nbsp;&nbsp;它
                
                
                {this.state.sample === '5' ?
          <div className="otherwidth">
          <Rinput value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="otherwidth marginTop4 r_inputradiotype" placeholder="请输入" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
          </div>
          : null}
                </Radio> */}
            </Radio.Group>
        
            </div>
            : null}
          </Radio> 
          
          <Radio className="radio_info marginTop4_radio" value={'3'}>
          *胸腹水
          {this.state.sampleType === '3' ?
            <div>
              <Rinput type="number" value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
                <span>管（数量）</span>
                <div className="reg_label">*胸腹水采样日期</div>
          <DatePicker
                    className="date_picker_blood"
                    mode="date"
                    minDate={new Date(1900, 1, 1,0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                        console.log(date)
                        //this.setCookie("sampleTime", this.formatTime(this.state.form.sampleTime), 30);
                        //localStorage.setItem('sampleTime',this.formatTime(this.state.form.sampleTime))
                    }}
                    
                >
                 <CustomChildrenxiongfushui />
                </DatePicker>
                
            </div>
            : null}
          
        </Radio>
        <Radio className="radio_info marginTop4_radio" value={'5'}>
          *脑脊液
          {this.state.sampleType === '5' ?
            <div>
              <Rinput type="number" value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
                <span>管（数量）</span>
                <div className="reg_label">*脑脊液采样日期</div>
          <DatePicker
                    className="date_picker_blood"
                    mode="date"
                    minDate={new Date(1900, 1, 1,0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                        console.log(date)
                        //this.setCookie("sampleTime", this.formatTime(this.state.form.sampleTime), 30);
                        //localStorage.setItem('sampleTime',this.formatTime(this.state.form.sampleTime))
                    }}
                    
                >
                 <CustomChildrennaojiye />
                </DatePicker>
                
            </div>
            : null}
          
        </Radio>
        <Radio className="radio_info marginTop4_radio" value={'4'}>
          *其它
          {this.state.sampleType === '4' ?
            <div>
              <Rinput value={this.state.otherSample} onChange={this.changeInput.bind(this, 'otherSample')} className="marginTop4 r_inputradiotypeblock" placeholder="请输入样本名称" onBlur={this.onBlurotherSample.bind(this,this.state.otherSample)}/>
              <Rinput type="number" value={this.state.sampleNum} onChange={this.changeInput.bind(this, 'sampleNum')} className="marginTop4 r_inputradiotype" placeholder="" onBlur={this.onBlursampleNum.bind(this,this.state.sampleNum)}/>
                <span>管（数量）</span>
                <div className="reg_label">*该样本采样日期</div>
          <DatePicker
                    className="date_picker_blood"
                    mode="date"
                    minDate={new Date(1900, 1, 1, 0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                        console.log(date)
                        //this.setCookie("sampleTime", this.formatTime(this.state.form.sampleTime), 30);
                        //localStorage.setItem('sampleTime',this.formatTime(this.state.form.sampleTime))
                    }}
                    
                >
                 <CustomChildrenother />
                </DatePicker>
                
            </div>
            : null}
          
        </Radio>
      </Radio.Group>
      <div className="orderconfirm_titletwo">*病理诊断</div>
        <Radio.Group className="radio_info marginTop4_radiotype" onChange={this.onChangebingli} value={this.state.diagnosticCancer}>
              <Row>
              <Col span={8}>
                <Radio className="radiostyle marginTop4_radiotype" value={'1'}>肺鳞癌</Radio>
              </Col>
              <Col span={8}>
                <Radio className="radiostyle marginTop4_radiotype" value={'2'}>肺腺癌</Radio>
              </Col>
              <Col span={8}>
                <Radio className="radiostyle marginTop4_radiotype" value={'3'}>小细胞癌</Radio>
              </Col>
              <Col span={8}>
                <Radio className="radiostyle marginTop4_radiotype" value={'4'}>大细胞癌</Radio>
              </Col>
              <Col span={8}>
                <Radio className="radiostyle marginTop4_radiotype" value={'5'}>腺鳞癌</Radio>
              </Col>
              </Row>
              <Col span={8}>
              <Radio className="radiostyle marginTop4_radiotype" value={'6'}>其它
              {this.state.diagnosticCancer === '6' ?
              <div>
                <Rinput value={this.state.otherCancerName} onChange={this.changeInput.bind(this, 'otherCancerName')} className="marginTop4 r_inputradiotype_other" placeholder="其它病理" />
              </div>: null}
              </Radio>
              </Col>
              </Radio.Group>
      <div className="reg_label">确诊日期</div>
                  <DatePicker
                        mode="month"
                        minDate={new Date(1900, 1, 1, 0, 0, 0)}
                        value={this.state.form.diagnosticTime}
                        onChange={date => {
                          this.setState(Object.assign(this.state.form, { ['diagnosticTime']: date }))
                          console.log()
                          //this.setCookie("diagnosticTime", this.formatTime(this.state.form.diagnosticTime), 30);
                          //localStorage.setItem('diagnosticTime',this.formatTime(this.state.form.diagnosticTime))
                        }}
                      >
                      <CustomChildrendiagnosticTime/>
                </DatePicker> 
                {/* <DatePicker
            mode="datetime"
            extra="确诊日期"
            value={this.state.diagnosticTime}
            format="YYYY-MM-DD HH:mm"
            onChange={date => {
              this.setState(Object.assign(this.state, { ['diagnosticTime']: date }))
              console.log(date)
            }}
          >
          <CustomChildrendiagnosticTime />
    </DatePicker> */}
      <div className="orderconfirm_titletwo">既往治疗用药史</div>
      <div className="reg_label">*是否接受过靶向治疗</div>
      <Radio.Group onChange={this.onChangechuzhi} value={this.state.valuechuzhi}>
      <Radio value={'1'}>
        是
        {this.state.valuechuzhi === '1' ?
          <div> 
            <div>
            <Rinput value={this.state.targetDrugName} onChange={this.changeInput.bind(this, 'targetDrugName')} className="marginTop4 r_inputradiotype_other" placeholder="请输入靶向药物名称" />
            </div>
            <div className="reg_label">*靶向治疗是否耐药</div> 
                  <Radio.Group onChange={this.onChangetki} value={this.state.resistance} style={{width:'100%'}}>
                    <Radio value={'1'} style={{width:'50%'}}>
                      是
                    </Radio>
                    <Radio value={'0'} style={{position:'absolute',left:'3rem'}}>
                      否
                    </Radio>
          </Radio.Group>
          
          </div>: null}
      </Radio>
      <Radio value={'0'} style={{position:'absolute',left:'3rem'}}>
        否
      </Radio>
      
    </Radio.Group>
    <div className="reg_label">治疗方案 </div>
          
          <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeChecks} value={this.state.drug}>
          
                <Col span={8}>
                  <Checkbox  value="1"
                  checked={this.state.checkeddrug1}
                  onChange={this.onChangedrug1}
                  >化疗</Checkbox>
                  
                </Col>
                <Col span={8}>
                  <Checkbox  value="2"
                  checked={this.state.checkeddrug2}
                  onChange={this.onChangedrug2}
                  >放疗</Checkbox>
                </Col>
                {/*<Col span={8}>
                  <Checkbox  value="3"
                  checked={this.state.checkeddrug3}
                  onChange={this.onChangedrug3}
                  >靶向治疗</Checkbox>
                 
                </Col>*/}
                <Col span={8}>
                  <Checkbox  value="4"
                  checked={this.state.checkeddrug4}
                  onChange={this.onChangedrug4}
                  >免疫治疗</Checkbox>
                </Col>
                
              <Row>
              <Row>
              <Col span={12}>
                  <Checkbox  value="5"
                  checked={this.state.checkeddrug5}
                  onChange={this.onChangedrug5}
                  >其它</Checkbox>
                </Col>
              </Row>
                <Row>
                <Col span={12}>
                <div>
                {this.state.checkeddrug5 && oldcheckeddrug5? 
                  <div>
                  <Rinput value={this.state.otherDrugName} onChange={this.changeInput.bind(this, 'otherDrugName')} className="marginTop4 r_inputradiotype_other" placeholder="其它治疗方案" />
                  </div>
                  : null}
                </div>
                </Col>
                </Row>
              </Row>
          </Checkbox.Group>
      {/* <div className="reg_label">*是否接受过治疗</div> 
      <Radio.Group onChange={this.onChangechuzhi} value={this.state.valuechuzhi}>
      <Radio value={'1'}>
        是
        {this.state.valuechuzhi === '1' ?
          <div>
            <div className="reg_label">是否耐药</div> 
                  <Radio.Group onChange={this.onChangetki} value={this.state.resistance} style={{width:'100%'}}>
                    <Radio value={'1'} style={{width:'50%'}}>
                      是
                    </Radio>
                    <Radio value={'0'} style={{display:'inline-block'}}>
                      否
                    </Radio>
                    </Radio.Group>
                    <Rinput value={this.state.bloodNum} onChange={this.changeInput.bind(this, 'bloodNum')} className="marginTop4 r_inputradiotypeblock" placeholder="请输入药物名称" onBlur={this.onBlurbloodNum.bind(this,this.state.bloodNum)}/> 
          <div className="reg_label">*治疗方案 </div>
          
          <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeChecks} value={this.state.drug}>
          
                <Col span={8}>
                  <Checkbox  value="1"
                  checked={this.state.checkeddrug1}
                  onChange={this.onChangedrug1}
                  >化疗</Checkbox>
                  
                </Col>
                <Col span={8}>
                  <Checkbox  value="2"
                  checked={this.state.checkeddrug2}
                  onChange={this.onChangedrug2}
                  >放疗</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox  value="3"
                  checked={this.state.checkeddrug3}
                  onChange={this.onChangedrug3}
                  >靶向治疗</Checkbox>
                 
                </Col>
                <Col span={8}>
                  <Checkbox  value="4"
                  checked={this.state.checkeddrug4}
                  onChange={this.onChangedrug4}
                  >免疫治疗</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox  value="5"
                  checked={this.state.checkeddrug5}
                  onChange={this.onChangedrug5}
                  >其它</Checkbox>
                </Col>
                <Row>
                <Col span={12}>
                <div>
                {this.state.checkeddrug3 && oldcheckeddrug3 ? 
                  <div>
                  <div className="reg_label">*靶向治疗是否耐药</div> 
                  <Radio.Group onChange={this.onChangetki} value={this.state.resistance} style={{width:'100%'}}>
                    <Radio value={'1'} style={{width:'50%'}}>
                      是
                    </Radio>
                    <Radio value={'0'} style={{display:'inline-block'}}>
                      否
                    </Radio>
                    </Radio.Group>
                  </div>
                  : null}
                </div>
                </Col>
                </Row>
              <Row>
                <Row>
                <Col span={12}>
                <div>
                {this.state.checkeddrug5 && oldcheckeddrug5? 
                  <div>
                  <Rinput value={this.state.otherDrugName} onChange={this.changeInput.bind(this, 'otherDrugName')} className="marginTop4 r_inputradiotype_other" placeholder="其它治疗方案" />
                  </div>
                  : null}
                </div>
                </Col>
                </Row>
              </Row>
          </Checkbox.Group>
          
          </div>: null}
      </Radio>
      <Radio value={'0'} style={{position:'absolute',left:'3rem'}}>
        否
      </Radio>
      
    </Radio.Group> */}
    </div>
    <div className="height15"></div>
        <div className="fooder_bnt displays confirm_order_food">
          <div style={{ flex: '1' }}></div>
          <div onClick={this.changeStep.bind(this,1)} className="close_bnt">
            上一步
            </div>
          <div style={{ flex: '1' }}></div>
          <div onClick={this.changeStep.bind(this,3)} className="sub_button floatRight">
            下一步
          </div>
        </div>
        <ActivityIndicator
          toast
          size="large"
          text={this.state.text}
          animating={this.state.animating}
        />
                </div>:null
            }
            {
                this.state.stepbnt==3?<div>

                {/*//这一块写第三页的代码*/}
                
                <div className="confirm_order">
                
                <div className="orderconfirm_title">物流信息</div>
                <div className="orderconfirm_subtitle">（申请单中*号项为必填项）</div>
                {/* <div className="reg_label">*物流寄送方式</div>  */}
      {/* <Radio.Group onChange={this.onChangejisong} value={this.state.valuejisong} defaultValue={'1'}>
      <Radio value={'1'} >
        平台寄送
        {this.state.valuejisong === '1' ?
          <div>
            
          
          </div>: null}
      </Radio>
      <Radio value={'0'} style={{position:'absolute',left:'3rem'}}>
        自行寄送
        {this.state.valuejisong === '0' ?
          <div>

          </div>:null}
      </Radio>
      
    </Radio.Group> */}
    <div className="reg_label">*取样地址</div>
                <Picker 
                        style={{color:'#333'}} 
                        data={cityListqy}
                        onOk={e => {this.setState(Object.assign(this.state.form,{
                            hzProvince:e[0],
                            hzCity:e[1],
                            hzRegion:e[2], 
                        }))
                        //this.setCookie("addr2", this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion, 30);
                        localStorage.setItem('addr2',this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion)
                      }}
                        onDismiss={e => console.log('dismiss', e)}
                >
                   <SelectBoxqy />
                </Picker>
                <Rinput value={this.state.addressdetail} onChange={this.changeInput.bind(this,'addressdetail')} className="marginTop4" placeholder="请输入详细地址,精准到门牌号" onBlur={this.onBluraddressdetail.bind(this,this.state.addressdetail)}/>
                <div className="reg_label">*取样日期</div>
            <DatePicker
                    className="date_picker_samplingTime"
                    mode="date"
                    minDate={new Date()}
                    value={this.state.form.samplingTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['samplingTime']: date }))
                        console.log(date)
                        //this.setCookie("samplingTime", this.formatTime(this.state.form.samplingTime), 30);
                        localStorage.setItem('samplingTimeD',this.formatTime(this.state.form.samplingTime).slice(0,11));
                        localStorage.setItem('currentD',this.formatTime(new Date()).slice(0,11));
                        localStorage.setItem('currentH',this.formatTime(new Date()).slice(11,13));
                        localStorage.setItem('currentM',this.formatTime(new Date()).slice(14,16));
                        // localStorage.setItem('currentH','10');
                        // localStorage.setItem('currentM','40');
                    }}
                >
                 <CustomChildrensamplingTime/>
                </DatePicker>
                
                <Picker
          value={this.state.form.wuliutime}
          style={{color:'#333'}} 
          // data={wuliu}
          data={(()=>{
            switch(this.wuliuchoose()){
                case '1':return wuliu8;
                case '8':return wuliu8;
                case '9':return wuliu9; 
                case '10':return wuliu10;
                case '11':return wuliu11;
                case '12':return wuliu12;
                case '13':return wuliu13;
                case '14':return wuliu14;
                case '15':return wuliu15;
                case '16':return wuliu16;
                case '17':return wuliu17;
                case '18':return wuliu18;
                default:return wuliu1;
             }
           }
       )()}
          cascade={false}
          onOk={
            e => {this.setState(Object.assign(this.state.form,{wuliutime:e}))
          // console.log(Object.assign(this.state.form,{department:e}),'=============')
          // this.setCookie("department", this.state.form.department, 30)
          localStorage.setItem('wuliu',this.state.form.wuliutime)
          }
        }
            
         //onOk={e=>this.setState({extra:e[0]})}
        //  onOk={v =>this.setState({level:v[0]})}
          //onChange={e=>console.log('dpname',e)}
          onChange={e=>{console.log('wuliutime',this.state.form.wuliutime)
          
          //this.setCookie("wuliu", this.state.extra, 30)
          
        }}
          onDismiss={e => console.log('dismiss', e)}
        >
        <SelectBoxtimezone />
        </Picker>
    <Rinput label="*取样联系人" value={this.state.samplingUser} onChange={this.changeInput.bind(this, 'samplingUser')} className="marginTop4" placeholder="请输入取样联系人姓名" onBlur={this.onBlursamplingUser.bind(this,this.state.samplingUser)}/>   
    <Rinput type="number" label="*联系人电话" value={this.state.samplingPhone} onChange={this.changeInput.bind(this, 'samplingPhone')} className="marginTop4" placeholder="请输入联系人电话" onBlur={this.onBlurqyphone.bind(this,this.state.samplingPhone)}/>            
    {/* <Rinput 
                label="优惠券"
                icon="text" 
                text={this.state.isUse?"已使用优惠券":"使用优惠券"}
                color={this.state.isUse?'#9b9b9b':"#ff6666"}
                value={this.state.coupon} 
                onClick={this.useCoupon.bind(this)}
                className="marginTop4" 
                onChange={this.changeInput.bind(this, 'coupon')} 
                placeholder="如有，请输入优惠券代码" 
          /> */}
    <div>
    <div style={{display: this.state.displaypaper}}>
    <div className="reg_label">*纸质报告及发票寄送地址</div> 
    
    <Picker 
        data={cityListbill}
        onOk={e => {this.setState(Object.assign(this.state.form,{
            billProvince:e[0],
            billCity:e[1],
            billRegion:e[2], 
        }))
        //this.setCookie("addr3", this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion, 30);
        localStorage.setItem('addr3',this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion)
        }}
        onDismiss={e => console.log('dismiss', e)}
    >
        <SelectBoxbill />
    </Picker>
    <Rinput value={this.state.paperAddr} onChange={this.changeInput.bind(this, 'paperAddr')} className="marginTop4" placeholder="请输入详细地址,精准到门牌号" onBlur={this.onBlurpaperAddr.bind(this,this.state.paperAddr)}/>
    <Rinput value={this.state.paperUser} onChange={this.changeInput.bind(this, 'paperUser')} className="marginTop4" placeholder="请输入收件人姓名" onBlur={this.onBlurpaperUser.bind(this,this.state.paperUser)}/>
    <Rinput  type="number" value={this.state.paperPhone} onChange={this.changeInput.bind(this, 'paperPhone')} className="marginTop4" placeholder="请输入电话" onBlur={this.onBlurpaperPhone.bind(this,this.state.paperPhone)}/>
    
    <div className="reg_label" style={{color:'#b30000',lineHeight:'0.4rem'}}>温馨提示：发票抬头默认为受检者姓名。请填写正确寄送地址，以免寄送失败，影响您的接收。</div>
    </div>
{/*<Radio.Group onChange={this.onChangepaper} value={this.state.valuepaper} style={{width:'100%'}}>
<Radio value={1} style={{width:'100%'}}>
  是
  {this.state.valuepaper === 1 ?
    <div>
    <Rinput  value={this.state.paperUser} onChange={this.changeInput.bind(this, 'paperUser')} className="marginTop4" placeholder="请输入收件人" />
    <Rinput  value={this.state.paperPhone} onChange={this.changeInput.bind(this, 'paperPhone')} className="marginTop4" placeholder="请输入电话" />
    {/*<Rinput  value={this.state.paperAddr} onChange={this.changeInput.bind(this, 'paperAddr')} className="marginTop4" placeholder="请输入地址" />
    <Picker 
        data={cityListbill}
        onOk={e => this.setState(Object.assign(this.state.form,{
            billProvince:e[0],
            billCity:e[1],
            billRegion:e[2], 
        }))}
        onDismiss={e => console.log('dismiss', e)}
    >
        <SelectBoxbill />
    </Picker>
    <Rinput value={this.state.paperAddr} onChange={this.changeInput.bind(this, 'paperAddr')} className="marginTop4" placeholder="请输入详细地址,精准到门牌号" />
    </div>
    : null}
</Radio>
<Radio value={2} style={{display:'block'}}>
  否
</Radio>
</Radio.Group>*/}
          </div>

</div>
<div className="height15"></div>
        <div className="fooder_bnt displays confirm_order_food">
          <div style={{ flex: '1' }}></div>
          <div onClick={this.changeStep.bind(this,2)} className="close_bnt">
            上一步
            </div>
          <div style={{ flex: '1' }}></div>
          <div onClick={this.changeStep.bind(this,4)} className="sub_button floatRight">
            下一步
          </div>
        </div>
        <ActivityIndicator
          toast
          size="large"
          text={this.state.text}
          animating={this.state.animating}
        />                
</div>:null
            }
            {
                this.state.stepbnt==4?<div>
                {/*这一块写第四页的代码*/}
                
                <div className="confirm_order">
                
      <div className="orderconfirm_title">请检查您的申请单信息,提交后无法更改</div>
      <div className="orderconfirm_title">如需修改请点击上一步进行修改</div>
      <div className="order_cinfo"><span className="order_title">姓名:</span>  <span className="order_content">{this.state.name}</span></div>
      <div className="order_cinfo"><span className="order_title">出生日期:</span>  <span className="order_content">{this.formatTime(this.state.form.Birthday).slice(0,10)}</span></div>
      <div className="order_cinfo"><span className="order_title">性别:</span>  <span className="order_content">{this.state.gender==1?'男':'女'}</span></div>
      <div className="order_cinfo"><span className="order_title">身份证号:</span>  <span className="order_content">{this.state.idNum}</span></div>
      
      <div className="order_cinfo"><span className="order_title">就诊医院:</span>  <span className="order_content">{this.state.form.ysHospitalName}</span></div>
      <div className="order_cinfo"><span className="order_title">科室:</span> <span className="order_content">{(()=>{
         switch(localStorage.getItem('department')){
             case '1':return '呼吸科';
             case '2':return '胸外科'; 
             case '3':return '肿瘤科';
             case '4':return '放疗科';
             case '5':return '其它';
             default:return null;
          }
        }
    )()}
    </span>
    </div>
    <div className="order_cinfo"><span className="order_title">主治医生:</span>  <span className="order_content">{this.state.doctor}</span></div>
    <div className="order_cinfo"><span className="order_title">医生邮箱:</span>  <span className="order_content">{this.state.email}</span></div>
    <div className="order_cinfo"><span className="order_title">样本类型:</span>  <span className="order_content">{(()=>{
         switch(this.state.sampleType){
             case '1':return '血液';
             case '2':return '组织'; 
             case '3':return '胸腹水';
             case '4':return '其它';
             case '5':return '脑脊液';
             default:return null;
          }
        }
    )()}
    </span>
    </div>
    <div>
    {(()=>{
         switch(this.state.sampleType){
             case '1':return  <div>
             <div className="order_cinfo"><span className="order_title">血液取样日期:</span>  <span className="order_content">{this.formatTime(this.state.form.sampleTime).slice(0,13)}</span></div>
             <div className="order_cinfo"><span className="order_title">血液样本数量:</span>  <span className="order_content">{this.state.sampleNum}管</span></div>
             </div>
             case '2':return  <div>
             <div className="order_cinfo"><span className="order_title">组织取样日期:</span>  <span className="order_content">{this.formatTime(this.state.form.sampleTime).slice(0,7)}</span></div>
             <div>
              {(()=>{
                  switch(this.state.tissueSampleType){
                      case '1':return  <div className="order_cinfo"><span className="order_title">组织样本:</span>  <span className="order_content">白片</span></div>
                      case '2':return  <div>
                      <div className="order_cinfo"><span className="order_title">组织样本:</span>  <span className="order_content">蜡块</span></div>
                      <div>
                        {(()=>{
                            switch(this.state.valueback){
                                case '1':return  <div>
                                <div className="order_cinfo"><span className="order_title">蜡块返还地址:</span>  <span className="order_content">{this.state.form.lakuaiProvince+this.state.form.lakuaiCity+this.state.form.lakuaiRegion+this.state.address}</span></div>
                                <div className="order_cinfo"><span className="order_title">蜡块返还收件人姓名: </span> <span className="order_content">{this.state.addressee}</span></div>
                                <div className="order_cinfo"><span className="order_title">蜡块返还电话:</span>  <span className="order_content">{this.state.addressPhone}</span></div>
                                </div>
                                case '0':return null;
                                default:return null;
                              }
                            }
                        )()}
                        </div>
                      </div>
                      case '3':return  <div className="order_cinfo"><span className="order_title">组织样本:</span>  <span className="order_content">蜡卷</span></div>
                      case '4':return  <div className="order_cinfo"><span className="order_title">组织样本:</span>  <span className="order_content">新鲜组织</span></div>
                      default:return null;
                    }
                  }
              )()}
              </div>
             <div>
                {(()=>{
                    switch(this.state.tissueSampleType){
                        case '1':return  <div className="order_cinfo"><span className="order_title">白片样本数量:</span>  <span className="order_content">{this.state.sampleNum}张</span></div>
                        case '2':return  <div className="order_cinfo"><span className="order_title">蜡块样本数量:</span>  <span className="order_content">{this.state.sampleNum}块</span></div>
                        case '3':return  <div className="order_cinfo"><span className="order_title">蜡卷样本数量:</span>  <span className="order_content">{this.state.sampleNum}卷</span></div>
                        case '4':return  <div className="order_cinfo"><span className="order_title">新鲜组织样本数量:</span>  <span className="order_content">{this.state.sampleNum}条</span></div>
                        default:return null;
                      }
                    }
                )()}
             </div>
             </div>
             case '3':return  <div>
             <div className="order_cinfo"><span className="order_title">胸腹水取样日期:</span>  <span className="order_content">{this.formatTime(this.state.form.sampleTime).slice(0,10)}</span></div>
             <div className="order_cinfo"><span className="order_title">胸腹水样本数量:</span>  <span className="order_content">{this.state.sampleNum}管</span></div>
             </div>
             case '4':return  <div>
             <div className="order_cinfo"><span className="order_title">其他样本取样日期:</span>  <span className="order_content">{this.formatTime(this.state.form.sampleTime).slice(0,10)}</span></div>
             <div className="order_cinfo"><span className="order_title">其他样本数量:</span>  <span className="order_content">{this.state.sampleNum}管</span></div>
             <div className="order_cinfo"><span className="order_title">其他样本名称: </span> <span className="order_content">{this.state.otherSample}</span></div>
             </div>
             case '5':return  <div>
             <div className="order_cinfo"><span className="order_title">脑脊液样本取样日期:</span>  <span className="order_content">{this.formatTime(this.state.form.sampleTime).slice(0,10)}</span></div>
             <div className="order_cinfo"><span className="order_title">脑脊液样本数量:</span>  <span className="order_content">{this.state.sampleNum}管</span></div>
             </div>
             default:return null;
          }
        }
    )()}
    </div>
    
    
    <div className="order_cinfo"><span className="order_title">病理诊断:</span>  <span className="order_content">{(()=>{
      switch(this.state.diagnosticCancer){
          case '1':return '肺鳞癌';
          case '2':return '肺腺癌'; 
          case '3':return '小细胞癌';
          case '4':return '大细胞癌';
          case '5':return '腺鳞癌';
          case '6':return <div className="order_cinfo"><span className="order_title">其它:</span>  <span className="order_content">{this.state.otherCancerName}</span></div>
          default:return null;
       }
     }
 )()}
 </span>
 </div>
 <div className="order_cinfo"><span className="order_title">确诊日期:</span>  <span className="order_content">{this.formatTime(this.state.form.diagnosticTime).indexOf('0NaN')=='-1'?this.formatTime(this.state.form.diagnosticTime).slice(0,7):''}</span></div>
 <div className="order_cinfo" style={{position:'relative'}}><span className="order_title">是否接受过靶向治疗:</span>  {(()=>{
  switch(this.state.valuechuzhi){
      case '0':return <span className="order_content">否</span>
      case '1':return <div>
      <span className="order_content" style={{position:'absolute',top:'16%',left:'26%'}}>是</span>
      <div className="order_cinfo"><span className="order_title">药物名称:</span>  <span className="order_content">{this.state.targetDrugName}</span></div>
        <div className="order_cinfo"><span className="order_title">靶向治疗是否耐药:</span>  <span className="order_content">{(()=>{
          switch(this.state.resistance){
              case '0':return '否';
              case '1':return '是' 
              default:return null;
          }
        }
        )()}
        </span>
        
        </div>
        <div className="order_cinfo"><span className="order_title">治疗方案:</span>  {(()=>{
          switch(localStorage.getItem('drug')){
              case "1":return <span className="order_content">化疗</span>
              case "1,2":return <span className="order_content">化疗,放疗</span>
              case "2,1":return <span className="order_content">化疗,放疗</span>
              case "1,2,4":return <span className="order_content">化疗,放疗,免疫治疗</span>
              case "1,4,2":return <span className="order_content">化疗,放疗,免疫治疗</span>
              case "4,2,1":return <span className="order_content">化疗,放疗,免疫治疗</span>
              case "4,1,2":return <span className="order_content">化疗,放疗,免疫治疗</span>
              case "2,1,4":return <span className="order_content">化疗,放疗,免疫治疗</span>
              case "2,4,1":return <span className="order_content">化疗,放疗,免疫治疗</span>
              case "1,4,5":return <div>
              <span className="order_content">化疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "1,2,5":return <div>
              <span className="order_content">化疗,放疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "2,4,5":return <div>
              <span className="order_content">放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "1,2,4,5":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "1,2,5,4":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "1,5,2,4":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "1,5,4,2":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "1,4,2,5":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "1,4,5,2":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "2,1,4,5":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "2,1,5,4":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "2,4,1,5":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "2,4,5,1":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "2,5,4,1":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "2,5,1,4":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "4,2,5,1":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "4,1,5,2":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "4,5,2,1":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "4,5,1,2":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "4,1,2,5":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "4,2,1,5":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "5,2,4,1":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "5,2,1,4":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "5,1,2,4":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "5,1,4,2":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "5,4,2,1":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "5,4,5,1":return <div>
              <span className="order_content">化疗,放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              </div>;
              case "2":return <span className="order_content">放疗</span>
              case "2,4":return <span className="order_content">放疗,免疫治疗</span>
              case "4,2":return <span className="order_content">放疗,免疫治疗</span>
              case "1,5,4":return <div>
              <span className="order_content">化疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
            case "1,5":return <div>
            <span className="order_content">化疗</span>
            <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
            case "1,4":return <div>
            <span className="order_content">化疗,免疫治疗</span>
            </div>;
            case "4,1":return <div>
            <span className="order_content">化疗,免疫治疗</span>
            </div>;
            case "2,5":return <div>
            <span className="order_content">放疗</span>
            <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
            case "5，2":return <div>
            <span className="order_content">放疗</span>
            <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
            case "5,1":return <div>
            <span className="order_content">化疗</span>
            <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "2,5,4":return <div>
              <span className="order_content">放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "4,2,5":return <div>
              <span className="order_content">放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "4,5,2":return <div>
              <span className="order_content">放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "5,4,2":return <div>
              <span className="order_content">放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "5,2,4":return <div>
              <span className="order_content">放疗,免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "4":return <span className="order_content">免疫治疗</span>;
              case "4,5":return <div>
              <span className="order_content">免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "5,4":return <div>
              <span className="order_content">免疫治疗</span>
              <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
            </div>;
              case "5":return <span className="order_content">其它  治疗方案:{this.state.otherDrugName}</span>
              default:return null;
           }
         }
        )()}
        </div>
        </div>; 
      default:return null;
   }
 }
)()}
</div>
<div className="order_cinfo"><span className="order_title">取样地址:</span>  <span className="order_content">{this.state.form.hzProvince+this.state.form.hzCity+this.state.form.hzRegion+this.state.addressdetail}</span></div>
<div className="order_cinfo"><span className="order_title">取样人姓名:</span>  <span className="order_content">{this.state.samplingUser}</span></div>
<div className="order_cinfo"><span className="order_title">取样联系人电话:</span>  <span className="order_content">{this.state.samplingPhone}</span></div>
<div className="order_cinfo"><span className="order_title">取样日期:</span>  <span className="order_content">{this.formatTime(this.state.form.samplingTime).slice(0,10)}</span></div>
<div className="order_cinfo"><span className="order_title">取样时间段:</span>  <span className="order_content">{localStorage.getItem('wuliu')}</span></div>
<div style={{display: this.state.displaypaper}}>
<div className="order_cinfo"><span className="order_title">纸质报告发送地址:</span>  <span className="order_content">{this.state.form.billProvince+this.state.form.billCity+this.state.form.billRegion+this.state.paperAddr}</span></div>
<div className="order_cinfo"><span className="order_title">纸质报告收件人姓名:</span>  <span className="order_content">{this.state.paperUser}</span></div>
<div className="order_cinfo"><span className="order_title">纸质报告收件人电话:</span>  <span className="order_content">{this.state.paperPhone}</span></div>
</div>
<GoodsListthree 
padding=".4rem 0" 
marginLeft="0" 
disPlayImg={true} 
redTab={genes.tab||''} 
no_code={genes.code||""} 
type='1' 
name={genes.title||""} 
money={genes.price} 
keyWord={genes.yellowTab&&genes.yellowTab.split('-|-')||[]
} />
      
          <Rinputt style={{color:'#333'}}  label="备注信息（选填）" value={this.state.remark} onChange={this.changeInput.bind(this, 'remark')} className="marginTop4" placeholder="请输入备注信息(100字内)"/>
          {/*<List renderHeader={() => '备注'}>
            <TextareaItem
            value={this.state.getFieldProps}
            {...getFieldProps('count', {
              initialValue: '请输入您的备注信息',
            },
            console.log('tag', ...getFieldProps)
            )
            
          }
          
            rows={5}
            count={100}
          />
          
        </List>*/}
      <div className="reg_label">温馨提示</div> 
<div className="order_tips">1.检测完成后发票同纸质报告会寄送到您输入的指定地址，发票默认为个人发票</div>
<div className="order_tips">2.检测完成后可在“查看报告”里查看电子报告单</div> 
<div className="order_tips">3.为保证血液新鲜度提高检测准确度，采血时间距物流取样时间最长不超过24小时，建议确认好取样时间后确定采血</div>
<div className="order_tips">4.纸质报告、发票、蜡块需要返样时如收件人填写不规范，收件人姓名将会更改为受检人姓名</div>
      </div>
      <div className="height15"></div>
        <div className="fooder_bnt displays confirm_order_food">
          <div style={{ flex: '1' }}></div>
          <div onClick={this.changeStep.bind(this,3)} className="close_bnt">
            上一步
            </div>
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
                </div>:null
            }
            
        </div>
          
    )
  
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
    geneDetail: state.user.geneDetail,
    searchDoctorState: state.user.searchDoctorState,
    msg: state.user.msg,
    serDoctorList: state.user.serDoctorList,
    saveOrderState: state.user.saveOrderState,
    geneConponState: state.user.geneConponState,
    conpon: state.user.conpon,
    wxPayState: state.user.wxPayState,
    wxPayStateNew:state.user.wxPayStateNew,
    wxPay: state.user.wxPay,
    getVolunteer:state.user.getVolunteer,
    volunteer:state.user.volunteer,
    getMyDoctoeState:state.user.getMyDoctoeState,
    myDoctor:state.user.myDoctor,
    mchId:state.user.mchId,
    mchKey:state.user.mchKey,
    stepbnt:state.user.stepbnt,
    hospList: state.user.hospList,
    setting: state.user.setting,
    proList:state.user.proList,
    getPro:state.user.getPro,
    cityListqy:state.user.cityListqy,
    cityList:state.user.cityList,
    getCity:state.user.getCity,
    areaList:state.user.areaList,
    getArea:state.user.getArea,
    cityListbill:state.user.cityListbill,
    cityListlakuai:state.user.cityListlakuai,
    getCitybill:state.user.getCitybill,
    areaListbill:state.user.areaListbill,
    getAreabill:state.user.getAreabill,
    addHosp:state.user.addHosp,
    getHospState: state.user.getHospState,
    user: state.user.user,
    loginState: state.user.loginState,
    department:state.user.department,
    wuliutime:state.user.wuliutime,
    tissueSampleType:state.user.tissueSampleType
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
