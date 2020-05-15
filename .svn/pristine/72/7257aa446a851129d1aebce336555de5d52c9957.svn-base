import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { Flex ,WhiteSpace,Popover, NavBar, Icon,Button,Modal } from 'antd-mobile';
import $ from 'jquery';
import './index.scss';
import * as actions from './../../actions';
import {sdk_appid,ec_key,ec_publics} from './../../actions/config'
import 'antd-mobile/dist/antd-mobile.css';
// import { onFriendAddNotify } from '../../server/js/msg/receive_friend_system_msg.js'
const FormItem = Form.Item;
const prompt = Modal.prompt;
const alert = Modal.alert;
// const ec_key = `-----BEGIN PRIVATE KEY-----
// MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg6aNWLmaxfRUU/9ts
// t6sVoaqQZdPOd2L+juZpzTOrbfahRANCAASqBJyHmyuSYzM0RZGznYLEaamwzcjW
// Yb7AzTmW/+0mIHJBt82CuqNtnpFjLyUfCMaqpzCVBF4NnRsyRT4GVHt8
// -----END PRIVATE KEY-----
// `
// const publics = `-----BEGIN PUBLIC KEY-----
// MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEqgSch5srkmMzNEWRs52CxGmpsM3I
// 1mG+wM05lv/tJiByQbfNgrqjbZ6RYy8lHwjGqqcwlQReDZ0bMkU+BlR7fA==
// -----END PUBLIC KEY-----
// `

