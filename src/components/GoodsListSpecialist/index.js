import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import {Badge} from 'antd-mobile'
import pat10 from '../../sources/specialist.jpg'
/**
 * type: 标签样式  1，优惠 2，皇冠
 */
export default class index extends Component {


    render() {
        return (

            <div onClick={this.props.onClick} className="goodsList displays" style={{padding:this.props.padding?this.props.padding:'.4rem'}}>
                {
                    this.props.disPlayImg?null:<Badge text={this.props.isDoctor == '1'?"☆":''} corner><div className="goodsListspecialist_img">
                       <img src={this.props.src}/>
                        {/*<img src={pat10}/>*/}
                    </div>
                    </Badge>
                }
                
                <div className="goodsList_content" style={{marginLeft:this.props.marginLeft?this.props.marginLeft:'.4rem'}} >
                    <div className="goodsListspecialist_content_name displays">
                        <span style={{wordBreak: 'break-word'}}>{this.props.name}</span>
                        <span style={{wordBreak: 'break-word',marginLeft:'0.4rem',fontSize:'0.36rem'}}>职称：{this.props.title}</span>
                        {/* 标签 */}
                        {
                            this.props.type=="1"?(this.props.redTab?<div className="youhui">{this.props.redTab}</div>:null):null
                        }
                        
                    </div>
                    <div className="goodsList_content_hospital displays">
                        <span style={{wordBreak: 'break-word'}}>医院：{this.props.hospital}</span>
                    </div>
                    <div className="goodsList_content_field displays">
                        <span style={{wordBreak: 'break-word'}}>科室：{this.props.department}</span>
                        <span className="moneyspecialist_content">
                            <span className="money_content_icon">¥</span>
                            <span>{this.props.money}</span>
                        </span>
                    </div>
                    <div style={{textAlign: 'right'}}>
                    
                    {/*<span className="no_code">套餐代码：{this.props.no_code}</span>*/}
                    {/*<span className="money_content">*/}
                            {/*<span className="money_content_icon">¥</span>*/}
                            {/*<span>{this.props.money}</span>*/}
                    {/*</span>*/}
                    </div>
                    <div className="goodsList_keyword displays">
                        {
                            this.props.keyWord&&this.props.keyWord.map((item,index)=>{
                                return <div key={index}  className={index>0?"marginLeft2 goodsList_keyword_one":"goodsList_keyword_one"}>{item}</div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
