import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import {ActivityIndicator,Toast } from 'antd-mobile';

import PersonList from '../../components/personList'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
         
        }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.orderListState!=nextprops.orderListState&&nextprops.orderListState=='failed'){
          this.setState({
            animating:false
          })
          Toast.fail(nextprops.msg, 2)
        }
        if(this.props.orderListState!=nextprops.orderListState&&nextprops.orderListState=='succ'){
          this.setState({
            animating:false
          })
        }
    }
    componentWillMount(){
      document.title = '查看订单'
      const {actions} = this.props
      this.setState({
        text:'获取订单列表',
        animating:true
      })
      actions.geneorderList({
        page:1,
        limit:10,
        statu:1
      })
    }

    componentDidMount(){
      
    }
    goChat(id,wxPortrait){
      const {actions} = this.props
      actions.setChatImg({
            wxPortrait:wxPortrait
      })
      if(id){
          sessionStorage.setItem('chat_id',id)
          this.props.history.push(`/chat/${id}`)
      }else{
          Toast.fail('未能创建联系',2)
      }
    }
  render() {
    const orderList = (this.props.orderListState=='succ'&&this.props.orderList.list)||[]
    let msgNumberList = {}
    if(this.props.msgNumber.msgNumberList){
      msgNumberList = this.props.msgNumber.msgNumberList
    }
    console.log("【msgNumberList】",msgNumberList)
    return (
      <div>
        {
           orderList.map((item,index)=>{
            let birthday = ""
            let u = navigator.userAgent, app = navigator.appVersion;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(item.patient){
                  if (isAndroid) {
                    birthday= new Date().getFullYear()-new Date(item.patient.hzBirthday).getFullYear()
                  }
                  if (isIOS) {
                    birthday = new Date().getFullYear()-new Date(item.patient.hzBirthday.replace(/-/g, "/")).getFullYear()
                  }
                }   
              
              console.log("【msgNumberList】",msgNumberList[item.groupId])
             return item.patient?<PersonList badge={msgNumberList[item.groupId]}  sex={item.patient.hzGender=="1"?"男":"女"} old={birthday} onClick={this.goChat.bind(this,item.groupId,item.patient.wxPortrait)} name={item.patient.username} reportName={item.title} />:null
           })
        }
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
    orderListState:state.user.orderListState,
    orderList:state.user.orderList, 
    msg :state.user.msg, 
    wxPortrait:state.chat.wxPortrait, 
    msgNumber:state.chat.msgNumber,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));