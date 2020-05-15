import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { Result, Icon,Steps,WingBlank,WhiteSpace,Card} from 'antd-mobile';

import './index.scss';
import slot from '../../sources/slot.png'
import slot2 from '../../sources/slot2.png'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;
const Step = Steps.Step;
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
         
        }
    }
    componentWillReceiveProps(nextprops) {
        
    }
    componentWillMount(){
        const { match,actions} = this.props;
        const { params: { oId } } = match;
        actions.getExpressInfo({
            orderId:oId
        })
        actions.geneorderdetail({
            id:oId
        })
    }
    componentDidMount(){
       
    }
  render() {
      const {ExpressInfo,getExpressInfo,orderDetail} = this.props;
    //   let data = Array.from(data);
      const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
    return (
        <div>
            <Card full>
                <Card.Header
                    title={orderDetail.title}
                    // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    
                />
                <Card.Body>
                    <div>快递单号：{orderDetail.logisticsCode}</div>
                </Card.Body>
                <Card.Footer  extra={<div>{orderDetail.payTime}</div>} />
            </Card>
        
          <WingBlank size="lg">
                <WhiteSpace />
                {orderDetail.logisticsCode?<Steps size="small" current={1}>
                    {
                        getExpressInfo=='succ'?ExpressInfo&&ExpressInfo.map((item,index)=>{
                            if(index == '0'){
                                return  <Step key={index} icon={<img className="slot" src={slot} />} status="finish" title={<div className="logistics_title_now">{item.context}</div>} description={item.ftime} />
                            }else{
                                return  <Step key={index} icon={<img className="slot" src={slot2} />}  title={<div className="logistics_title">{item.context}</div>}description={item.ftime} />
                            }
                        }):null
                    }
                </Steps>:<Result
                        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
                        title="暂无物流信息"
                        
                    />}
            </WingBlank>
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
    getExpressInfo:state.user.getExpressInfo,
    ExpressInfo:state.user.ExpressInfo,
    getOrderDetailState:state.user.getOrderDetailState,
    orderDetail:state.user.orderDetail,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));