import React, { Component } from 'react'
import { Icon} from 'antd';
import { Badge } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import './index.scss'
export default class index extends Component {
    render() {
        return (
            <div className="personList_row displays">
                <div className="personList_name">
                    <div >
                        {this.props.name}
                    </div>
                    <p>{this.props.sex}{"  "}{this.props.old}岁</p>
                </div>
                <div className="personList_line">|</div>
                <div className="personList_billName">
                    {this.props.reportName}
                </div>
                <Badge text={this.props.badge?this.props.badge:0} > 
                <div className="personList_bnt" onClick={this.props.onClick}>
                    <Icon type="message" /> {" "} 回复
                </div>
                </Badge>
            </div>
        )
    }
}
