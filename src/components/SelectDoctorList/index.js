import React, { Component } from 'react'
import { Icon } from 'antd'
import './index.scss'
export default class selectDoctorList extends Component {
    render() {
        return (
            <div className="SelectDoctorList_row displays" onClick={this.props.onClickCertain}>
                <div className="SelectDoctorList_row_img">
                    <img src={this.props.src} />
                </div>
                {
                    this.props.type=="my"?<div className="SelectDoctorList_row_content">
                    <div className="SelectDoctorList_row_content_on_my">{this.props.name}<span className="SelectDoctorList_row_content_on_time">绑定时间：{this.props.time}</span></div>
                    <div className="SelectDoctorList_row_content_down">{this.props.content}<span className="SelectDoctorList_row_content_on_time"><Icon type="right" /></span></div>
                </div>:<div className="SelectDoctorList_row_content">
                    <div className="SelectDoctorList_row_content_on">{this.props.name}</div>
                    <div className="SelectDoctorList_row_content_down">{this.props.content}</div>
                </div>
                }
                {/* {
                    this.props.select?<div className="show_click_bnt_row"><div onClick={this.props.onClickCertain} className="show_click_bnt">确定</div></div>:null
                } */}
            </div>
        )
    }
}
