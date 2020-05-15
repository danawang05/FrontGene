import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import Beforemain from './../containers/Beforemain';
import Agreement from './../containers/Agreement';
import AgreementTwo from './../containers/AgreementTwo';
import test from './../containers/test';
import Login from './../containers/Login';
import Home from './../containers/Home';
import Main from './../containers/Main';
import Detail from './../containers/Detail'
import PatientReg from './../containers/PatientReg'
import showImg from './../containers/showImg'
import OrderConfirm from './../containers/OrderConfirm'
import OrderFinishPay from './../containers/OrderFinishPay'
import Report from './../containers/Report'
import Bill from './../containers/Bill'
import OrderList from './../containers/OrderList'
import ReportList from './../containers/ReportList'
import OneClickOrder from './../containers/OneClickOrder'
import Consultation from './../containers/Consultation'
import myDoctor from './../containers/myDoctor'
import chat from './../containers/Chat'
import FollowUp from './../containers/FollowUp'
import myQrcode from './../containers/myQrcode'
import doctorReg from './../containers/DoctorReg'
import reportChat from './../containers/ReportChat'
import myPatient from './../containers/MyPatient'
import integral from './../containers/Integral'
import DetailNews from './../containers/DetailNews'
import ShareParent from './../containers/ShareParent'
import DocShareText from './../containers/DocShareText'
import Logistics from './../containers/Logistics'
import LogisticsReport from './../containers/LogisticsReport'
import patientDetail from './../containers/patientDetail'
import NoMatch from './../components/NoMatch';
import DocFollowUp from '../containers/DocFollowUp';

const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/beforemain" exact component={Beforemain}/>
        <Route path="/" exact component={Main}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/login/:userId" exact component={Login}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/main" exact component={Main}/>
        <Route path="/agreement" exact component={Agreement}/>
        <Route path="/agreementTwo" exact component={AgreementTwo}/>
        <Route path="/oneClickOrder" exact component={OneClickOrder}/>
        {/*<Route path="/patientReg" exact component={PatientReg}/>*/}
        <Route path="/patientReg/:userId" exact component={PatientReg}/>
        <Route path="/patientDetail" exact component={patientDetail}/>
        <Route path="/orderConfirm/:packageId" exact component={OrderConfirm}/>
        <Route path="/orderFinishPay/:orderid/:types" exact component={OrderFinishPay}/>
        <Route path="/orderFinishPay/:orderid" exact component={OrderFinishPay}/>
        <Route path="/detail/:packageId" exact component={Detail}/>
        <Route path="/newsdetail/:newsId" exact component={DetailNews}/>
        <Route path="/showImg" exact component={showImg}/>
        <Route path="/showImg/:imgtype/:imgid" exact component={showImg}/>
        <Route path="/bill/:orderId" exact component={Bill}/>
        <Route path="/report" exact component={Report}/>
        <Route path="/report/:orderid" exact component={Report}/>
        <Route path="/orderList" exact component={OrderList}/>
        <Route path="/reportList" exact component={ReportList}/>
        {/*<Route path="/consultation" exact component={Consultation}/>*/}
        {/*<Route path="/chat" exact component={chat}/>*/}
        {/*<Route path="/chat/:groupId" exact component={chat}/>*/}
        {/*<Route path="/myDoctor" exact component={myDoctor}/>*/}
        <Route path="/followUp" exact component={FollowUp}/>
        {/*<Route path="/DocFollowUp" exact component={DocFollowUp}/>*/}
        <Route path="/ShareParent/:textId"  exact component={ShareParent}/>
        <Route path="/myQrcode" exact component={myQrcode}/>
        <Route path="/doctorReg" exact component={doctorReg}/>
        <Route path="/reportChat" exact component={reportChat}/>
        <Route path="/myPatient" exact component={myPatient}/>
        <Route path="/integral" exact component={integral}/>
        {/* <Route path="/test" exact component={test}/> */}
        <Route path="/docShareText/:docId" exact component={DocShareText}/>
        <Route path="/logistics/:oId" exact component={Logistics}/>
        <Route path="/logisticsreport/:id" exact component={LogisticsReport}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
);

const Private = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('login_token') ? (
      <Redirect to={{
        pathname: '/beforemain',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props}/>
    )
  )}/>
)

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !localStorage.getItem('token') ? (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props}/>
    )
  )}/>
)

const PrivateRoute = withRouter(Private);


export default AppRouter;
