import React, { Component } from "react"
import { connect } from "react-redux"
import Nav from "./Nav"
import classNames from "classnames"

class App extends Component {
    render() {
        let appClass = classNames("app", {
            "is-special": this.props.routes[this.props.routes.length - 1].isSpecial
        })

        return (
            <div className={appClass}>
                <Nav menuVisibility={this.props.menuVisibility} 
                     toggleVisibility={this.props.toggleVisibility} />

                <main id="main"
                      tabIndex="-1"
                      className={"main " + (this.props.menuVisibility ? "hidden" : "")}>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        menuVisibility: state.menuVisibility
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleVisibility: () => dispatch({type:"TOGGLE_MENU"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
