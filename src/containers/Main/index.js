import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { TabBar } from 'antd-mobile';
import { InputItem, Toast, ActivityIndicator } from "antd-mobile";
import {GENE_TYPE ,SAMPLE_TYPE,CANCER_SPECIES} from "../../actions/config"
import Home from '../Home'
import Science from '../Science'
import OneClickOrder from '../OneClickOrder'
import My from '../My'
import GTabBar from '../../components/HomeBntList'
import DocMy from '../DocMy'
import Login from '../Login'
import './index.scss';
import { ec_key, ec_publics, sdk_appid, expire_after } from "../../actions/config"
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
import home1 from '../../sources/yangguang_p.png'
import shome1 from '../../sources/yangguang.png'
import home1_doc from '../../sources/home_p.png'
import shome1_doc from '../../sources/home.png'
import home2 from '../../sources/dianpu_p.png'
import shome2 from '../../sources/dianpu.png'
import home2_doc from '../../sources/shopping_p.png'
import shome2_doc from '../../sources/shopping-l.png'
import home3 from '../../sources/yuedu_p.png'
import home3_doc from '../../sources/read_p.png'
import shome3_doc from '../../sources/read-l.png'
import shome3 from '../../sources/yuedu.png'
import home4 from '../../sources/wode_p.png'
import shome4_doc from '../../sources/user-l.png'
import shome4 from '../../sources/wode.png'
import home4_doc from '../../sources/user_p.png'

