import React, { Component } from 'react'
import { Form ,Popover,Button} from 'antd';
import './index.scss'
import ceshi from '../../sources/ceshi.jpeg'
export default class index extends Component {
    constructor(props){
        super(props)
        this.state = {
       }
       this.showDome = this.showDome.bind(this)
    }
    componentDidMount(){
        // let content = this.props.content
        // document.getElementById(`content${this.props.index}`).innerHTML = content
        
    }
    i
    showDome(){
        let index = this.props.index
        let content = this.props.content
      
        setTimeout(function (){
            if(document.getElementById(`content${index}`)){
                document.getElementById(`content${index}`).innerHTML = content
            }
        },200)
    }
    render() {
        const content = (<div className="chat_one">
            123wqoiejqoe撒大好大 u 大海大海说的话噻大会死
            <img src={ceshi}/>
        </div>)
        return (
            <div  onLoad={this.props.onLoad}>
                {
                    this.props.type=="me"?<div onClick={()=>{}} className="chat_row displays">
                        <div className="flex1"></div>
                       
                        <div className="chat_row_message_me floatRight">
                            <div className="chat_row_message_me_inner"></div>
                            <div className="chat_row_message_text" id={"content"+this.props.index}>
                               {this.showDome()}
                            </div>
                        </div>
                        <div className="chat_row_head floatRight">
                             <img src={this.props.src} />
                        </div>
                    </div>: <div className="chat_row displays">
                        <div className="chat_row_head">
                             <img src={this.props.src} />
                        </div>
                        <div className="chat_row_message">
                            <div className="chat_row_message_inner"></div>
                            <div className="chat_row_message_text"  id={"content"+this.props.index}>
                            {this.showDome()}
                            </div>
                        </div>
                    </div>
                    
                }
               
            </div>
        )
    }
}
