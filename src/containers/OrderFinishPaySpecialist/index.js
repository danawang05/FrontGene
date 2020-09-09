import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form ,Icon} from 'antd';
import {Toast } from 'antd-mobile';
import { Steps, WingBlank, WhiteSpace } from 'antd-mobile';
import './index.scss';
import OrderListBnt from '../../components/OrderListBnt'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
import { Modal, List, Button} from 'antd-mobile';
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

        if(this.props.tdoctorgetOrderDetailState!=nextprops.tdoctorgetOrderDetailState&&nextprops.tdoctorgetOrderDetailState=='failed'){
            Toast.fail(nextprops.msg, 2)
        }
        // if(this.props.refundPriceState!=nextprops.refundPriceState&&nextprops.refundPriceState=='failed'){
        //     this.setState({
        //         animating: false
        //     })
        //     Toast.fail(nextprops.msg, 2)
        //  }
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
        document.title="已支付预约"
        //是否上传申请单
        const { match, actions } = this.props;
        const { params: { orderid,types } } = match;
        // actions.geneorderdetail({
        //     id:orderid
        // })
        actions.tdoctorgeneorderdetail({
            id:orderid
        })
        // actions.refundPrice({
        //     id:orderid
        // })
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
        // actions.tdoctorgeneorderdetail({
        //     id:orderid
        // })
        // actions.geneorderdetail({
        //     id:orderid
        // })
    }
    showModal = key => (e) => {

        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
        // const { match, actions } = this.props;
        // const { params: { orderid } } = match;
        // actions.refundPrice({
        //     id:orderid
        // })

    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
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
            const {actions} = this.props
            this.props.history.push(`/orderformSpecialist/${this.state.orderid}`)
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
      const Step = Steps.Step;
      const customIcon = () => (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
              <g fillRule="" stroke="transparent" strokeWidth="4">
                  <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
                  <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" />
              </g>
          </svg>
      );

      let orderobject = this.props.tdoctororderDetail
      const order = Object.keys(this.props.tdoctororderDetail).map(key=> this.props.tdoctororderDetail[key])
      const orderdoctor = order[0]
      const orderdoctororder = order[1]
      console.log('==orderobject===',orderobject)
      console.log('==order===',order)
      console.log('==order[0]===',order[0])
      let doctorarr = []    //医生对象转数组对象
      for (let i in orderdoctor) {
          // doctorarr.push(orderdoctor[i]); //属性
          doctorarr.push(orderdoctor[i]); //值
      }
      let doctororderarr = []   //预约订单转数组
      for (let i in orderdoctororder) {
          // doctororderarr.push(orderdoctororder[i]); //属性
          doctororderarr.push(orderdoctororder[i]); //值
      }
      console.log('==doctororderarr===',doctororderarr)
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
                        {TEXTFORMAT(doctorarr[1])} <span className="color_00e37a"> <Icon type="safety-certificate" /></span>
                    </div>
                    <div className="OrderFinishPay_row_title_money">
                        <span className="money_content_icon" >¥</span>
                        {TEXTFORMAT(doctororderarr[3])}
                    </div>
                </div>
                <div className="OrderFinishPay_row_title_msg">
                    预约代码：{TEXTFORMAT(doctororderarr[0])}
                </div>
          </div>
          <div className="OrderFinishPay_row_title" style={{'padding':'0 1rem'}}>
              <WingBlank size="lg">
                  <div className="sub-title" style={{'padding':'0.2rem','fontSize':'0.4rem'}}>预约进度</div>
                  <WhiteSpace size="lg" />
                  <Steps current={doctororderarr[8]}>
                      <Step title="预约"  description="已完成"/>
                      <Step title="付款"  description="已完成"/>
                      <Step title="资料上传" description="资料上传"/>
                      <Step title="资料接收" description="资料接收"/>
                      <Step title="咨询时间" description="咨询时间"/>
                      <Step title="咨询结束" description="咨询结束"/>
                  </Steps>
              </WingBlank>

          </div>
          {

              doctororderarr[7] == '1'?<WingBlank>
                  <OrderListBnt onClick={this.nextPage.bind(this,6)} icon="3" text="退款" msg="退款" bntText="申请退款"/>
                  {/*<OrderListBnt onClick={this.showModal('modal2')} icon="3" text="退款" msg="退款" bntText="退款"/>*/}
                  {/*<Modal*/}
                      {/*popup*/}
                      {/*maskClosable={false}*/}
                      {/*visible={this.state.modal2}*/}
                      {/*onClose={this.onClose('modal2')}*/}
                      {/*animationType="slide-up"*/}
                      {/*afterClose={() => { alert('afterClose'); }}*/}
                  {/*>*/}
                      {/*<List renderHeader={() => <div>退款确认</div>} className="popup-list">*/}
                          {/*{['股票名称', '股票代码', '买入价格'].map((i, index) => (*/}
                              {/*<List.Item key={index}>{i}</List.Item>*/}
                          {/*))}*/}
                          {/*<List.Item>*/}
                              {/*<Button type="primary" onClick={this.onClose('modal2')}>确定</Button>*/}
                          {/*</List.Item>*/}
                      {/*</List>*/}
                  {/*</Modal>*/}

              </WingBlank>:<div className="OrderFinishPay_row_title">
                  <div className="OrderFinishPay_row_title_name displays" >
                  <div>
                      <span className="color_00e37a"> <Icon type="safety-certificate" /></span>退款
                  </div>
                  <div className="OrderFinishPay_row_title_money">
                      <span className="money_content_icon" ></span>
                     退款完成
                  </div>
              </div>
              </div>
          }
          {/*<OrderListBnt onClick={this.nextPage.bind(this,6)} icon="3" text="退款" msg="退款" bntText="退款"/>*/}
          {/* {
              !SHOW_YANGBEN?<OrderListBnt type="file" accept="image/*" onChange={this.onChangeImg}  icon="1" text="拍照上传样本检测申请照片" msg="拍照上传样本照片、检测申请单的正面及反面照片" bntText="拍照上传"/>:
          } */}
          {/*<OrderListBnt onClick = {this.showYangben} icon="1" text="拍照上传样本检测申请照片" msg="拍照上传样本照片、检测申请单的正面及反面照片(备注：PDL1检测需要上传病理报告照片及EGFR、ALK基因检测报告照片)" bntText="拍照上传"/>*/}
          {/*<OrderListBnt isNotShow={order.barcodeNumber||codeSuccess} showText="已绑定" onClick = {this.ceshi} icon="2" text="扫描申请单条形码" msg="扫描物料包中的条形码进行订单绑定" bntText="去扫码"/>*/}
          {/*<OrderListBnt onClick={this.nextPage.bind(this,2)} icon="3" text="查询患者填写信息" msg="查询患者填写信息" bntText="查询信息"/>*/}
           {/*<OrderListBnt onClick={this.nextPage.bind(this,6)} icon="6" text="查看电子申请单信息" msg="点击查看订单 不可修改信息 如信息有误 请拨打客服电话进行修改" bntText="订单信息"/>*/}
          {/*<OrderListBnt onClick={this.nextPage.bind(this,4)} icon="4" text="开具发票" msg="电子版发票，发票开具方为【聚身边（北京）科技有限公司】，发票内容为【咨询服务费】" bntText="开发票"/>*/}
          {/*<OrderListBnt onClick={this.nextPage.bind(this,5)} isNotShow={order.isPaper == '1'} showText="已填写" icon="5" text="纸质报告" msg="填写真实有效的纸质报告接收地址" bntText="纸质报告" />*/}
          <div className="height2"></div>
          <div className="height2 o_back">
                <div className="back_bnt" onClick={()=>{if(this.state.types){this.props.history.goBack()}else{this.props.history.push('/orderListSpecialist')}}}><Icon type="rollback" />返回</div>
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

    tdoctorgetOrderDetailState:state.user.tdoctorgetOrderDetailState,
    tdoctororderDetail:state.user.tdoctororderDetail,



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
