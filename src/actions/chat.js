
import { Toast } from 'antd-mobile';
import axios from 'axios';
let webim = window.webim
let groupId = sessionStorage.getItem("chat_id")
const { url, sdk_appid,reUrl } = require('./config.js')

var selSess = null; //当前聊天会话对象
var recentSessMap = {}; //保存最近会话列表
var recentSessMapSeq = {}
var infoMap = {}; //初始化时，可以先拉取我的好友和我的群组信息
var isLogin = false



/**
 * 云服务登陆监听相关
 */
export const loginIM = (user, dispatch) => {
    var loginInfo = {
        'sdkAppID': sdk_appid, //用户所属应用id,必填
        // 'accountType': accountType, //用户所属应用帐号类型, 已废弃
        'identifier': user.id, //当前用户ID,必须是否字符串类型，必填
        'userSig': user.userSig
    };

    //监听（多终端同步）群系统消息方法，方法都定义在receive_group_system_msg.js文件中
    //注意每个数字代表的含义，比如，
    //1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息
    var onGroupSystemNotifys = {
        // "1": onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到）
        // "2": onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到）
        // "3": onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到）
        // "4": onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到)
        // "5": onDestoryGroupNotify, //群被解散(全员接收)
        // "6": onCreateGroupNotify, //创建群(创建者接收)
        // "7": onInvitedJoinGroupNotify, //邀请加群(被邀请者接收)
        // "8": onQuitGroupNotify, //主动退群(主动退出者接收)
        // "9": onSetedGroupAdminNotify, //设置管理员(被设置者接收)
        // "10": onCanceledGroupAdminNotify, //取消管理员(被取消者接收)
        // "11": onRevokeGroupNotify, //群已被回收(全员接收)
        "15": onReadedSyncGroupNotify, //群消息已读同步通知
        // "255": onCustomGroupNotify, //用户自定义通知(默认全员接收)
        // "12": onInvitedJoinGroupNotifyRequest //邀请加群(被邀请者接收,接收者需要同意)
    };
    var listeners = {
        "onConnNotify": onConnNotify,//监听连接状态回调变化事件，选填
        // ,"jsonpCallback": jsonpCallback//IE9（含）以下浏览器用到的 jsonp 回调函数
        "onMsgNotify": onMsgNotify,//监听新消息（私聊，普通群（非直播聊天室）消息，全员推送消息）事件，必填
        // ,"onBigGroupMsgNotify": onBigGroupMsgNotify//监听新消息（直播聊天室）事件，直播场景下必填
        "onGroupSystemNotifys": onGroupSystemNotifys,//监听（多终端同步）群系统消息事件，如果不需要监听，可不填
        // ,"onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填
        // "onFriendSystemNotifys": onFriendSystemNotifys//监听好友系统通知事件，选填
        // ,"onProfileSystemNotifys": onProfileSystemNotifys//监听资料系统（自己或好友）通知事件，选填
        "onKickedEventCall" : onKickedEventCall,//被其他登录实例踢下线
        // ,"onC2cEventNotifys": onC2cEventNotifys//监听 C2C 系统消息通道
        "onLongPullingNotify": function (data) {
            console.log("【未读群消息:groupId】", sessionStorage.getItem("chat_id"))
            var skey = `GROUP${sessionStorage.getItem("chat_id")}`;    // 拼装 skey
            var sessMap = window.webim.MsgStore.sessMap();    // 获取 sessMap
            var newselSess = sessMap[skey];
            //webim.setAutoRead(selSess, true, true);
            if(newselSess){
                console.log("【未读群消息】:", newselSess.unread())
            }
            
            if (groupId) {

                //获取所有聊天会话
                // let newArr = []
                // for (var j in sessMap) {//遍历新消息
                //     newMsg = sessMap[j];
                //     if (newMsg.getSession().id() == sessionStorage.getItem("chat_id")) {// 为当前聊天对象的消息，selToID 为全局变量，表示当前正在进行的聊天 ID，当聊天类型为私聊时，该值为好友帐号，否则为群号。
                //         // sess = newMsg.getSession();
                //         // console.log("【消息】:",sess)
                //         // console.log("【消息(newMsg)】:",newMsg)
                //         newArr.push(addMsg(newMsg))
                //     }
                // }
                // console.log(newArr)
                // dispatch({
                //     type: 'NEW_MSG_SUCCESS',
                //     data:newArr,
                //     status: 'succ'
                // })

            }

            // console.log(sessMap[skey].unread())
        }
    };
    //监听连接状态回调变化事件
    var onConnNotify = function (resp) {
        console.log(resp)
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                    isLogin = true
                webim.Log.warn('连接状态正常...');
                break;
            case webim.CONNECTION_STATUS.OFF:
                    isLogin = false
                webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
                break;
            default:
                webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
                break;
        }
    };
    var options = {
        'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
        'isLogOn': false //是否开启控制台打印日志,默认开启，选填
    }
    let _this = this
    if(!isLogin){
        window.webim.login(
            loginInfo, listeners, options,
            function (resp) {
                loginInfo.identifierNick = user.wxName;//设置当前用户昵称
                console.log("【登录成功】", resp)
                isLogin = true
                var sessMap =  window.webim.MsgStore.sessMap(); 
                console.log("【获取未读消息】",sessMap)
                recentSessMap = {} 
                recentSessMapSeq = {}
                // sessionStorage.setItem('chat_id','123')
                // _this.props.history.push('/chat')
                // getSessMap();
                // getSessMapHistory();
                initDemoApp()
            },
            function (err) {
                Toast.fail(err.ErrorInfo, 1);
            }
        );
    }
   
    function initDemoApp() {
        // //初始化我的加群申请表格
        // initGetApplyJoinGroupPendency([]);
        // //初始化我的群组系统消息表格
        // initGetMyGroupSystemMsgs([]);
        // //初始化我的好友系统消息表格
        // initGetMyFriendSystemMsgs([]);
        // //初始化我的资料系统消息表格
        // initGetMyProfileSystemMsgs([]);
    
        //初始化好友和群信息
        initInfoMapByMyGroups(initInfoMapCallbackOK);
    
    }


    function onKickedEventCall(){
        Toast.fail('其他地方登录,请重新登录', 2);
        
        
        axios.get(`${url}/bind/binduserwx/stopBind/${sessionStorage.getItem('openId')}`).then(({ data }) => {
            if (data.code == 0) {
                isLogin = false
                localStorage.setItem('token','')
                setTimeout(function(){
                    window.location.href = reUrl
                },200)
            } else {
                Toast.fail(data.msg, 1);
            }
        })
        
       
        
    }
