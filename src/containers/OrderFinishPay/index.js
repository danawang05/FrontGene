import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form ,Icon} from 'antd';
import {Toast } from 'antd-mobile';

import './index.scss';
import OrderListBnt from '../../components/OrderListBnt'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class OrderFinishPay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            orderid:"",
            codeSuccess:''
        }
    }
    componentWillReceiveProps(nextprops) {

        if(this.props.getOrderDetailState!=nextprops.getOrderDetailState&&nextprops.getOrderDetailState=='failed'){
            Toast.fail(nextprops.msg, 2)
        }
        if(this.props.uploadState!=nextprops.uploadState&&nextprops.uploadState=='succ'){
            Toast.success('上传成功', 2)
        }
        if(this.props.uploadState!=nextprops.uploadState&&nextprops.uploadState=='failed'){
            Toast.success(nextprops.msg, 2)
        }
        if(this.props.saveAppImgState!=nextprops.saveAppImgState&&nextprops.saveAppImgState == 'failed'){
            Toast.success(nextprops.msg, 2)
        }
        if(this.props.saveOrderCodeState!=nextprops.saveOrderCodeState&&nextprops.saveOrderCodeState == 'failed'){
            Toast.success(nextprops.msg, 2)
        }
        if(this.props.saveOrderCodeState!=nextprops.saveOrderCodeState&&nextprops.saveOrderCodeState == 'succ'){
            this.setState({
                codeSuccess:true
            })
            Toast.success('绑定成功', 2)
        }
        
    }
    componentWillMount(){
        document.title="已支付订单"
        //是否上传申请单
        const { match, actions } = this.props;
        const { params: { orderid,types } } = match;
        actions.isUploadApplicationImg({
            id:orderid
        })
        this.setState({
            types:types
        })
        actions.ticket({})
    }

    componentDidMount(){
        const { match, actions } = this.props;
        const { params: { orderid } } = match;
        this.setState({
            orderid:orderid
        })
        actions.geneorderdetail({
            id:orderid
        })
    }
    nextPage(index){
        if(index==2){
            this.props.history.push('/logistics/'+this.state.orderid)
        }
        if(index==4){
            this.props.history.push(`/bill/${this.state.orderid}`)
        }
        if(index==5){
            this.props.history.push(`/report/${this.state.orderid}`)
        }
        if(index==6){
            this.props.history.push(`/orderform/${this.state.orderid}`)
        }
    }
    onChangeImg = (e) => {
        const {actions} = this.props
        actions.saveApplicationImg({
            relationId:this.state.orderid,
            file:e.target.files[0]
        })
    }
    ceshi = () => {
        // const { actions} = this.props
        // actions.geneorderIsPay({
        //     id:this.state.orderid
        // })
        const {actions} = this.props
        let _this = this
        window.wx.checkJsApi({
            jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                console.log(res)
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });

        window.wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            window.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                trigger: function (res) {        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    console.log('用户点击发送给朋友');
                },
                success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                actions.saveOrderBarCode({
                    barCode:result,
                    orderId:_this.state.orderid
                })
                }
            });
        });
    }
    showYangben = (id) => {
        //查看样本申请单
        this.props.history.push(`/showImg/img/${this.state.orderid}`)
    }
  render() {
      const order = this.props.orderDetail
      const TEXTFORMAT = (text) => (text||"")
      const SHOW_YANGBEN = this.props.isUploadApplocationImg
      console.log(this.props.isUploadApplocationImg)
      const {getApplocationImg} = this.props
      const {codeSuccess} = this.state
    return (
      <div className="OrderFinishPay_row">
          <div className="OrderFinishPay_row_title">
                <div className="OrderFinishPay_row_title_name displays" >
                    <div>
                        {TEXTFORMAT(order.title)} <span className="color_00e37a"> <Icon type="safety-certificate" /></span>
                    </div>
                    <div className="OrderFinishPay_row_title_money">
                        <span className="money_content_icon" >¥</span>
                        {TEXTFORMAT(order.orderMoney)}
                    </div>
                </div>
                <div className="OrderFinishPay_row_title_msg">
                    套餐代码：{TEXTFORMAT(order.number)}
                </div>
          </div>
          {/* {
              !SHOW_YANGBEN?<OrderListBnt type="file" accept="image/*" onChange={this.onChangeImg}  icon="1" text="拍照上传样本检测申请照片" msg="拍照上传样本照片、检测申请单的正面及反面照片" bntText="拍照上传"/>:
          } */}
          {/*<OrderListBnt onClick = {this.showYangben} icon="1" text="拍照上传样本检测申请照片" msg="拍照上传样本照片、检测申请单的正面及反面照片(备注：PDL1检测需要上传病理报告照片及EGFR、ALK基因检测报告照片)" bntText="拍照上传"/>*/}
          <OrderListBnt isNotShow={order.barcodeNumber||codeSuccess} showText="已绑定" onClick = {this.ceshi} icon="2" text="扫描申请单条形码" msg="扫描物料包中的条形码进行订单绑定" bntText="去扫码"/>
          <OrderListBnt onClick={this.nextPage.bind(this,2)} icon="3" text="查询物流信息" msg="样本发出后可在平台查询到物流运输情况" bntText="查询信息"/>
           <OrderListBnt onClick={this.nextPage.bind(this,6)} icon="6" text="查看电子申请单信息" msg="点击查看订单 不可修改信息 如信息有误 请拨打客服电话进行修改" bntText="订单信息"/>
          {/*<OrderListBnt onClick={this.nextPage.bind(this,4)} icon="4" text="开具发票" msg="电子版发票，发票开具方为【聚身边（北京）科技有限公司】，发票内容为【咨询服务费】" bntText="开发票"/>*/}
          {/*<OrderListBnt onClick={this.nextPage.bind(this,5)} isNotShow={order.isPaper == '1'} showText="已填写" icon="5" text="纸质报告" msg="填写真实有效的纸质报告接收地址" bntText="纸质报告" />*/}
          <div className="height2"></div>
          <div className="height2 o_back">
                <div className="back_bnt" onClick={()=>{if(this.state.types){this.props.history.goBack()}else{this.props.history.push('/orderList')}}}><Icon type="rollback" />返回</div>
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


const LoginForm = Form.create()(OrderFinishPay);

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  const props = {
    getOrderDetailState:state.user.getOrderDetailState,
    orderDetail:state.user.orderDetail,
    uploadState:state.user.uploadState,
    saveAppImgState:state.user.saveAppImgState,
    saveOrderCodeState:state.user.saveOrderCodeState,
    isUploadApplocationImgState:state.user.isUploadApplocationImgState,
    isUploadApplocationImg:state.user.isUploadApplocationImg,
    getApplocationImg:state.user.getApplocationImg,
    msg:state.user.msg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
