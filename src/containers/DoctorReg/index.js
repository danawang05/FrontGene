import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Icon } from 'antd';
import { Toast, Drawer, ImagePicker, ActivityIndicator, Picker,Button } from 'antd-mobile';
import {HOSP_NUMBER } from "../../actions/config";
import Rinput from '../../components/RegInput'
import GButton from '../../components/GButton'
import ceshi from '../../sources/ceshi.jpeg'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
import SearchBar from '../../components/SearchBar'
import SelectDoctorList from '../../components/SelectDoctorList'
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddHosp: false,
            open: false,
            headUrl: "",
            photo: [],
            hospId: '',
            text: '',
            photoId: '',
            animating: false,
            form: {
                userMail: "",
                username: "",
                ysDepartment: "",
                ysHospital: "",
                ysHospitalName: '',
                ysProvince: "",
                ysTitle: "",
            },
            hospList: []
        }
    }
    componentWillReceiveProps(nextprops) {
        if (this.props.getHospState != nextprops.getHospState && nextprops.getHospState == 'succ') {
            this.setState({
                animating: false,
                hospList: nextprops.hospList.list
            })

        }
        if (this.props.getHospState != nextprops.getHospState && nextprops.getHospState == 'failed') {
            this.setState({
                animating: false
            })
            Toast.fail(nextprops.msg, 2)
        }
        //备用电话提交
        if (this.props.sparePhoneState != nextprops.sparePhoneState && nextprops.sparePhoneState == 'succ') {
            this.setState({
                text: '提交基本信息...'
            })
        }
        if (this.props.sparePhoneState != nextprops.sparePhoneState && nextprops.sparePhoneState == 'failed') {
            this.setState({
                animating: false
            })
            Toast.fail(nextprops.msg, 2)
        }
        if (this.props.informationState != nextprops.informationState && nextprops.informationState == 'succ') {
            this.setState({
                animating: false
            })
            Toast.success('提交成功', 2)
            this.props.history.push('/main')
        }
        if (this.props.informationState != nextprops.informationState && nextprops.informationState == 'failed') {
            this.setState({
                animating: false
            })
            Toast.fail(nextprops.msg, 2)
        }
        if (this.props.loginState != nextprops.loginState && nextprops.loginState == 'succ') {
            let user = nextprops.user
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端


            if (user.entity && user.entity.id) {
                console.log(user.certiggicate)
                this.setState(Object.assign(this.state.form, user.entity))
                if (user.certiggicate[0]) {
                    this.setState({
                        photo: [{ url: user.certiggicate[0].fileUrl }],
                        photoId: [user.certiggicate.id]
                    })
                }

            }
        }
        if (this.props.loginState != nextprops.loginState && nextprops.loginState == 'failed') {
            Toast.fail(nextprops.msg, 2)
        }
        if (this.props.uploadState != nextprops.uploadState && nextprops.uploadState == 'succ') {
            this.setState({
                photo: [{ url: nextprops.upload.url }],
                photoId: [nextprops.upload.id],
                animating: false,
            })
            Toast.success('上传成功', 1)
        }
        if (this.props.uploadState != nextprops.uploadState && nextprops.uploadState == 'failed') {
            this.setState({
                animating: false,
            })
            Toast.fail(nextprops.msg, 2)
        }
        if(this.props.addHosp!=nextprops.addHosp&&nextprops.addHosp=='succ'){
            this.setState({
                animating: false,
                open:false
            })
            Toast.success('您的医院信息已提交，审核结果将以短信形式告知，请耐心等待', 5)
        }
        if(this.props.addHosp!=nextprops.addHosp&&nextprops.addHosp=='failed'){
            this.setState({
                animating: false
            })
            Toast.fail(nextprops.msg, 2)
        }
    }
    componentWillMount() {
        const {actions} = this.props
        actions.findForPids({
            pid:[HOSP_NUMBER]
         })
        actions.getProvince({})
        if (localStorage.getItem('token')) {
            this.getUserInfo()
             
        }
    }
    getUserInfo () {
        const { actions } = this.props
        actions.userInfo({})
    }
    componentDidMount() {

    }
    // submit(){
    //     // this.props.history.push('/main')
    //     console.log(this.state.form)
    // }
    changeInput(type, e) {
        this.setState(Object.assign(this.state.form, { [type]: e }))
    }
    changeInputTwo(type, e) {
        this.setState(Object.assign(this.state, { [type]: e }))
    }
    search() {
        if (!this.state.searchValue) {
            Toast.fail('请输入医院名称', 2)
            return
        }
        this.setState({
            animating: true,
            text: '搜索中...'
        })
        const { actions } = this.props
        actions.getHosp({
            page: 1,
            limit: 10,
            hospitalName: this.state.searchValue
        })
    }
    selectHosp(item) {
        this.setState({
            hospId: item.id
        })
    }
    subSelectDoctor(item) {
        // 放进去医院名称，就职城市
        console.log(item)
        this.setState(Object.assign(this.state.form, { ['ysHospitalName']: item.hospitalName, ['ysHospital']: item.id, ['ysProvince']: item.provinceName || "" + "  " + item.cityName || "" + "  " + item.districtName || "" }))
        this.setState({
            open: !this.state.open,
        })
    }
    // 改变查询内容
    changeSearch(e) {
        ""
        this.setState({
            searchValue: e.target.value
        })
    }
    rules() {
        if (!this.state.form.username) {
            Toast.fail('请输入姓名', 2)
            return false
        }
        // if(!this.state.form.userMail){
        //     Toast.fail('请输入邮箱', 2) 
        //     return false
        // }
        if (!this.state.form.ysDepartment) {
            Toast.fail('请输入科室', 2)
            return false
        }
        if (!this.state.form.ysHospital) {
            Toast.fail('请选择就职医院', 2)
            return false
        }
        if (!this.state.form.ysTitle) {
            Toast.fail('请输入职称', 2)
            return false
        }
        // if(this.state.photoId.length==0){
        //     Toast.fail('请上传职业资格证', 2) 
        //     return false
        // }
        return true
    }
    submit() {
        if (!this.rules()) {
            return
        }
        const { actions } = this.props
        this.setState({
            text: '提交中...',
            animating: true
        })
        let param = { ...this.state.form }
        console.log("this.props.photoId", this.props.photoId)
        actions.docInformation({
            information: param,
            saveDoctorIdImg: {
                files: this.state.photoId,
                relationId: this.state.form.id
            }
        })
    }
    onOpenChange = (...args) => {
        this.setState({
            hospId: '',
            open: !this.state.open,
            searchValue: '',
            hospList: []
        });
    }
    // 图片上传
    workCardFile(files, type, index) {
        const { actions } = this.props
        let _this = this
        if (type == 'add') {
            this.setState(Object.assign(_this.state, {
                animating: true,
                text: '正在上传'
            }))
            actions.upload({
                file: files[files.length - 1].file,
            })
        } else {
            let newArr = this.state.photo
            newArr.splice(index, 1);
            this.setState({
                photo: [],
                photoId: []
            })
        }
        //  actions.upload({
        //     pubFileVo:{
        //         "files":this.state.photo,
        //         "relationId": "string"
        //     }
        // })
    };
    addHosp = () => {
        this.setState({
            province:'',
            provinceName:'',
            city:'',
            cityName:'',
            district:'',
            districtName:'',
            level:'',
            hospitalName:'',
            showAddHosp: true
        })
    }
    selectP = (id,name,type) => {
        const {actions} = this.props
        console.log(id,name)
        if(type == 'pro'){
            this.setState({
                province:id,
                provinceName:name,
                city:"",
                cityName:'',
                district:"",
                districtName:''
            })
            actions.getCity({
                id:id
            })
        }
        if(type == 'city'){
            this.setState({
                city:id,
                cityName:name,
                district:"",
                districtName:''
            })
            actions.getArea({
                id:id
            })
        }
        if(type == 'reg'){
            this.setState({
                district:id,
                districtName:name
            })
        }
    }
    goBack = () => {
        this.setState({
            open:false,
            showAddHosp:false
        })
    }
    subHosp = () => {
        const { province,provinceName,city,cityName,district,districtName,level,hospitalName } = this.state
        if(!province){
            Toast.fail('请选择省份')
            return
        }
        if(!city){
            Toast.fail('请选择城市')
            return
        }
        if(!district){
            Toast.fail('请选择地区')
            return
        }
        if(!hospitalName){
            Toast.fail('请输入医院名称')
            return
        }
        if(!level){
            Toast.fail('请选择医院等级')
            return
        }
        const {actions} = this.props
        this.setState({
            text:'正在提交',
            animating:true
        })
        actions.pubhospital({
            province,provinceName,city,cityName,district,districtName,level,hospitalName
        })
    }
    render() {
        const { setting ,proList,cityList,areaList} = this.props
        const { provinceName,cityName,districtName,level,hospitalName} = this.state
        let select1 = [[]]
       
        setting[HOSP_NUMBER] && setting[HOSP_NUMBER].map((v) => {
            select1[0].push({ label: v.dictName, value: v.dictName })
        })
        let select2 = [[]]
        proList&&proList.map((v) => {
            select2[0].push({ label: v.name, value: v.id+"*"+ v.name })
        })
        let select3 = [[]]
        cityList&&cityList.map((v) => {
            select3[0].push({ label: v.name, value: v.id+"*"+ v.name })
        })
        let select4 = [[]]
        areaList&&areaList.map((v) => {
            select4[0].push({ label: v.name, value: v.id+"*"+ v.name })
        })
        const SelectBox = ({ extra, onClick, children }) => (
            <Rinput label="省份" className="marginTop4" value={provinceName} onDivClick={onClick} disabled={true} placeholder="请选择省市区" icon="address" />
        )
        const SelectBox2 = ({ extra, onClick, children }) => (
            <Rinput label="城市" className="marginTop4" value={cityName} onDivClick={onClick} disabled={true} placeholder="请选择省市区" icon="address" />
        )
        const SelectBox3 = ({ extra, onClick, children }) => (
            <Rinput label="地区" className="marginTop4" value={districtName} onDivClick={onClick} disabled={true} placeholder="请选择省市区" icon="address" />
        )
        const SelectBox4 = ({ extra, onClick, children }) => (
            <Rinput label="医院级别" className="marginTop4" value={level} onDivClick={onClick} disabled={true} placeholder="请选择医院级别" />
        )
        const sidebar = (<div >
            {this.state.showAddHosp ? <div className="addHosp-row">
                <Picker
                    title="省份"
                    data={select2}
                    cascade={false}
                    onOk={e => this.selectP(e[0].split('*')[0],e[0].split('*')[1],'pro')}
                    onDismiss={e => console.log('dismiss', e)}
                >
                    <SelectBox />
                </Picker>
                <Picker
                    title="城市"
                    cascade={false}
                    data={select3}
                    onOk={e => this.selectP(e[0].split('*')[0],e[0].split('*')[1],'city')}
                    onDismiss={e => console.log('dismiss', e)}
                >
                    <SelectBox2 />
                </Picker>
                <Picker
                    title="地区"
                    cascade={false}
                    data={select4}
                    onOk={e => this.selectP(e[0].split('*')[0],e[0].split('*')[1],'reg')}
                    onDismiss={e => console.log('dismiss', e)}
                >
                    <SelectBox3 />
                </Picker>
                <Rinput label="医院名称" value={hospitalName} onChange={this.changeInput.bind(this, 'hospitalName')} className="marginTop4" placeholder="请输入医院名称" />
                <Picker
                   data={select1}
                   title="医院级别"
                   cascade={false}
                   // onChange={v => this.setState({ sValue: v })}
                   onOk={v =>this.setState({level:v[0]})}
                >
                    <SelectBox4 />
                </Picker>
               
                    <GButton name="提交" onClick={this.subHosp} />
                    <Button style={{marginTop:'.8rem'}} type="warning" onClick={this.goBack}>取消</Button>
                
            </div> : <div>
                    <div className="close_icon" onClick={this.onOpenChange}><Icon type="close" /> </div>
                    <div className="Drawer_content">
                        <SearchBar backgroundColor="#ffffff" placeholder="请输入医院名称" value={this.state.searchValue} onChange={this.changeSearch.bind(this)} searchBnt={this.search.bind(this)} />
                        {
                            this.state.hospList.map((item, index) => {
                                return <SelectDoctorList onClick={this.selectHosp.bind(this, item)} select={this.state.hospId == item.id} onClickCertain={this.subSelectDoctor.bind(this, item)} key={index} src={ceshi} name={item.hospitalName} content={item.provinceName || "" + "  " + item.cityName || "" + "  " + item.districtName || ""} />
                            })
                        }
                        {
                            this.state.hospList.length == 0 ? <div className="add-hosp">医院库若无此医院，点击<span onClick={this.addHosp}>添加医院</span></div> : null
                        }
                    </div>
                </div>}

        </div>);
         const SelectBox5 =  ({ extra, onClick, children }) => (
                <Rinput label="医生职称" className="marginTop4" value={this.state.form.ysTitle} onDivClick = {onClick} disabled={true} placeholder="请选择医生职称" />
        )
        const zhicheng = [[
            {
                label:'住院医师',
                value:'住院医师'
            },
            {
                label:'主治医师',
                value:'主治医师'
            },
            {
                label:'副主任医师',
                value:'副主任医师'
            },
            {
                label:'主任医师',
                value:'主任医师'
            },
        ]]
        const { wxPortrait } = this.state.form

        return (
            <Drawer
                className="my-drawer"
                style={{ minHeight: "100vh" }}
                sidebar={sidebar}
                open={this.state.open}
                position='bottom'
            >
                <div className="reg_row">
                    <div>
                        {/* <div className="r_input_label marginTop4">头像</div>
                    <div className="headImg">
                        <div className="headImg_url">
                            <img src={wxPortrait}/>
                        </div>
                    </div> */}
                        <Rinput label="姓名" value={this.state.form.username} onChange={this.changeInput.bind(this, 'username')} className="marginTop4" placeholder="请输入姓名" />
                        <Rinput label="电子邮箱(选填）" value={this.state.form.userMail} onChange={this.changeInput.bind(this, 'userMail')} className="marginTop4" placeholder="请输入电子邮箱" />
                        <Rinput label="联系电话" disabled={true} value={this.state.form.mobile} className="marginTop4" placeholder="联系电话" />
                        {/* <Rinput label="医生职称" value={this.state.form.ysTitle} onChange={this.changeInput.bind(this, 'ysTitle')} className="marginTop4" placeholder="请输入医生职称" /> */}
                        <Picker 
                                data={zhicheng}
                                cascade={false}
                                onOk={e => this.setState(Object.assign(this.state.form,{
                                    ysTitle:e
                                }))}
                                onDismiss={e => console.log('dismiss', e)}
                        >
                        <SelectBox5 />
                        </Picker>
                        <Rinput label="就职医院" value={this.state.form.ysHospitalName} className="marginTop4" placeholder="请选择就职医院" icon="add" disabled={true} onClick={this.onOpenChange} />
                        <Rinput label="就职城市" disabled={true} value={this.state.form.ysProvince} onChange={this.changeInput.bind(this, 'ysProvince')} className="marginTop4" placeholder="就职城市" />

                        {/* <Rinput label="就职医院" value={this.state.form.ysHospital} onChange={this.changeInput.bind(this,'ysHospital')} className="marginTop4" placeholder="请输入就职医院" /> */}
                        <Rinput label="科室" value={this.state.form.ysDepartment} onChange={this.changeInput.bind(this, 'ysDepartment')} className="marginTop4" placeholder="请输入科室" />
                        <div className="r_input_label marginTop4">职业资格证（选填）</div>
                        <div className="photoImg marginTop4">
                            <ImagePicker
                                files={this.state.photo}
                                onChange={this.workCardFile.bind(this)}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={this.state.photo.length < 1}
                            />
                        </div>
                        <GButton name="提交" onClick={this.submit.bind(this)} />
                    </div>
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
        user: state.user.user,
        loginState: state.user.loginState,
        msg: state.user.msg,
        informationState: state.user.informationState,
        information: state.user.information,
        addDoctorState: state.user.addDoctorState,
        sparePhoneState: state.user.sparePhoneState,
        getHospState: state.user.getHospState,
        hospList: state.user.hospList,
        uploadState: state.user.uploadState,
        upload: state.user.upload,
        setting: state.user.setting,
        proList:state.user.proList,
        getPro:state.user.getPro,
        cityList:state.user.cityList,
        getCity:state.user.getCity,
        areaList:state.user.areaList,
        getArea:state.user.getArea,
        addHosp:state.user.addHosp,
    };
    return props;
}
function mapDispatchToProps(dispatch) {
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
