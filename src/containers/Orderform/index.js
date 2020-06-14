import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
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
          orderid:"",
          

          address:'',
          barcodeNumber:'',
          city:'',
          createrTime:'',
          department:'',
          detectResult:'',
          diagnosticCancer:'',
          diagnosticTime:'',
          doctor:'',
          drug:'',
          exonItem:'',
          gender:'',
          geneCompanyName:'',
          hospital:'',
          idNum:'',
          initial:'',
          kuaidiTakeTime:'',
          logisticsCode:'',
          logisticsType:'',
          money:'',
          mutationPoints:'',
          mutationRatio:'',
          name:'',
          old:'',
          orderCoupon:'',
          orderId:'',
          otherCancerName:'',
          otherDrugName:'',
          packageName:'',
          paperAddr:'',
          paperPhone:'',
          paperUser:'',
          paperWaybillNo:'',
          phone:'',
          price:'',
          province:'',
          remark:'',
          reportUploadTime:'',
          resistance:'',
          sample:'',
          sampleNum:'',
          sampleSignTime:'',
          sampleTime:'',
          sampleType:'',
          statu:'',
          targetDrugName:'',
          data:[]
        }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.geneParerState!=nextprops.geneParerState&&nextprops.geneParerState=='succ'){
          Toast.success('提交成功', 2)
          this.props.history.goBack()
        }
        if(this.props.geneParerState!=nextprops.geneParerState&&nextprops.geneParerState=='failed'){
          Toast.fail(nextprops.msg, 2)
        }

        if(this.props.getOrderAndFormState!=nextprops.getOrderAndFormState&&nextprops.getOrderAndFormState=='succ'){
          this.setState({
              animating:false,
          })
       }
      if(this.props.getOrderAndFormState!=nextprops.getOrderAndFormState&&nextprops.getOrderAndFormState=='failed'){
          this.setState({
              animating:false
          })
          Toast.fail(nextprops.msg, 1)
      }
      if(this.props.getOrderAndFormState!=nextprops.getOrderAndFormState&&nextprops.getOrderAndFormState=='failed'){
          this.setState({
              animating:false
          })
          Toast.fail(nextprops.msg, 1)
      }
    }
    componentWillMount(){
      const { match, actions } = this.props;
      const { params: { orderid } } = match;
      actions.getOrderAndForm({
        orderId:orderid
    })
      this.setState({
          orderid:orderid,
      })
      console.log('111',orderid)
      
        
    }
    componentDidMount(){
      
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
    let getOrderAndForm = this.props.getOrderAndForm||{}
    let time=sessionStorage.getItem(1)
    console.log('333',this.props)
    console.log('222',getOrderAndForm)
    return (

      <div className="report_row" style={{padding:'0.4rem'}}>
          <div className="orderconfirm_title">申请单基本信息</div>
          <div className="orderconfirm_title">仅供查看无法更改</div>
          <div className="order_cinfo"><span className="order_title">套餐名称:</span><span className="order_content">{getOrderAndForm.packageName}</span></div>
          <div className="order_cinfo"><span className="order_title">姓名:</span><span className="order_content">{getOrderAndForm.name}</span></div>
          <div className="order_cinfo"><span className="order_title">性别:</span><span className="order_content">{getOrderAndForm.gender}</span></div>
          <div className="order_cinfo"><span className="order_title">身份证号:</span><span className="order_content">{getOrderAndForm.idNum}</span></div>
          <div className="order_cinfo"><span className="order_title">年龄:</span><span className="order_content">{getOrderAndForm.old}</span></div>
          <div className="order_cinfo"><span className="order_title">医院:</span><span className="order_content">{getOrderAndForm.hospital}</span></div>
          <div className="order_cinfo"><span className="order_title">科室:</span><span className="order_content">{getOrderAndForm.department}</span></div>
          <div className="order_cinfo"><span className="order_title">主治医生:</span><span className="order_content">{getOrderAndForm.doctor}</span></div>
          <div className="order_cinfo"><span className="order_title">医生邮箱:</span><span className="order_content">{getOrderAndForm.email}</span></div>
          <div className="order_cinfo"><span className="order_title">样本类型:</span><span className="order_content">{getOrderAndForm.sampleType}</span></div>
          <div className="order_cinfo"><span className="order_title">样本数量:</span><span className="order_content">{getOrderAndForm.sampleNum}</span></div>
          <div className="order_cinfo"><span className="order_title">采样日期:</span><span className="order_content">{getOrderAndForm.sampleTime}</span></div>
          <div className="order_cinfo"><span className="order_title">病理诊断:</span><span className="order_content">{getOrderAndForm.diagnosticCancer}</span></div>
          <div className="order_cinfo"><span className="order_title">确诊日期:</span><span className="order_content">{getOrderAndForm.diagnosticTime}</span></div>
          <div className="order_cinfo"><span className="order_title">是否接受过靶向治疗:</span><span className="order_content">{getOrderAndForm.initial}</span></div>
          <div className="order_cinfo"><span className="order_title">靶向治疗是否耐药:</span><span className="order_content">{getOrderAndForm.resistance}</span></div>
          
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
    getOrderAndForm:state.user.getOrderAndForm
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
