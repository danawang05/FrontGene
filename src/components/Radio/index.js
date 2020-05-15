import React, { Component } from 'react'
import './index.scss'
export default class Radio extends Component {
    render() {
        const {onClick,check,text} = this.props
        return (
               <div onClick ={onClick} className="gene_radio_row displays">
                   <div className="_radio">
                        <div className="gene_radio ">
                            {
                               check?<div  className="gene_radio_inner"></div>:null
                            }
                            
                        </div>
                   </div>
                   
                    <div className="gene_radio_text">
                        {text}
                    </div>
               </div>
        )
    }
}
