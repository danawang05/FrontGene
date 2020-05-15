import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { ActivityIndicator, Toast } from 'antd-mobile';

import SearchBar from '../../components/SearchBar'
import MyPetient from '../../components/myPetient'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animating: false,
      search: ''
    }
  }
  componentWillReceiveProps(nextprops) {
    if (this.props.getMyPatientState != nextprops.getMyPatientState && nextprops.getMyPatientState == 'succ') {
      this.setState({
        animating: false
      })
    }
    if (this.props.getMyPatientState != nextprops.getMyPatientState && nextprops.getMyPatientState == 'failed') {
      this.setState({
        animating: false
      })
      Toast.fail(nextprops.msg, 2)
    }
  }
  componentWillMount() {
    const { actions } = this.props
    this.setState({
      text: '获取我的患者...',
      animating: true
    })
    actions.mypatient({
      name: ""
    })
  }
  componentDidMount() {

  }
  search = () => {
    const { actions } = this.props
    this.setState({
      text: '获取我的患者...',
      animating: true
    })
    actions.mypatient({
      name: this.state.search
    })
  }
  changeSearch(e) {
    this.setState({
      search: e.target.value
    })
  }
  handleClick = (item) => {
    this.props.history.push({
      pathname: '/docFollowup',
      query: item,
    })
  }
  render() {
    const { myPatient } = this.props
    const { search } = this.state
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    return (
      <div>
        <SearchBar searchBnt={this.search} onChange={this.changeSearch.bind(this)} value={search} backgroundColor="#ffffff" placeholder="输入关键字检索患者" />
        {
          myPatient.map((item) => {
            let hzBirthday;
            isIOS ? hzBirthday = new Date().getFullYear() - new Date(item.hzBirthday.replace(/-/g, "/")).getFullYear() : null;
            isAndroid ? hzBirthday = new Date().getFullYear() - new Date(item.hzBirthday).getFullYear() : null;
            return <MyPetient onClick={this.handleClick.bind(this, item)} sex={item.hzGender} name={item.username} old={hzBirthday} malady="" />
          })
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
    getMyPatientState: state.user.getMyPatientState,
    myPatient: state.user.myPatient,
    msg: state.user.msg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));