//6800

    function initInfoMapCallbackOK() {
        initRecentContactList();
    }











    function onMsgNotify(newMsgList) {
        dispatch({
            type: 'NEW_MSG',
            status: 'pending'
        })
        var sess, newMsg;
        //获取所有聊天会话
        let newArr = []
        let newRecentSessMap = []
        let userGroupId = sessionStorage.getItem("chat_id")
        for (var j in newMsgList) {//遍历新消息
            newMsg = newMsgList[j];
            if (newMsg.getSession().id() == userGroupId) {// 为当前聊天对象的消息，selToID 为全局变量，表示当前正在进行的聊天 ID，当聊天类型为私聊时，该值为好友帐号，否则为群号。
                sess = newMsg.getSession();
                
                newArr.push(addMsg(newMsg))
                webim.setAutoRead(sess, true, true);
            }else{
                console.log("【更新】")
                dispatch({
                    type: 'MSG_NUM_NEW',
                    data: {msgNumberListOne:{id:newMsg.getSession().id()},msgNumber:true},
                    status: 'succ'
                })
                if (recentSessMap[newMsg.getSession().id()]) {
                   
                    recentSessMap[newMsg.getSession().id()].push(addMsg(newMsg))
                } else {
                    recentSessMap[newMsg.getSession().id()] = [addMsg(newMsg)]
                }
            }
        }
       
        console.log("【groupId】",userGroupId,newMsg)
        if(userGroupId){
            if (recentSessMap[userGroupId]) {
                newRecentSessMap = recentSessMap[userGroupId].concat(newArr)
                recentSessMap[userGroupId] = newRecentSessMap
            } else {
                recentSessMap[userGroupId] = newArr
                newRecentSessMap = newArr
            }
        }
        
        console.log("【newRecentSessMap】:",newRecentSessMap)
        dispatch({
            type: 'NEW_MSG_SUCCESS',
            data: newArr,
            status: 'succ'
        })
        
    }

    var initInfoMapByMyGroups = function(cbOK) {

        var options = {
            'Member_Account': user.id,
            // 'Limit': 10,
            'Offset': 0,
            'GroupBaseInfoFilter': [
                'Name',
                'FaceUrl'
            ]
        };
        webim.getJoinedGroupListHigh(
            options,
            function(resp) {
                if (resp.GroupIdList && resp.GroupIdList.length) {
                    for (var i = 0; i < resp.GroupIdList.length; i++) {
                        var group_name = resp.GroupIdList[i].Name;
                        var group_image = resp.GroupIdList[i].FaceUrl;
                        var key = webim.SESSION_TYPE.GROUP + "_" + resp.GroupIdList[i].GroupId;
                        infoMap[key] = {
                            'name': group_name,
                            'image': group_image
                        }
                    }
                }
                if (cbOK) {
                    cbOK();
                }
            },
            function(err) {
                alert(err.ErrorInfo);
            }
        );
    };
    
    //初始化聊天界面左侧最近会话列表
