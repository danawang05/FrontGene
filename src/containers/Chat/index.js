import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form,Icon } from 'antd';
import {InputItem, Toast,PullToRefresh } from 'antd-mobile';
import SparkMD5 from 'spark-md5';
import admin from '../../sources/admin.png'
import ChatOne from '../../components/ChatOne'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content:"",
            chatList:[],
            canUse:true,
            newMsgData:[]
       }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.newChatStates!=nextprops.newChatStates&&nextprops.newChatStates=='succ'){
            let newArr = this.state.newMsgData
            console.log("nextprops.newMsgData[0",nextprops.newMsgData)
            if(nextprops.newMsgData[0]&&!nextprops.newMsgData[0].isSelfSend){
                newArr.push(nextprops.newMsgData[0])
            }
            this.setState({
                newMsgData:newArr
            })
        }
        if(this.props.chatState!=nextprops.chatState&&nextprops.chatState=='succ'){
            this.setState({
                refreshing:false
            })
        }
    }
    componentWillMount(){
        document.title="咨询对话"
        const { match,actions} = this.props;
        const { params: { userId } } = match;
        let url = window.location.href
        let groupId = url.split('chat/')[1]
        sessionStorage.setItem('chat_id',groupId)
        actions.getSessMapHistory({
            groupId, //群组id
            ReqMsgNumber:10
        })
       
    }
    componentWillUnmount(){
        sessionStorage.setItem('chat_id',"")
    }
    componentDidMount(){
        const {actions,user} = this.props
        let identifier = user.entity&&user.entity.mobile
        let identifierNick = user.entity&&user.entity.wxName
        let friendHeadUrl = user.entity&&user.entity.wxPortrait
        // document.getElementById('file').addEventListener('change', function () {
        //     var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        //         file = this.files[0],
        //         chunkSize = 2097152,                             // Read in chunks of 2MB
        //         chunks = Math.ceil(file.size / chunkSize),
        //         currentChunk = 0,
        //         spark = new SparkMD5.ArrayBuffer(),
        //         fileReader = new FileReader();
        
        //     fileReader.onload = function (e) {
        //         console.log('read chunk nr', currentChunk + 1, 'of', chunks);
        //         spark.append(e.target.result);                   // Append array buffer
        //         currentChunk++;
        
        //         if (currentChunk < chunks) {
        //             loadNext();
        //         } else {
        //             console.log('finished loading');
        //             console.info('computed hash', spark.end());  // Compute hash
                    
        //             console.log(e)
        //             actions.userOnSendMsgPic({
        //                 selToID:sessionStorage.getItem('chat_id'),
        //                 file:file,
        //                 identifier,
        //                 friendHeadUrl,
        //                 identifierNick,
        //                 fileMd5: spark.end()
        //             })
        //         }
        //     };
        
        //     fileReader.onerror = function () {
        //         console.warn('oops, something went wrong.');
        //     };
        
        //     function loadNext() {
        //         var start = currentChunk * chunkSize,
        //             end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        
        //         fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        //     }
        
        //     loadNext();
        // });
    }
    chatSub(e){
    //     let newArr = this.state.chatList
    //     newArr.push(this.state.content)
    //     this.setState({
    //         chatList:newArr,
    //         content:""
    //     })
    //     var _id = document.getElementById("fooders");
    //     console.log(parseInt(_id.offsetTop-(document.body.scrollHeight-_id.offsetTop)),document.body.scrollHeight)
    //     window.scrollTo(0, document.body.scrollHeight)
    //    actions.userOnSendMsg({

    //    })
    console.log(this.refs.add.innerHTML)
    let subText = this.refs.add.innerHTML
    console.log(!subText)
    if(!subText){
        Toast.fail('发送内容不能为空',1)
        return
    }
       const {actions,user} = this.props
        let identifier = user.entity&&user.entity.mobile
        let identifierNick = user.entity&&user.entity.wxName
        let friendHeadUrl = user.entity&&user.entity.wxPortrait
        let newArr = this.state.newMsgData
        newArr.push({isSelfSend:true,msgPre:subText})
        this.setState({
            newMsgData:newArr,
            content:"",
            canUse:true
        })
        actions.userOnSendMsg({
            selToID:sessionStorage.getItem('chat_id'),
            msgtosend:subText,
            identifier,
            friendHeadUrl,
            identifierNick,
        })
        document.getElementById('add').innerHTML = ""
        
    }
    chengeInput(e){
        this.setState({
            content:e.target.value
        })
        console.log(e)
    }
    chagescoll(e){
    //    Toast.fail(document.body.scrollHeight,1)
        if(this.state.canUse){
            setTimeout(function(){
                window.scrollTo(0, document.body.scrollHeight)
            },200)
           
        }
    }
    onChange = (e) => {
        const {actions,user} = this.props
        let identifier = user.entity&&user.entity.mobile
        let identifierNick = user.entity&&user.entity.wxName
        let friendHeadUrl = user.entity&&user.entity.wxPortrait
        console.log(e)
        actions.userOnSendMsgPic({
            selToID:sessionStorage.getItem('chat_id'),
            file:e.target.files[0],
            identifier,
            friendHeadUrl,
            identifierNick,
        })
        let reads = new FileReader();
        let f = e.target.files[0];
        reads.readAsDataURL(f);
        let _this = this
        reads.onload = function(e) {
            let newArr = _this.state.newMsgData
            newArr.push({isSelfSend:true,msgPre:"<img src='"+this.result+"' />"})
            _this.setState({
                newMsgData:newArr,
                content:"",
                canUse:true
            })
        };
        
    }
    getMoreChat(){
        console.log("【获取更多】")
        this.setState({
            refreshing:true,
            canUse:false
        })
        const {actions} = this.props
        actions.getSessMapHistory({
            groupId:sessionStorage.getItem('chat_id'), //群组id
            ReqMsgNumber:10
        })
    }
    mageClick = (e) => {
        console.log(e)
    }
    showImg(val){
       console.log(val)
    }
    test = () => {
        this.setState({
          add: this.refs.add.innerHTML
        })
        console.log(this.refs.add.innerHTML)
    }
  render() {
      function imageClick(e){
        console.log(e)
      }
    //   const imageClick = this.imageClick
      const msgData = this.props.msgData
      const newMsgData = this.state.newMsgData
      const wxSetting = this.props.wxPortrait
      console.log("[newMsgData]:",newMsgData,msgData)
      const user = this.props.user
      let headUrl = ""
      if(user.entity){
        headUrl =  user.entity.wxPortrait
      }
    return (
         
        <div className="chatArr_row">
            <PullToRefresh
            damping={100}
            distanceToRefresh ={ window.devicePixelRatio * 25}
            ref={el => this.ptr = el}
            style={{
            // height: 'calc(100vh - 12vw)',
            overflow: 'auto',
            }}
            indicator={'加载更多'}
            direction={'down'}
            refreshing={this.state.refreshing}
            onRefresh={ this.getMoreChat.bind(this)}
        >
            <div className="chat_content">
            {
                msgData&&msgData.map((item,index)=>{
                    return <ChatOne 
                                key={index} 
                                index={index}  
                                onLoad={this.chagescoll.bind(this)}  
                                src={item.isSelfSend?headUrl:(item.fromAccountNick=='admin'?admin:wxSetting.wxPortrait)} 
                                type={item.isSelfSend?'me':""} 
                                content={item.msgPre} 
                            />
                })
            }
            {
                newMsgData.map((item,index)=>{
                    return <ChatOne 
                                key={index} 
                                index={"new"+index} 
                                onLoad={this.chagescoll.bind(this)} 
                                src={item.isSelfSend?headUrl:(item.fromAccountNick=='admin'?admin:wxSetting.wxPortrait)} 
                                type={item.isSelfSend?'me':""} 
                                content={item.msgPre} 
                            />
                })
            }
            </div>
            
            
            </PullToRefresh> 
            <div className="height1" id="fooders"></div>
            <div className="submit_chat" id="submit_chat">
                    <div  id = "add" contentEditable="true" ref="add" onFocus={()=>{var interval = setInterval(function() {
    document.body.scrollTop = document.body.scrollHeight
}, 100)}} onBlur={this.chagescoll.bind(this)}  className="chat_input flex1">
                        {/* <textarea
                            placeholder=""
                            // clear
                            // rows="3"
                            value={this.state.content}
                            onChange={this.chengeInput.bind(this)}
                            // moneyKeyboardAlign="left"
                            // moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        /> */}
                    </div> 
                    <div className="chat_add_img">
                        <input id="file"  onChange={this.onChange}  type="file" name="cover"  multiple />
                        <Icon type="plus-circle" />
                    </div>
                    <div className="submit_bnt" onClick={this.chatSub.bind(this)}>
                        发 送
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
      msgData:state.chat.msgData,
      chatState:state.chat.chatState,
      newMsgData:state.chat.newMsgData,
      user:state.user.user,
      newChatStates:state.chat.newChatStates,
      wxPortrait:state.chat.wxPortrait,
      user:state.user.user,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));