import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class index extends Component {

    render() {
        const color = sessionStorage.getItem("gene_user_type")=='0'?"#0067f4":"#ffcb5c"
        return (
            <div style={{
                background:this.props.bgColor||color
            }} className="marginTop10 login_bnt" onClick={this.props.onClick}>
                 {this.props.name}
           </div>
        )
    }
}
