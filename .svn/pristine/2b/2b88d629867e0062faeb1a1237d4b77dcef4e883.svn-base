import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form,Icon } from 'antd';
import {Toast ,ActivityIndicator,Modal} from 'antd-mobile';

import './index.scss';
import ReportListOne from '../../components/reportListOne'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;
const prompt = Modal.prompt;
const alert = Modal.alert;
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content:[{},{},{}],
            animating:false,
            patientItem:{}
        }
    }
    componentWillReceiveProps(nextprops) {
      if(this.props.orderListState!=nextprops.orderListState&&nextprops.orderListState=='failed'){
        Toast.fail(nextprops.msg, 2)
      }
      if(this.props.getOrderUrlState!=nextprops.getOrderUrlState&&nextprops.getOrderUrlState=='succ'){
        if(nextprops.orderUrl.urls.length>0){
          window.location.href=nextprops.orderUrl.urls[0].url
        }else{
          Toast.fail('未发现报告文件', 2)
        }
       
      }
      if(this.props.getOrderUrlState!=nextprops.getOrderUrlState&&nextprops.getOrderUrlState=='failed'){
        Toast.fail(nextprops.msg, 2)
      }
      if (this.props.sendEmail != nextprops.sendEmail && nextprops.sendEmail == 'failed') {
        this.setState({
          animating: false
        })
        Toast.fail(nextprops.msg, 2)
      }
      if (this.props.sendEmail != nextprops.sendEmail && nextprops.sendEmail == 'succ') {
        this.setState({
          animating: false
        })
        Toast.success('发送成功', 2)
      }
    }
    componentWillMount(){
      const {actions} = this.props
      const {query} = this.props.location
      console.log(query)
      if(query){
        this.setState({
          patientItem:query
        })
        actions.geneorderList({
          page:1,
          limit:10000,
          statu:1,
          patientId:query.id
        })
      }
      
      
      if(localStorage.getItem('token')){
        this.getUserInfo()
    }
    }
    getUserInfo(){
      const {actions} = this.props
      actions.getUserInfoNotUseTMI()
  }
    componentDidMount(){
       
    }
    showImg(id){
      const{actions} = this.props
      actions.getReportUrl({
        id:id
      })
    }
    shareWx(id) {
      const { actions } = this.props
      prompt('发送邮件', '请输入邮箱', [
        {
          text: '取消',
          onPress: value => new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              console.log(`value:${value}`);
            }, 100);
          }),
        },
        {
          text: '确定',
          onPress: value => new Promise((resolve, reject) => {
            if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
              Toast.fail('邮箱格式错误', 2)
            } else {
              this.setState({
                text: '正在发送邮件',
                animating: true
              })
              setTimeout(() => {
                resolve();
                console.log(`value:${value}`);
              }, 100);
  
              actions.sendTheReport({
                mailAddr: value,
                orderId: id
              })
            }
          }),
        },
      ])
  
  
    }
  render() {
    const {user,orderListState,orderList} = this.props
    const {patientItem,content} = this.state
    const orderLists = (orderListState=='succ'&&orderList.list)||[]
    let old = ""
    let userData = ""
    let birthday = ""
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
           
    if(patientItem){
      if (isAndroid) {
        birthday= new Date().getFullYear()-new Date(patientItem.hzBirthday).getFullYear()
      }
      if (isIOS) {
        birthday = new Date().getFullYear()-new Date(patientItem.hzBirthday.replace(/-/g, "/")).getFullYear()
      }

    }
    
    return (
      <div className="followUp_row">
          <div className="followUp_head">
                <div className="followUp_head_one">姓名：<span>{patientItem.username||''}</span></div>
                <div className="followUp_head_one">性别：<span>{patientItem.hzGender=='1'?'男':'女'}</span></div>
                <div className="followUp_head_one">年龄：<span>{birthday||0}</span></div>
          </div>
          <div className="followUp_head">
           <div  className="followUp_head_one"> 检测次数{orderList.total}次</div> 
          </div>
          <div className="followUp_content">
          {
            orderLists.map((item,index)=>{
                return <ReportListOne key={index} type="followup" name={item.title} company={item.geneCompany} time={item.createrTime} code={item.number}>
                        <div className="displays reportList_bnt">
                            <div className="flex1"></div>
                            <div onClick={()=>{
                              alert('提示', item.testingCompanyPhone, [
                                { text: '确定', onPress: () => console.log('cancel') },
                              ])
                            }} className="gray_bnt reportList_bnt_one marginRight">
                                <Icon type="phone" />热线咨询
                            </div>
                            {/* <div  className="gray_bnt reportList_bnt_one marginRight">
                                <Icon type="share-alt" />查看
                            </div> */}
                            {
                              item.isUploadReport == '1' ? <div onClick={this.shareWx.bind(this, item.id)} className="promise_bnt_doc reportList_bnt_one marginRight">
                              <Icon type="share-alt" />发送邮件
                              </div> : <div  className="gray_bnt reportList_bnt_one marginRight">
                                <Icon type="share-alt" />发送邮件
                              </div>
                            }
                            <div onClick={this.showImg.bind(this,item.id)} className="reportList_bnt_one promise_bnt_doc">
                                <Icon type="cloud-download" />检测报告
                            </div>
                            
                        </div>
                </ReportListOne>
                })
            }
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
    orderListState:state.user.orderListState,
    orderList:state.user.orderList, 
    user:state.user.user, 
    msg :state.user.msg,
    getOrderUrlState:state.user.getOrderUrlState,
    orderUrl:state.user.orderUrl,
    sendEmail: state.user.sendEmail,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
