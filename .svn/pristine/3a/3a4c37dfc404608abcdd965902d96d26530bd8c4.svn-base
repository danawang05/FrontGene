import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form ,Icon} from 'antd';
import {Toast, Drawer,ImagePicker,ActivityIndicator} from 'antd-mobile';

import Rinput from '../../components/RegInput'
import GButton from '../../components/GButton'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
import selectYes from '../../sources/yes.png'
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentWillMount(){
            console.log()
    }
    componentDidMount(){
       
    }
  
  render() {
      const {query} = this.props.location
    return (
            <div className="reg_row">
               { query?<div>
                    <div className="r_input_label marginTop4">头像</div>
                    <div className="headImg">
                        <div className="headImg_url">
                            <img src={query.wxPortrait}/>
                        </div>
                    </div>
                    <Rinput label="姓名" disabled={true} value={query.username}  className="marginTop4" />
                    <div className="gender_row">
                        <div className={query.hzGender=='1'?"gender_select floatLeft":"gender floatLeft"} >
                            {
                                query.hzGender=="1"?<div className="gender_select_icon">
                                    <img src={selectYes} />
                                </div>:null
                            }
                            <div className="gender_text">
                                男
                            </div>
                        </div>
                        <div className={query.hzGender=='2'?"gender_select floatRight":"gender floatRight"} >
                            {
                                query.hzGender=="2"?<div className="gender_select_icon">
                                    <img src={selectYes} />
                                </div>:null
                            }
                            
                            <div className="gender_text">
                                女
                            </div>
                        </div>
                    </div>
                    <Rinput label="电子邮箱" disabled={true}  value={query.userMail} className="marginTop4"/>
                    <Rinput label="联系电话"  disabled={true}  value={query.mobile}  className="marginTop4"/>
                    <Rinput label="出生日期" disabled={true} value={query.hzBirthday&&query.hzBirthday.substring(0,10)} className="marginTop4"  />
                    <Rinput label="家庭住址" disabled={true} value={query.hzProvince+" "+query.hzCity+" "+query.hzRegion+" "+query.hzHomeAddr} className="marginTop4" />
                    <Rinput label="紧急联系人电话"  disabled={true} value={query.hzEmergency} className="marginTop4" />
                    <GButton name="返回" onClick={()=> {this.props.history.goBack()}} />
                </div>:null}
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
    getDocImgState:state.user.getDocImgState,
    docImg:state.user.docImg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
