import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { Toast } from 'antd-mobile';
import TextContent from '../../components/TextContent'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
         
        }
    }
    componentWillReceiveProps(nextprops) {
        if(this.props.recommenListState!=nextprops.recommenListState&&nextprops.recommenListState=='failed'){
            Toast.fail(nextprops.msg,1)
        }
    }
    componentWillMount(){
        const { match,actions} = this.props;
        const { params: { docId } } = match;
        actions.recommenListByPatient({
            doctorId:docId
        })
    }
    componentDidMount(){
       
    }
    goDetail(id){
        this.props.history.push(`/newsdetail/${id}`)
    }
    shareParent(id){
        this.props.history.push(`/shareParent/${id}`)
    }
  render() {
    const {recommenList} = this.props
    return (
        <div className="science_row" style={{padding:"20px 0",background:'#fff'}}>
            <div className="content" >
                {
                    recommenList.map((item,index)=>{
                        return <TextContent 
                                    onClick={this.goDetail.bind(this,item.id)}
                                    key={index} 
                                    src={item.img[0]&&item.img[0].fileUrl||""} 
                                    contentName={item.title} 
                                    contentPresent={item.introduction} 
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
      recommenList:state.user.recommenList,
      recommenListState:state.user.recommenListState,
      msg:state.user.msg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
