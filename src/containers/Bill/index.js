import React from 'react';
import PropTypes, { object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form ,Radio} from 'antd';
import { Toast,ActivityIndicator } from 'antd-mobile';


import Rinput from '../../components/RegInput'
import GButton from '../../components/GButton'
import Radios from '../../components/Radio'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          animating:false,
          text:'',
          billId:'',
          form:{
            type:'0', //0：个人，1:企业
            invoiceType:'0',//0:普票 1:专票 ,
            invoiceAddr:'',
            postal:'',//邮编
            orderId:'',
            addresseeName:'',
            phone:'',
            invoiceUser:'',
            company:'',
            companyCode:'',
            companyAddr:'',
            bankName:'',
            bankCode:'',
            addresseePhone:''
          }
          
        }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.saveGeneinvoiceState!=nextprops.saveGeneinvoiceState&&nextprops.saveGeneinvoiceState=='succ'){
          this.setState({
            animating:false
          })
          Toast.success('保存成功',1)
          this.props.history.goBack()
        }
        if(this.props.saveGeneinvoiceState!=nextprops.saveGeneinvoiceState&&nextprops.saveGeneinvoiceState=='failed'){
          this.setState({
            animating:false
          })
          Toast.fail(nextprops.msg,1)
        }
        if(this.props.getGeneInvoiceState!=nextprops.getGeneInvoiceState&&nextprops.getGeneInvoiceState == 'succ'){
          this.setState({
            animating:false,
            billId:nextprops.geneInvoiveData.id||''
          })
         //数据回显
         if(nextprops.geneInvoiveData.id){
           this.setState(Object.assign(this.state.form,nextprops.geneInvoiveData))
         }
         
        }
        if(this.props.getGeneInvoiceState!=nextprops.getGeneInvoiceState&&nextprops.getGeneInvoiceState == 'failed'){
          this.setState({
            animating:false
          })
          Toast.fail(nextprops.msg,1)
        }
        if(this.props.getIncoivce!=nextprops.getIncoivce&&nextprops.getIncoivce=='succ'){
          if(nextprops.pdfUrl.urls.length>0){
            window.location.href=nextprops.pdfUrl.urls[0].url
          }else{
            Toast.fail('未发现PDF', 2)
          }
        }
    }
    componentWillMount(){
      const { match,actions} = this.props;
      const { params: { orderId } } = match;
      this.setState(Object.assign(this.state.form,{['orderId']:orderId}))
      actions.geneinvoiceData({
        id:orderId
      })
    }
    componentDidMount(){
       
    }

    submit(subTypes){
      const {type,invoiceType,orderId,invoiceAddr,postal,addresseeName,phone,invoiceUser,company,companyCode,companyAddr,bankName,bankCode,addresseePhone} = this.state.form
      let params = {}
      if(!invoiceAddr){
        Toast.fail('请输入邮箱',1)
        return
      }
      if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(invoiceAddr)) {
        Toast.fail('邮箱格式错误', 2)
        return
      }
      // if(!postal){
      //   Toast.fail('请输入邮编',1)
      //   return
      // }
      // if(!addresseeName){
      //   Toast.fail('请输入收件人姓名',1)
      //   return
      // }
      if(!addresseePhone){
        Toast.fail('请输入收件电话',1)
        return
      }
      
      //如果选择了个人
      if(type == '0'){
          if(!company){
            Toast.fail('请输入姓名',1)
            return
          }
          params = {
            invoiceAddr,
            postal,
            addresseeName,
            addresseePhone,
            company,
            type,
            orderId
          }
      }
      if(type == 1){
        if(!company){
            Toast.fail('请输入企业名称',1)
            return
        }
        if(!companyCode){
            Toast.fail('请输入纳税人识别号',1)
            return
        }

        if(invoiceType == '0'){
            params = {
              invoiceAddr,
              postal,
              addresseeName,
              addresseePhone,
              company,
              orderId,
              companyCode,
              type,
              invoiceType,
            }
        }
        if(invoiceType == '1'){
          if(!companyAddr){
              Toast.fail('请输入注册地址',1)
              return
          }
          if(!bankName){
              Toast.fail('请输入开户银行名称',1)
              return
          }
          if(!bankCode){
              Toast.fail('请输入开户银行账号',1)
              return
          }
          if(!phone){
              Toast.fail('请输入手机号',1)
              return
          }
            params = {
              invoiceAddr,
              postal,
              addresseeName,
              addresseePhone,
              company,
              orderId,
              companyCode,
              companyAddr,
              bankName,
              bankCode,
              phone,
              type,
              invoiceType
            }
        }
      }
      this.setState({
        text:'正在提交',
        animating:true
      })
      const { actions } =this.props
      if(subTypes == 'update'){
        params.id = this.state.billId
        actions.updateeneinvoice(params)
      }else{
        actions.geneinvoice(params)
      }
      
    }
    changeState(key,item){
      this.setState(Object.assign(this.state.form,{[key]:item}))
    }
    getPhoto(type){
      const { match,actions} = this.props;
      const { params: { orderId } } = match;
      if(type == 'img'){
        this.props.history.push(`/showImg/invoceImg/${orderId}`)
      }else{
        actions.getInvoicePdf({
          orderId
        })
      }
     
    }
  render() {
    const {type,invoiceType,invoiceAddr,postal,addresseeName,phone,invoiceUser,company,companyCode,companyAddr,bankName,bankCode,addresseePhone} = this.state.form
    const {billId} = this.state
    return (
      <div className="bill_row">
          <p className="bill_row_text">
              发票由检测公司提供，如需发票请填写如下信息
          </p>
          <div className="bill_submit_content">
              <Rinput className="marginTop4" value={invoiceAddr} onChange={this.changeState.bind(this,'invoiceAddr')} placeholder="地址" />
              {/* <Rinput className="marginTop4" value={postal} onChange={this.changeState.bind(this,'postal')} placeholder="邮编" />
              <Rinput className="marginTop4" value={addresseeName} onChange={this.changeState.bind(this,'addresseeName')} placeholder="收件人" /> */}
              <Rinput className="marginTop4" value={addresseePhone} onChange={this.changeState.bind(this,'addresseePhone')} placeholder="手机号" />
              <div className="radio_List  displays">
                  <div className="radio_List_one"><Radios check={type == '0'} onClick={this.changeState.bind(this,'type','0')} text="个人"/></div>
                  <div className="radio_List_one"><Radios check={type == '1'}  onClick={this.changeState.bind(this,'type','1')} text="单位"/></div>
              </div>
              {
                type == '0'?<Rinput className="marginTop4" value={company} onChange={this.changeState.bind(this,'company')} placeholder="姓名" />:null
              }
              {
                type == '1'?<div className="radio_List marginTop4 displays">
                    <div className="radio_List_one"><Radios check={invoiceType == '0'}  onClick={this.changeState.bind(this,'invoiceType','0')} text="增值税普通发票"/></div>
                    <div className="radio_List_one"><Radios check={invoiceType == '1'}  onClick={this.changeState.bind(this,'invoiceType','1')} text="增值税专用发票"/></div>
                </div>:null
              }
              
              {
                type == '1'?<div>
                  <Rinput className="marginTop4" value={company} onChange={this.changeState.bind(this,'company')} placeholder="企业名称" />
                  <Rinput className="marginTop4" value={companyCode} onChange={this.changeState.bind(this,'companyCode')} placeholder="纳税人识别号或统一社会信用代码" />
                </div>:null
              }
              {
                type == '1'&&invoiceType == '1'?<div>
                <Rinput className="marginTop4" value={companyAddr} onChange={this.changeState.bind(this,'companyAddr')} placeholder="注册地址" />
                <Rinput className="marginTop4" value={bankName} onChange={this.changeState.bind(this,'bankName')} placeholder="开户银行名称" />
                <Rinput className="marginTop4" value={bankCode} onChange={this.changeState.bind(this,'bankCode')} placeholder="开户银行账号" />
                <Rinput className="marginTop4" value={phone} onChange={this.changeState.bind(this,'phone')} placeholder="手机号" />
              </div>:null
              }
              {
                billId?<GButton name="修改 " onClick={this.submit.bind(this,'update')} />:<GButton name="确定 " onClick={this.submit.bind(this)} />
              }
              {/*<div className="r_input_label color_9b9b9b marginTop4" >查看发票图片或pdf</div>
              <GButton name="查看图片 " onClick={this.getPhoto.bind(this,'img')} />
            <GButton name="查看PDF " onClick={this.getPhoto.bind(this,'pdf')} />*/}
              <ActivityIndicator
                  toast
                  size="large"
                  text={this.state.text}
                  animating={this.state.animating}
              />
          </div>
          
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
    saveGeneinvoiceState:state.user.saveGeneinvoiceState,
    getGeneInvoiceState:state.user.getGeneInvoiceState,
    geneInvoiveData:state.user.geneInvoiveData,
    msg:state.user.msg,
    getIncoivce:state.user.getIncoivce,
    pdfUrl:state.user.pdfUrl,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
