import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { Toast, ActivityIndicator, PullToRefresh } from 'antd-mobile';

import OrderList from '../../components/OrderList'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
import { appId} from './../../actions/config'
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList: [],
      animating: false,
      text: '',
      page: 1,
      limit: 20,
      total: 0,
      data: [],
      height:document.documentElement.clientHeight,
      statu:'',
      mchId:'',
      mchKey:'',
      geneCompanyId:''
    }
  }
  componentWillReceiveProps(nextprops) {
    if (this.props.orderListState != nextprops.orderListState && nextprops.orderListState == 'failed') {
      this.setState({
        animating: false
      })
      Toast.fail(nextprops.msg, 2)
    }
    if (this.props.orderListState != nextprops.orderListState && nextprops.orderListState == 'succ') {
      this.setState({
        animating: false
      })
      const { data } = this.state
      let newArr = data.concat(nextprops.orderList.list)
      console.log(newArr, nextprops.orderList.list)
      console.log(newArr)
      this.setState({
        animating: false,
        total: nextprops.orderList.total,
        data: newArr
      })
    }
  }
  componentWillMount() {
    document.title = '查看订单'
    const { actions } = this.props
    const { newArr} = this.props
    const{mchId,mchKey} = this.props
    const {limit} = this.state
    const {geneCompanyId}=this.state
    this.setState({
      text: '获取订单列表',
      animating: true
    })
    actions.geneorderList({
      page: 1,
      limit
    })
    // actions.genecompanyId({
    //   // id:'1230421829462728705'
    //   id:this.props.geneCompanyId
    // })
    actions.genecompany({
      
    })
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    this.setState({
        height:hei
    })
  }
  getSign(params) {
    let WXKEY=sessionStorage.getItem('mchKey');
    let string = ""
    for (let key in params) {
      if (key == 'appId') {
        string += key + "=" + params[key]
      } else {
        string += "&" + key + "=" + params[key]
      }
    }
    string += `&key=${WXKEY}`
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');
    md5.update(string);
    let str = md5.digest('hex');
    return str.toUpperCase()
    
  }
  goNext(item) {
    const {actions} = this.props
    console.log('geneCompanyId',item.geneCompanyId)
    
    if (item.payTime) {
      this.props.history.push(`/orderFinishPay/${item.id}/goback`)
    } else if (item.prepayId) {
      actions.genecompanyId({
        id:item.geneCompanyId
      })
      console.log(item)
      setTimeout(() => {
        let _this = this
      window.wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        let nonceStr = Math.random().toString(36).slice(2)
        let pack = "prepay_id=" + item.prepayId
        console.log(pack)
        let signType = 'MD5'
        let timeStamp = new Date().getTime()
        let params = {
          appId,
          nonceStr,
          package: pack,
          signType,
          timeStamp
        }
        let paySign = _this.getSign(params)
        console.log(paySign)

        window.wx.chooseWXPay({
          timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
          package: pack, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign, // 支付签名 appId,  nonceStr,package,signType,  timeStamp.
          success: function (res) {
            // 支付成功后的回调函数
            _this.props.history.push('/orderList')
            Toast.success('支付成功', 3)
          }
        });
      });
      }, 500);
      
    }

  }
  getMore = () => {
    const { actions } = this.props
    const { page, total, limit } = this.state
    
    if (total > page * limit) {
      let newPage = page + 1
      actions.geneorderList({
        page: newPage,
        limit
      })
      this.setState({
        page: newPage
      })
    }
  }
  
  

  //statu  
  //0 已下单 1已支付 2检测完成 3订单已关闭 4检测中
  render() {
    const orderList = (this.props.orderListState == 'succ' && this.props.orderList.list) || []
    const newDate = new Date(new Date().getTime() - 2 * 60 * 60 * 1000)
    const { data } = this.state
    const { height } = this.state
    const { geneCompanyId } = this.state
    return (
      <div className="orderList_row">
        <PullToRefresh
          damping={100}
          distanceToRefresh={window.devicePixelRatio * 25}
          ref={el => this.ptr = el}
          style={{
            // height: 'calc(100vh - 12vw)',
            height: height,
            fontSize: '.35rem',
            overflow: 'auto',
            overflowY:'scroll'
          }}
          indicator={'加载更多'}
          direction={'up'}
          refreshing={this.state.refreshing}
          onRefresh={this.getMore.bind(this)}
        >
          {
            data.map((item, index) => {
              return <OrderList
                key={index}
                name={item.title}
                code={item.number}
                id={item.id}
                statu={
                  (() => {
                    switch (item.statu) {
                      case '0':
                        return '已下单'
                      case '1':
                        return '已支付'
                      case '2':
                        return '检测完成'
                      case '3':
                        return '订单已关闭'
                      case '4':
                        return '检测中'
                      default:
                        return '未支付'
                    }
                  }
                  )()
                }
                time={item.payTime ? item.payTime : (new Date(window.isIOS ? item.createrTime.replace(/-/g, "/") : item.createrTime) < newDate ? <span style={{ color: 'red' }}>订单已失效</span> : '待付费')}
                company={item.geneCompany}
                money={item.orderMoney}
                creatertime={item.createrTime}
                onClick={this.goNext.bind(this, item)}
                companyId={item.geneCompanyId}
                
              />
            })
          }
        </PullToRefresh>
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
    orderListState: state.user.orderListState,
    orderList: state.user.orderList,
    msg: state.user.msg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
