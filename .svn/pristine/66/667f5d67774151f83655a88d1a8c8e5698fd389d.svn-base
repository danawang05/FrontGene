import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import {Toast,ActivityIndicator } from 'antd-mobile';
import SelectDoctorList from '../../components/SelectDoctorList'
import DoctorDetail from '../DoctorDetail'
import ceshi from '../../sources/ceshi.jpeg'
import img1 from '../../sources/nurse.png'
import img2 from '../../sources/tablet.png'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text:'',
            animating:false,
            selectBnt:1,
            selectDoc:""
        }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.getMyDoctoeState!=nextprops.getMyDoctoeState&&nextprops.getMyDoctoeState=='succ'){
            this.setState({
                animating:false
            })
        }
        if(this.props.getMyDoctoeState!=nextprops.getMyDoctoeState&&nextprops.getMyDoctoeState=='failed'){
            this.setState({
                animating:false
            })
            Toast.fail(nextprops.msg, 2)
        }
    }
    componentWillMount(){
        const {actions} = this.props
        this.setState({
            text:'获取我的医生...',
            animating:true
        })
        actions.myDoctor()
    }
    componentDidMount(){
       
    }
    getDoc(item){
        this.setState({
            selectBnt:'2',
            selectDoc:item
        })
    }
  render() {
      const {myDoctor} = this.props
      console.log("【获取我的医生】",myDoctor)
    return (
      <div className="myDoctor_row">
          <div className="myDoctor_bnt_list displays">
                <div  onClick={()=>this.setState({selectBnt:"1"})} className="myDoctor_bnt">
                    <div>
                        <img className="myDoctor_bnt_img" src={img1} />
                    </div>
                    <div className={this.state.selectBnt=='1'?"myDoctor_bnt_text_select":"myDoctor_bnt_text"}>
                        我的医生
                    </div>
                </div>
                <div   className="myDoctor_bnt" >
                    <div>
                        <img className="myDoctor_bnt_img" src={img2} />
                    </div>
                    <div className={this.state.selectBnt=='2'?"myDoctor_bnt_text_select":"myDoctor_bnt_text"}>
                        基本信息
                    </div>
                </div>
          </div>
          {
              this.state.selectBnt=='1'?myDoctor&&myDoctor.map((item,index)=>{
                return <SelectDoctorList onClick={this.getDoc.bind(this,item)} type="my" key={index} src={item.wxPortrait} time={item.bindDate} name={item.username} content={item.ysHospitalName+"  "+item.ysDepartment} />
              }):<DoctorDetail  doctor={this.state.selectDoc}  onClick={()=>this.setState({selectBnt:"1"})} />
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
    getMyDoctoeState:state.user.getMyDoctoeState,
    myDoctor:state.user.myDoctor,
    msg:state.user.msg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));