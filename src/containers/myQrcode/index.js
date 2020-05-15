import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { } from 'antd-mobile';
import {qrCodeUrl} from '../../actions/config'

import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;
var QRCode = require('qrcode.react');
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
         value:''
        }
    }
    componentWillReceiveProps(nextprops) {
        
    }
    componentWillMount(){

    }
    componentDidMount(){
       
    }
  render() {
    console.log( qrCodeUrl+sessionStorage.getItem('userId')+"&response_type=code&scope=snsapi_userinfo#wechat_redirect")
    return (
      <div className="myQrcode_row">
          <div className="myQrcode_content">
                <div className="myQrcode_head">
                  <div className="myQrcode_head_text">
                      { this.props.user.entity&&this.props.user.entity.username}
                  </div>
                </div>
                <div className="myQrcode_body">
                     <div className="qrcode"><QRCode id='theCanvas' style={{ width: '76vw', height: '76vw' }} value={
                       qrCodeUrl+sessionStorage.getItem('userId')+"&response_type=code&scope=snsapi_userinfo#wechat_redirect"
                     } /></div>
                     <p>扫描上面的二维码图片</p>
                </div>
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
    user:state.user.user
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
