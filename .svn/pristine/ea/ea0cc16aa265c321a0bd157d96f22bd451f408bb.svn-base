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
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentWillMount(){
        const { actions } = this.props
        actions.getDoctorIdImg({
            id:this.props.doctor.id
        })
    }
    componentDidMount(){
       
    }
  
  render() {
      const {doctor,onClick,docImg} = this.props
      let photo = ""
      if(docImg.urls&&docImg.urls.length>0){
        photo = docImg.urls[0].url
      }
    return (
            <div className="reg_row">
               { doctor?<div>
                    <div className="r_input_label marginTop4">头像</div>
                    <div className="headImg">
                        <div className="headImg_url">
                            <img src={doctor.wxPortrait}/>
                        </div>
                    </div>
                    <Rinput label="姓名" disabled={true} value={doctor.username}  className="marginTop4" />
                    <Rinput label="电子邮箱" disabled={true}  value={doctor.userMail} className="marginTop4"/>
                    <Rinput label="联系电话"  disabled={true}  value={doctor.mobile}  className="marginTop4"/>
                    <Rinput label="医生职称" disabled={true} value={doctor.ysTitle} className="marginTop4"  />
                    <Rinput label="就职医院" disabled={true} value={doctor.ysHospitalName} className="marginTop4" />
                    <Rinput label="就职城市"  disabled={true} value={doctor.ysProvince} className="marginTop4" />
                    <Rinput label="科室" disabled={true} value={doctor.ysDepartment} className="marginTop4" />
                    <div className="r_input_label marginTop4">职业资格证</div>
                    <div className="photoImg marginTop4">
                       <img src={photo} />
                    </div>
                    <GButton name="返回" onClick={onClick} />
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