var initRecentContactList = function (cbOK, cbErr) {

    var options = {
        'Count': 10 //要拉取的最近会话条数
    };
    webim.getRecentContactList(
        {},
        function (resp) {
            var tempSess; //临时会话变量
            var firstSessType; //保存第一个会话类型
            var firstSessId; //保存第一个会话id
            console.log(' 群聊对象【resp】',resp)
        
            //清空聊天对象列表
            
            if (resp.SessionItem && resp.SessionItem.length > 0) { //如果存在最近会话记录
                let msgNumberList = {}
                let msgNumber = false
                for (var i in resp.SessionItem) {
                    var item = resp.SessionItem[i];
                    if(item.UnreadMsgCount){
                        msgNumber = true
                    }
                    msgNumberList[item.ToAccount] = item.UnreadMsgCount
                    console.log("聊天对象列表[未读消息】",item.ToAccount,item.UnreadMsgCount)
                    // var type = item.Type; //接口返回的会话类型
                    // var sessType, typeZh, sessionId, sessionNick = '',
                    //     sessionImage = '',
                    //     senderId = '',
                    //     senderNick = '';
                    // if (type == webim.RECENT_CONTACT_TYPE.C2C) { //私聊
                    //     typeZh = '私聊';
                    //     sessType = webim.SESSION_TYPE.C2C; //设置会话类型
                    //     sessionId = item.To_Account; //会话id，私聊时为好友ID或者系统账号（值为@TIM#SYSTEM，业务可以自己决定是否需要展示），注意：从To_Account获取,

                    //     if (sessionId == '@TIM#SYSTEM') { //先过滤系统消息，，
                    //         webim.Log.warn('过滤好友系统消息,sessionId=' + sessionId);
                    //         continue;
                    //     }
                    //     var key = sessType + "_" + sessionId;
                    //     var c2cInfo = infoMap[key];
                    //     if (c2cInfo && c2cInfo.name) { //从infoMap获取c2c昵称
                    //         sessionNick = c2cInfo.name; //会话昵称，私聊时为好友昵称，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
                    //     } else { //没有找到或者没有设置过
                    //         sessionNick = sessionId; //会话昵称，如果昵称为空，默认将其设成会话id
                    //     }
                    //     if (c2cInfo && c2cInfo.image) { //从infoMap获取c2c头像
                    //         sessionImage = c2cInfo.image; //会话头像，私聊时为好友头像，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
                    //     } else { //没有找到或者没有设置过
                    //         sessionImage = friendHeadUrl; //会话头像，如果为空，默认将其设置demo自带的头像
                    //     }
                    //     senderId = senderNick = ''; //私聊时，这些字段用不到，直接设置为空
                    // } else if (type == webim.RECENT_CONTACT_TYPE.GROUP) { //群聊
                    //     typeZh = '群聊';
                    //     sessType = webim.SESSION_TYPE.GROUP; //设置会话类型
                    //     sessionId = item.ToAccount; //会话id，群聊时为群ID，注意：从ToAccount获取
                    //     sessionNick = item.GroupNick; //会话昵称，群聊时，为群名称，接口一定会返回

                    //     if (item.GroupImage) { //优先考虑接口返回的群头像
                    //         sessionImage = item.GroupImage; //会话头像，群聊时，群头像，如果业务设置过群头像（设置群头像请参考wiki文档-设置群资料接口），接口会返回
                    //     } else { //接口没有返回或者没有设置过群头像，再从infoMap获取群头像
                    //         var key = sessType + "_" + sessionId;
                    //         var groupInfo = infoMap[key];
                    //         if (groupInfo && groupInfo.image) { //
                    //             sessionImage = groupInfo.image
                    //         } else { //不存在或者没有设置过，则使用默认头像
                    //             sessionImage = groupHeadUrl; //会话头像，如果没有设置过群头像，默认将其设置demo自带的头像
                    //         }
                    //     }
                    //     senderId = item.MsgGroupFrom_Account; //群消息的发送者id

                    //     if (!senderId) { //发送者id为空
                    //         webim.Log.warn('群消息发送者id为空,senderId=' + senderId + ",groupid=" + sessionId);
                    //         continue;
                    //     }
                    //     if (senderId == '@TIM#SYSTEM') { //先过滤群系统消息，因为接口暂时区分不了是进群还是退群等提示消息，
                    //         webim.Log.warn('过滤群系统消息,senderId=' + senderId + ",groupid=" + sessionId);
                    //         continue;
                    //     }

                    //     senderNick = item.MsgGroupFromCardName; //优先考虑群成员名片
                    //     if (!senderNick) { //如果没有设置群成员名片
                    //         senderNick = item.MsgGroupFromNickName; //再考虑接口是否返回了群成员昵称
                    //         if (!senderNick && !sessionNick) { //如果接口没有返回昵称或者没有设置群昵称，从infoMap获取昵称
                    //             var key = webim.SESSION_TYPE.C2C + "_" + senderId;
                    //             var c2cInfo = infoMap[key];
                    //             if (c2cInfo && c2cInfo.name) {
                    //                 senderNick = c2cInfo.name; //发送者群昵称
                    //             } else {
                    //                 sessionNick = senderId; //如果昵称为空，默认将其设成发送者id
                    //             }
                    //         }
                    //     }

                    // } else {
                    //     typeZh = '未知类型';
                    //     sessionId = item.ToAccount; //
                    // }
                    // if (!sessionId) { //会话id为空
                    //     webim.Log.warn('会话id为空,sessionId=' + sessionId);
                    //     continue;
                    // }

                    // if (sessionId == '@TLS#NOT_FOUND') { //会话id不存在，可能是已经被删除了
                    //     webim.Log.warn('会话id不存在,sessionId=' + sessionId);
                    //     continue;
                    // }

                    // if (sessionNick.length > maxNameLen) { //帐号或昵称过长，截取一部分，出于demo需要，业务可以自己决定
                    //     sessionNick = sessionNick.substr(0, maxNameLen) + "...";
                    // }

                    // tempSess = recentSessMap[sessType + "_" + sessionId];
                    // if (!tempSess) { //先判断是否存在（用于去重），不存在增加一个

                    //     if (!firstSessId) {
                    //         firstSessType = sessType; //记录第一个会话类型
                    //         firstSessId = sessionId; //记录第一个会话id
                    //     }
                    //     recentSessMap[sessType + "_" + sessionId] = {
                    //         SessionType: sessType, //会话类型
                    //         SessionId: sessionId, //会话对象id，好友id或者群id
                    //         SessionNick: sessionNick, //会话昵称，好友昵称或群名称
                    //         SessionImage: sessionImage, //会话头像，好友头像或者群头像
                    //         C2cAccount: senderId, //发送者id，群聊时，才有用
                    //         C2cNick: senderNick, //发送者昵称，群聊时，才有用
                    //         UnreadMsgCount: item.UnreadMsgCount, //未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
                    //         MsgSeq: item.MsgSeq, //消息seq
                    //         MsgRandom: item.MsgRandom, //消息随机数
                    //         MsgTimeStamp: webim.Tool.formatTimeStamp(item.MsgTimeStamp), //消息时间戳
                    //         MsgGroupReadedSeq: item.MsgGroupReadedSeq || 0,
                    //         MsgShow: item.MsgShow //消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
                    //     };

                    //     //在左侧最近会话列表框中增加一个会话div
                    //     addSess(sessType, webim.Tool.formatText2Html(sessionId), webim.Tool.formatText2Html(sessionNick), sessionImage, item.UnreadMsgCount, 'sesslist');
                    // }

                }
                //清空聊天界面
                // document.getElementsByClassName("msgflow")[0].innerHTML = "";

                // tempSess = recentSessMap[firstSessType + "_" + firstSessId]; //选中第一个会话
                // selType = tempSess.SessionType; //初始化当前聊天类型

                // selToID = tempSess.SessionId; //初始化当前聊天对象id

                // selSess = webim.MsgStore.sessByTypeId(selType, selToID); //初始化当前会话对象

                // setSelSessStyleOn(selToID); //设置当前聊天对象选中样式

                // console.debug('herer')
                // webim.syncMsgs(initUnreadMsgCount); //初始化最近会话的消息未读数

                dispatch({
                    type: 'MSG_NMB',
                    data: {msgNumberList,msgNumber},
                    status: 'succ'
                })
                if (cbOK) //回调
                    cbOK();

            }

        },
        cbErr
    );
};








    //已读消息同步
    //告诉你哪个类型的那个群组已读消息的情况

    function onReadedSyncGroupNotify(notify) {
        console.log("【sess未读数量：：：】",notify)
        var seq = notify.LastReadMsgSeq;
        //更新当前的seq
        // var currentUnRead = recentSessMap[webim.SESSION_TYPE.GROUP + "_" + notify.GroupId].MsgGroupReadedSeq;
        // var unread = currentUnRead - seq;
        // unread = unread > 0 ? unread : 0;
        // recentSessMap[webim.SESSION_TYPE.GROUP + "_" + notify.GroupId].MsgGroupReadedSeq = seq;


        //更新未读数
        var sess = webim.MsgStore.sessByTypeId(webim.SESSION_TYPE.GROUP, notify.GroupId);
        // sess.unread(unread);
        console.log("【sess未读数量：：：】",sess.unread())
        // webim.Log.info("群消息同步的回调:已读消息情况 ## 未读数：GroupId:[" + notify.GroupId + "]:" + unread, currentUnRead, seq);
        // if (unread > 0) {
        //     $(document.getElementById("badgeDiv_" + notify.GroupId)).text(unread).show();
        // } else {
        //     $(document.getElementById("badgeDiv_" + notify.GroupId)).val("").hide();
        // }
    }
    //初始化最近会话的消息未读数
    // function initUnreadMsgCount() {
    //     var sess;
    //     var sessMap = webim.MsgStore.sessMap();
    //     // console.error(sessMap)
    //     for (var i in sessMap) {
    //         sess = sessMap[i];
    //         // if (selToID && selToID != sess.id()) { //更新其他聊天对象的未读消息数
    //             console.info('sess.unread()', sess.unread())
    //             updateSessDiv(sess.type(), sess.id(), sess.name(), sess.unread());
    //         // }
    //     }
    // }

}