const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          visible: true,
          selected: '',
        }
        this.syntaxHighlight=this.syntaxHighlight.bind(this)
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.getOpenidState!=nextprops.getOpenidState){
          $('#result').html(this.syntaxHighlight({data:nextprops.openid,msg:nextprops.msg}));
        }
    }
    componentWillMount(){

    }
    componentDidMount(){
       
    }
    onSelect = (opt) => {
      // console.log(opt.props.value);
      this.setState({
        visible: false,
        selected: opt.props.value,
      });
    };
    handleVisibleChange = (visible) => {
      this.setState({
        visible,
      });
    };
    //json字符串显示
    syntaxHighlight(json) {
      if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
          var cls = 'number';
          if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                  cls = 'key';
              } else {
                  cls = 'string';
              }
          } else if (/true|false/.test(match)) {
              cls = 'boolean';
          } else if (/null/.test(match)) {
              cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
      });
    }
    genSig(){
        var sig = require('tls-sig-api');
        const {actions} = this.props
        var config = {
            sdk_appid:sdk_appid,
            expire_after:99999999,
            private_key_string:ec_key,
            public_key_string: ec_publics
        }
        
        var sig = new sig.Sig(config);
        $('#data_sub').html(this.syntaxHighlight(config));
        $('#result').html(this.syntaxHighlight({UserSig:sig.genSig("15601019270")}));
    }
    getOpnid(){
       let code = "021fxNbf0mxFnt1GpQdf0mMJbf0fxNbD"
       const {actions} = this.props
       actions.getOpnid({
         code:code
       })
       $('#data_sub').html(this.syntaxHighlight({code:code}));
    }
    goReg(){
      let params = {
        code:'1234',
        mobile:'15601019271',
        openId:'123123',
        UserSig:'123'
      }
      $('#data_sub').html(this.syntaxHighlight(params));
      const {actions} = this.props
      actions.reg(params)
    }
    getInformation(){
      
    }
    getMyDoc(){

    }
    chat(i){
      let userSig = ''
      let identifier = ''
      let that = this
      if(i==1){
        identifier = "admin"
        userSig = "eJxNjl1PgzAUhv9LbzXaIh*byS4YMiWwJchY4m5IhbKdEkpldeAW-7uV1MT38nnevOdc0TbJ7mhZdp9CFepLMvSIMLqdMFRMKKiB9RrSqgVhBJUSqoKq4qGv-vVPVVNMSjNiY2xZnus4RrJRQs8KWqtpbm5i7Jn1J*iEFhYmLsGEYB0jFbS-bxHHtfWq59p-9*Cg8TpMgygMoqGd50Rcmvj*o14NQTY7yrDF4b45bNevm355A8R-jhPfh*XMIm*bPOjeWfKyGwd3V3vN6njhKfUyXhJ*5lEWj-n*iaeLBfr*ARl1V6Q_"
      }else{
        identifier="15601019270"
        userSig = "eJxNjl1PgzAYhf8Ltxp921IYJruCYqaYSNxkXjUECtZtpSl1OIz-fRVZ4rk8T87Ht7fOXm7Kquo*leX2pIV354F3PdmyFsrKRgrjTEQDQIAiHF5wqbWseWk5MfW-VF-v*IR*Qz4AxmFA6QzFl5ZG8LKxU2k0a6ZHYXrZKQcwoMCtIXCaoZUH8ffDd60LRC57snX2E9vEqzwpGIxG0PuOJmFbndR78bY4vg7JyPZ4HQ-pLogquPKTWOer9vGDmY3-EJJ*m46HgaSjJanPGB1ug-x530AXFlmmUjBs6f2cAZE5Vv0_"
      }
      var loginInfo = {
        'sdkAppID': sdk_appid, //用户所属应用id,必填
        // 'accountType': accountType, //用户所属应用帐号类型, 已废弃
        'identifier': identifier, //当前用户ID,必须是否字符串类型，必填
        'userSig': userSig
      };
      var onFriendSystemNotifys = {
        // "1": onFriendAddNotify, //好友表增加
        // "2": onFriendDeleteNotify, //好友表删除
        // "3": onPendencyAddNotify, //未决增加
        // "4": onPendencyDeleteNotify, //未决删除
        // "5": onBlackListAddNotify, //黑名单增加
        // "6": onBlackListDeleteNotify //黑名单删除
      };
      var listeners = {
          // "onConnNotify": onConnNotify//监听连接状态回调变化事件，选填
          // ,"jsonpCallback": jsonpCallback//IE9（含）以下浏览器用到的 jsonp 回调函数
          "onMsgNotify": onMsgNotify,//监听新消息（私聊，普通群（非直播聊天室）消息，全员推送消息）事件，必填
          // ,"onBigGroupMsgNotify": onBigGroupMsgNotify//监听新消息（直播聊天室）事件，直播场景下必填
          // "onGroupSystemNotifys": onGroupSystemNotifys//监听（多终端同步）群系统消息事件，如果不需要监听，可不填
          // ,"onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填
          // "onFriendSystemNotifys": onFriendSystemNotifys//监听好友系统通知事件，选填
          // ,"onProfileSystemNotifys": onProfileSystemNotifys//监听资料系统（自己或好友）通知事件，选填
          // ,"onKickedEventCall" : onKickedEventCall//被其他登录实例踢下线
          // ,"onC2cEventNotifys": onC2cEventNotifys//监听 C2C 系统消息通道
          "onLongPullingNotify": function (data) {
            var skey= `GROUP123`;    // 拼装 skey
            var sessMap= window.webim.MsgStore.sessMap();    // 获取 sessMap
            console.log("【未读群消息】:",sessMap)
            console.log(sessMap[skey].unread())
          }
      };
      //msg
      function onMsgNotify(msg){
        console.log("【新消息】",msg)
        const {actions} = that.props
        actions.onMsgNotify({
          msg:msg
        })
      }
      function getSessMap(){
        const {actions} = that.props
        actions.getSessMap()
      }
      function getSessMapHistory (){
        const{actions} = that.props
        actions.getSessMapHistory()
      }
      // 消息通知
      function onGroupSystemNotifys(newMsgList){
          console.log("【消息通知】================:",newMsgList)
          var sess, newMsg ,selSess;
          //获取所有聊天会话
          var sessMap = window.webim.MsgStore.sessMap();

          for (var j in newMsgList) {//遍历新消息
              newMsg = newMsgList[j];
              if (newMsg.getSession().id() == '123') {// 为当前聊天对象的消息，selToID 为全局变量，表示当前正在进行的聊天 ID，当聊天类型为私聊时，该值为好友帐号，否则为群号。
                  selSess = newMsg.getSession();
                  //在聊天窗体中新增一条消息
                  //console.warn(newMsg);
                  // addMsg(newMsg);
              }
          }
          //消息已读上报，以及设置会话自动已读标记
          window.webim.setAutoRead(selSess, true, true);
          for (var i in sessMap) {
              sess = sessMap[i];
                  if ('123' != sess.id()) {//更新其他聊天对象的未读消息数
                      // updateSessDiv(sess.type(), sess.id(), sess.unread());
                  }
          }
      }
      var options = {
        'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
        'isLogOn': true //是否开启控制台打印日志,默认开启，选填
      }

      let _this = this
      window.webim.login(
              loginInfo, listeners, options,
              function (resp) {
                  loginInfo.identifierNick = resp.identifierNick;//设置当前用户昵称
                  console.log("respresp+++++++++",resp)
                  sessionStorage.setItem('chat_id','123')
                  _this.props.history.push('/chat')
                  getSessMap();
                  getSessMapHistory();
              },
              function (err) {
                  alert(err.ErrorInfo);
              }
      );
    }
  render() {
    const PlaceHolder = ({ className = '', ...restProps }) => (
        console.log(restProps),
        <div className={`${className} placeholder`} {...restProps}>{restProps.funcName}</div>
    );
    return (
        <div >
            <div className="flex-container">
                <div className="sub-title">测试接口</div>
                <Flex>
                    <Flex.Item><PlaceHolder funcName="获取openid" onClick={this.getOpnid.bind(this)} /></Flex.Item>
                    <Flex.Item><PlaceHolder funcName="登录"  onClick={this.goReg.bind(this)}/></Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item><PlaceHolder funcName="【患者】已绑定医生数" onClick={this.getMyDoc.bind(this)} /></Flex.Item>
                    <Flex.Item><PlaceHolder funcName="生成UserSig" onClick={this.genSig.bind(this)} /></Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item><PlaceHolder funcName="【患者】患者信息" onClick={this.getInformation.bind(this)} /></Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item><PlaceHolder funcName="用户1" onClick={this.chat.bind(this,1)} /></Flex.Item>
                    <Flex.Item><PlaceHolder funcName="用户2" onClick={this.chat.bind(this,2)} /></Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex>
                <Button
                  onClick={() =>
                    alert('Delete', <span style={{color:'red'}}>21123</span>, [
                      { text: 'Cancel', onPress: () => console.log('cancel') },
                      { text: 'Ok', onPress: () => console.log('ok') },
                    ])
                  }
                >
                  confirm
                </Button>
                </Flex>
               
                <div>
      <NavBar
        mode="light"
        rightContent={
          <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
              (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
              (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{ marginRight: 5 }}>Help</span>
              </Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
        }
      >
        NavBar
      </NavBar>
    </div>
            </div>
        
        <div className="height50"></div>
        <div className="data_show">
              <div className="flex-container">
               <div className="sub-title">参数</div>
              </div> 
                <pre id="data_sub">
                </pre>
              <div className="flex-container">
               <div className="sub-title">返回值</div>
              </div> 
                <pre id="result">
                </pre>
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
    getOpenidState:state.user.getOpenidState,
    openid:state.user.openid,
    msg:state.user.msg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));