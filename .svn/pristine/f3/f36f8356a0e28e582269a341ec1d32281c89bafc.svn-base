import React, { Component } from 'react'
import './index.scss'
import boy from '../../sources/boy.png'
import girl from '../../sources/girl.png'
export default class index extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className="myPetient_list displays">
                <div className="petient_sex">
                    {
                        this.props.sex=='1'?<img src={boy}/>:<img src={girl}/>
                    }
                </div>
                <div className="petient_name">
                    {this.props.name}
                </div>
                <div className="petient_content">
                    {this.props.old}岁
                </div>
                <div className="petient_malady">
                    {this.props.malady}
                </div>
            </div>
        )
    }
}
