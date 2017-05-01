import React, { Component } from "react" 
import { withRouter } from "react-router"
import ScrollWatcher from "../data/ScrollWatcher"

export class Link extends Component {
    onClick(e) { 
        e.preventDefault()

        if (!ScrollWatcher.isScrolling) {

            this.props.router.push({ pathname: this.props.to })
        }
    }
    render() { 
        return (
            <a href={this.props.to} {...this.props} onClick={this.onClick.bind(this)}> 
                {this.props.children} 
            </a>
        )
    }
} 

export default withRouter(Link)
