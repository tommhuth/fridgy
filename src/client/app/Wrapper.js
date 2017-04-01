import React, { Component } from "react"
import Nav from "./Nav"
import { toggleMenu } from "../data/store/actions/menu"
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
                <Nav toggleVisibility={this.props.toggleVisibility} isVisible={this.props.isVisible} />
                {this.props.isVisible ? null : main}
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            isVisible: state.menu.visible
        }
    },
    (dispatch) => {
        return {
            toggleVisibility: () => dispatch(toggleMenu())
        }
    }
)(Wrapper)