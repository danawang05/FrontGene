import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Carousel} from 'antd-mobile';
import './index.scss'
export class Reminder extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div className="Reminder_bg_row">
                <div className="Reminder displays">
                    <div className="Reminder_img"><img src={this.props.src}/></div>
                    
                    <Carousel className="my-carousel"
                        vertical
                        dots={false}
                        dragging={false}
                        swiping={false}
                        autoplay
                        infinite
                    >
                      
                        {
                            this.props.msg.map((item,index)=>{
                                return <div key={index} className="Reminder_msg">{item}</div>
                            })
                        }
                        {/* <div className="Reminder_msg">{this.props.msg}</div>   */}
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default Reminder
