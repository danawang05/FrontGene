import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
export default class index extends Component {

    render() {
        // const type_bnt_row_select =sessionStorage.getItem("gene_user_type")=="0"?"type_bnt_row_select_doctor":"type_bnt_row_select"
        return (
            <div onClick={this.props.onClick} className={'type_bnt_row_selecttt'}>
                {this.props.name}
            </div>

        )
    }
}
