import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form,Icon } from 'antd';
import {Toast } from 'antd-mobile';

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
      imgUrl:""
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
          this.setState({
            imgUrl:nextprops.orderUrl.urls[0].url,
          })
        }else{
          Toast.fail('未发现报告文件', 2)
        }
    }
    if(this.props.getOrderUrlState!=nextprops.getOrderUrlState&&nextprops.getOrderUrlState=='failed'){
      this.setState({
        animating:false
      })
      Toast.fail(nextprops.msg, 2)
    }
    
  }
  componentWillMount(){
    const { match,actions} = this.props;
    const { params: { imgtype,imgid } } = match;
    if(imgtype=='pdf'){
      const { actions } =this.props
      this.setState({
        text:'正在获取检测报告',
        animating:true
      })
      actions.getReportUrl({
        id:imgid,
      })
    }
  }
  // 初始化PDF组件时改变meta为可手动缩放
  componentDidMount(){
  }

  // 组件卸载时恢复meta
  componentWillUnmount(){
  }

render() {
    return (
      <div className="showImgPdf">
            <div className="showImgPdf_row">
              <iframe src={this.state.imgUrl}></iframe>
            </div>
           
            <div className="height2"></div>
            <div className="height2 o_back">
                  <div className="back_bnt" onClick={()=>{this.props.history.goBack()}}><Icon type="rollback" />返回</div>
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
    getOrderUrlState:state.user.getOrderUrlState,
    orderUrl:state.user.orderUrl,
    msg:state.user.msg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
