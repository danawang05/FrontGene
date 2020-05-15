import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import {Badge} from 'antd-mobile'
import { pubhospital } from '../../actions/index';
/**
 * type: 标签样式  1，优惠 2，皇冠
 */
export default class index extends Component {


    render() {
        return (
            <div onClick={this.props.onClick} className="goodsList displays" style={{padding:this.props.padding?this.props.padding:'.4rem'}}>
                {
                    this.props.disPlayImg?null:<Badge text={this.props.isDoctor == '1'?"☆":''} corner><div className="goodsList_img">
                       <img src={this.props.src}/>
                    </div>
                    </Badge>
                }
                
                <div className="goodsList_content" style={{marginLeft:this.props.marginLeft?this.props.marginLeft:'.4rem'}} >
                    <div className="goodsList_content_name displays" style={{marginBottom:'0.3rem'}}>
                        <span style={{wordBreak: 'break-all'}}>套餐名称：{this.props.name}</span>
                        
                        {/* 标签 */}
                        {
                            this.props.type=="1"?(this.props.redTab?<div className="youhui">{this.props.redTab}</div>:null):null
                        }
                        
                    </div>
                    <div className="no_code" style={{marginBottom:'0.3rem'}}>套餐代码：{this.props.no_code}</div>
                    <p className="money_contentthree" style={{marginBottom:'0rem'}}>
                            <span className="money_content_icon">¥</span>
                            <span>{this.props.money}</span>
                    </p>
                    <div className="goodsList_content_name displays" style={{minHeight:'0rem',height:'0rem'}}>
                    {/*{
                    !this.props.bloodNum?<div style={{wordBreak: 'break-all'}}>样本类型:</div>:<div style={{wordBreak: 'break-all'}}>样本类型:</div>
                    }*/ }
                    
                        {/* 标签 */}
                        {
                            this.props.type=="1"?(this.props.redTab?<div className="youhui">{this.props.redTab}</div>:null):null
                        }
                        
                    </div>
                    {/* <div className="no_code">如需发票请至个人中心-开具发票</div> */}
                    {/*<div className="goodsList_keyword displays">
                        {
                            this.props.keyWord&&this.props.keyWord.map((item,index)=>{
                                return <div key={index}  className={index>0?"marginLeft2 goodsList_keyword_one":"goodsList_keyword_one"}>{item}</div>
                            })
                        }
                    </div>*/}
                </div>
            </div>
        )
    }
}