/**
 * 微信聊天相关
 *  */
export const addMsg = (msg) => {
    var isSelfSend, fromAccount, fromAccountNick, fromAccountImage, sessType, subType;
    var html = "",
        elems, elem, type, content;
    let returnBody = {}
    //获取会话类型，目前只支持群聊
    //webim.SESSION_TYPE.GROUP-群聊，
    //webim.SESSION_TYPE.C2C-私聊，
    sessType = msg.getSession().type();

    isSelfSend = msg.getIsSend(); //消息是否为自己发的

    fromAccount = msg.getFromAccount();

    if (!fromAccount) {
        return;
    }
    if (isSelfSend) { //如果是自己发的消息
        returnBody["isSelfSend"] = true
    } else { //如果别人发的消息
        returnBody["isSelfSend"] = false
        if (msg.getFromAccountNick()) {
            returnBody["fromAccountNick"] = msg.getFromAccountNick();
        } else {
            returnBody["fromAccountNick"] = fromAccount;
        }
        //获取头像
        if (msg.fromAccountHeadurl) {
            returnBody["fromAccountImage"] = msg.fromAccountHeadurl;
        } else {
            returnBody["fromAccountImage"] = "";
        }
    }

    //如果是发给自己的消息
    // if (!isSelfSend)
    //     msghead.style.color = "blue";
    //昵称  消息时间
    // msghead.innerHTML = "<img class='headurlClass' src='" + fromAccountImage + "'>" + "&nbsp;&nbsp;" + webim.Tool.formatText2Html(fromAccountNick + "&nbsp;&nbsp;" + webim.Tool.formatTimeStamp(msg.getTime()));


    //解析消息

    //获取消息子类型
    //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    subType = msg.getSubType();


    switch (subType) {

        case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
            returnBody["msgPre"] = convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
            returnBody["msgPre"] = "[群红包消息]" + convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
            //业务自己可以增加逻辑，比如展示点赞动画效果
            returnBody["msgPre"] = "[群点赞消息]" + convertMsgtoHtml(msg);
            //展示点赞动画
            //showLoveMsgAnimation();
            break;
        case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
            returnBody["msgPre"] = "[群提示消息]" + convertMsgtoHtml(msg);
            break;
    }

    // msgbody.appendChild(msgPre);

    // onemsg.appendChild(msghead);
    // onemsg.appendChild(msgbody);
    //消息列表
    // var msgflow = document.getElementsByClassName("msgflow")[0];
    // if (prepend) {
    //     //300ms后,等待图片加载完，滚动条自动滚动到底部
    //     msgflow.insertBefore(onemsg, msgflow.firstChild);
    //     if (msgflow.scrollTop == 0) {
    //         setTimeout(function() {
    //             msgflow.scrollTop = 0;
    //         }, 300);
    //     }
    // } else {
    //     msgflow.appendChild(onemsg);
    //     //300ms后,等待图片加载完，滚动条自动滚动到底部
    //     setTimeout(function() {
    //         msgflow.scrollTop = msgflow.scrollHeight;
    //     }, 300);
    // }
    return returnBody

}

