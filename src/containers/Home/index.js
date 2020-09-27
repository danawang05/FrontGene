import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { Flex, Carousel } from 'antd-mobile';
import { Toast,Button } from 'antd-mobile';
import './index.scss';
import * as actions from './../../actions';
import SearchBar from '../../components/SearchBar'
import Reminder from '../../components/Reminder'
import HomeBnt from '../../components/HomeBnt'
import TypeBnt from '../../components/TypeBnt'
import TextContent from '../../components/TextContent'
import CommoditySp from '../../components/CommoditySp'
import 'antd-mobile/dist/antd-mobile.css';

import ceshi from '../../sources/ceshi.jpeg'
import tixing from '../../sources/003-bell.png'
import dictation from '../../sources/dictation.png'

import pat1 from '../../sources/wanggou.png'
import pat2 from '../../sources/shouji.png'
import pat3 from '../../sources/youjian.png'
import pat4 from '../../sources/yonghu.png'
import pat5 from '../../sources/dushu.png'
import pat6 from '../../sources/fangke-2.png'
import pat7 from '../../sources/yiyaoxiang.png'
import pat8 from '../../sources/menzhen.png'
import pat9 from '../../sources/classroom.png'
import pat10 from '../../sources/songjian.png'
import pat11 from '../../sources/support.png'
import doc1 from '../../sources/ranseti.png'
import doc2 from '../../sources/yisheng.png'
import doc3 from '../../sources/bingchuang.png'
import doc4 from '../../sources/dushu.png'
import doc5 from '../../sources/yiyaoxiang.png'
import doc6 from '../../sources/erweima.png'

