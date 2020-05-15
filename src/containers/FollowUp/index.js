import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form,Icon,Modal } from 'antd';
import {Toast } from 'antd-mobile';

import './index.scss';
import ReportListOne from '../../components/reportListOne'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;
const alert = Modal.alert;
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content:[{},{},{}]
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
    }
    componentWillMount(){
      const {actions} = this.props
      actions.geneorderList({
        page:1,
        limit:10000,
        statu:1
      })
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
  render() {
    const {user,orderListState,orderList} = this.props
    const orderLists = (orderListState=='succ'&&orderList.list)||[]
    let old = ""
    let userData = ""
    let birthday = ""
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
           
    if(user&&user.entity){
      userData = user.entity
      if (isAndroid) {
        birthday= new Date().getFullYear()-new Date(user.entity.hzBirthday).getFullYear()
      }
      if (isIOS) {
        birthday = new Date().getFullYear()-new Date(user.entity.hzBirthday.replace(/-/g, "/")).getFullYear()
      }

    }
    
    return (
      <div className="followUp_row">
          <div className="followUp_head">
                <div className="followUp_head_one">姓名：<span>{userData.username||''}</span></div>
                <div className="followUp_head_one">性别：<span>{userData.hzGender=='1'?'男':'女'}</span></div>
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
                            <div onClick={this.showImg.bind(this,item.id)} className="reportList_bnt_one promise_bnt">
                                <Icon type="cloud-download" />检测报告
                            </div>
                            
                        </div>
                </ReportListOne>
                })
            }
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
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
