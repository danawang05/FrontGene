import React, { Component } from 'react'
import './index.scss'
export default class index extends Component {
    render() {
        const {background,title,selected,selsectBackground,tintColor,onPress} = this.props
        return (
            <div className="home-bnt-item-row" onClick={onPress}>
                <div 
                    className="icon-home-bnt"
                    style={{
                            width: '22px',
                            height: '22px',
                            background: 'url('+(selected?selsectBackground:background)+') center center /  21px 21px no-repeat' }}
                    ></div>
                <p style={{color:selected?tintColor:'rgb(148, 148, 148)'}}>{title}</p>
            </div>
        )
    }
}
