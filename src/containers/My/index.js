import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form ,Icon} from 'antd';
import { Toast,Button } from 'antd-mobile';
import { Modal, WhiteSpace, WingBlank} from 'antd-mobile';
import ReportListOne from '../../components/reportListOne'
import ceshi from '../../sources/ceshi.jpeg'
import my1 from '../../sources/_-2.png'
import my2 from '../../sources/_.png'
import my3 from '../../sources/_huabanfuben.png'
import my4 from '../../sources/_-6.png'
import bnt1 from '../../sources/shoppingcart.png'
import bnt2 from '../../sources/house.png'
import bnt3 from '../../sources/ticket.png'
import bnt4 from '../../sources/_headset.png'
import bnt5 from '../../sources/_computer.png'
import bnt6 from '../../sources/book.png'
import bnt7 from '../../sources/protection.png'
import bnt8 from '../../sources/t-shirt.png'

import MySerxiceBnt from '../../components/mySerxiceBnt'

// import phone from '../../sources/phone.png'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          content:[{},{},{}],
          modal1: false,
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
        this.props.history.push('/orderList')
      }
      if(index==2){
        this.props.history.push('/reportList')
      }
      if(index==3){
        this.props.history.push('/consultation')
      }
      if(index==4){
        this.props.history.push('/myDoctor')
      }
      if(index==5){
        this.props.history.push('/followUp')
      }
      if(index==6){
       Toast.offline('该功能正在开发中',2)
      }
      if(index == 7){
        this.props.history.push("/oneClickOrder")
      }
    }
    goUpdate(){
      this.props.history.push('/patientReg')
    }
    goOut = () =>{
      const {actions} = this.props
      actions.replaceLoginState()
      sessionStorage.setItem('main_type','home')
      sessionStorage.setItem("callbackUrl",'/main')
    }
    
    showModal = key => (e) => {
      e.preventDefault(); // 修复 Android 上点击穿透
      this.setState({
        [key]: true,
      });
    }
    onClose = key => () => {
      this.setState({
        [key]: false,
      });
    }
  
    onWrapTouchStart = (e) => {
      // fix touch to scroll background page on iOS
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }
      const pNode = closest(e.target, '.am-modal-content');
      if (!pNode) {
        e.preventDefault();
      }
    }
    callphone(){    
      window.location.href = "tel:4007781581";
  }
  render() {
    const alert = Modal.alert;

    const showAlert = () => {
      const alertInstance = alert('Delete', 'Are you sure???', [
        { text: '再想想', onPress: () => console.log('cancel'), style: 'default' },
        { text: '退出登录', onPress:()=>this.goOut() },
      ]);
      setTimeout(() => {
        // 可以调用close方法以在外部close
        console.log('auto close');
        alertInstance.close();
      }, 100);
    };

    const user = this.props.loginState=='succ'&&this.props.user
    let wxPortrait='https://www.wisdomcares.com.cn/upload/huanzhe.jpeg' ;
    let username;
    if(user){
      // wxPortrait = user.entity.wxPortrait
      username = user.entity.username
    }
    console.log('tag', wxPortrait)
    return (
      <WingBlank>
      <div className="myPage_row">
      <Button className="my_lg_btn" onClick={() =>
        alert('退出登录', '请确定是否退出登录', [
          { text: '再想想', onPress: () => console.log('cancel') },
          { text: '退出登录', onPress:()=>this.goOut() },
        ])
      }style={{position:'absolute',color:'#fff'}} >退出登录</Button>
          <div className="myPage_headUrl">
              <img src={wxPortrait}/>   
          </div>
          {/*<div className="myPage_name">{username}<span onClick={this.goUpdate.bind(this)} className="myPage_update_icon"><Icon type="form" /></span></div>*/}
          <div className="r_input_label marginTop4" style={{marginTop:'1.8rem'}}>我的服务</div>
          <div className="marginTop4 displays">
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,1)} src={my1} text="我的订单" />
             <MySerxiceBnt onClick={this.goMyNextPage.bind(this,2)} src={my2} text="我的报告" />
             {/*<MySerxiceBnt onClick={this.goMyNextPage.bind(this,1)} src={my3} text="我的发票" />*/}
             <MySerxiceBnt src={my4} text="热线咨询" 
             //onClick={this.showModal('modal1')}
             onClick={this.callphone}
            />
          </div>
        {/*<div className="r_input_label marginTop4">常用功能</div>
        <div className="marginTop2 displays">
            <MySerxiceBnt onClick={this.goMyNextPage.bind(this,7)} src={bnt1} text="一键下单" />
            <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)} src={bnt2} text="家用联系人" />
            <MySerxiceBnt  src={bnt3} text="优惠券" />
            <MySerxiceBnt onClick={this.goMyNextPage.bind(this,5)} src={bnt4} text="我的随访" />
        </div>
        <div className="marginTop2 displays">
            <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)}  src={bnt5} text="远程会诊" />
            <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)}  src={bnt6} text="在线课堂" />
            <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)}  src={bnt7} text="商业保险" />
            <MySerxiceBnt onClick={this.goMyNextPage.bind(this,6)}  src={bnt8} text="微商城" />
    </div>*/}
    <Modal
    visible={this.state.modal1}
    transparent
    maskClosable={false}
    onClose={this.onClose('modal1')}
    title="客服热线"
    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')();this.callphone(); 
     } }]}
    
  >
    <div style={{ height: 50, overflow: 'scroll' }}>
      <div>01065244517</div>
    </div>
  </Modal>

      </div>
      </WingBlank>
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
    orderListState:state.user.orderListState,
    orderList:state.user.orderList, 
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
