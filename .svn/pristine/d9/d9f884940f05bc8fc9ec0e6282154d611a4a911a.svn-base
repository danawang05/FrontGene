import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { } from 'antd-mobile';
import './index.scss';
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
    componentWillReceiveProps(nextprops) {
        if(this.props.getNewsInfoState!=nextprops.getNewsInfoState&&nextprops.getNewsInfoState=='succ'){
              let Dom = document.getElementById('content_news')
              if(nextprops.newsInfo.id){
                Dom.innerHTML=nextprops.newsInfo.content
              }
        }
    }
    componentWillMount(){
        
    }
    componentDidMount(){
      const { match,actions} = this.props;
      const { params: { newsId } } = match;
      actions.newsInfo({
          id:newsId
      })
    }
  render() {
      const news = this.props.newsInfo
    return (
      <div className="news_row">
          <div className="newsHead">
              {news.title||''}
          </div>
          <div className="content_news" id="content_news">

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
    newsInfo:state.user.newsInfo,
    getNewsInfoState:state.user.getNewsInfoState,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));