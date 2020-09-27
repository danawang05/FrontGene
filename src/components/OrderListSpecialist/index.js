import React, { Component } from 'react'
import { Icon} from 'antd';
import './index.scss'
//0 已下单 1已支付 2检测完成 3订单已关闭 4检测中

export default class OrderList extends Component {
    
    render() {
        
        return (
            
            <div className="orderlist_one displays" onClick={this.props.onClick}>
                <div className="flex1">
                    <div className="orderlist_one_name">
                        <Icon className="color_00e37a" type="safety-certificate" />{this.props.name}
                        
                    </div>
                    {/*<div className="orderlist_one_name_span">*/}
                            {/*<Icon className="color_00e37a" type="safety-certificate" />付费时间：*/}
                            {/*<span>{this.props.createrTime}</span>*/}
                    {/*</div>*/}
                    <div className="orderlist_one_msg displays">
                        <div className="orderlist_one_msg_text flex1">
                                <div className="orderlist_one_msg_text_one">
                                    <div>医院：{this.props.hospital}</div>
                                    <div>科室：{this.props.department}</div>
                                    <div>预约订单编号：{this.props.id}</div>
                                    <div>支付状态：<span style={{'color':'#333','font-weight':'900'}}>{this.props.payStatus}</span></div>
                                </div>
                        </div>
                        <div className="orderlist_one_msg_money">
                            ¥{this.props.money}
                        </div>
                    </div>
                    {/*<div className="orderlist_tips_alert">为保证电子申请单信息可以和样本进行绑定，请点击“去扫码”扫描样本袋内条形码，并将条形码黏贴在采血管或玻璃片盒</div>*/}
                    {/*<div className="orderlist_tips_alert">请点击此处 并点击“去扫码”扫描样本袋内条形码，使电子申请单信息可以和样本进行绑定，并将条形码黏贴在采血管或玻璃片盒</div>*/}
                </div>
                <div className="orderlist_go">
                  <Icon type="right" />
                </div>
                
            </div>
        )
    }
}
