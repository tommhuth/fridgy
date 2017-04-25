import React, { Component } from "react"
import Nav from "./Nav"
import { toggleMenu } from "../data/store/actions/app"
import { connect } from "react-redux"

export class Wrapper extends Component {
    render() {
        let main = <main
            id="main"
            tabIndex="-1"
            className="main">
            {this.props.children}
        </main>

        return (
            <div className={"app"}>
                <Nav toggleVisibility={this.props.toggleVisibility} isVisible={this.props.menuVisible} />
                
                {this.props.menuVisible ? null : main}
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            menuVisible: state.app.menuVisible
        }
    },
    (dispatch) => {
        return {
            toggleVisibility: () => dispatch(toggleMenu())
        }
    }
)(Wrapper)