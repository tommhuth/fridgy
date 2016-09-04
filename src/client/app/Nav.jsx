import React, { Component } from "react"
import { Link } from "react-router"
import classNames from "classnames"
import Icon from "./../shared/Icon"
    
class Nav extends Component {
    render() {
        let navClass = classNames("nav", {
            "is-open": this.props.menuVisibility
        })

        return (
            <nav className={navClass}>
                <a className="skip-to-content" href="#main">Skip to content</a>
                <div className="container">
                    <button className="nav-toggle-button" type="button"
                            onClick={this.props.toggleVisibility}>
                        <span className="visually-hidden">Toggle menu</span>
                        <Icon title={this.props.menuVisibility ? "x" : "menu"} />
                    </button>
                </div>

                <div className="nav-wrapper">
                    <div className="container"> 
                        <ul onClick={this.props.toggleVisibility}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/items">The fridge</Link></li>
                            <li><Link to="/checklist">Checklist</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav