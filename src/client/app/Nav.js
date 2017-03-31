import React, { Component } from "react"
import { Link } from "react-router"
import classNames from "classnames"
import Icon, { IconType } from "./../shared/Icon"

export default class Nav extends Component {
    render() {
        let visible = this.props.isVisible
        let navClass = classNames("nav", {
            "nav--open": visible
        })
        let menuClass = classNames("nav__menu", {
            "nav__menu--open": visible
        })
        let togglerClass = classNames("nav__toggler", {
            "nav__toggler--open": visible
        })

        return (
            <nav className={navClass}>
                <div className={togglerClass}>
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
                                <Link to="/">
                                    Home
                                    <Icon type={IconType.ChevronRight} />
                                </Link>
                            </li>
                            <li className="menu__link">
                                <Link to="/items">
                                    The fridge
                                    <Icon type={IconType.ChevronRight} />
                                </Link>
                            </li>
                            <li className="menu__link">
                                <Link to="/checklist">
                                    Checklist
                                    <Icon type={IconType.ChevronRight} />
                                </Link>
                            </li>
                            <li className="menu__link">
                                <Link to="/about">
                                    About
                                    <Icon type={IconType.ChevronRight} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
