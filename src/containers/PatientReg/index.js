import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form ,Icon} from 'antd';
import { Drawer ,DatePicker,Toast,ActivityIndicator,Modal,Button,Picker} from 'antd-mobile';

import Rinput from '../../components/RegInput'
import selectYes from '../../sources/yes.png'
import ceshi from '../../sources/ceshi.jpeg'
import GButton from '../../components/GButton'
import SearchBar from '../../components/SearchBar'
import SelectDoctorList from '../../components/SelectDoctorList'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
import {CITY_DATA} from "../../stores/cityData";
const FormItem = Form.Item;
const alert = Modal.alert;
const prompt = Modal.prompt;
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            gender:1,
            open:false,
            doctorList:[{},{},{},{},{},{},{},{},{},{}],
            animating:false,
            text:"",
            doctorItems:[],//绑定医生详情
            doctors:[],//绑定医生
            searchValue:"",
            serDoctorList:[],
            sparePhones:[],//备用手机号
            form:{
                hzBirthday: "",
                hzEmergency: "",//紧急联系电话
                hzGender: "1",//性别
                hzHomeAddr: "",
                userMail: "",
                username: "",
                hzProvince:"",
                hzCity:"",
                hzRegion:"",
            },
            otherPhone:"",
            cityList:[],
        }
        this.sparePhone = this.sparePhone.bind(this)
        this.information = this.information.bind(this)
        this.formatTime = this.formatTime.bind(this)
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.searchDoctorState!=nextprops.searchDoctorState&&nextprops.searchDoctorState=='succ'){
            this.setState({
                animating:false,
                serDoctorList:nextprops.serDoctorList
            })

        }
        if(this.props.searchDoctorState!=nextprops.searchDoctorState&&nextprops.searchDoctorState=='failed'){
            this.setState({
                animating:false
            })
            Toast.fail(nextprops.msg,2)
        }
        //备用电话提交
        if(this.props.sparePhoneState!=nextprops.sparePhoneState&&nextprops.sparePhoneState=='succ'){
            this.setState({
                text:'提交基本信息...'
            })
        }
        if(this.props.sparePhoneState!=nextprops.sparePhoneState&&nextprops.sparePhoneState=='failed'){
            this.setState({
                animating:false
            })
            Toast.fail(nextprops.msg,2)
        }
        if(this.props.informationState!=nextprops.informationState&&nextprops.informationState=='succ'){
            this.setState({
                animating:false
            })
            Toast.success('提交成功',2)
            this.props.history.push('/main')
        }
        if(this.props.informationState!=nextprops.informationState&&nextprops.informationState=='failed'){
            this.setState({
                animating:false
            })
            Toast.fail(nextprops.msg,2)
        }
        if(this.state.addDoctorState!=nextprops.addDoctorState&&nextprops.addDoctorState=='succ'){
            this.setState({
                text:'提交备用电话中...'
            })
        }
        if(this.state.addDoctorState!=nextprops.addDoctorState&&nextprops.addDoctorState=='failed'){
            this.setState({
                animating:false
            })
            Toast.fail(nextprops.msg,2)
        }
        if(this.props.loginState!=nextprops.loginState&&nextprops.loginState=='succ'){
            let user = nextprops.user
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
           
            
            if(user.entity&&user.entity.hzBirthday){
                if (isAndroid) {
                  user.entity.hzBirthday = new Date(user.entity.hzBirthday)
                }
                if (isIOS) {
                  user.entity.hzBirthday = new Date(user.entity.hzBirthday.replace(/-/g, "/"))
                }
                console.log( user.entity)
                this.setState(Object.assign(this.state.form, user.entity))
            }
            if(user.doctors){
                let docArr = []
                user.doctors.map((item)=>{
                    docArr.push(item.id)
                })
                this.setState({
                    doctorItems:user.doctors,//绑定医生详情
                    doctors:docArr,//绑定医生
                })
            }
            if(user.sparephone){
                let sparephoneArr = []
                user.sparephone.map((item)=>{
                    sparephoneArr.push(item.phone)
                })
                this.setState({
                    sparePhones:sparephoneArr
                })
            }
        }
        if(this.props.loginState!=nextprops.loginState&&nextprops.loginState=='failed'){
            Toast.fail(nextprops.msg,2)
        }
        if(this.props.getDocDetail!=nextprops.getDocDetail&&nextprops.getDocDetail=='succ'){
            this.setState({
                doctorItems:[nextprops.doc_reg_Detail],//绑定医生详情
                doctors:[nextprops.doc_reg_Detail.id],//绑定医生
            })
        }
    }
    componentWillMount(){
        const { match,actions} = this.props;
        const { params: { userId } } = match;
        if(userId){
            actions.getDoc({id:userId})
        }
        if(localStorage.getItem('token')){
            this.getUserInfo()
        }
        let newArr = []
        let _this = this
        CITY_DATA.forEach((province) => {
            newArr.push({
                label: province.name,
                value: province.name ,
                children: _this.getCity(province.sons)
            })
        })

        this.setState({
            cityList:newArr
        })
    }
    getUserInfo(){
        const {actions} = this.props
        actions.userInfo({})
    }
    componentDidMount(){
       
    }
    
    changeBnt(bnt){
        this.setState(Object.assign(this.state.form, { ['hzGender']: bnt}))
    }
    //上传备用电话
    sparePhone(){
        const {actions} = this.props
        // actions.push
    }
    //提交基本信息
    information(){
        const {actions} = this.props
        actions.information(this.state.form)
    }
    rules(){
        if(!this.state.form.username){
            Toast.fail('请输入姓名', 2) 
            return false
        }
        if(!this.state.form.hzBirthday){
            Toast.fail('请选择出生年月', 2) 
            return false
        }
        if(!this.state.form.hzEmergency){
            Toast.fail('请添加紧急联系人电话', 2) 
            return false
        }
        if(!this.phone(this.state.form.hzEmergency).result){
            Toast.fail('紧急联系人电话格式错误', 2) 
            return false
        }
        if(!this.state.form.hzHomeAddr){
            Toast.fail('请输入家庭住址', 2) 
            return false
        }
        if(this.state.doctors.length === 0){
            Toast.fail('请选择一个医生', 2) 
            return false
        }
        return true
    }
    async submit(){
        if(!this.rules()){
            return
        }
        const {actions} = this.props
        this.setState({
            text:'绑定医生中...',
            animating:true
        })
        let param = {...this.state.form}
        param.hzBirthday = await this.formatTime(this.state.form.hzBirthday)
        actions.information({
            information:param,
            sparePhones:{sparePhones:this.state.sparePhones},
            addDoctor:{
                doctors:JSON.stringify(this.state.doctors)
            }
        })
    }
    getCity(cityList) {
        let cityArr = []
        let _this = this
        if (cityList) {
            cityList.forEach((item) => {
                cityArr.push({
                    label: item.name,
                    value: item.name ,
                    children: _this.getArea(item.sons)
                })
            })
        }

        return cityArr

    }

    getArea(areaList) {
        let areaArr = []
        if (areaList) {
            areaList.forEach((item) => {
                areaArr.push({
                    label: item.name,
                    value: item.name,
                })
            })
        }
        return areaArr
    }
    formatTime(time) {
       
        let newTime = new Date(time)
        console.log(newTime.getFullYear())
        let year = newTime.getFullYear()
        let month = (newTime.getMonth() + 1) > 9 ? (newTime.getMonth() + 1) : '0' + (newTime.getMonth() + 1)
        let day = newTime.getDate() > 9 ? newTime.getDate() : '0' + newTime.getDate()
        let reTime = year + '-' + month + '-' + day + " " +"00:00:00"
        return reTime
      }
    onOpenChange = (...args) => {
        console.log(args);

        this.setState({ 
            open: !this.state.open ,
            searchValue:'',
            serDoctorList:[]
        });
    }
    deleteDoc = (index) =>{
        alert('删除', '确定要删除吗?', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确定', onPress: () => {
                    let newArr = this.state.doctors
                    let doctorItemsArr = this.state.doctorItems
                    newArr.splice(index, 1)
                    doctorItemsArr.splice(index, 1)
                    this.setState({
                        doctors:newArr,
                        doctorItems:doctorItemsArr
                    })
                    Toast.success('删除成功', 1) 
                }
            },
        ]);
       
    }
    deleteTel= (index) =>{
        alert('删除', '确定要删除吗?', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确定', onPress: () => {
                    let newArr = this.state.sparePhones
                    newArr.splice(index, 1)
                    this.setState({
                        sparePhones:newArr
                    })
                    Toast.success('删除成功', 1) 
                }
            },
        ]);
       
    }
    changeInput(type,e){
        this.setState(Object.assign(this.state.form, { [type]: e }))
    }
    // 改变查询内容
    changeSearch(e){
        this.setState({
            searchValue:e.target.value
        })
    }
    search(){
        if(!this.state.searchValue){
            Toast.fail('请输入医生姓名', 2)
            return
        }
        this.setState({
            animating:true,
            text:'搜索中...'
        })
        const {actions} =  this.props
        actions.searchDoctor({
            name:this.state.searchValue
        })
    }
    selectDoctor(item){
        this.setState({
            doctorId:item.id
        })
    }
    subSelectDoctor(item){
        let newArr = this.state.doctors
        let doctorItemsArr = this.state.doctorItems
        if(newArr.indexOf(item.id)>-1){
            Toast.fail('已添加该医生', 1)
            return 
        }
        newArr.push(item.id)
        doctorItemsArr.push(item)
        this.setState({
            open:false,
            doctors:newArr,
            doctorItems:doctorItemsArr
        })
    }
    phone(phone) {
        let phoneText = /^1[3456789]\d{9}$/
        if ((phoneText.test(phone))) {
          return { result: true }
        } else {
          return { result: false, msg: '手机号格式错误' }
        }
      }
  render() {
      const {cityList, form} = this.state
      const sidebar = (<div >
                        <div className="close_icon" onClick={this.onOpenChange}><Icon type="close" /> </div>
                        <div className="Drawer_content">
                            <SearchBar backgroundColor="#ffffff" placeholder="请输入医生姓名" value={this.state.searchValue} onChange={this.changeSearch.bind(this)} searchBnt={this.search.bind(this)} />
                            {
                                this.state.serDoctorList.map((item,index)=>{
                                    return <SelectDoctorList onClick={this.selectDoctor.bind(this,item)} select={this.state.doctorId==item.id} onClickCertain={this.subSelectDoctor.bind(this,item)} key={index} src={item.wxPortrait} name={item.username} content={item.ysHospitalName+"  "+item.ysDepartment}  />
                                })
                            }
                        </div>
      </div>);
      let newDate = new Date(this.state.form.hzBirthday)
      const CustomChildren = ({ extra, onClick, children }) => (
            <div className="year_select"  onClick={onClick}>
                <div className="year_select_one">{this.state.form.hzBirthday?newDate.getFullYear():'年'}</div>
                <div className="year_select_line">|</div>
                <div className="year_select_one">{this.state.form.hzBirthday?(newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : '0' + (newDate.getMonth() + 1):'月'}</div>
                <div className="year_select_line" >|</div>
                <div className="year_select_one">{this.state.form.hzBirthday?(newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()):'日'}</div>
            </div>
        //   <span style={{ float: 'right', color: '#888' }}>{extra}</span>
      );
      const SelectBox =  ({ extra, onClick, children }) => (
            <Rinput className="marginTop4" value={form.hzProvince+form.hzCity+form.hzRegion} onDivClick = {onClick} disabled={true} placeholder="请选择省市区" icon = "address"/>
      )
    return (
        <Drawer
            className="my-drawer"
            style={{ minHeight: document.documentElement.clientHeight }}
            sidebar={sidebar}
            open={this.state.open}
            position='bottom'
          >
            <div className="reg_row">
                <Rinput value={this.state.form.username} onChange={this.changeInput.bind(this,'username')} className="mar  ginTop4" placeholder="请输入患者姓名" />
                <div className="reg_label">出生日期 </div>
                <DatePicker
                    mode="date"
                    minDate={new Date(1900, 1, 1, 0, 0, 0)}
                    value={this.state.form.hzBirthday}
                    format="YYYY-MM-DD"
                    onChange={date => {
                        this.setState(Object.assign(this.state.form, { ['hzBirthday']: date }))
                    }}
                >
                 <CustomChildren />
                </DatePicker>
                

                <div className="gender_row">
                    <div className={this.state.form.hzGender=='1'?"gender_select floatLeft":"gender floatLeft"} onClick={this.changeBnt.bind(this,1)}>
                        {
                            this.state.form.hzGender=="1"?<div className="gender_select_icon">
                                <img src={selectYes} />
                            </div>:null
                        }
                        <div className="gender_text">
                            男
                        </div>
                    </div>
                    <div className={this.state.form.hzGender=='2'?"gender_select floatRight":"gender floatRight"} onClick={this.changeBnt.bind(this,2)}>
                        {
                            this.state.form.hzGender=="2"?<div className="gender_select_icon">
                                <img src={selectYes} />
                            </div>:null
                        }
                        
                        <div className="gender_text">
                            女
                        </div>
                    </div>
                </div>
                
                <Rinput className="marginTop4" value={this.state.form.userMail} onChange={this.changeInput.bind(this,'userMail')} placeholder="请输入电子邮箱（可选填）" />
                {
                    this.state.sparePhones.map((item,index)=>{
                        return <Rinput key={index} type="number" className="marginTop4"  disabled={true} value={item} onClick={this.deleteTel.bind(this,index)}  icon="delete"  placeholder="请添加您的备用电话" />
                    })
                }
                <div className="marginTop4">
                <Button  onClick={() => prompt('备用电话', '请输入您的备用电话',
                    [
                        {
                        text: '取消',
                        onPress: value => new Promise((resolve) => {
                            resolve();
                        }),
                        },
                        {
                        text: '添加',
                        onPress: value => new Promise((resolve, reject) => {
                            let newarr = this.state.sparePhones
                            if(!this.phone(value).result){
                                Toast.info('手机号格式有误', 1);
                            }else{
                                if(newarr.indexOf(value) > -1){
                                    Toast.fail('请勿重复添加', 1) 
                                }else{
                                    resolve();
                                    newarr.push(value+"")
                                    this.setState({
                                        sparePhones:newarr
                                    })
                                }
                            }
                        }),
                        },
                    ], 'default', null, ['请输入手机号'])}
                ><Rinput type="number" icon="add" value={this.state.otherPhone}  placeholder="请添加您的备用电话" /></Button>
                </div>
                
                <Rinput type="number" value={this.state.form.hzEmergency} onChange={this.changeInput.bind(this,'hzEmergency')} className="marginTop4" placeholder="请输入紧急联系人电话" />
                <Picker 
                        data={cityList}
                        onOk={e => this.setState(Object.assign(this.state.form,{
                            hzProvince:e[0],
                            hzCity:e[1],
                            hzRegion:e[2], 
                        }))}
                        onDismiss={e => console.log('dismiss', e)}
                >
                   <SelectBox />
                </Picker>
                
                <Rinput className="marginTop4" value={this.state.form.hzHomeAddr} onChange={this.changeInput.bind(this,'hzHomeAddr')} placeholder="请输入家庭住址" icon = "address"/>
                {
                    this.state.doctorItems.map((item,index)=>{
                        return <div key={index}>
                            <Rinput className="marginTop4" value={item.username} disabled={true}  placeholder="请选择就诊医生" icon="delete" onClick={this.deleteDoc.bind(this,index)}/>
                            <Rinput className="marginTop4" disabled={true} value={item.ysHospital}  placeholder="就诊医生所在医院" />
                            <Rinput className="marginTop4" disabled={true} value={item.ysDepartment}  placeholder="就诊医生所在科室" />
                        </div>
                    })
                }
                <Rinput className="marginTop4" placeholder="请添加就诊医生" icon="add" disabled={true} onClick={this.onOpenChange}/>
                <Rinput className="marginTop4" disabled={true}   placeholder="就诊医生所在医院" />
                <Rinput className="marginTop4" disabled={true}  placeholder="就诊医生所在科室" />
                <GButton name="提交" onClick={this.submit.bind(this)} />
            </div>
            <ActivityIndicator
                toast
                size="large"
                text={this.state.text}
                animating={this.state.animating}
            />
      </Drawer>
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
    searchDoctorState:state.user.searchDoctorState,
    user:state.user.user,
    loginState:state.user.loginState,
    serDoctorList:state.user.serDoctorList,
    msg:state.user.msg,
    informationState:state.user.informationState,
    information:state.user.information,
    addDoctorState:state.user.addDoctorState,
    sparePhoneState:state.user.sparePhoneState,
    doc_reg_Detail:state.user.doc_reg_Detail,
    getDocDetail:state.user.getDocDetail,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));