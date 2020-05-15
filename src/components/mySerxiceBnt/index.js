import React, { Component } from 'react'

export default class index extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className="service_bnt">
                <div className="service_bnt_img" >{this.props.src?<img src={this.props.src}/>:null}</div>
                <div>{this.props.text}</div>
            </div>
        )
    }
}
