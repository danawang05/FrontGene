import React, { Component } from 'react'
import PropTypes from 'prop-types'
import search from '../../sources/search.png'
import './index.scss'
export class SearchBar extends Component {
    

    render() {
        return (
            <div onClick = {this.props.onClick} className="search_bg_dom" style={{backgroundColor:this.props.backgroundColor||"#fbfbfb"}} >
                <div className="search_row">
                    <div className="search displays">
                        <div className="search_icon"><img src={search} /></div>
                        <div className="search_input"><input 
                            placeholder={this.props.placeholder}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            // ref={(input) => { this.inputRef = input; }}
                        /> </div>
                        <div className="r_search_bnt" onClick={this.props.searchBnt}>搜索</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar
