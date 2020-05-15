import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import { Badge } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
export default class index extends Component {

    render() {
        return (
            <div onClick={this.props.onClick} className={this.props.leftBorder?'rightBorder homeBnt_row':'homeBnt_row'}>
                
                        
                {/* */}
                <Badge className="homeBnt_img" text={this.props.badge?'new':0} > <img src={this.props.src}/></Badge> 
                <div className="homeBnt_bnt">{this.props.name} </div>
            </div>
        )
    }
}
