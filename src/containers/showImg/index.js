import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form,Icon } from 'antd';
import {Toast,ActivityIndicator } from 'antd-mobile';

// import PDF from 'react-pdf-js';


import ceshi from '../../sources/pdf.pdf'
import './index.scss';
import PDF from '../../components/PDF'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
// import PdfPreview from "react-pdf-preview";
// import { PDFReader,MobilePDFReader } from 'react-read-pdf';
const FormItem = Form.Item;
const pdfurl = require('../../sources/pdf.pdf')
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imgUrl:"",
      imgtype:'',
      imgArr:[],
      text:'',
      animating:false,
      imgId:[]
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
    if(this.props.getOrderUrlState!=nextprops.getOrderUrlState&&nextprops.getOrderUrlState=='succ'){
      this.setState({
        animating:false,
      })
        if(nextprops.orderUrl.urls.length>0){
          if(this.state.imgtype == 'img'){
            this.setState({
              imgArr:nextprops.orderUrl.urls,
              imgId:nextprops.orderUrl.urls.map(v => v.id)
            })

          }else{
            this.setState({
              imgUrl:nextprops.orderUrl.urls[0].url,
            })
          }
          
        }else{
          Toast.fail('未发现文件', 2)
        }
    }
    if(this.props.getOrderUrlState!=nextprops.getOrderUrlState&&nextprops.getOrderUrlState=='failed'){
      this.setState({
        animating:false
      })
      Toast.fail(nextprops.msg, 2)
    }
    if(this.props.uploadState!=nextprops.uploadState&&nextprops.uploadState=='succ'){
      this.setState({
        animating:false
      })
      Toast.success('上传成功', 2)
    }
    if(this.props.uploadState!=nextprops.uploadState&&nextprops.uploadState=='failed'){
      this.setState({
        animating:false
      })
        Toast.success(nextprops.msg, 2)
    }
    if(this.props.saveAppImgState!=nextprops.saveAppImgState&&nextprops.saveAppImgState == 'failed'){
        Toast.success(nextprops.msg, 2)
    }
    if(this.props.saveAppImgState!=nextprops.saveAppImgState&&nextprops.saveAppImgState == 'succ'){
        this.getData()
    }
    if(this.props.saveOrderCodeState!=nextprops.saveOrderCodeState&&nextprops.saveOrderCodeState == 'failed'){
        Toast.success(nextprops.msg, 2)
    }
    if(this.props.saveOrderCodeState!=nextprops.saveOrderCodeState&&nextprops.saveOrderCodeState == 'succ'){
        
        Toast.success('绑定成功', 2)
    }
    if(this.props.getIncoivceimg!=nextprops.getIncoivceimg&&nextprops.getIncoivceimg=='succ'){
      this.setState({
        animating:false
      })
      this.setState({
        imgArr:nextprops.imgUrl.urls
      })
    }
    
  }
  componentWillMount(){
    const { match,actions} = this.props;
    const { params: { imgtype,imgid } } = match;
    if(imgtype=='pdf'){
      const { actions } =this.props
      this.setState({
        text:'正在获取检测报告',
        animating:true,
        imgtype:imgtype
      })
      actions.getReportUrl({
        id:imgid,
      })
    }
    if(imgtype == 'img'){
      const { actions } =this.props
      this.setState({
        text:'正在获取',
        animating:true,
        imgtype:imgtype,
        orderid:imgid
      })
      actions.getApplicationImg({
        id:imgid,
      })
    }
    if(imgtype == 'invoceImg'){
      const { actions } =this.props
      this.setState({
        text:'正在获取',
        animating:true,
        imgtype:imgtype,
        orderid:imgid
      })
      actions.getInvoiceImg({
          orderId:imgid
      })
    }
  }
  // 初始化PDF组件时改变meta为可手动缩放
  componentDidMount(){
      // document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width,user-scalable=yes,initial-scale=0.5,maximum-scale=1.2,minimum-scale=0.1");
  }

  // 组件卸载时恢复meta
  componentWillUnmount(){
      // document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width,user-scalable=no,initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5");
      // window.location.reload();
  }
  onChangeImg = (e) => {
    const {actions} = this.props
    this.setState({
      text:'正在上传',
      animating:true,
    }) 
    actions.saveApplicationImg({
        relationId:this.state.orderid,
        file:e.target.files[0],
        fileId:this.state.imgId
    })
  }
  getData = () => {
    const { match,actions} = this.props;
    const { params: { imgtype,imgid } } = match;
    if(this.state.imgtype == 'img'){
      const { actions } =this.props
      this.setState({
        text:'正在获取',
        animating:true,
        imgtype:imgtype,
        orderid:imgid
      })
      actions.getApplicationImg({
        id:imgid,
      })
      
    }
  }
render() {
    const {imgtype,imgArr} = this.state
    return (
      <div className="showImgPdf">
          {
            imgtype == 'pdf'?<div className="showImgPdf_row">
                                <iframe width="100%" src={this.state.imgUrl}></iframe>
                              </div>:imgArr.map((item)=>{
                                  return <div className="showImg_img">
                                    <img src={item.url} />
                                  </div>
                              }
                                      
                                )
          }
            <div className="height2"></div>
           { imgtype == 'pdf'?<div className="height2 o_back">
                  <div className="back_bnt" onClick={()=>{this.props.history.goBack()}}><Icon type="rollback" />返回</div>
            </div>:null}
            {
               imgtype == 'img'?<div className="height2 o_back">
                  <div className="displays reportList_bnt">
                      <div className="flex1"></div>
                      <div onClick={()=>{this.props.history.goBack()}}  className="gray_bnt reportList_bnt_one marginRight">
                          <Icon type="rollback" />返回
                      </div>
                      <div  className="reportList_bnt_one promise_bnt upload_img_one" style={{position:"relative"}}>
                          <input onChange={this.onChangeImg}  type="file" name="cover"   multiple />
                          <Icon type="edit" />拍照上传
                      </div>
                      <div className="flex1"></div>
                  </div>
              </div>:null
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
    getOrderUrlState:state.user.getOrderUrlState,
    orderUrl:state.user.orderUrl,
    uploadState:state.user.uploadState,
    saveAppImgState:state.user.saveAppImgState,
    saveOrderCodeState:state.user.saveOrderCodeState,
    isUploadApplocationImgState:state.user.isUploadApplocationImgState,
    isUploadApplocationImg:state.user.isUploadApplocationImg,
    getApplocationImg:state.user.getApplocationImg,
    msg:state.user.msg,
    getIncoivceimg:state.user.getIncoivceimg,
    imgUrl:state.user.imgUrl,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