const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            openId: "",
            selectedTab: 'home',
            hidden: false,
            fullScreen: true,
            isSearch:false,
            userId: "",//用户id
            token:'',
            getIp:''
        }
    }
    componentWillReceiveProps(nextprops) {
        // if(this.props.loginState!=nextprops.loginState&&nextprops.loginState=='succ'){
           
        // }
        //
        // if (this.props.getCodestate != nextprops.getCodestate && nextprops.getCodestate == 'failed') {
        //   console.log(this)
        //   Toast.fail(nextprops.msg, 2)
        // }
        // if (this.props.getCodestate != nextprops.getCodestate && nextprops.getCodestate == 'succ') {
        //   Toast.success('发送成功', 2)
        //   this.startTime()
        // }
        // if (this.props.getOpenidState != nextprops.getOpenidState && nextprops.getOpenidState == "succ") {
        //   this.setState({
        //     animating: false
        //   })
          // if(nextprops.user.entity&&nextprops.user.entity.username){
            // this.props.history.replace('/main')
          //   // return
          // }
          // if(nextprops.user.entity.id){
            // if (nextprops.user.entity.type == 1) {
            //   // this.props.history.push('/detail')
            //   this.props.history.replace('/patientReg'+(this.state.userId?`/${this.state.userId}`:''))
            // }
            // if (nextprops.user.entity.type == 0) {
            //   this.props.history.replace('/doctorReg')
            // }
          //}
          // this.props.history.push('/patientReg')
        //}
        // if (this.props.getOpenidState != nextprops.getOpenidState && nextprops.getOpenidState == "failed") {
        //   this.setState({
        //     animating: false
        //   })
        // }
        // if (this.props.loginState != nextprops.loginState && nextprops.loginState == 'succ') {
        //   this.setState({
        //     animating: false
        //   })
    
          //if(nextprops.user.entity&&nextprops.user.entity.username){
            // if(this.state.userId){
            //   this.addDoc()
            // }else{
            //   this.props.history.replace('/main')
            // }
            // return
          //}
          //if (this.state.type == 1) {
            
              // this.props.history.push('/detail')
            
            //this.props.history.push(`/detail/${id}`)
            // this.props.history.replace('/patientReg'+(this.state.userId?`/${this.state.userId}`:''))
          //}
          //if (this.state.type == 0) {
            // this.props.history.replace('/doctorReg')
          //}
        //}
        // if (this.props.loginState != nextprops.loginState && nextprops.loginState == 'failed') {
        //   this.setState({
        //     animating: false
        //   })
        //   Toast.fail(nextprops.msg, 2)
        // }
        // if(this.props.addDoctorState != nextprops.addDoctorState && nextprops.addDoctorState == 'succ'){
        //   Toast.success('绑定成功', 2)
        //   if(this.state.canNext){
        //     this.props.history.replace('/main')
        //   }else{
        //     this.getDetail()
        //   }
        // }
        // if(this.props.addDoctorState != nextprops.addDoctorState && nextprops.addDoctorState == 'failed'){
        //   Toast.fail(nextprops.msg, 2)
        //   if(this.state.canNext){
        //     this.props.history.replace('/main')
        //   }else{
        //     this.getDetail()
        //   }
        // }
        // if (this.props.loginState != nextprops.loginState && nextprops.loginState == 'succ') {
        //   this.setState({
        //     animating: false
        //   })
          // if(nextprops.user.entity&&nextprops.user.entity.username){
          //   this.props.history.push('/main')
          //   return
          // }
          // if (this.state.type == 1) {
           
          //   this.props.history.push('/patientReg')
          // }
          // if (this.state.type == 0) {
          //   this.props.history.push('/doctorReg')
          // }
        //}
  }
    componentWillMount(){
      const { match,actions} = this.props;
      const { params: { userId } } = match;
      
      this.setState({
        userId:userId
      })
      // var realurl = document.location.toString();
      // console.log(realurl);
      // console.log(realurl.slice(7,8));
      // console.log(realurl.slice(8,10));
      // // if(realurl == 'http://jiyin-test.sagacityidea.cn/geneapi/#' || realurl == 'http://jiyin-test.sagacityidea.cn/geneapi/?from=singlemessage#/'){
      // //   window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx786fe6708aaf5cb1&redirect_uri=http://jiyin-test.sagacityidea.cn/geneapi/%23/main&response_type=code&scope=snsapi_userinfo#wechat_redirect");
      // //   return;
      // // }
      // if(realurl.slice(8,10) !=='op'){
      //      window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx786fe6708aaf5cb1&redirect_uri=http://jiyin-test.sagacityidea.cn/geneapi/%23/main&response_type=code&scope=snsapi_userinfo#wechat_redirect");
      //   return;
      // }
      var url = window.location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      // if (!sessionStorage.getItem('openId')) {
      // Toast.fail('微信登陆失败', 2)
      // return
      // }
      if(sessionStorage.getItem('gene_user_type')=='1'||sessionStorage.getItem('gene_user_type')=='0'){
        this.setState({
          type:sessionStorage.getItem('gene_user_type')
        })
      }
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      
      if(theRequest.code){
        actions.getOpnid({
          
          code:theRequest.code
        })
        
        console.log('code', theRequest.code)
        sessionStorage.setItem("code",theRequest.code)
        
        
      }
      actions.getIp({})
      document.title = '基因检测'
        if(localStorage.getItem('token')){
            this.getUserInfo()
        }
        // const { actions } =this.props
        actions.ticket({})
        if(sessionStorage.getItem('main_type')){
          this.setState({
            selectedTab:sessionStorage.getItem('main_type')
          })
        }
        actions.findForPids({
          pid:[GENE_TYPE ,SAMPLE_TYPE,CANCER_SPECIES ]
        })
        
        actions.genecompany({})
        window.wx.ready(function(){
          window.wx.hideMenuItems({
              menuList: ['menuItem:share:appMessage','menuItem:share:timeline','menuItem:favorite','menuItem:share:QZone','menuItem:openWithSafari','menuItem:copyUrl'] 
                  });
        });
    }
    
    getUserInfo(){
        const {actions} = this.props
        actions.userInfo({})
       
    }
    componentDidMount(){
      

    }
    changePage = (page) => {
      // sessionStorage.setItem("main_type",page)
      this.setState({
        selectedTab:page
      })
    }
    changePageMy = (page) => {
      // 确认下 page 的值
      console.log(page)
      const hasToken = localStorage.getItem('token')
      if (page === 'my' && !hasToken) {
        this.props.history.push('/login')
        
        
      } else {
        sessionStorage.setItem("callbackUrl",'/main')
        sessionStorage.setItem("main_type",page)
        this.setState({
          selectedTab:page
        })
      }
    }
  render() {
    const userType = sessionStorage.getItem('gene_user_type')
    let tintColor = "#ffcb5c"
    let bg1=home1
    let sbg1=shome1
    let bg2=home2
    let sbg2=shome2
    let bg3=home3
    let sbg3=shome3
    let bg4=home4
    let sbg4=shome4
    if(userType=='0'){
          tintColor = "#0067f4"
          bg1=home1_doc
          sbg1=shome1_doc
          bg2=home2_doc
          sbg2=shome2_doc
          bg3=home3_doc
          sbg3=shome3_doc
          bg4=home4_doc
          sbg4=shome4_doc
    }
    return (
      <div className="Main_row">
          
          {/*<div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>*/}
        <div className="main_content">
          {
              this.state.selectedTab=='home'? <Home changePage={this.changePage} openSearch = {()=>{this.setState({isSearch:true})}} />:null
          }
          {
              this.state.selectedTab=='shop'? <OneClickOrder isSearch={this.state.isSearch} />:null
          }
          {
              this.state.selectedTab=='Polular'?<Science />:null
          }
          {
              this.state.selectedTab=='my'?<My changePage={this.changePageMy} />:null
          }
          {/*this.state.selectedTab=='my'?( userType=='0'?<DocMy changePage={this.changePage} />:<My changePage={this.changePage} />):null*/}
        </div>
        {/* <div className="height50"></div> */}
        <div className="main-tabbar">
          <GTabBar
              title="首页"
              key="home"
              selected={this.state.selectedTab === 'home'}
              background={bg1}
              selsectBackground = {sbg1}
              tintColor={tintColor}
              onPress={() => {
                sessionStorage.setItem("main_type","home")
                this.setState({
                  selectedTab: 'home',
                });
              }}
          ></GTabBar>
          <GTabBar
             title="商城"
             key="shop"
             selected={this.state.selectedTab === 'shop'}
             background={bg2}
             selsectBackground = {sbg2}
             tintColor={tintColor}
             onPress={() => {
              sessionStorage.setItem("main_type","shop")
              this.setState({
                selectedTab: 'shop',
              });
            }}
          ></GTabBar>
          <GTabBar
             title="科普"
             key="Polular"
             selected={this.state.selectedTab === 'Polular'}
             background={bg3}
             selsectBackground = {sbg3}
             tintColor={tintColor}
             onPress={() => {
              sessionStorage.setItem("main_type","Polular")
              this.setState({
                selectedTab: 'Polular',
              });
            }}
          ></GTabBar>
          <GTabBar
             title="我的"
             key="my"
             selected={this.state.selectedTab === 'my'}
             background={bg4}
             selsectBackground = {sbg4}
             tintColor={tintColor}
            //  onPress={() => {
            //   sessionStorage.setItem("main_type","my")
            //   this.setState({
            //     selectedTab: 'my',
            //   });
            // }}
            onPress={() => { 
              
              const hasToken = localStorage.getItem('token')
              if (!hasToken) {
                sessionStorage.setItem("callbackUrl",'/main')
                sessionStorage.setItem("main_type","my")
                this.props.history.push('/login')
                
                
              } else {
                sessionStorage.setItem("main_type","my")
                this.setState({
                  selectedTab:'my'
                })
              }}}
          ></GTabBar>
        </div>
        {/*<TabBar
          noRenderContent = {true}
          // prerenderingSiblingsNumber = '0'
          unselectedTintColor="#949494"
          tintColor={tintColor}
          barTintColor="white"
          tabBarPosition = "bottom"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url('+bg1+') center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url('+sbg1+') center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'home'}
            // badge={1}
            onPress={() => {
              sessionStorage.setItem("main_type","home")
              this.setState({
                selectedTab: 'home',
              });
            }}
            data-seed="logId"
          >
           <Home changePage={this.changePage} />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+bg2+') center center /  21px 21px no-repeat'}}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+sbg2+') center center /  21px 21px no-repeat ' }}
              />
            }
            title="商城"
            key="shop"
            // badge={'new'}
            selected={this.state.selectedTab === 'shop'}
            onPress={() => {
              sessionStorage.setItem("main_type","shop")
              this.setState({
                selectedTab: 'shop',
              });
            }}
            data-seed="logId1"
          >
           <OneClickOrder />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+bg3+') center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url('+sbg3+') center center /  21px 21px no-repeat' }}
              />
            }
            title="科普"
            key="Polular"
            // dot
            selected={this.state.selectedTab === 'Polular'}
            onPress={() => {
              sessionStorage.setItem("main_type","Polular")
              this.setState({
                selectedTab: 'Polular',
              });
            }}
          >
            <Science />
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri:bg4 }}
            selectedIcon={{ uri: sbg4 }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'my'}
            onPress={() => { 
              
      const hasToken = localStorage.getItem('token')
      if (!hasToken) {
        sessionStorage.setItem("callbackUrl",'/main')
        sessionStorage.setItem("main_type","my")
        this.props.history.push('/login')
        
        
      } else {
        sessionStorage.setItem("main_type","my")
        this.setState({
          selectedTab:'my'
        })
      }}}>
         </TabBar.Item>
    </TabBar>*/}
      </div>
     
      );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */


const LoginForm = Form.create()(Main);

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  const props = {
    user:state.user.user,
    loginState:state.user.loginState,
    msg: state.user.msg,
    getOpenidState: state.user.getOpenidState
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));