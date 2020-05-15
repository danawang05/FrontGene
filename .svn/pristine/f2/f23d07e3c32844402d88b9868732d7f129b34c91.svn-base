import React, { Component } from 'react'
import { Icon} from 'antd';
import './index.scss'
export default class DocGoodList extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className="goodsList displays" style={{padding:this.props.padding?this.props.padding:'.4rem'}}>
            {
                this.props.disPlayImg?null:<div className="goodsList_img">
                    <img src={this.props.src}/>
                </div>
            }
            
            <div className="goodsList_content" style={{marginLeft:this.props.marginLeft?this.props.marginLeft:'.4rem'}} >
                <div className="goodsList_content_name displays">
                    <span>{this.props.name}</span>
                    {/* 标签 */}

                    <p className="start_Icon">
                         <span>{this.props.select? <Icon type="star" theme="filled"/>:<Icon style={{color:'#bbb'}} type="star"  />}</span>
                    </p>
                </div>
                <div className="no_code">套餐代码：{this.props.no_code}</div>
                <div className="goodsList_keyword displays">
                    {
                        this.props.keyWord&&this.props.keyWord.map((item,index)=>{
                            return <div key={index}  className={index>0?"marginLeft2 goodsList_keyword_one_doctor":"goodsList_keyword_one_doctor"}>{item}</div>
                        })
                    }
                </div>
                <div className="money_content_doctor">
                    <span className="money_content_icon">¥</span>
                    <span>{this.props.money}</span>
                </div>
            </div>
        </div>
        )
    }
}
