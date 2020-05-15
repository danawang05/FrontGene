import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { InputItem, Toast, ActivityIndicator } from "antd-mobile";
import { ec_key, ec_publics, sdk_appid, expire_after } from "../../actions/config"
import GButton from '../../components/GButton'
import './index.scss';
import * as actions from './../../actions';

const FormItem = Form.Item;
let timeInter = "";
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 1,
      time: 60,
      userSig: "",//聊天室密码
      mobile: "",//手机号
      userId: "",//用户id
      openId: "",
      code: "",//验证码
      text: "",//提示文字
      animating: false,//是否显示提示
      packageId:""
    }
  }
  componentWillReceiveProps(nextprops) {
    
    if (this.props.getCodestate != nextprops.getCodestate && nextprops.getCodestate == 'failed') {
      console.log(this)
      Toast.fail(nextprops.msg, 2)
    }
    if (this.props.getCodestate != nextprops.getCodestate && nextprops.getCodestate == 'succ') {
      Toast.success('发送成功', 2)
      this.startTime()
    }
    if (this.props.getOpenidState != nextprops.getOpenidState && nextprops.getOpenidState == "succ") {
      this.setState({
        animating: false
      })
    }
    //   if(nextprops.user.entity&&nextprops.user.entity.username){
    //     // this.props.history.replace('/main')
    //     if(!!sessionStorage.getItem('packageid')){
    //       this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
    //     }else{
    //       this.props.history.push('/main')
    //     }
        
    //     return
    //   }
    //   if(nextprops.user.entity.id){
    //     if (nextprops.user.entity.type == 1) {
    //       if(!!sessionStorage.getItem('packageid')){
    //         this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
    //       }else{
    //         this.props.history.push('/main')
    //       }
    //       // this.props.history.replace(`/orderConfirm/${this.state.packageId}`)
    //       // this.props.history.push('/detail')
    //       // this.props.history.replace('/patientReg'+(this.state.userId?`/${this.state.userId}`:''))
    //     }
    //     if (nextprops.user.entity.type == 0) {
    //       if(!!sessionStorage.getItem('packageid')){
    //         this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
    //       }else{
    //         this.props.history.push('/main')
    //       }
    //       // this.props.history.replace(`/orderConfirm/${this.state.packageId}`)
    //       // this.props.history.replace('/doctorReg')
    //     }
    //   }
    //   // this.props.history.push('/patientReg')
    // }
    // if (this.props.getOpenidState != nextprops.getOpenidState && nextprops.getOpenidState == "failed") {
    //   this.setState({
    //     animating: false
    //   })
    // }
    if (this.props.loginState != nextprops.loginState && nextprops.loginState == 'succ') {
      this.setState({
        animating: false
      })
      console.log('tag', '走了么走了么')
      this.props.history.replace(sessionStorage.getItem('callbackUrl'))
    }
    //   // if(nextprops.user.entity&&nextprops.user.entity.username){
    //   //   if(this.state.userId){
    //   //     this.addDoc()
    //   //   }else{
    //   //     this.props.history.replace('/main')
    //   //   }
    //   //   return
    //   // }
      // if (this.state.type == 1) {
      //   if(!!sessionStorage.getItem('packageid')){
      //     this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
      //   }else{
      //     this.props.history.push('/main')
      //   }
      // }
    //     // this.props.history.replace(`/orderConfirm/${this.state.packageId}`)
    //       // this.props.history.push('/detail')
        
    //     //this.props.history.push(`/detail/${id}`)
    //     // this.props.history.replace('/patientReg'+(this.state.userId?`/${this.state.userId}`:''))
      
      // if (this.state.type == 0) {
      //   if(!!sessionStorage.getItem('packageid')){
      //     this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
      //   }else{
      //     this.props.history.push('/main')
      //   }
      // }
        // this.props.history.replace('/doctorReg')
        // this.props.history.replace(`/orderConfirm/${this.state.packageId}`)
      
    
    // if (this.props.loginState != nextprops.loginState && nextprops.loginState == 'failed') {
    //   this.setState({
    //     animating: false
    //   })
    //   Toast.fail(nextprops.msg, 2)
    // }
    // if(this.props.addDoctorState != nextprops.addDoctorState && nextprops.addDoctorState == 'succ'){
    //   Toast.success('绑定成功', 2)
    //   if(this.state.canNext){
    //     if(!!sessionStorage.getItem('packageid')){
    //       this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
    //     }else{
    //       this.props.history.push('/main')
    //     }
    //     // this.props.history.replace('/main')
    //     // this.props.history.push(`/orderConfirm/${this.state.packageId}`)
    //   }else{
    //     this.getDetail()
    //   }
    // }
    // if(this.props.addDoctorState != nextprops.addDoctorState && nextprops.addDoctorState == 'failed'){
    //   Toast.fail(nextprops.msg, 2)
    //   if(this.state.canNext){
    //     // this.props.history.replace('/main')
    //     // this.props.history.replace(`/orderConfirm/${this.state.packageId}`)
    //     if(!!sessionStorage.getItem('packageid')){
    //       this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
    //     }else{
    //       this.props.history.push('/main')
    //     }
    //   }else{
    //     this.getDetail()
    //   }
    // }
    // if (this.props.loginState != nextprops.loginState && nextprops.loginState == 'succ') {
    //   this.setState({
    //     animating: false
    //   })
    //   if(nextprops.user.entity&&nextprops.user.entity.username){
    //     // this.props.history.push('/main')
    //     // this.props.history.replace(`/orderConfirm/${this.state.packageId}`)
    //     if(!!sessionStorage.getItem('packageid')){
    //       this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
    //     }else{
    //       this.props.history.push('/main')
    //     }
    //     return
    //   }
    //   if (this.state.type == 1) {
    //     // this.props.history.replace(`/orderConfirm/${this.state.packageId}`)
    //     if(!!sessionStorage.getItem('packageid')){
    //       this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
    //     }else{
    //       this.props.history.push('/main')
    //     }
    //     // this.props.history.push('/patientReg')
    //   }
    //   if (this.state.type == 0) {
    //     // this.props.history.replace(`/orderConfirm/${this.state.packageId}`)
    //     if(!!sessionStorage.getItem('packageid')){
    //       this.props.history.replace(`/orderConfirm/${sessionStorage.getItem('packageid')}`)
    //     }else{
    //       this.props.history.push('/main')
    //     }
    //     else{
    //       this.props.history.replace('/main')
    //     }
    //     this.props.history.push('/doctorReg')
    //   }
    // }
}
  componentWillMount() {
    const { match,actions} = this.props;
    const { params: { userId } } = match;
    const { params: { packageId } } = match;
    this.setState({
      userId:userId
    })
    // var url = window.location.search; //获取url中"?"符后的字串
    // var theRequest = new Object();
    // if(sessionStorage.getItem('gene_user_type')=='1'||sessionStorage.getItem('gene_user_type')=='0'){
    //   this.setState({
    //     type:sessionStorage.getItem('gene_user_type')
    //   })
    // }
    // if (url.indexOf("?") != -1) {
    //   var str = url.substr(1);
    //   let strs = str.split("&");
    //   for (var i = 0; i < strs.length; i++) {
    //     theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    //   }
    // }
    // if(theRequest.code){
    //   actions.getOpnid({
    //     code:theRequest.code
    //   })
    // }
    if(localStorage.getItem('token')){
      // this.setState({
      //   text:"获取信息...",
      //   animating:true
      // })
      if(userId){
        actions.addDoctor({
            doctors:JSON.stringify([userId])
        })
      }else{
        actions.getUserInfoNotUseTMI()
      }
     
      // sessionStorage.setItem('gene_user_type', this.state.type)
    }else{
      // actions.userInfo()

    }
    
    
  }
  getDetail = () =>{
    const {actions} = this.props
    actions.getUserInfoNotUseTMI()
  }
  addDoc = ()=>{
    const {actions} = this.props
    this.setState({
      canNext:true
    })
    actions.addDoctor({
        doctors:JSON.stringify([this.state.userId])
    })
  }
  componentDidMount() {

  }
  componentWillUnmount() {
    if (timeInter) {
      clearInterval(timeInter)
    }
  }
 
  changeLoginBnt(bnt) {
    this.setState({
      type: bnt
    })
    sessionStorage.setItem('gene_user_type', bnt)
  }
  login() {
    const { actions } = this.props
    if (!this.phone(this.state.mobile).result) {
      Toast.fail('手机号格式错误', 2)
      return
    }
    if (!sessionStorage.getItem('openId')) {
      Toast.fail('微信登陆失败', 2)
      
      return
    }
    if (!this.state.code) { 
      Toast.fail('请输入验证码', 2)
      return
    }

    let params = {
      code: this.state.code,
      phone: this.state.mobile,
      openId: sessionStorage.getItem('openId'),
      userType: this.state.type,
      // userId:this.state.userId,
      // userSig: userSig
    }
    this.setState({
      text:"登录中...",
      animating:true
    })
    actions.newLogin(params)
    // actions.login(params)
    
    
  }
  startTime() {
    this.stopTimer()
    timeInter = setInterval(() => {
      if (this.state.time === 1) {
        this.stopTimer();
        this.setState({
          time: 60,
          getCode: true
        })
      } else {
        let times = parseInt(this.state.time) - 1
        this.setState({
          time: times,
          timeMsg: times
        })
      }
    }, 1000);
  }
  stopTimer() {
    if (timeInter) {
      clearInterval(timeInter);
    }
  }
  phone(phone) {
    let phoneText = /^1[345789]\d{9}$/
    if ((phoneText.test(phone))) {
      return { result: true }
    } else {
      return { result: false, msg: '手机号格式错误' }
    }
  }
  getQrCodeb() {
    if (!this.phone(this.state.mobile).result) {
      Toast.fail('手机号格式错误', 2)
      return
    }
    const { actions } = this.props
    actions.getCode({
      phoneNum: this.state.mobile
    })
  }
  changeInput(type, e) {
    this.setState(Object.assign(this.state, { [type]: e }))
  }
  goDetailPack(id){
    this.props.history.push(`/detail/${id}`)
  }
  render() {
    return (
      <div className="login_row">
        <div className="loginTitle_bnt">
          <span className={this.state.type == '1' ? 'loginTitle_bnt_one' : ""} onClick={this.changeLoginBnt.bind(this, 1)}>登录 </span>
          {/*<span> / </span>*/}
          {/*<span className={this.state.type == '0' ? 'loginTitle_bnt_one' : ""} onClick={this.changeLoginBnt.bind(this, 0)}> 医生登陆</span>*/}
        </div>
        <div className="marginTop20 loginTitle_input">
          <div className="loginTitle_input_one">
            <InputItem type="number" value={this.state.mobile} onChange={this.changeInput.bind(this, 'mobile')} placeholder="请输入手机号" clear />
          </div>
        </div>
        <div className="loginTitle_input displays">
          <div className="loginTitle_input_one">
            <InputItem type="number" maxLength={6} value={this.state.code} onChange={this.changeInput.bind(this, 'code')} placeholder="请输入验证码" clear />
          </div>
          {
            this.state.time == 60 ? <div className="qr_code" onClick={this.getQrCodeb.bind(this)}>{this.props.getCodestate == 'pedding' ? '发送中...' : '获取验证码'}</div> : <div className="qr_code">{this.state.time}</div>
          }
        </div>

        <GButton name="登录" onClick={this.login.bind(this)} />
        <p className="marginTop10 tishi_login">登录即同意
        <span onClick={() => { this.props.history.push('/agreementTwo')}}>《检爱E行平台协议》</span>
        </p>
        <ActivityIndicator
          toast
          size="large"
          text={this.state.text}
          animating={this.state.animating}
        />
      </div>
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
    getCodestate: state.user.getCodestate,
    msg: state.user.msg,
    getOpenidState: state.user.getOpenidState,
    loginState: state.user.loginState,
    user:state.user.user,
    addDoctorState:state.user.addDoctorState,
    geneDetailState:state.user.geneDetailState,
    geneDetail:state.user.geneDetail
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));