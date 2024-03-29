import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { } from 'antd-mobile';
import TypeBnt from '../../components/TypeBnt'
import TextContent from '../../components/TextContent'
import SearchBar from '../../components/SearchBar'
import ceshi from '../../sources/ceshi.jpeg'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            typeBnt:0,
            content:[],
            showSelect:false,
            search:'',
            hide:false
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
            console.log(nextprops.newPage.list)
            this.setState({
                showSelect:true,
                content:nextprops.newPage.list
            })
        }
    }
    componentWillMount(){
        const {actions} = this.props
         //actions.mainList({})
        actions.newsPage1({

        })
    }
    componentDidMount(){
       
    }
    search = () => {
        const {actions} = this.props
        this.setState({
            hide:true
        })
        actions.newsPage({
            page:1,
            limit:9000,
            title:this.state.search
        }) 
    }
    changeBnt(index){
        const {actions} = this.props
        actions.newsPage({
            page:1,
            limit:9000,
            classfly:index
        })
        this.setState({
           
            typeBnt:index
        })
        
    }
    changeSearch(type,e){
        this.setState(Object.assign(this.state,{[type]:e.target.value}))
    }
    goDetail(id){
        this.props.history.push(`/newsdetail/${id}`)
    }
    shareParent(id){
        this.props.history.push(`/shareParent/${id}`)
    }
  render() {
    const {search,showSelect,content,hide} = this.state
    let _fenye =  (this.props.mainListState=='succ'&&this.props.mainList.fenlei)||[]
    let _content =[]
    console.log(showSelect)
    if(!showSelect){
        _content = (this.props.mainListState=='succ'&&this.props.mainList.page.list)||[]
    }else{
        _content = content
    }
    console.log(_content,content)
    return (
      <div className="science_row">
                {/*<SearchBar searchBnt = {this.search} onChange={this.changeSearch.bind(this,'search')} value={search} backgroundColor="#ffffff" placeholder="输入关键字检索" />*/}
                {/*{*/}
                    {/*!hide?<div className="type_bnt displays" style={{marginTop:'0',height:"1.8rem"}}>*/}
                        {/*{*/}
                            {/*_fenye.map((item,index)=>{*/}
                                {/*return <TypeBnt key={index} onClick={this.changeBnt.bind(this,item.id)}  selectBnt={this.state.typeBnt==item.id} name={item.dictName}/>*/}
                            {/*})*/}
                        {/*}*/}
                        {/**/}
                    {/*</div>:null*/}
                {/*}*/}
          {
              !hide?<div className="type_bnt displays" style={{marginTop:'0',height:"1.8rem"}}>
                  {/*{*/}
                      {/*_fenye.map((item,index)=>{*/}
                          {/*return */}
                      {/*})*/}
                  {/*}*/}
                  <TypeBnt key={'2'} onClick={this.changeBnt.bind(this,'1290621277424242690')}  selectBnt={this.state.typeBnt=='1290621277424242690'} name={'检爱援助'}/>
              </div>:null
          }

                <div className="content">
                {
                        _content.map((item,index)=>{
                            return <TextContent 
                                        onClick={this.goDetail.bind(this,item.id)}
                                        key={index} 
                                        src={item.img[0]&&item.img[0].fileUrl||""} 
                                        contentName={item.title} 
                                        // contentPresent={item.introduction}
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


const LoginForm = Form.create()(Login);

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  const props = {
    mainListState:state.user.mainListState,
    mainList:state.user.mainList, 
    getNrePageState:state.user.getNrePageState, 
    newPage:state.user.newPage, 
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
