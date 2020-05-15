import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Icon } from 'antd';
import {Toast,Badge } from 'antd-mobile';

import ReportListOne from '../../components/reportListOne'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: [{}, {}, {}]
        }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.orderListState!=nextprops.orderListState&&nextprops.orderListState=='failed'){
            Toast.fail(nextprops.msg, 2)
          }
    }
    componentWillMount() {
        const { actions} = this.props
        document.title = "报告咨询"
        actions.geneorderList({
            page:1,
            statu:1,
            limit:100
        })
    }
    componentDidMount() {

    }
    goChat(id,wxPortrait){
        const {actions} = this.props
        actions.setChatImg({
                wxPortrait:wxPortrait
        })
        if(id){
            sessionStorage.setItem('chat_id',id)
            this.props.history.push(`/chat/${id}`)
        }else{
            Toast.fail('未能创建联系',2)
        }
       
    }
    goDocShareText = (id) => {
        this.props.history.push('/docShareText/'+id)
    }
    render() {
        const orderList = (this.props.orderListState=='succ'&&this.props.orderList.list)||[]
        let msgNumberList = {}
        if(this.props.msgNumber.msgNumberList){
        msgNumberList = this.props.msgNumber.msgNumberList
        }
        return (
            <div className="consultation_row">
                {
                    orderList.map((item,index) => {
                        return <div  key={index} className="reportListOne_row ">
                            <div className="displays">
                                <div className="flex1">
                                    <div>{item.title}</div>
                                    <div>绑定医生：{item.doctorName} 医院名字:{item.hospitalName}  检测公司：{item.geneCompany}</div>
                                    <div className="color_9b9b9b">订单创建时间：{item.createrTime&&item.createrTime.substring(0,10)}</div>
                                </div>
                                <div className="orderlist_go">
                                    <Icon type="right" />
                                </div>
                            </div>
                            <div>
                                <div className="displays reportList_bnt">
                                    <div className="flex1"></div>
                                    <div onClick={this.goChat.bind(this,item.groupId,item.doctorImg)} className="gray_bnt reportList_bnt_one marginRight">
                                    <Badge text={msgNumberList[item.groupId]?msgNumberList[item.groupId]:0} >  <Icon type="message" />报告咨询</Badge>
                                    </div>
                                    <div onClick={this.goDocShareText.bind(this,item.doctorId)}  className="reportList_bnt_one promise_bnt">
                                        <Icon type="heart" />医生推荐
                                    </div>
                                </div>
                            </div>
                        </div>
                    //     return <ReportListOne name="报告的名字" company="公司的名字" time="2019-07-02" code="SIWNS98S">
                    //         <div className="displays reportList_bnt">
                    //             <div className="flex1"></div>
                    //             <div className="gray_bnt reportList_bnt_one marginRight">
                    //                 <Icon type="message" />报告咨询
                    // </div>
                    //             <div className="reportList_bnt_one promise_bnt">
                    //                 <Icon type="heart" />医生推荐
                    // </div>

                    //         </div>
                    //     </ReportListOne>
                    })
                }

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
        orderListState:state.user.orderListState,
        orderList:state.user.orderList, 
        msg :state.user.msg, 
        msgNumber:state.chat.msgNumber, 
    };
    return props;
}
function mapDispatchToProps(dispatch) {
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
