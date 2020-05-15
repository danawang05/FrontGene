import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class index extends Component {


    render() {
        return (
            <div  onClick={this.props.onClick} className={this.props.delRight?'marginLeft0':'marginLeft2'}>
                <div className="commodity_img"><img src={this.props.src}/></div>
                <div className="commodity_text">{this.props.name}</div>
                <div className="commodity_price">
                    活动价{" "}<span style={{color:'#fc6f74'}}>¥{this.props.newPrice}</span><span className="text_line">原价¥{this.props.oldPrice}</span>
                </div>
            </div>
        )
    }
}
