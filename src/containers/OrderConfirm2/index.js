import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Icon,Radio, Input,Checkbox, Row, Col } from 'antd';
import { Drawer, Toast, ActivityIndicator, DatePicker,Picker } from 'antd-mobile';
import GoodsListtwo from '../../components/GoodsListtwo';
import GoodsListthree from '../../components/GoodsListthree';
import selectYes from '../../sources/yes.png'
import Rinput from '../../components/RegInput'
import './index.scss';
import * as actions from './../../actions';
import SearchBar from '../../components/SearchBar'
import SelectDoctorList from '../../components/SelectDoctorList'
import ceshi from '../../sources/ceshi.jpeg'
import 'antd-mobile/dist/antd-mobile.css';
import {appId,WXKEY} from './../../actions/config'
const FormItem = Form.Item;
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      statepage:1,//拆分页面
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
      ysHospital: '',
      samplingTime: '',//取样时间
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
      department:'',
      valuetype: 1,//血液组织
      valuesampletype: 2,
      valuechuzhi: 2,
      valueback: 1,
      valuepaper: 1,
      form:{
        hzBirthday: "",
        hzEmergency: "",//紧急联系电话
        hzGender: "1",//性别
        hzHomeAddr: "",
        userMail: "",
        username: "",
        hzProvince:"",
        hzCity:"",
        hzRegion:"",
        bloodSampleTime:"",
        sampleTime:""
    },

    }
    this.getSign = this.getSign.bind(this)
  }
  componentWillReceiveProps(nextprops) {
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
    //
    if(this.props.loginState!=nextprops.loginState&&nextprops.loginState=='succ'){
      let user = nextprops.user
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
     
      
      if(user.entity&&user.entity.hzBirthday){
          if (isAndroid) {
            user.entity.hzBirthday = new Date(user.entity.hzBirthday)
          }
          if (isIOS) {
            user.entity.hzBirthday = new Date(user.entity.hzBirthday.replace(/-/g, "/"))
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
      if(user.doctors){
          let docArr = []
          user.doctors.map((item)=>{
              docArr.push(item.id)
          })
          this.setState({
              doctorItems:user.doctors,//绑定医生详情
              doctors:docArr,//绑定医生
          })
      }
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
    console.log('mchId:',this.props.geneDetail.mchId);//获取mchId成功
    document.title = '确认订单'
    const { match, actions } = this.props;
    const { params: { packageId } } = match;
    if (!this.props.geneDetail.id) {
      this.props.history.push(`/detail/${packageId}`)
    }
    actions.myDoctor()
    this.setState({
      price: this.props.geneDetail.price,
      conponPrice:this.props.geneDetail.price
    })
  }
  componentDidMount() {

  }

  //获取md5签名
  getSign(params){
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
    return str.toUpperCase()
}
  goBack() {
    this.props.history.goBack()
  }
  rules() {
    if (!this.state.samplingTime) {
      Toast.fail('请选择取样时间', 2)
      return false
    }
    if (!this.state.doctorId) {

      Toast.fail('请绑定医生', 2)
      return false
    }
    if (!this.state.samplingAddress) {
      Toast.fail('请输入取样地址', 2)
      return false
    }
    
    if(!this.state.contacts){
      Toast.fail('请选择取样联系人', 2)
      return false
    }
    //新增属性
    if (!this.state.name) {
      Toast.fail('请输入受检人姓名', 2)
      return false
    }
    if (!this.state.idNum) {
      Toast.fail('请输入身份证号', 2)
      return false
    }
    if (!this.state.doctor) {
      Toast.fail('请输入医生姓名', 2)
      return false
    }
    if (!this.state.department) {
      Toast.fail('请输入科室', 2)
      return false
    }
    return true
  }
  goNext() {
    const { actions } = this.props
    if (!this.rules()) {
      return
    }
    this.setState({
      animating: true,
      text: '正在提交...'
    })
    actions.saveOrder({
      title: this.props.geneDetail.title,
      number: this.props.geneDetail.code,
      geneCompany:this.props.geneDetail.testingCompany,
      orderMoney:this.state.conponPrice,
      samplingUser:this.state.contacts,
      samplingPhone:this.state.contactsPhonee,
      samplingTime: this.formatTime(this.state.samplingTime),
      doctorId: this.state.doctorId,
      coupon: this.state.coupon,
      hospitalId: this.state.hospitalId,
      samplingAddress: this.state.samplingAddress,
      testingCompanyEmail:this.props.geneDetail.testingCompanyEmail,
      mchId:this.props.geneDetail.mchId,
      //新增属性
      name:this.state.name,//受检人姓名
      idNum:this.state.idNum,//身份证号
      doctor:this.state.doctor,
      department:this.state.department,

    //出生日期
    form:{
      hzBirthday: "",
      hzEmergency: "",//紧急联系电话
      hzGender: "1",//性别
      hzHomeAddr: "",
      userMail: "",
      username: "",
      hzProvince:"",
      hzCity:"",
      hzRegion:"",
      bloodSampleTime:"",
      sampleTime:""
  },
    })
    // actions.wechatPay()

    // this.props.history.push('/orderFinishPay')
  }
  onOpenChange = (...args) => {
    this.setState({
      searchValue:'',
      serDoctorList:[],
      open: !this.state.open,
    });
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
  }
  search() {
    if (!this.state.searchValue) {
      Toast.fail('请输入医生姓名', 2)
      return
    }
    this.setState({
      animating: true,
      text: '搜索中...'
    })
    const { actions } = this.props
    actions.searchDoctor({
      name: this.state.searchValue
    })
  }
  selectDoctor(item) {
    const {actions} = this.props
    actions.getVolunteer({
      doctorId:item.id,
      isHengrui:this.props.geneDetail.isHengRui == '0'?false:true
    })
    this.setState({
      doctorId: item.id,
      contactsPhonee:'',
      contacts:'',
      showName:'',
    })
  }
  subSelectDoctor(item) {
    this.setState({
      open: !this.state.open,
      doctorId: item.id,
      doctorName: item.username,
      ysHospital: item.ysHospitalName,
      samplingAddress:item.ysHospitalName
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
    return reTime
  }
  useCoupon(){
    if(this.state.isUse){
      return
    }
    if(!this.state.coupon){
      Toast.fail('请输入优惠券代码', 2)
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
    console.log('radio checked', e.target.valuetype);
    this.setState({
      value: e.target.valuetype,
    });
  }
  onChangeRadioSmple = e => {
    console.log('radio checked', e.target.valuesampletype);
    this.setState({
      value: e.target.valuesampletype,
    });
  };
  onChangechuzhi = e => {
    console.log('radio checked', e.target.valuechuzhi);
    this.setState({
      value: e.target.valuechuzhi,
    });
  };
  onChangeback = e => {
    console.log('radio checked', e.target.valueback);
    this.setState({
      value: e.target.valueback,
    });
  };
  onChangepaper = e => {
    console.log('radio checked', e.target.valuepaper);
    this.setState({
      value: e.target.valuepaper,
    });
  };
  onChangeChecks=checkedValues=>{
    console.log('checked = ', checkedValues);
  }
  render() {
    const {volunteer,contacts,contactsPhonee,volunteerList,showName} = this.state
    const genes = this.props.geneDetail
    const {myDoctor,statuspage} = this.props
    console.log("【获取我的医生】",myDoctor)
    


    const sidebar = (<div >
      <div className="close_icon" onClick={this.onOpenChange}><Icon type="close" /> </div>
      <div className="Drawer_content">
        <SearchBar
          backgroundColor="#ffffff"
          placeholder="请输入医生姓名"
          value={this.state.searchValue}
          onChange={this.changeSearch.bind(this)}
          searchBnt={this.search.bind(this)}
        />
        <div className="tips-title">搜索结果</div>
        {
          this.state.serDoctorList.map((item, index) => {
            return <SelectDoctorList
              onClick={this.selectDoctor.bind(this, item)}
              select={this.state.doctorId == item.id}
              onClickCertain={this.subSelectDoctor.bind(this, item)}
              key={index}
              src={item.wxPortrait}
              name={item.username}
              content={item.ysHospitalName + "  " + item.ysDepartment}
            />
          })
        }
        <div className="tips-title">我的医生</div>
        {
          myDoctor.map((item, index) => {
            return <SelectDoctorList
              onClick={this.selectDoctor.bind(this, item)}
              select={this.state.doctorId == item.id}
              onClickCertain={this.subSelectDoctor.bind(this, item)}
              key={index}
              src={item.wxPortrait}
              name={item.username}
              content={item.ysHospitalName + "  " + item.ysDepartment}
            />
          })
        }
      </div>
    </div>);
    const CustomChildren = ({ extra, onClick, children }) => (
      <Rinput selectBox={true} onDivClick={onClick} label="取样时间" value={extra} onChange={this.changeInput.bind(this, 'samplingTime')} className="marginTop4" placeholder="请输入取样时间" />
      //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    );
    const SelectBox =  ({ extra, onClick, children }) => (
          <Rinput label="取样联系人" className="marginTop4" value={showName} onDivClick = {onClick} disabled={true} placeholder="请选择取样联系人" />
    )
    let newDate = new Date(this.state.form.hzBirthday)
      const CustomChildrenbir = ({ extra, onClick, children }) => (
            <div className="year_select"  onClick={onClick}>
                <div className="year_select_one">{this.state.form.hzBirthday?newDate.getFullYear():'年'}</div>
                <div className="year_select_line">|</div>
                <div className="year_select_one">{this.state.form.hzBirthday?(newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : '0' + (newDate.getMonth() + 1):'月'}</div>
                <div className="year_select_line" >|</div>
                <div className="year_select_one">{this.state.form.hzBirthday?(newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()):'日'}</div>
            </div>
        //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
      );
      let newDateblood = new Date(this.state.form.bloodSampleTime)
      const CustomChildrenblood = ({ extra, onClick, children }) => (
            <div className="year_select"  onClick={onClick}>
                <div className="year_select_one">{this.state.form.bloodSampleTime?newDateblood.getFullYear():'年'}</div>
                <div className="year_select_line">|</div>
                <div className="year_select_one">{this.state.form.bloodSampleTime?(newDateblood.getMonth() + 1) > 9 ? (newDateblood.getMonth() + 1) : '0' + (newDateblood.getMonth() + 1):'月'}</div>
                <div className="year_select_line" >|</div>
                <div className="year_select_one">{this.state.form.bloodSampleTime?(newDateblood.getDate() > 9 ? newDateblood.getDate() : '0' + newDateblood.getDate()):'日'}</div>
            </div>
        //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
      );
      let newDatesample = new Date(this.state.form.sampleTime)
      const CustomChildrensample = ({ extra, onClick, children }) => (
            <div className="year_select"  onClick={onClick}>
                <div className="year_select_one">{this.state.form.sampleTime?newDatesample.getFullYear():'年'}</div>
                <div className="year_select_line">|</div>
                <div className="year_select_one">{this.state.form.sampleTime?(newDatesample.getMonth() + 1) > 9 ? (newDatesample.getMonth() + 1) : '0' + (newDatesample.getMonth() + 1):'月'}</div>
                <div className="year_select_line" >|</div>
                <div className="year_select_one">{this.state.form.sampleTime?(newDatesample.getDate() > 9 ? newDatesample.getDate() : '0' + newDatesample.getDate()):'日'}</div>
            </div>
        //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
      );
      
    return (
      
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={sidebar}
        open={this.state.open}
        position='bottom'
      >
        <div className="confirm_order">
          {/*<Rinput label="绑定医生"
            value={this.state.doctorName}
            disabled={true}
            className="marginTop4"
            color="#ffcb5c"
            placeholder="请选择医生"
            icon="add-text"
            text="绑定医生"
            onClick={this.onOpenChange}
        />*/}
        <div className="reg_label">申请单中*号项为必填项</div>
        
          <GoodsListtwo 
            padding=".4rem 0" 
            marginLeft="0" 
            disPlayImg={true} 
            redTab={genes.tab||''} 
            no_code={genes.code||""} 
            type='1' 
            name={genes.title||""} 
            mchId={genes.mchId||''}
            money={genes.price} 
            keyWord={genes.yellowTab&&genes.yellowTab.split('-|-')||[]
        } />
        {/*<Rinput label="医院" value={this.state.ysHospital} disabled={true} className="marginTop4" placeholder="医院名称" />*/}
          {/*<Rinput label="送至" disabled={true} value={genes.contactsAddr} className="marginTop4" placeholder="请输入患者姓名" />*/}
          {/*<Rinput label="请输入取样地址" value={this.state.samplingAddress} onChange={this.changeInput.bind(this, 'samplingAddress')} className="marginTop4" placeholder="请输入取样地址" />*/}
          
          <Rinput label="*受检人姓名" value={this.state.name} onChange={this.changeInput.bind(this, 'name')} className="marginTop4" placeholder="请输入受检人姓名" />
          
          <div className="reg_label">*出生日期 </div>
                <DatePicker
                    mode="date"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.hzBirthday}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['hzBirthday']: date }))
                    }}
                >
                 <CustomChildrenbir />
                </DatePicker>
                <div className="reg_label">*性别 </div>
                <div className="gender_row">
                <div className={this.state.form.hzGender=='1'?"gender_select floatLeft":"gender floatLeft"} onClick={this.changeBnt.bind(this,1)}>
                    {
                        this.state.form.hzGender=="1"?<div className="gender_select_icon">
                            <img src={selectYes} />
                        </div>:null
                    }
                    <div className="gender_text">
                        男
                    </div>
                </div>
                <div className={this.state.form.hzGender=='2'?"gender_select floatRight":"gender floatRight"} onClick={this.changeBnt.bind(this,2)}>
                    {
                        this.state.form.hzGender=="2"?<div className="gender_select_icon">
                            <img src={selectYes} />
                        </div>:null
                    }
                    
                    <div className="gender_text">
                        女
                    </div>
                </div>
            </div>

          <Rinput label="*身份证号" value={this.state.idNum} onChange={this.changeInput.bind(this, 'idNum')} className="marginTop4" placeholder="请输入身份证号" />
          <Rinput label="*联系电话" value={this.state.idNum} onChange={this.changeInput.bind(this, 'idNum')} className="marginTop4" placeholder="请输入联系电话" />
          <Rinput label="*医院" value={this.state.ysHospital} disabled={true} className="marginTop4" placeholder="医院名称" />
          <Rinput label="*科室" value={this.state.department} onChange={this.changeInput.bind(this, 'department')} className="marginTop4" placeholder="请输入科室" />
          <Rinput label="*医生" value={this.state.doctor} onChange={this.changeInput.bind(this, 'doctor')} className="marginTop4" placeholder="请输入医生姓名" />

          {/*<DatePicker
            mode="datetime"
            extra="请选择取样时间"
            value={this.state.samplingTime}
            format="YYYY-MM-DD HH:mm"
            onChange={date => {
              this.setState(Object.assign(this.state, { ['samplingTime']: date }))
            }}
          >
          <CustomChildren />
          </DatePicker>*/}

          {/*<Picker
            data={volunteer}
            title="选择取样联系人"
            cascade={false}
            value={this.state.sValue}
            // onChange={v => this.setState({ sValue: v })}
            onOk={v => this.setState(Object.assign(this.state,{
              contactsPhonee:volunteerList[v]&&volunteerList[v].mobile,
              contacts:volunteerList[v]&&volunteerList[v].username,
              showName:volunteerList[v]&&volunteerList[v].showName,
            }))}
          >
             <SelectBox />
          </Picker>*/}
          {/* <Rinput label="取样联系人" value={genes.contacts} disabled={true} className="marginTop4" /> */}
          {/*<Rinput label="取样联系人电话" value={contactsPhonee} disabled={true} type="number" className="marginTop4" placeholder="请输入患者姓名" />*/}
          {/*<Rinput 
                label="优惠券"
                icon="text" 
                text={this.state.isUse?"已使用优惠券":"使用优惠券"}
                color={this.state.isUse?'#9b9b9b':"#ff6666"}
                value={this.state.coupon} 
                onClick={this.useCoupon.bind(this)}
                className="marginTop4" 
                onChange={this.changeInput.bind(this, 'coupon')} 
                placeholder="如有，请输入优惠券代码" 
          />*/}
          <Radio.Group onChangeRadio={this.onChangeRadio} value={this.state.valuetype} className="radio_info">
        <Radio className="radio_info marginTop4_radio" value={1}>
          *血液
          <div className="reg_label">*血液取样日期 </div>
          <DatePicker
                    mode="date"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.bloodSampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['bloodSampleTime']: date }))
                    }}
                >
                 <CustomChildrenblood />
                </DatePicker>
        </Radio>
        <Radio className="radio_info marginTop4_radio" value={2}>
          *组织
          <div className="reg_label">*组织采样日期 </div>
          <DatePicker
                    mode="date"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.sampleTime}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['sampleTime']: date }))
                    }}
                >
                 <CustomChildrensample />
          </DatePicker>
              <Radio.Group className="radio_info marginTop4_radiotype" onChangeRadioSmple={this.onChangeRadioSmple} value={this.state.valuesampletype}>
              <Radio className="radiostyle marginTop4_radiotype" value={1}>
                白&nbsp;&nbsp;&nbsp;&nbsp;片
                
                <Rinput value={this.state.doctor} onChange={this.changeInput.bind(this, 'doctor')} className="marginTop4 r_inputradiotype" placeholder="" />
                <span>张</span>
                
              </Radio>
              <Radio  className="radiostyle marginTop4_radiotype" value={2}>
                蜡&nbsp;&nbsp;&nbsp;&nbsp;块
                <Rinput value={this.state.doctor} onChange={this.changeInput.bind(this, 'doctor')} className="marginTop4 r_inputradiotype" placeholder="" />
                <span>块</span>
                <div style={{marginLeft:'0.4rem'}}>
                <div className="reg_label">蜡块是否需要返还</div> 
      <Radio.Group onChange={this.onChangeback} value={this.state.valueback} style={{width:'100%'}}>
      <Radio value={1} style={{width:'100%'}}>
        是
        {this.state.valueback === 1 ?
          <div>
          <Rinput  value={this.state.department} onChange={this.changeInput.bind(this, 'department')} className="marginTop4" placeholder="请输入收件人" />
          <Rinput  value={this.state.doctor} onChange={this.changeInput.bind(this, 'doctor')} className="marginTop4" placeholder="请输入电话" />
          <Rinput  value={this.state.department} onChange={this.changeInput.bind(this, 'department')} className="marginTop4" placeholder="请输入地址" />
          </div>
          : null}
      </Radio>
      <Radio value={2} style={{display:'block'}}>
        否
      </Radio>
     </Radio.Group>
                
                </div>
              </Radio>
              <Radio className="radiostyle marginTop4_radiotype" value={3}>
                蜡&nbsp;&nbsp;&nbsp;&nbsp;卷
                <Rinput value={this.state.doctor} onChange={this.changeInput.bind(this, 'doctor')} className="marginTop4 r_inputradiotype" placeholder="" />
                <span>张</span>
              </Radio>
              <Radio className="radiostyle marginTop4_radiotype" value={4}>
                胸腹水
                <Rinput value={this.state.doctor} onChange={this.changeInput.bind(this, 'doctor')} className="marginTop4 r_inputradiotype" placeholder="" />
                <span>ml</span>
              </Radio>
              <Radio className="radiostyle marginTop4_radiotype marginBottom2" value={5}>
                其&nbsp;&nbsp;&nbsp;&nbsp;它
                <Rinput value={this.state.doctor} onChange={this.changeInput.bind(this, 'doctor')} className="marginTop4 r_inputradiotype" placeholder="" />
                
                {/*{this.state.value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}*/}
              </Radio>
            </Radio.Group>
        </Radio>
        {/*<Radio className="radio_info" value={3}>
          Option C
        </Radio>
        <Radio className="radio_info" value={4}>
          More...
          {this.state.value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>*/}
      </Radio.Group>
      <div className="reg_label">病理诊断 </div>
      <Checkbox.Group className="radiostyle marginTop4_radiotype" style={{ width: '100%' }} onChange={this.onChangeChecks}>
    <Row>
      <Col span={8}>
        <Checkbox value="肺癌">肺癌</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="肺腺癌">肺腺癌</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="肺鳞癌">肺鳞癌</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="肺大细胞癌">肺大细胞癌</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="腺鳞混合型">腺鳞混合型</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="其它">其它</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
      <div className="reg_label">确诊日期</div>
                <DatePicker
                    mode="date"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.hzBirthday}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['hzBirthday']: date }))
                    }}
                >
                 <CustomChildrenbir />
                </DatePicker>
      <div className="reg_label">既往治疗用药史</div> 
      <div className="reg_label">*是否是初治患者</div> 
      <Radio.Group onChange={this.onChangechuzhi} value={this.state.valuechuzhi}>
      <Radio value={1}>
        是
      </Radio>
      <Radio value={2}>
        否
        {this.state.valuechuzhi === 2 ?
          <div>
          <div className="reg_label">*治疗方案 </div>
      <Checkbox.Group className="radiostyle marginTop4_radiotype" style={{ width: '100%' }} onChange={this.onChangeChecks}>
    <Row>
      <Col span={8}>
        <Checkbox value="化疗">化疗</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="放疗">放疗</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="靶向治疗">靶向治疗</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="免疫治疗 ">免疫治疗 </Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="其它">其它</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
          </div>
          : null}
      </Radio>
      
    </Radio.Group>
    <div className="reg_label">患者是否TKI耐药</div> 
      <Radio.Group onChange={this.onChangechuzhi} value={this.state.valuechuzhi}>
      <Radio value={1}>
      是，有影像检测证明疾病进展
      </Radio>
      <Radio value={2}>
      是，仅为经验判断 
      </Radio>
      <Radio value={3} style={{display:'block'}}>
      否
      </Radio>
    </Radio.Group>
    <Rinput label="取样地址" value={contactsPhonee} disabled={true} type="number" className="marginTop4" placeholder="请输入取样地址" />
    <DatePicker
            mode="datetime"
            extra="请选择取样时间"
            value={this.state.samplingTime}
            format="YYYY-MM-DD HH:mm"
            onChange={date => {
              this.setState(Object.assign(this.state, { ['samplingTime']: date }))
            }}
          >
          <CustomChildren />
    </DatePicker> 
    <Rinput label="取样联系人" value={contactsPhonee} disabled={true} type="number" className="marginTop4" placeholder="请输入取样联系人姓名" />   
    <Rinput label="联系人电话" value={contactsPhonee} disabled={true} type="number" className="marginTop4" placeholder="请输入联系人电话" />
    <Rinput 
                label="优惠券"
                icon="text" 
                text={this.state.isUse?"已使用优惠券":"使用优惠券"}
                color={this.state.isUse?'#9b9b9b':"#ff6666"}
                value={this.state.coupon} 
                onClick={this.useCoupon.bind(this)}
                className="marginTop4" 
                onChange={this.changeInput.bind(this, 'coupon')} 
                placeholder="如有，请输入优惠券代码" 
          />
      <div>
          <div className="reg_label">是否需要纸质报告</div> 
