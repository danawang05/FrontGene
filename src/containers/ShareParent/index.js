import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form,Icon } from 'antd';
import { List, Checkbox, Flex, Toast } from 'antd-mobile';

import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            subArr :[],
            select:false,
            textId:''
        }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.recommenState!=nextprops.recommenState&&nextprops.recommenState=='succ'){
            Toast.success('分享成功',1)
            this.props.history.goBack()
        }
        if(this.props.recommenState!=nextprops.recommenState&&nextprops.recommenState=='failed'){
            Toast.fail(nextprops.msg,1)
        }
    }
    componentWillMount(){
        //获取分享文章的
        const { match,actions} = this.props;
        const { params: { textId } } = match;
        actions.mypatient()
        this.setState({
            textId:textId
        })
    }
    componentDidMount(){
       
    }
    onChange = (val,index) => {
        
        let newArr = this.state.subArr
        if(newArr.indexOf(val)> -1){
            newArr.splice(index,1)
        }else{
            newArr.push(val)
        }
        this.setState({
            subArr:newArr
        })
    }
    selectAll = () => {
        if(this.state.select){
            this.setState({
                subArr:[],
                select:false
            })
        }else{
            let newArr = [];
            this.props.myPatient.map((item)=>{
                newArr.push(item.id)
            })
            this.setState({
                subArr:newArr,
                select:true
            })
        }
        
    }
    sharePatient = () => {
        if(this.state.subArr.length == 0){
            Toast.fail('请选择患者',1)
            return
        }
        const {actions} = this.props
        actions.recommended({
            ids:this.state.subArr,
            newsId:this.state.textId
        })
    }
  render() {
    const data = [
        { value: 0, label: 'Ph.D.' },
        { value: 1, label: 'Bachelor' },
        { value: 2, label: 'College diploma' },
    ];
    const {myPatient,recommenState} = this.props
    const {subArr} = this.state
    return (
        <div>
            <List renderHeader={() => '选择分享的患者'}>
                {myPatient.map((i,index) => (
                    <CheckboxItem checked={subArr.indexOf(i.id)> -1 } key={i.id} onChange={() => this.onChange(i.id,index)}>
                    {i.username}
                    </CheckboxItem>
                ))}
                {/* <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
                    Undergraduate<List.Item.Brief>Auxiliary text</List.Item.Brief>
                </CheckboxItem> */}
            </List>
            <div className="height2"></div>
            <div style={{background:"#fff"}} className="height2 o_back displays">
                <Flex>
                    <Flex.Item>
                        <AgreeItem className="flex1" data-seed="logId" onChange={this.selectAll.bind(this)}>
                            全选
                        </AgreeItem>
                    </Flex.Item>
                </Flex>
                <div className="flex1"></div>
                <div className="share_bnt" onClick={this.sharePatient}><Icon type="share-alt" />确定分享</div> 
                  {/* <div className="flex1 allSelect">
                 
                  </div>
                  <div className="back_bnt" onClick={()=>{this.props.history.goBack()}}><Icon type="share-alt" />确定分享</div> */}
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
    getMyPatientState:state.user.getMyPatientState,
    myPatient:state.user.myPatient,
    recommenState:state.user.recommenState,
    msg:state.user.msg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));