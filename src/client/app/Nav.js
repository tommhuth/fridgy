import React, { Component } from "react"
import { Link } from "react-router"
import classNames from "classnames"
import Icon, { IconType } from "./../shared/Icon"

export default class Nav extends Component {
    render() {
        let visible = this.props.menu.visible
        let navClass = classNames("nav", {
            "nav--open": visible
        })
        let menuClass = classNames("nav__menu", {
            "nav__menu--open": visible
        })

        return (
            <nav className={navClass}>
                <div className="nav__toggler">
                    <div className="container">
                        <button type="button" onClick={this.props.toggleVisibility}>
                            <span className="visually-hidden">Toggle menu</span>
                            <Icon type={visible ? IconType.X : IconType.Hamburger} />
                        </button>
                    </div>
                </div>

                <div className={menuClass}>
                    <div className="container">
                        <ul className="menu" onClick={this.props.toggleVisibility}>
                            <li className="menu__link">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="menu__link">
                                <Link to="/items">The fridge</Link>
                            </li>
                            <li className="menu__link">
                                <Link to="/checklist">Checklist</Link>
                            </li>
                            <li className="menu__link">
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                </div> 
            </nav>
        )
    }
}