<Radio.Group onChange={this.onChangepaper} value={this.state.valuepaper} style={{width:'100%'}}>
<Radio value={1} style={{width:'100%'}}>
  是
  {this.state.valuepaper === 1 ?
    <div>
    <Rinput  value={this.state.department} onChange={this.changeInput.bind(this, 'department')} className="marginTop4" placeholder="请输入收件人" />
    <Rinput  value={this.state.doctor} onChange={this.changeInput.bind(this, 'doctor')} className="marginTop4" placeholder="请输入电话" />
    <Rinput  value={this.state.department} onChange={this.changeInput.bind(this, 'department')} className="marginTop4" placeholder="请输入地址" />
    </div>
    : null}
</Radio>
<Radio value={2} style={{display:'block'}}>
  否
</Radio>
</Radio.Group>
          </div>
<div className="reg_label">温馨提示</div> 
<div className="order_tips">1.检测完成后可在“查看报告”里查看电子报告单</div> 
<div className="order_tips">2.为保证血液新鲜度提高检测准确度，采血时间距物流取样时间最长不超过24小时，建议确认好取样时间后确定采血</div> 
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
    </div>
        <div className="height15"></div>
        <div className="fooder_bnt displays confirm_order_food">
          <div style={{ flex: '1' }}></div>
          <div onClick={this.goBack.bind(this)} className="close_bnt">
            取消
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
      </Drawer>

    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */


const LoginForm = Form.create()(Login);

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  const props = {
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
    mchId:state.user.mchId
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
