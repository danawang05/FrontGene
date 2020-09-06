import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import {ActivityIndicator,Toast } from 'antd-mobile';
import GoodsListSpecialist from '../../components/GoodsListSpecialist';
import './index.scss';
import ceshi from '../../sources/ceshi.jpeg'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
import {appId} from './../../actions/config';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 1,
            text:'',
            animating:false
        }
        this.showContent = this.showContent.bind(this)
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.geneDetailSpecialistState!=nextprops.geneDetailSpecialistState&&nextprops.geneDetailSpecialistState=='succ'){
            this.setState({
                animating:false
            })
            sessionStorage.setItem('dmchKey',nextprops.geneDetailSpecialist.mchKey)
            let contentDom = document.getElementById('detail_message_text')
               contentDom.innerHTML=nextprops.geneDetailSpecialist.introduction
             //contentDom.innerHTML=sessionStorage.getItem('gene_user_type')=='0'?nextprops.geneDetail.setMealDoctor:nextprops.geneDetail.setMealPatient
        }
        if(this.props.geneDetailSpecialistState!=nextprops.geneDetailSpecialistState&&nextprops.geneDetailSpecialistState=='failed'){
            this.setState({
                animating:false
            })
            Toast.fail(nextprops.msg, 1)
        }
        if(this.props.geneDetailSpecialistState!=nextprops.geneDetailSpecialistState&&nextprops.geneDetailSpecialistState=='failed'){
            this.setState({
                animating:false
            })
            Toast.fail(nextprops.msg, 1)
        }
        if(this.props.shoucangState!=nextprops.shoucangState&&nextprops.shoucangState=='succ'){
            this.setState({
                animating:false
            })
            Toast.success('操作成功', 1)
        }
        if(this.props.shoucangState!=nextprops.shoucangState&&nextprops.shoucangState=='failed'){
            this.setState({
                animating:false
            })
            Toast.fail(nextprops.msg, 1)
        }
        
    }
    componentWillMount() {
        const { match,actions} = this.props;
        const { params: { packageId } } = match;
        const { params: { mchKey } } = match;
        this.setState({
            animating:true,
            text:'获取详情...',
            packageId:packageId,
            mchKey:mchKey
        })

        actions.genepackageSpecialist({
            id:packageId
        });
        // actions.isShouCang({
        //     packageId
        // });
    //   let _this = this
        // window.wx.checkJsApi({
        //     jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        //     success: function(res) {
        //         console.log(res)
        //     // 以键值对的形式返回，可用的api值true，不可用为false
        //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        //     }
        // });
      window.wx.ready(function(){
        // window.wx.checkJsApi({
        //     jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        //     success: function(res) {
        //         console.log(res)
        //     // 以键值对的形式返回，可用的api值true，不可用为false
        //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        //     }
        // });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        // let nonceStr = Math.random().toString(36).slice(2) 
        // let signType ='MD5'
        // let timeStamp = new Date().getTime()
        // let params = {
        //   appId,
        //   nonceStr,
        //   signType,
        //   timeStamp
        // }
        // let paySign = _this.getSign(params)
        // console.log(paySign)
        // window.wx.updateAppMessageShareData({ 
        //     title: '检爱e行', // 分享标题
        //     desc: '欢迎来到检爱e行', // 分享描述
        //     link: 'http://jiyin-test.sagacityidea.cn/gene-api/api/share/1', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //     imgUrl: 'http://jianai.sagacityidea.cn/home/upload/gene/user/20200220/20200220203321517_72.jpg', // 分享图标
        //     success: function (res) {
        //       // 设置成功
        //     }
        //   })
        window.wx.hideMenuItems({
            menuList: ['menuItem:share:appMessage','menuItem:share:timeline','menuItem:favorite','menuItem:share:QZone','menuItem:openWithSafari','menuItem:copyUrl'] 
                  });
      });
      
    }
    componentDidMount() {
        
    }
    showContent(html){
       
    }
    goAgree(id){
        if(sessionStorage.getItem('fcodeToken')){
            sessionStorage.setItem("callbackUrl",'/agreementspecialist')
            this.props.history.replace('/login')
            sessionStorage.removeItem('fcodeToken')
            console.log(!localStorage.getItem('token'))
        }else{
            this.props.history.push('/agreementspecialist')
            sessionStorage.removeItem('scodeToken')
            console.log(!localStorage.getItem('token'))
        }
        // this.props.history.push('/agreement')
        // console.log(id)
        sessionStorage.setItem('packageId',id)
    }
    // goLogin(){
    //     let params = {
    //         isCorfirmeed: sessionStorage.getItem('isCorfirm')
    //         // userId:this.state.userId,
    //         // userSig: userSig
    //       }
    //     actions.isCorfirm(params)
    //     // if(){
    //     //     this.props.history.push('/Login')
    //     // }else{
    //     //     this.props.history.push(`/orderConfirm/${id}`)
    //     // }
        
    // }
    goNext(id){
        this.props.history.push(`/orderConfirm/${id}`)
    }
    collect(){
        this.setState({
            animating:true,
            text:'正在操作...'
        })
        const {actions} = this.props
        actions.shouCang({
            packageId:this.state.packageId
        })
    }
    delCollect(){
        const {actions }= this.props
        actions.shouCangDel({
            packageId:this.state.packageId 
        })
    }
    render() {
        const {isCollect} = this.props
        let geneDetailSpecialist = this.props.geneDetailSpecialist||{}
        return (
            <div className="detail_row">
                {/*<div className="detail_img">*/}
                    {/*<img src={geneDetailSpecialist.firstImg&&geneDetailSpecialist.firstImg[0]&&geneDetailSpecialist.firstImg[0].fileUrl} />*/}
                {/*</div>*/}

                <div className="detail_content">
                    {/*<GoodsListSpecialist*/}
                        {/*padding=".4rem 0" */}
                        {/*marginLeft="0" */}
                        {/*disPlayImg={true} */}
                        {/*redTab={geneDetailSpecialist.tab||''}*/}
                        {/*no_code={geneDetailSpecialist.code||""}*/}
                        {/*type='1' */}
                        {/*name={geneDetailSpecialist.title||""}*/}
                        {/*money={geneDetailSpecialist.price}*/}
                        {/*keyWord={geneDetailSpecialist.yellowTab&&geneDetailSpecialist.yellowTab.split('-|-')||[]*/}
                    {/*} />*/}
                    {/*<div className="add_address">
                        送至<span className="add_address_select">{geneDetailSpecialist.contactsAddr||""}</span>
                </div>*/}
                    <div className="detail_message">
                        {/*<div className="detail_message_bnt"> 套餐介绍 </div>*/}
                        <div id="detail_message_text" className="detail_message_text">
                        </div>
                    </div>

                </div>
                <div className="height15"></div>
                    {
                        sessionStorage.getItem('gene_user_type')=='0'?<div className="fooder_bnt displays">
                            <div className="flex1"></div>
                            {
                                isCollect?<div onClick={this.delCollect.bind(this,)} className="Collection">
                                    取消收藏
                                </div>:<div onClick={this.collect.bind(this,)} className="Collection">
                                    收藏
                                </div>
                            }
                            
                            <div className="flex1"></div>
                        </div>:<div className="fooder_bnt displays">
                            
                            <p className="fooder_bnt_money_content">
                                <span className=" marginLeft1">¥</span>
                                <span>{geneDetailSpecialist.price}</span>
                            </p>
                            <div onClick={this.goAgree.bind(this,geneDetailSpecialist.id)} className="sub_button">
                                门诊预约
                            </div>
                        </div>
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
        // geneDetailState:state.user.geneDetailState,
        // geneDetail:state.user.geneDetail,
        geneDetailSpecialistState:state.user.geneDetailSpecialistState,
        geneDetailSpecialist:state.user.geneDetailSpecialist,
        msg:state.user.msg,
        shoucangState:state.user.shoucangState,
        isCollect:state.user.isCollect,
        isCollectState:state.user.isCollectState,
    };
    return props;
}
function mapDispatchToProps(dispatch) {
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
