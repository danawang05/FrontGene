import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form ,Icon} from 'antd';
import { Picker } from 'antd-mobile';
export default class index extends Component {


    render() {
        const CustomChildren = props => (
              <div  onClick={props.onClick} className={props.className?'search_condition_one '+props.className:'search_condition_one'}>
                    <div>{props.extra} <span className="floatRight"><Icon type="down" /></span></div>
                   
              </div>
        );
        return (
            <Picker
                    data={this.props.data}
                    title={this.props.title}
                    cascade={this.props.cascade}
                    extra={this.props.extra}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onOk={this.props.onOk}
                >
                    <CustomChildren className={this.props.className}/>
            </Picker>
        )
    }
}