//把消息转换成Html

function convertMsgtoHtml(msg) {
    var html = "",
        elems, elem, type, content;
    elems = msg.getElems(); //获取消息包含的元素数组
    var count = elems.length;
    for (var i = 0; i < count; i++) {
        elem = elems[i];
        type = elem.getType(); //获取元素类型
        content = elem.getContent(); //获取元素对象
        switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
                var eleHtml = convertTextMsgToHtml(content);
                //转义，防XSS
                html += webim.Tool.formatText2Html(eleHtml);
                break;
            case webim.MSG_ELEMENT_TYPE.FACE:
                html += convertFaceMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.IMAGE:
                if (i <= count - 2) {
                    var customMsgElem = elems[i + 1]; //获取保存图片名称的自定义消息elem
                    var imgName = customMsgElem.getContent().getData(); //业务可以自定义保存字段，demo中采用data字段保存图片文件名
                    html += convertImageMsgToHtml(content, imgName);
                    i++; //下标向后移一位
                } else {
                    html += convertImageMsgToHtml(content);
                }
                break;
            case webim.MSG_ELEMENT_TYPE.SOUND:
                // html += convertSoundMsgToHtml(content);
                // html += convertSoundMsgToAMRPlayer(content);
                break;
            case webim.MSG_ELEMENT_TYPE.FILE:
                html += convertFileMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.LOCATION:
                html += convertLocationMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.CUSTOM:
                var eleHtml = convertCustomMsgToHtml(content);
                //转义，防XSS
                html += webim.Tool.formatText2Html(eleHtml);
                break;
            case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                var eleHtml = convertGroupTipMsgToHtml(content);
                //转义，防XSS
                html += webim.Tool.formatText2Html(eleHtml);
                break;
            default:
                webim.Log.error('未知消息元素类型: elemType=' + type);
                break;
        }
    }
    return html;
}

//解析文本消息元素

function convertTextMsgToHtml(content) {
    return content.getText();
}
//解析表情消息元素

function convertFaceMsgToHtml(content) {
    var faceUrl = null;
    var data = content.getData();
    var index = webim.EmotionDataIndexs[data];

    var emotion = webim.Emotions[index];
    if (emotion && emotion[1]) {
        faceUrl = emotion[1];
    }
    if (faceUrl) {
        return "<img src='" + faceUrl + "'/>";
    } else {
        return data;
    }
}
//解析图片消息元素

function convertImageMsgToHtml(content, imageName) {
    var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL); //小图
    var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE); //大图
    var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN); //原图
    if (!bigImage) {
        bigImage = smallImage;
    }
    if (!oriImage) {
        oriImage = smallImage;
    }
    const imageClick = function (val){
        console.log(val)
    }
    console.log(imageClick)
    let imgUrl = ""+smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() 
    let newArr  = []
    newArr.push(bigImage.getUrl())
    return "<img name='" + imageName + "' src='" +imgUrl+  "' style='CURSOR: hand' id='" + content.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onClick='window.wx.previewImage("+JSON.stringify({current:bigImage.getUrl(), urls: newArr})+")'/>";
   
}

//解析语音消息元素

function convertSoundMsgToHtml(content) {
    var second = content.getSecond(); //获取语音时长
    var downUrl = content.getDownUrl();
    if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
        return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl;
    }
    return '<audio id="uuid_' + content.uuid + '" src="' + downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
}
/**
 * @uses amr音频信息转使用amr.js播放
 * @param {object.<{uuid:string,downUrl:string}>} content - 消息内容对象
 * @param {string} content.uuid - 文件的UUID
 * @param {string} content.downUrl - 文件的下载地址
 * @returns {string||null} aElmentString - AMR播放控件的HTML代码
 */