import {imgUrl} from '../../actions/config'
import OrderListSpecialist from "../OrderListSpecialist";
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            slideIndex: 0,
            specialCom:[{},{},{}],
            content:[],
            typeBnt:0,
            showSelect:false,
            search:''
        }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.mainListState!=nextprops.mainListState&&nextprops.mainListState=='succ'){
            if(nextprops.mainList.fenlei.length>0){
                this.setState({
                    typeBnt:nextprops.mainList.fenlei[0].id
                })
            }

        }
        if(this.props.getNrePageState!=nextprops.getNrePageState&&nextprops.getNrePageState=='succ'){
            this.setState({
                content:nextprops.newPage.list
            })
        }
    }
    componentWillMount() {
        const {actions} = this.props
        actions.mainList({})
        actions.userInfotoken({})
        // 获取页面滚动提示
        actions.pubhometips({
            page:1,
            limit:10
        })
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        sessionStorage.removeItem('scodeToken')
        sessionStorage.removeItem('fcodeToken')
}
    changeBnt(index){
        const {actions} = this.props
        actions.newsPage({
            page:1,
            limit:10,
            classfly:index
        })
        this.setState({
            showSelect:true,
            typeBnt:index
        })

    }
    goNextPage(index){
          if(index== 0){
            // this.props.history.push("/oneClickOrder")
            this.props.changePage('shop')
            sessionStorage.setItem("main_type","shop")
          }
          if(index==1){
              // if(!localStorage.getItem('token')){
              //   sessionStorage.setItem("callbackUrl",'/orderList')
              //   this.props.history.push('/login')
              // }else{
              //   this.props.history.push('/orderList')
              // }
              if(sessionStorage.getItem('fcodeToken')){
                  sessionStorage.setItem("callbackUrl",'/orderList')
                  this.props.history.replace('/login')
                  sessionStorage.removeItem('fcodeToken')
                  console.log(!localStorage.getItem('token'))
              }else{
                  this.props.history.push('/orderList')
                  sessionStorage.removeItem('scodeToken')
                  console.log(!localStorage.getItem('token'))
              }

          }
          if(index==2){
            // if(!localStorage.getItem('token')){
            //     sessionStorage.setItem("callbackUrl",'/reportList')
            //     this.props.history.push('/login')
            //   }else{
            //     this.props.history.push('/reportList')
            //   }
              if(sessionStorage.getItem('fcodeToken')){
                  sessionStorage.setItem("callbackUrl",'/reportList')
                  this.props.history.replace('/login')
                  sessionStorage.removeItem('fcodeToken')
                  console.log(!localStorage.getItem('token'))
              }else{
                  this.props.history.push('/reportList')
                  sessionStorage.removeItem('scodeToken')
                  console.log(!localStorage.getItem('token'))
              }
            // this.props.history.push('/login')  //这个对应查看报告那个按钮
          }
          if(index==3){
            this.props.history.push('/consultation')
          }
          if(index==4){
            this.props.changePage('Polular')
          }
          if(index==5){

             Toast.offline('该功能正在开发中',2)
            //this.props.history.push('/doctorReg') http://live.mijian360.com/watch/1216432
            //   window.location.href = 'http://live.mijian360.com/watch/1216432'
          }
          if(index==6){

            window.location.href = 'http://h5.yihu365.com/page/index.jsp?sid=88000000014'
          }
        if(index==7){

            this.props.history.push('/support')
        }
        if(index==8){

            this.props.history.push('/classroom')
        }
        if(index==9){

             // this.props.history.push('/OneClickOrderSpecialist')
            this.props.history.push('/detailspecialistadver')
        }
        if(index==10){
            if(sessionStorage.getItem('fcodeToken')){
                sessionStorage.setItem("callbackUrl",'/orderListSpecialist')
                this.props.history.replace('/login')
                sessionStorage.removeItem('fcodeToken')
                console.log(!localStorage.getItem('token'))
            }else{
                this.props.history.push('/orderListSpecialist')
                sessionStorage.removeItem('scodeToken')
                console.log(!localStorage.getItem('token'))
            }
        }
    }
    goNextPageDoc(index){
        if(index== 0){
            // this.props.history.push("/oneClickOrder")
            this.props.changePage('shop')
        }
        if(index==1){
            this.props.history.push('/reportChat')
        }
        if(index==2){
            this.props.history.push('/myPatient')
        }
        if(index==3){
            this.props.changePage('my')
        }
        if(index==4){
            this.props.changePage('Polular')
        }
        if(index==5){

            Toast.offline('该功能正在开发中',2)
             //this.props.history.push('/login')

        }
        if(index==6){

            window.location.href = 'http://h5.yihu365.com/page/index.jsp?sid=88000000014'
          }
    }
    goDetail(id){
        this.props.history.push(`/newsdetail/${id}`)
    }
    goDetailPack(id){
        this.props.history.push(`/detail/${id}`)
    }
    changeSearch = (e) => {
        this.props.changePage('shop')
        this.props.openSearch()
    }
    shareParent(id){
        this.props.history.push(`/shareParent/${id}`)
    }
    render() {
        const { search } = this.state
        let _banner = (this.props.mainListState=='succ'&&this.props.mainList.banner)||[]
        let _package = (this.props.mainListState=='succ'&&this.props.mainList.package)||[]
        let _reminder = (this.props.pubHomeTipsState=='succ'&&this.props.homeTips.list)||[]
        let _fenye =  (this.props.mainListState=='succ'&&this.props.mainList.fenlei)||[]
        let _content =[]
        let msgNumber = this.props.msgNumber
        console.log(msgNumber)
        if(!this.state.showSelect){
            _content = (this.props.mainListState=='succ'&&this.props.mainList.page.list)||[]
        }else{
            _content = this.state.content
        }
       if(_reminder.length>0){
           let arr_reminder = []
           _reminder.map((i)=>{
            arr_reminder.push(i.content)
           })
           _reminder = arr_reminder
       }
        return (
            <div className="home_row">
                {/* 搜索框 */}
                {/*<SearchBar onClick = {this.changeSearch} backgroundColor="#ffffff" placeholder="输入关键字检索基因检测套餐" />*/}
                {/* 轮播图 */}
                <div style={{ height: "5.2rem" }}>
                    <Carousel className="space-carousel"
                        frameOverflow="visible"
                        cellSpacing={10}
                        slideWidth={0.85}
                        dots={false}
                        autoplay
                        infinite
                        beforeChange={(from, to) => this.setState({ slideIndex: to })}
                        afterChange={index => this.setState({ slideIndex: index })}
                    >
                        {_banner.map((val, index) => (
                            <a
                                key={index}
                                style={{
                                    display: 'block',
                                    position: 'relative',
                                    top: this.state.slideIndex === index ? '-.32rem' : 0,
                                    height: this.state.imgHeight,
                                    borderRadius: ".2rem",
                                    boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                }}
                                href={val.bannerUrl}
                            >
                                <img
                                    src={val.fileUrl}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        borderRadius: ".2rem",
                                        height: this.state.slideIndex === index ? '4.78rem' : '4rem',
                                        verticalAlign: 'top'
                                    }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>
                {/* 功能按钮 */}
                {
                    _reminder.length>0?<Reminder src={tixing} msg={_reminder} />:null
                }

                {
                    sessionStorage.getItem('gene_user_type')=='0'?<div>
                        <div className="home_bnt displays">
                            <HomeBnt src={doc1} onClick={this.goNextPageDoc.bind(this,0)} name="基因检测"/>
                            <HomeBnt leftBorder={true} badge={this.props.msgNumber.msgNumber?true:0} onClick={this.goNextPageDoc.bind(this,1)} src={doc2} name="报告咨询"/>
                            <HomeBnt leftBorder={true} onClick={this.goNextPageDoc.bind(this,2)} src={doc3} name="我的患者"/>
                        </div>
                        <div className="displays">
                            <HomeBnt src={doc4} onClick={this.goNextPageDoc.bind(this,3)} name="个人中心"/>
                            <HomeBnt leftBorder={true} onClick={this.goNextPageDoc.bind(this,4)} src={doc5} name="患者工具包"/>
                            <HomeBnt leftBorder={true} onClick={this.goNextPageDoc.bind(this,5)} src={doc6} name="我的二维码"/>
                        </div>
                    </div>:<div>
                        <div className="home_bnt displays">
                            <HomeBnt src={pat1} onClick={this.goNextPage.bind(this,0)} name="检测套餐"/>
                            <HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,1)} src={pat2} name="检测订单"/>
                            <HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,2)} src={pat3} name="检测报告"/>
                        </div>
                        <div className="displays">
                            {/*<HomeBnt src={pat4} badge={this.props.msgNumber.msgNumber?true:0} onClick={this.goNextPage.bind(this,3)} name="报告咨询"/>*/}
                            {/*<HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,4)} src={pat5} name="肿瘤科普"/>*/}
                            <HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,4)} src={pat10} name="送检指引"/>
                            <HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,6)} src={pat7} name="上门采血"/>
                            {/*<HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,5)} src={pat11} name="检爱援助"/>*/}
                            <HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,7)} src={pat11} name="检爱援助"/>
                        </div>
                        <div className="displays">
                            {/*<HomeBnt src={pat4} badge={this.props.msgNumber.msgNumber?true:0} onClick={this.goNextPage.bind(this,3)} name="报告咨询"/>*/}
                            <HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,8)} src={pat9} name="检爱医讯"/>
                            {/*<HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,5)} src={pat9} name="检爱医讯"/>*/}
                            <HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,9)} src={pat8} name="e问医答"/>
                            <HomeBnt leftBorder={true} onClick={this.goNextPage.bind(this,10)} src={pat6} name="咨询订单"/>
                        </div>
                    </div>
                }
                {/* 特价商品 */}
                {/* {
                    sessionStorage.getItem('gene_user_type')=='0'?null:<div className="position_relative">
                        <div className="special_icon"></div>
                        <div className="special displays">
                            {
                                _package.map((item,index)=>{
                                    let oldPrice = (item.price/(item.discount/100)).toFixed(2)
                                return <CommoditySp onClick={this.goDetailPack.bind(this,item.id)} key={index} src={item.img[0]&&item.img[0].fileUrl} name={item.title} newPrice={item.price} oldPrice={oldPrice} />
                                })
                            }
                        </div>
                    </div>
                } */}

                <div className="type_bnt displays">
                    {/*{*/}
                        {/*_fenye.map((item,index)=>{*/}
                            {/*return <TypeBnt key={index} onClick={this.changeBnt.bind(this,item.id)}  selectBnt={this.state.typeBnt==item.id} name={item.dictName}/>*/}
                        {/*})*/}
                    {/*}*/}
                    <TypeBnt key={'0'} onClick={this.changeBnt.bind(this,'1232828549282414594')}  selectBnt={this.state.typeBnt=='1232828549282414594'} name={'送检指引'}/>
                    <TypeBnt key={'1'} onClick={this.changeBnt.bind(this,'1230458724301348866')}  selectBnt={this.state.typeBnt=='1230458724301348866'} name={'肿瘤科普'}/>



                </div>
                <div className="content">
                    {
                        _content.map((item,index)=>{
                            return <TextContent
                                        onClick={this.goDetail.bind(this,item.id)}
                                        key={index}
                                        src={item.img[0]&&item.img[0].fileUrl||""}
                                        contentName={item.title}
                                        // contentPresent={item.createDate.slice(0,10)}
                                        // contentNum={item.num}
                                        shareBnt = {this.shareParent.bind(this,item.id)}
                                    />
                        })
                    }
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


const HomeForm = Form.create()(Home);

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
    const props = {
        mainListState:state.user.mainListState,
        mainList:state.user.mainList,
        pubHomeTipsState:state.user.pubHomeTipsState,
        homeTips:state.user.homeTips,
        getNrePageState:state.user.getNrePageState,
        newPage:state.user.newPage,
        msgNumber:state.chat.msgNumber,
    };
    return props;
}
function mapDispatchToProps(dispatch) {
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeForm));
