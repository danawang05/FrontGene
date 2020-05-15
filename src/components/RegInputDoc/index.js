import React, { Component } from 'react'
import { InputItem} from 'antd-mobile';
import { Icon } from 'antd';
import './index.scss'
export default class index extends Component {
    handleFocus =(event)=> {
        // clearTimeout(this.timer); 
        
        setTimeout(function() {
            document.body.scrollTop = 0;
            window.pageXOffset = 0;
            document.documentElement.scrollTop = 0;
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            console.log('tag', scrollHeight)
          }, 100);
    }
    handleblur =()=> {
        // this.timer = setTimeout(() => {
        // ref={el => this.autoFocusInst = el}
        // }, 100);
        
        setTimeout(function() {
            document.body.scrollTop = 0;
            window.pageXOffset = 0;
            document.documentElement.scrollTop = 0;
            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            console.log('tag', scrollHeight)
          }, 100);
    }

    render() {
        return (
            <div onClick={this.props.onDivClick}  className={this.props.className?this.props.className:""}>
                {
                    this.props.label?<div className="r_input_label">{this.props.label}</div>:null
                }
                <div className="r_input displays">
                    <div className="flex1">
                    {
                        this.props.selectBox?this.props.value:<InputItem
                        clear
                        onBlur={this.handleblur}
                        onFocus={this.handleFocus}
                        disabled = {this.props.disabled}
                        type = {this.props.type}
                        onChange={this.props.onChange}
                        value = {this.props.value}
                        placeholder= {this.props.placeholder}
                        onClick={this.props.onClick}
                        //ref={el => this.autoBlurInst = el}
                        //ref={el => this.inputRef = el}
                    />
                    }
                    
                    </div>
                    {
                        this.props.icon=='address'?<span className="color_9b9b9b " onClick={this.props.onClick}><Icon type="environment" /></span>:null
                    }
                    {
                        this.props.icon=='add'?<span className="color_9b9b9b " onClick={this.props.onClick}><Icon type="plus-circle" style={{'fontSize':'.6rem'}}/></span>:null
                    }
                    {
                        this.props.icon=='delete'?<span className="color_FF6666 " onClick={this.props.onClick}><Icon type="minus-circle" /></span>:null
                    }
                    {
                        this.props.icon == "add-text"?<span className="color_FF6666 " style={{
                            color:this.props.color
                        }} onClick={this.props.onClick}>{this.props.text}<Icon type="plus-circle" /></span>:null
                    }
                    {
                        this.props.icon == "text"?<span className="color_FF6666 " style={{
                            color:this.props.color
                        }} onClick={this.props.onClick}>{this.props.text}</span>:null
                    }
                </div>
                
            </div>
        )
    }
}
