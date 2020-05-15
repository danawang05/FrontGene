import React, { Component } from 'react'
import './index.scss'
export default class index extends Component {
    render() {
        return (
            <div className="integralList_row">
                <div className="integralList_content">
                    <div className="one">{this.props.text}</div>
                    <div className="two">{this.props.time}</div>
                </div>
                <div className="integralList_number">{this.props.number}</div>
            </div>
        )
    }
}
