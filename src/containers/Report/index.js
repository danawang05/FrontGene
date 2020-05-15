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
          paperAddr:'',
          paperUser:'',
          paperPhone:'',
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
    }
    componentWillMount(){
      const { match, actions } = this.props;
      const { params: { orderid } } = match;
      this.setState({
          orderid:orderid
      })
    }
    componentDidMount(){
       
    }
    submit(){
      const { actions } = this.props
      actions.genepaperinvoice({
        paperAddr:this.state.paperAddr,
        paperUser:this.state.paperUser,
        paperPhone:this.state.paperPhone,
        id:this.state.orderid
      })
    }
    onChangeInput(type,e){
      this.setState(Object.assign(this.state,{[type]:e}))
    }
  render() {
    const {paperAddr,paperUser,paperPhone } = this.state
    return (
      <div className="report_row">
          <Rinput value={paperUser}  onChange={this.onChangeInput.bind(this,'paperUser')} placeholder="请填写收件人" />
          <Rinput value={paperPhone}  onChange={this.onChangeInput.bind(this,'paperPhone')} className="marginTop4"  placeholder="请填写收件电话" />
          <Rinput value={paperAddr} onChange={this.onChangeInput.bind(this,'paperAddr')} className="marginTop4" placeholder="请输入收件地址" icon = "address"/>
          <GButton  bgColor="#ff4b61" name="提交" onClick={this.submit.bind(this)} />
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
    geneParerState:state.user.geneParerState
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
