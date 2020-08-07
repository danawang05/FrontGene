import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import './index.scss'
export default class index extends Component {


    render() {
        return (
            <div className="typeContent displays">
                <div className="text_content_img"  onClick={this.props.onClick}>
                    <img src={this.props.src}/>
                </div>
                <div className="text_content_text"  onClick={this.props.onClick}>
                    <div className="text_content_title">{this.props.contentName}</div>
                    <div className="text_content_msg"><span>发布日期：{this.props.contentPresent}</span><span style={{display:'inline-block',marginLeft:'0.5rem'}}>浏览人次：{this.props.contentNum}</span></div>
                </div>
                {
                    sessionStorage.getItem('gene_user_type')=='0'?<div onClick={this.props.shareBnt} className="text_content_share_bnt">
                    <Icon type="share-alt" />
                </div>:null
                }
                
            </div>
        )
    }
}
