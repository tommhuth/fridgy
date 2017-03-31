import React, { Component } from "react"
import { connect } from "react-redux"
import Nav from "./Nav"
import classNames from "classnames"
import { toggleMenu } from "../data/store/actions/menu"

class App extends Component {
    render() {
        let appClass = classNames("app", {
            "is-special": this.props.routes[this.props.routes.length - 1].isSpecial 
        })

        return (
            <div className={appClass}>
                <Nav menu={this.props.menu}
                    toggleVisibility={this.props.toggleVisibility} />

                <main id="main"
                    tabIndex="-1"
                    className={"main " + (this.props.menu.visible ? "hidden" : "")}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            menu: state.menu
        }
    },
    (dispatch) => {
        return {
            toggleVisibility: () => dispatch(toggleMenu())
        }
    }
)(App)
