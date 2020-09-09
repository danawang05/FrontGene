import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {Form, Icon} from 'antd';
import { Toast } from 'antd-mobile';

import Rinput from '../../components/RegInput'
import GButton from '../../components/GButton'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          orderid:""
        }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.wxRefundState!=nextprops.wxRefundState&&nextprops.wxRefundState=='succ'){
          Toast.success('退款申请成功', 2)
            this.props.history.push('/orderListSpecialist')
        }
        if(this.props.refundPriceState!=nextprops.refundPriceState&&nextprops.refundPriceState=='failed'){
            this.setState({
                animating: false
            })
            Toast.fail(nextprops.msg, 2)
         }
      //   if(this.props.geneParerState!=nextprops.geneParerState&&nextprops.geneParerState=='failed'){
      //     Toast.fail(nextprops.msg, 2)
      //   }
      //
      //   if(this.props.getOrderAndFormState!=nextprops.getOrderAndFormState&&nextprops.getOrderAndFormState=='succ'){
      //     this.setState({
      //         animating:false,
      //     })
      //  }
      // if(this.props.getOrderAndFormState!=nextprops.getOrderAndFormState&&nextprops.getOrderAndFormState=='failed'){
      //     this.setState({
      //         animating:false
      //     })
      //     Toast.fail(nextprops.msg, 1)
      // }
      // if(this.props.getOrderAndFormState!=nextprops.getOrderAndFormState&&nextprops.getOrderAndFormState=='failed'){
      //     this.setState({
      //         animating:false
      //     })
      //     Toast.fail(nextprops.msg, 1)
      // }
    }
    componentWillMount(){
      const { match, actions } = this.props;
      const { params: { orderid } } = match;

      this.setState({
          orderid:orderid,
      })
        actions.refundPrice({
            id:orderid
        })
      console.log('111',orderid)
      
        
    }
    componentDidMount(){
      
    }
    confirmrefund(){
        const { match, actions } = this.props;
        const { params: { orderid } } = match;
        actions.wxRefund({
            id:orderid
        })
    }
    // submit(){
    //   const { actions } = this.props
    //   actions.genepaperinvoice({
    //     paperAddr:this.state.paperAddr,
    //     paperUser:this.state.paperUser,
    //     paperPhone:this.state.paperPhone,
    //     id:this.state.orderid
    //   })
    // }
    // onChangeInput(type,e){
    //   this.setState(Object.assign(this.state,{[type]:e}))
    // }
  render() {
    const{data}=this.state
    const refund = this.props.refundPrice || {}
    const refundp = parseFloat(refund)
    console.log(parseFloat(refund))
      // let refundparr = []    //医生对象转数组对象
      // for (let i in refundp) {
      //     // doctorarr.push(orderdoctor[i]); //属性
      //     refundparr.push(refundp[i]); //值
      // }
    let time=sessionStorage.getItem(1)
    console.log('333',refund)
      console.log('333',this.state)
      console.log('333',this.props)
    return (

      <div className="report_row" style={{padding:'0.4rem'}}>
          <div className="orderconfirm_title">申请退款信息</div>
          <div className="order_cinfo"><span className="order_title">退款金额:</span><span className="order_content">{refundp}元</span></div>
          {/*<div className="order_cinfo"><span className="order_title">姓名:</span><span className="order_content">{getOrderAndForm.name}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">性别:</span><span className="order_content">{getOrderAndForm.gender}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">身份证号:</span><span className="order_content">{getOrderAndForm.idNum}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">年龄:</span><span className="order_content">{getOrderAndForm.old}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">医院:</span><span className="order_content">{getOrderAndForm.hospital}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">科室:</span><span className="order_content">{getOrderAndForm.department}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">主治医生:</span><span className="order_content">{getOrderAndForm.doctor}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">医生邮箱:</span><span className="order_content">{getOrderAndForm.email}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">样本类型:</span><span className="order_content">{getOrderAndForm.sampleType}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">样本数量:</span><span className="order_content">{getOrderAndForm.sampleNum}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">采样日期:</span><span className="order_content">{getOrderAndForm.sampleTime}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">病理诊断:</span><span className="order_content">{getOrderAndForm.diagnosticCancer}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">确诊日期:</span><span className="order_content">{getOrderAndForm.diagnosticTime}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">是否接受过靶向治疗:</span><span className="order_content">{getOrderAndForm.initial}</span></div>*/}
          {/*<div className="order_cinfo"><span className="order_title">靶向治疗是否耐药:</span><span className="order_content">{getOrderAndForm.resistance}</span></div>*/}
          <div className="height2"></div>
          <div className="height2 o_back">
              <div className="back_bnt" onClick={this.confirmrefund.bind(this)}>确定退款</div>
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
    msg:state.user.msg,
    geneParerState:state.user.geneParerState,
    getOrderAndFormState:state.user.getOrderAndFormState,
    getOrderAndForm:state.user.getOrderAndForm,
      refundPriceState:state.user.refundPriceState,
      refundPrice:state.user.refundPrice,
      wxRefundState:state.user.wxRefundState,
      wxRefund:state.user.wxRefund
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
