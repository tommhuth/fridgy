import React, { Component } from "react"
import { Link } from "react-router"
import classNames from "classnames"
import Icon from "./../shared/Icon"

export default class Nav extends Component {
    render() {
        let visible = this.props.menu.visible
        let navClass = classNames("nav", {
            "is-open": visible
        })

        return (
            <nav className={navClass}>
                <a className="skip-to-content" href="#main">Skip to content</a>
                <div className="container">
                    <button className="nav-toggle-button" type="button" onClick={this.props.toggleVisibility}>
                        <span className="visually-hidden">Toggle menu</span>
                        <Icon title={visible ? "x" : "menu"} />
                    </button>
                </div>

                <div className="nav-wrapper">
                    <div className="container">
                        <ul onClick={this.props.toggleVisibility}>
                            <li><Link to="/">Home <Icon title="arrow-right" /></Link></li>
                            <li><Link to="/items">The fridge <Icon title="arrow-right" /></Link></li>
                            <li><Link to="/checklist">Checklist <Icon title="arrow-right" /></Link></li>
                            <li><Link to="/about">About <Icon title="arrow-right" /></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}