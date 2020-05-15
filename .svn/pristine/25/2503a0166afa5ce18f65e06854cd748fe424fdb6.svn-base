import React, { Component } from 'react'
import {Icon} from 'antd';
import './index.scss'
export default class index extends Component {
    /**
     * icon:图表类型；1：拍照，2：扫码，3:查询，4:开发票 ，5:纸质发票
     */
    render() {
        const { type , accept ,onChange} = this.props
        let iconImg = ""
        if(this.props.icon == "1"){
            iconImg = (
                <Icon type="camera" />
            );
        }
        if(this.props.icon == "2"){
            iconImg = (
                <Icon type="scan" />
            );
        }
        if(this.props.icon == "3"){
            iconImg = (
                <Icon type="security-scan" />
            );
        }
        if(this.props.icon == "4"){
            iconImg = (
                <Icon type="file-image" />
            );
        }
        if(this.props.icon == "5"){
            iconImg = (
                <Icon type="file-text" />
            );
        }
        
        return (
            <div  className="OrderFinishPay_row_title displays">
                <div className="left_orderList">
                        <div className="left_orderList_text">
                                {this.props.text}
                        </div>
                        <div className="left_orderList_msg">
                                {this.props.msg}
                        </div>
                </div>
                {
                    this.props.isNotShow?<div className="right_bnt">
                            <div className="text_use"> {this.props.showText}</div>
                    </div>:<div onClick={this.props.onClick} className="right_bnt">
                    <div className="right_button">
                                    <span className="right_button_icon">{iconImg}</span>{this.props.bntText}
                                    {
                                        type === 'file' ?<input onChange={onChange}  type={type} name="cover" accept={accept}  multiple />:null
                                    }
                            </div>
                    </div>
                }
            </div>
        )
    }
}
