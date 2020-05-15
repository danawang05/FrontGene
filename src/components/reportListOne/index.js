import React, { Component } from 'react'
import { Form,Icon } from 'antd'
import './index.scss'
export default class reportListOne extends Component {
    render() {
        return (
            <div className="reportListOne_row ">
                <div className="displays">
                    <div className="flex1" style={{padding: '0.2rem 0 0.3rem 0',}}>
                        <div>{this.props.name}</div>
                        <div>检测公司：{this.props.company}
                        {
                            this.props.type=="followup"?null: "  套餐代码："+this.props.code
                        }
                       </div>
                        <div className="color_9b9b9b">订单创建时间：{this.props.time}</div>
                        <div className="color_9b9b9b">检测报告状态：{this.props.isUploadReport}</div>
                        {/* <div className="color_9b9b9b">订单号：{this.props.id}</div> */}
                    </div>
                    {
                            this.props.type=="followup"?null: <div className="orderlist_go">
                            {/*<Icon type="right" />*/}
                            </div>
                    }
                   
                </div>
                <div>
                    {this.props.children}
                </div>
                
            </div>
        )
    }
}
