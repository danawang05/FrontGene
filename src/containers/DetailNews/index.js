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
    clicked(param,event){
        window.location.href=param+'' //hello world
        console.log(event.target.value) //按钮
    }
  render() {
      const news = this.props.newsInfo
      const goto = news.introduction
    return (
      <div className="news_row">
          <div className="newsHead">
              {news.title||''}
          </div>
          <div className="content_news" id="content_news">

          </div>
          <div className="" className={news.classfly==='1290621277424242690'?"fooder_bnt displays":"support_none"}>

              <p className="fooder_bnt_money_content">
                  <span className=" marginLeft1"></span>
                  <span></span>
              </p>
              <div className="sub_button" onClick={(event)=>this.clicked(news.introduction,event)}>
                    立即申请
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