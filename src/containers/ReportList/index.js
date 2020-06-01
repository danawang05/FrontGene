import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Icon } from 'antd';
import { Toast, ActivityIndicator, Modal, PullToRefresh } from 'antd-mobile';
import OrderListBnt from '../../components/OrderListBnt'
import ReportListOne from '../../components/reportListOne'
import './index.scss';
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
import { appId } from '../../actions/config'
const FormItem = Form.Item;
const prompt = Modal.prompt;
const alert = Modal.alert;
/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [{}, {}, {}], 
      page: 1,
      limit: 20,
      total: 20,
      data: [],
      height:document.documentElement.clientHeight,
      orderid:"",
      codeSuccess:'',
      id:''
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
      this.setState({
        animating: false,
        total: nextprops.orderList.total,
        data: newArr
      })
    }
    if (this.props.getOrderUrlState != nextprops.getOrderUrlState && nextprops.getOrderUrlState == 'succ') {
      if (nextprops.orderUrl.urls.length > 0) {
        window.location.href = nextprops.orderUrl.urls[0].url
      } else {
        Toast.fail('未发现报告文件', 2)
      }

    }
    if (this.props.getOrderUrlState != nextprops.getOrderUrlState && nextprops.getOrderUrlState == 'failed') {
      Toast.fail(nextprops.msg, 2)
    }
    if (this.props.sendEmail != nextprops.sendEmail && nextprops.sendEmail == 'failed') {
      this.setState({
        animating: false
      })
      Toast.fail(nextprops.msg, 2)
    }
    if (this.props.sendEmail != nextprops.sendEmail && nextprops.sendEmail == 'succ') {
      this.setState({
        animating: false 
      })
      Toast.success('发送成功', 2)
    }

  }
  componentWillMount() {
    document.title = "查看报告"
    const { actions,match } = this.props
    const { limit } = this.state
    const { params: { orderid,types } } = match;
    this.setState({
      text: '获取订单列表',
      animating: true,
    })
    actions.geneorderList({
      page: 1,
      statu: '1,2,4',
      limit
    })
  }
  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    const { match, actions } = this.props;
    const { params: { orderid } } = match;
    
    this.setState({
        height:hei,
        orderid:orderid
    })
  }
  isEmail(val) {
    return
  }
  shareWx(id) {
    const { actions } = this.props
    prompt('发送邮件', '请输入邮箱', [
      {
        text: '取消',
        onPress: value => new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            console.log(`value:${value}`);
          }, 100);
        }),
      },
      {
        text: '确定',
        onPress: value => new Promise((resolve, reject) => {
          if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
            Toast.fail('邮箱格式错误', 2)
          } else {
            this.setState({
              text: '正在发送邮件',
              animating: true
            })
            setTimeout(() => {
              resolve();
              console.log(`value:${value}`);
            }, 100);

            actions.sendTheReport({
              mailAddr: value,
              orderId: id
            })
          }
        }),
      },
    ])


  }
  getReport(id) {
    const { actions } = this.props
    actions.getReportUrl({
      id: id
    })
    // this.props.history.push('/showImg/pdf/'+id)
  }
  getMore = () => {
    const { actions } = this.props
    const { page, total, limit } = this.state
    if (total > page * limit) {
      let newPage = page + 1
      actions.geneorderList({
        page: newPage,
        statu: 1,
        limit
      })
      this.setState({
        page: newPage
      })
    }
  }
  callphone(){    
    window.location.href = `tel:${this.orderList.testingCompanyPhone}`;
}
nextPage(item){
  const { data,height } = this.state
  console.log('id',item)
  this.props.history.push('/logisticsreport/'+item)
  // if(index==2){
  //     this.props.history.push('/logisticsreport/'+this.state.data.id)
  // }
//   if(index==2){
//     this.props.history.push(`/logisticsreport/${this.item.id}`)
// }
//   if(index==4){
//       this.props.history.push(`/bill/${this.item.id}`)
//   }
//   if(index==5){
//       this.props.history.push(`/report/${this.item.id}`)
//   }
}
  render() {
    const orderList = (this.props.orderListState == 'succ' && this.props.orderList.list) || []
    const { data,height } = this.state
    const order = this.props.orderDetail

    return (
      <div className="reportList_row">
        <PullToRefresh
          damping={100}
          // distanceToRefresh={window.devicePixelRatio * 25}
          ref={el => this.ptr = el}
          style={{
            // height: 'calc(100vh - 12vw)',
            height: height,
            fontSize: '.35rem',
            overflow: 'auto',
          }}
          indicator={'加载更多'}
          direction={'up'}
          refreshing={this.state.refreshing}
          onRefresh={this.getMore.bind(this)}
        >
          {
            data.map((item) => {
              return <ReportListOne name={item.title} company={item.geneCompany} time={item.createrTime} code={item.number}
              isUploadReport={
                (() => {
                  switch (item.isUploadReport) {
                    case '0':
                      return '未出报告'
                    case '1':
                      return '检测报告已出'
                    case '2':
                      return '检测报告已寄出'
                    default:
                      return null
                  }
                }
                )()
              }
              id={item.id}
              >
                <div className="displays reportList_bnt">
                  <div className="flex1"></div>
                  <div onClick={()=>{
                              alert('提示', item.testingCompanyPhone, [
                                { text: '确定', onPress: () => {console.log('ok');(()=>{
                                     
                                    window.location.href = `tel:${item.testingCompanyPhone}`;
                                
                                })() }},
                              ])
                            }}  className="gray_bnt reportList_bnt_one marginRight">
                    <Icon type="phone" />热线咨询
                    </div>
                  {item.isUploadReport == '1' ? <div onClick={this.shareWx.bind(this, item.id)} className="promise_bnt reportList_bnt_one marginRight">
                    <Icon type="share-alt" />发送邮件
                    </div> : <div className="gray_bnt reportList_bnt_one marginRight">
                      <Icon type="share-alt" />发送邮件
                    </div>
                  }
                  {
                    item.isUploadReport == '1' ? <div onClick={this.getReport.bind(this, item.id)} className="reportList_bnt_one promise_bnt">
                      <Icon type="cloud-download" />已出报告
                        </div> : <div className="reportList_bnt_one gray_bnt">
                        <Icon type="cloud-download" />未出报告
                                </div>
                  }
                  {

                  }

                </div>
                {/*<div className="checkwuliu">*/}
                {/*<OrderListBnt onClick={this.nextPage.bind(this,item.id)} icon="3" text="纸质报告及发票物流信息" msg="请点击后查看信息" bntText="查询信息" />*/}
                {/*</div>*/}
                
                <div className="color_9b9b9b" style={{marginTop:'0.3rem'}}>安卓手机点击报告后将会跳转至浏览器，请下载后查看</div> 
              </ReportListOne>
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
    getOrderUrlState: state.user.getOrderUrlState,
    orderUrl: state.user.orderUrl,
    sendEmail: state.user.sendEmail,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
