import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { } from 'antd-mobile';
import {HOSP_NUMBER } from "../../actions/config";
import GButton from '../../components/GButton'
import './index.scss';
import * as actions from './../../actions';
import {Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       
    }
  }
  
  componentWillReceiveProps(nextprops) {

  }
//   componentWillMount() {
//         document.title = "注册协议"
//         const { match, actions } = this.props;
//         const { params: { packageId } } = match;
        
// }
componentWillMount() {
        document.title = "检爱e行"
        const { match,actions} = this.props;
        const { params: { userId } } = match;
        const { params: { packageId } } = match;
        const token = localStorage.getItem('token');
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc772f9ac9691f3c1&redirect_uri=http://jianai.sagacityidea.cn/geneapi&response_type=code&scope=snsapi_userinfo#wechat_redirect"
        this.setState({
          userId:userId
        })
        //var url = window.location.search; //获取url中"?"符后的字串
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
        function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                console.log(window.location.search)//?id=2
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
            console.log(GetQueryString('id'))//2
            console.log(GetQueryString('name'))//2
            //当前url地址栏 file:///C:/Users/admin/Desktop/test.html?id=2
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
//   componentWillMount() {
    
//     const { match,actions} = this.props
//   }
  componentDidMount() {

  }
  
  goNextStep(packageId){
        // if(localStorage.getItem('token')) {
         
        //         console.log(packageId)
        //         this.props.history.push(`/orderConfirm/${packageId}`)
                
        // }
        if(!localStorage.getItem('token')){
                sessionStorage.setItem("callbackUrl",`/orderConfirm/${packageId}`)
                this.props.history.replace('/login')
        }else{
                this.props.history.push(`/orderConfirm/${packageId}`)
              }
        
    }
  goNext(packageId){
        console.log(packageId)
        this.props.history.push(`/orderConfirm/${packageId}`)
    }
  render() {
    let geneDetail = this.props.geneDetail||{}
    return (
      <div className="my_row" style={{'-webkit-overflow-scrolling':'touch',overflow:'scroll'}}>
      <div className="my_row_part">
        <h3 style={{ textAlign: "center" }}>欢迎来到检爱e行</h3>
        
        
        <div className="height15"></div>
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
// {/*<div  onClick={this.goNextStep.bind(this,geneDetail.id)} className="new_fooder_bnt ">
// <GButton name="同意" />
// </div>
// onClick={() => { this.props.history.goBack() }}*/}

// function mapStateToProps(state) { // eslint-disable-line no-unused-vars
//   const props = {
//   };
//   return props;
// }
// function mapDispatchToProps(dispatch) {
//   const actionMap = { actions: bindActionCreators(actions, dispatch) };
//   return actionMap;
// }
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
function mapStateToProps(state) { // eslint-disable-line no-unused-vars
        const props = {
            geneDetailState:state.user.geneDetailState,
            geneDetail:state.user.geneDetail,
            msg:state.user.msg,
            shoucangState:state.user.shoucangState,
            isCollect:state.user.isCollect,
            isCollectState:state.user.isCollectState,
            getCodestate: state.user.getCodestate,
            getOpenidState: state.user.getOpenidState,
            loginState: state.user.loginState,
            user:state.user.user,
        };
        return props;
    }
    function mapDispatchToProps(dispatch) {
        const actionMap = { actions: bindActionCreators(actions, dispatch) };
        return actionMap;
    }
    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));