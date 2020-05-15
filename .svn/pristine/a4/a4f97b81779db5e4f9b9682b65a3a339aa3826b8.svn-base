import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form ,Icon} from 'antd';
import {Toast ,Button} from 'antd-mobile';

import ceshi from '../../sources/ceshi.jpeg'
import my1 from '../../sources/erweima-3.png'
import my2 from '../../sources/_-4.png'
import my3 from '../../sources/_-5.png'
import my4 from '../../sources/_-6.png'
import bnt1 from '../../sources/list.png'
import bnt2 from '../../sources/copy.png'
import bnt3 from '../../sources/box.png'

import bnt4 from '../../sources/ticket.png'
import bnt5 from '../../sources/_headset.png'
import bnt6 from '../../sources/_computer.png'
import bnt7 from '../../sources/book.png'
import bnt8 from '../../sources/house.png'
import bnt9 from '../../sources/bnt9.png'
import bnt10 from '../../sources/tipscopy.png'
import MySerxiceBnt from '../../components/mySerxiceBnt'
import './index.scss'
// import phone from '../../sources/phone.png'

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
      if(this.props.bangDing!=nextprops.bangDing&&nextprops.bangDing=='succ'){
        localStorage.setItem('token','')
        this.props.history.push('/login')
      }
    }
    componentWillMount(){
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
    goMyNextPage(index){
      if(index==1){
        this.props.history.push('/myqrcode')
      }
      if(index==2){
        this.props.history.push('/mypatient')
      }
      if(index==3){
        this.props.history.push('/reportchat')
      }
      if(index==6){
        Toast.offline('该功能正在开发中',2)
      }
      if(index==7){
        this.props.changePage('Polular')
      }
      if(index==8){
        this.props.history.push('/integral')
      }
      
    //   if(index==4){
    //     this.props.history.push('/reportchat')
    //   }
    //   if(index==5){
    //     this.props.history.push('/followUp')
    //   }
    }
    goUpdate(){
      this.props.history.push('/doctorReg')
    }
    goOut = () =>{
      const {actions} = this.props
      actions.replaceLoginState()
    }
  render() {
    const user = this.props.loginState=='succ'&&this.props.user
    
    let wxPortrait = "" ;
    let username = "";
    if(user&&user.entity){
      wxPortrait = user.entity.wxPortrait
      username = user.entity.username
    }
    return (
      <div className="myPage_row">
          <div className="myPage_headUrl">
              <img src={wxPortrait}/>
          </div>
          <div className="myPage_name">{username}<span onClick={this.goUpdate.bind(this)} className="myPage_update_icon"><Icon type="form" /></span></div>
          <div className="displays home_code_bnt" >
            <div  className="service_bnt"></div>
            {/* <div onClick={this.goMyNextPage.bind(this,8)}  className="service_bnt">
                <div style={{color:"#000",fontSize:'.4rem'}}>12</div>
                <div>我的积分</div>
            </div> */}
            {/* <div onClick={this.goMyNextPage.bind(this,9)}  className="service_bnt">
                <div style={{color:"#000",fontSize:'.4rem'}}>12</div>
                <div>我的送检</div>
            </div> */}
            <div  className="service_bnt"></div>
          </div>
          <div className="r_input_label marginTop4">我的服务</div>
          <div className="marginTop4 displays">
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,1)} src={my1} text="我的二维码" />
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,2)} src={my2} text="我的患者" />
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,3)} src={my3} text="报告咨询" />
          </div>
          <div className="r_input_label marginTop4">常用功能</div>
          <div className="marginTop2 displays">
             <MySerxiceBnt  onClick={this.goMyNextPage.bind(this,6)}  src={bnt1} text="套餐列表" />
             <MySerxiceBnt  onClick={this.goMyNextPage.bind(this,6)} src={bnt2} text="报告模板" />
             <MySerxiceBnt  onClick={this.goMyNextPage.bind(this,7)}  src={bnt3} text="患教工具包" />
             <MySerxiceBnt  onClick={this.goMyNextPage.bind(this,6)} src={bnt4} text="优惠券" />
          </div>
          <div className="marginTop2 displays">
             <MySerxiceBnt  src={bnt5} text="患者随访" />
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)} src={bnt6} text="远程会诊" />
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)} src={bnt7} text="在线课堂" />
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)} src={bnt8} text="积分商城" />
          </div>
          <div className="marginTop2 displays">
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)} src={bnt5} text="了解平台" />
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)} src={bnt6} text="常见问题" />
             <MySerxiceBnt  />
             <MySerxiceBnt />
          </div>
          <Button style={{marginTop:'.8rem'}} type="warning" onClick={this.goOut}>退出登录</Button>
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
    user:state.user.user,
    loginState:state.user.loginState,
    bangDing:state.user.bangDing,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
