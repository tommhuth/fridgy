import React, { Component } from "react"
import Nav from "./Nav" 

export default class AppPlain extends Component {
    render() {
        return (
            <div className={"app"}>
                <Nav menu={this.props.menu} toggleVisibility={this.props.toggleVisibility} />
                <main id="main"
                    tabIndex="-1"
                    className="main">
                    {this.props.children}
                </main>
            </div>
        )
    }
}  