// function convertSoundMsgToAMRPlayer(content) {
//     var iconStartChar= '&nbsp;&nbsp;&#9658;&nbsp;&nbsp;';
//     var btnid= ['amrplay_btn_',content.uuid,'-', Math.round(Math.random()*1000000)].join('');
//     var aElmentString= ['<button id="',btnid,'" style="font-size:1.5em;" data-url="',content.downUrl,'">',iconStartChar,'</button>'].join('');
//     setTimeout(function(){
//         var btelm= document.getElementById(btnid);
//         btelm.onclick= function(event){
//             var amr = new BenzAMRRecorder();
//             var seed= null;
//             amr.onPlay(function(){
//                 let arr= ['&#9744;','&#9744;','&#9744;','&#9744;','&#9744;'];
//                 var count = 0;
//                 seed= setInterval(function(){
//                     arr= ['&#9744;','&#9744;','&#9744;','&#9744;','&#9744;'];
//                     arr[count%arr.length]= '&#9635;';
//                     event.target.innerHTML= arr.join('');
//                     count++;
//                 },90)
//             });
//             amr.onStop(function(){
//                 clearInterval(seed);
//                 event.target.innerHTML= iconStartChar;
//             });
//             amr.initWithUrl(content.downUrl).then(function(){
//                 amr.play();
//             });
//         }
//     },0);
//     return aElmentString;
// }
//解析文件消息元素

function convertFileMsgToHtml(content) {
    var fileSize, unitStr;
    fileSize = content.getSize();
    unitStr = "Byte";
    if (fileSize >= 1024) {
        fileSize = Math.round(fileSize / 1024);
        unitStr = "KB";
    }
    // return '<a href="' + content.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.getName() + '(' + fileSize + unitStr + ')</i></a>';

    // return '<a href="javascript:;" onclick=\'webim.onDownFile("' + content.uuid + '")\' title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.name + '(' + fileSize + unitStr + ')</i></a>';
    return '<a href="' + content.downUrl + '" target="' + content.name + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.name + '(' + fileSize + unitStr + ')</i></a>';
}
//解析位置消息元素

function convertLocationMsgToHtml(content) {
    return '经度=' + content.getLongitude() + ',纬度=' + content.getLatitude() + ',描述=' + content.getDesc();
}
//解析自定义消息元素

function convertCustomMsgToHtml(content) {
    var data = content.getData(); //自定义数据
    var desc = content.getDesc(); //描述信息
    var ext = content.getExt(); //扩展信息
    return "data=" + data + ", desc=" + desc + ", ext=" + ext;
}
//解析群提示消息元素

function convertGroupTipMsgToHtml(content) {
    var WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
    var text = "";
    var maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
    var opType, opUserId, userIdList;
    var groupMemberNum;
    opType = content.getOpType(); //群提示消息类型（操作类型）
    opUserId = content.getOpUserId(); //操作人id
    switch (opType) {
        case webim.GROUP_TIP_TYPE.JOIN: //加入群
            userIdList = content.getUserIdList();
            //text += opUserId + "邀请了";
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text = text.substring(0, text.length - 1);
            text += "加入该群，当前群成员数：" + content.getGroupMemberNum();
            break;
        case webim.GROUP_TIP_TYPE.QUIT: //退出群
            text += opUserId + "离开该群，当前群成员数：" + content.getGroupMemberNum();
            break;
        case webim.GROUP_TIP_TYPE.KICK: //踢出群
            text += opUserId + "将";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "踢出该群";
            break;
        case webim.GROUP_TIP_TYPE.SET_ADMIN: //设置管理员
            text += opUserId + "将";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "设为管理员";
            break;
        case webim.GROUP_TIP_TYPE.CANCEL_ADMIN: //取消管理员
            text += opUserId + "取消";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "的管理员资格";
            break;

        case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO: //群资料变更
            text += opUserId + "修改了群资料：";
            var groupInfoList = content.getGroupInfoList();
            var type, value;
            for (var m in groupInfoList) {
                type = groupInfoList[m].getType();
                value = groupInfoList[m].getValue();
                switch (type) {
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
                        text += "群头像为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
                        text += "群名称为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
                        text += "群主为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
                        text += "群公告为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
                        text += "群简介为" + value + "; ";
                        break;
                    default:
                        text += "未知信息为:type=" + type + ",value=" + value + "; ";
                        break;
                }
            }
            break;

        case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO: //群成员资料变更(禁言时间)
            text += opUserId + "修改了群成员资料:";
            var memberInfoList = content.getMemberInfoList();
            var userId, shutupTime;
            for (var m in memberInfoList) {
                userId = memberInfoList[m].getUserId();
                shutupTime = memberInfoList[m].getShutupTime();
                text += userId + ": ";
                if (shutupTime != null && shutupTime !== undefined) {
                    if (shutupTime == 0) {
                        text += "取消禁言; ";
                    } else {
                        text += "禁言" + shutupTime + "秒; ";
                    }
                } else {
                    text += " shutupTime为空";
                }
                if (memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + memberInfoList.length + "人";
                    break;
                }
            }
            break;
        default:
            text += "未知群提示消息类型：type=" + opType;
            break;
    }
    return text;
}



/**
 * 消息发送
 */
//发送消息(文本或者表情)
export const onSendMsg = (msgtosend, selToID, identifier, friendHeadUrl, identifierNick) => {
    //获取消息内容
    var msgLen = webim.Tool.getStrBytes(msgtosend);
    console.log("【发送消息】",msgtosend)
    if (msgtosend.length < 1) {
        Toast.fail("发送的消息不能为空!", 1);
        return;
    }
    console.log("【发送消息】")

    let selType = webim.MSG_MAX_LENGTH.GROUP
    if (!selSess) {
        var selSess = new webim.Session('GROUP', selToID, selToID, friendHeadUrl, Math.round(new Date().getTime() / 1000));
    }
    console.log('selSess=====', selSess)
    var isSend = true;//是否为自己发送
    var seq = -1;//消息序列，-1表示 IM SDK 自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
    var subType = webim.GROUP_MSG_SUB_TYPE.COMMON;;//消息子类型

    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, identifier, subType, identifierNick);
    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    //解析文本和表情
    var expr = /\[[^[\]]{1,3}\]/mg;
    var emotions = msgtosend.match(expr);
    if (!emotions || emotions.length < 1) {
        text_obj = new webim.Msg.Elem.Text(msgtosend);
        msg.addText(text_obj);
    } else {
        for (var i = 0; i < emotions.length; i++) {
            tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
            if (tmsg) {
                text_obj = new webim.Msg.Elem.Text(tmsg);
                msg.addText(text_obj);
            }
            emotionIndex = webim.EmotionDataIndexs[emotions[i]];
            emotion = webim.Emotions[emotionIndex];
            if (emotion) {
                face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                msg.addFace(face_obj);
            } else {
                text_obj = new webim.Msg.Elem.Text(emotions[i]);
                msg.addText(text_obj);
            }
            restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
            msgtosend = msgtosend.substring(restMsgIndex);
        }
        if (msgtosend) {
            text_obj = new webim.Msg.Elem.Text(msgtosend);
            msg.addText(text_obj);
        }
    }
    console.log("【发送的消息】：", msg)
    webim.sendMsg(msg, function (resp) {

        console.log("【发送的消息resp】：", resp)
    }, function (err) {
        console.log(err.ErrorInfo);

    });
}
//上传图片
export const uploadPic = (dispatch, selToID, file, friendHeadUrl, identifier, identifierNick, ) => {

    var businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;//业务类型，1-发群图片，2-向好友发图片
    let selType = webim.MSG_MAX_LENGTH.GROUP
    //封装上传图片请求
    var opt = {
        'file': file, //图片对象
        'onProgressCallBack': onProgressCallBack, //上传图片进度条回调函数
        //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
        'To_Account': selToID, //接收者
        'businessType': businessType //业务类型
    };
    //上传图片
    console.log('【上传图片】:',file,file.name)
    webim.uploadPic(opt,
        function(resp) {
            //上传成功发送图片
            console.log('【上传图片】:',resp,file,file.name)
            sendPic(resp, file.name);
        },
        function(err) {
            alert(err.ErrorInfo);
        }
    );
    // var businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;//业务类型，1-发群文件，2-向好友发文件
    // let selType = webim.MSG_MAX_LENGTH.GROUP
    // var reader = new FileReader();
    // if (file) {
    //     //通过文件流将文件转换成Base64字符串
    //     reader.readAsDataURL(file);
    //     //转换成功后
    //     reader.onloadend = function () {
    //         //输出结果  reader.result     
    //         var opt = {
    //             'toAccount': selToID, //接收者，selToID 为全局变量，表示当前正在进行的聊天 ID，当聊天类型为私聊时，该值为好友帐号，否则为群号。
    //             'businessType': businessType,//文件的使用业务类型
    //             'fileType': webim.UPLOAD_RES_TYPE.FILE,//表示文件
    //             'fileMd5': fileMd5, //文件 md5
    //             'totalSize': file.size, //文件大小，Byte
    //             'base64Str': reader.result //文件 base64 编码

    //         };
    //         console.log(opt)
    //         webim.uploadPicByBase64(opt,
    //             function (resp) {
    //                 //alert('success');
    //                 //发送文件
    //                 console.log(resp)
    //                 sendFile(resp);
    //             },
    //             function (err) {
    //                 alert(err.ErrorInfo);
    //             }
    //         );

    //     }
    // }
    //封装上传文件请求
    function sendFile(file, fileName) {
        if (!selToID) {
            alert("您还没有好友，暂不能聊天");
            return;
        }
        
        if (!selSess) {
            selSess = new webim.Session("GROUP", selToID, selToID, friendHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        var msg = new webim.Msg(selSess, true, -1, -1, -1, identifier, 0, identifierNick);
        var uuid = file.File_UUID;//文件UUID
        var fileSize = file.File_Size;//文件大小
        var senderId = identifier;
        var downloadFlag = file.Download_Flag;
        if (!fileName) {
            var random = Math.round(Math.random() * 4294967296);
            fileName = random.toString();
        }
        var fileObj = new webim.Msg.Elem.File(uuid, fileName, fileSize, senderId, selToID, downloadFlag, selType);
        msg.addFile(fileObj);
        //调用发送文件消息接口
        webim.sendMsg(msg, function (resp) {
            if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
                addMsg(msg);
            }
        }, function (err) {
            alert(err.ErrorInfo);
        });
    }



    function onProgressCallBack(val) {
        console.log(val)
    }
    //发送图片消息

    function sendPic(images, imgName) {
        console.debug('sendPic', imgName);
        if (!selToID) {
            Toast.fail("您还没有好友，暂不能聊天", 1);
            return;
        }

        if (!selSess) {
            var selSess = new webim.Session("GROUP", selToID, selToID, friendHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        var msg = new webim.Msg(selSess, true, -1, -1, -1, identifier, 0, identifierNick);

        console.debug(imgName.split(".")[1]);
        var images_obj = new webim.Msg.Elem.Images(images.File_UUID, imgName.split(".")[1]);
        for (var i in images.URL_INFO) {
            var img = images.URL_INFO[i];
            var newImg;
            var type;
            switch (img.PIC_TYPE) {
                case 1: //原图
                    type = 1; //原图
                    break;
                case 2: //小图（缩略图）
                    type = 3; //小图
                    break;
                case 4: //大图
                    type = 2; //大图
                    break;
            }
            newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl);
            images_obj.addImage(newImg);
        }
        msg.addImage(images_obj);
        //if(imgName){
        //    var data=imgName;//通过自定义消息中的data字段保存图片名称
        //    var custom_obj = new webim.Msg.Elem.Custom(data, '', '');
        //    msg.addCustom(custom_obj);
        //}
        //调用发送图片消息接口
        webim.sendMsg(msg, function (resp) {
            if (selType == webim.SESSION_TYPE.C2C) { //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
                addMsg(msg);
            }
        }, function (err) {
            Toast.fail(err.ErrorInfo, 1);
        });
    }
}

// 获取群历史消息
export const getHistoryMsg = (query, dispatch) => {
    var optionsOne = {
        'GroupIdList': [
            query.groupId
        ],
        'GroupBaseInfoFilter': [
            'Type',
            'Name',
            'Introduction',
            'Notification',
            'FaceUrl',
            'CreateTime',
            'Owner_Account',
            'LastInfoTime',
            'LastMsgTime',
            'NextMsgSeq',
            'MemberNum',
            'MaxMemberNum',
            'ApplyJoinOption',
            'ShutUpAllMember'
        ],
        'MemberInfoFilter': [
            'Account',
            'Role',
            'JoinTime',
            'LastSendMsgTime',
            'ShutUpUntil'
        ]
    };
    webim.getGroupInfo(
        optionsOne,
        function (resp) {
            if (resp.GroupInfo[0].ShutUpAllMember == 'On') {
                alert('该群组已开启全局禁言');
            }
            let ReqMsgSeq ;
            if(recentSessMapSeq['GROUP_'+query.groupId]){
                ReqMsgSeq = recentSessMapSeq['GROUP_'+query.groupId]
            }else{
                ReqMsgSeq = resp.GroupInfo[0].NextMsgSeq - 1
            }
            var options = {
                'GroupId': query.groupId, //群组id
                'ReqMsgNumber': query.ReqMsgNumber, //一次拉取多少值 最大20
                'ReqMsgSeq': ReqMsgSeq,
            };

            // recentSessMap[webim.SESSION_TYPE.GROUP + "_" + query.groupId] = {};
            // recentSessMap[webim.SESSION_TYPE.GROUP + "_" + query.groupId].MsgGroupReadedSeq = resp.GroupInfo && resp.GroupInfo[0] && resp.GroupInfo[0].MsgSeq;
            console.log("【获取群resp】:", resp, options)
            webim.syncGroupMsgs(options,
                function (msgs) {
                    var sessMap =  window.webim.MsgStore.sessMap(); 
                    webim.setAutoRead(sessMap['GROUP'+query.groupId], true, true);
                    console.log("【GROUP"+query.groupId+"】:",sessMap['GROUP'+query.groupId])
                    let newArr = []
                    let msgData = getHistoryMsgCallback(msgs, query.groupId)
                    if (recentSessMap[query.groupId]) {
                        newArr = msgData.concat(recentSessMap[query.groupId])
                        recentSessMap[query.groupId] = newArr
                    } else {
                        recentSessMap[query.groupId] = msgData
                        newArr = msgData
                    }
                    if(msgs[0]){
                        recentSessMapSeq['GROUP_'+query.groupId] = msgs[0].seq - 1
                    }else{
                        Toast.fail('已经没有历史记录了',1)
                    }
                    
                    console.log("【获取群历史消失】:", msgs)
                    console.log("【储存的消息】：",recentSessMapSeq,recentSessMap)
                    dispatch({
                        type: 'GET_SESS_MAP_HISTORY_SUCCESS',
                        data: newArr,
                        status: 'succ'
                    })
                    dispatch({
                        type: 'MSG_NUM_HIS',
                        data: {msgNumberListOne:{id:query.groupId}},
                        status: 'succ'
                    })
                },
                function (err) {
                    console.log("【获取群历史消失（err）】:", err)
                    dispatch({
                        type: 'GET_SESS_MAP_HISTORY_SUCCESS',
                        msg: err,
                        status: 'succ'
                    })
                }
            );
        },
        function (err) {
            alert(err.ErrorInfo);
        }
    );
}

// 消息显示
function getHistoryMsgCallback(msgList, id, prepage) {
    var msg;
    prepage = prepage || false;
    let newMsgArr = []
    //如果是加载前几页的消息，消息体需要prepend，所以先倒排一下
    if (prepage) {
        msgList.reverse();
    }

    for (var j in msgList) { //遍历新消息
        msg = msgList[j];
        console.log("【selSess】：")
        if (msg.getSession().id() == id) { //为当前聊天对象的消息
            selSess = msg.getSession();
            //在聊天窗体中新增一条消息
            console.log("【selSess】：", selSess)
            let msgOne = addMsg(msg);
            newMsgArr.push(msgOne)
        }
    }
    webim.setAutoRead(selSess, true, true);
    return newMsgArr
    //消息已读上报，并将当前会话的消息设置成自动已读
    
}

export const logout = () =>{
    webim.logout(
        function (resp) {
            isLogin = false
        }
    );
}