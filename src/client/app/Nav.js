import React, {Component}  from "react"
import { Link } from "react-router" 
import BodyClassName from "react-body-classname"
import Icon, { IconType } from "./../shared/Icon"

const KeyCode = {
    Escape: 27
} 

export default class  Nav extends Component { 
    handleEsc = (e) => {
        if(e.keyCode === KeyCode.Escape && this.props.isVisible) {
            this.props.toggleVisibility()
        }
    }
    componentWillMount(){
        document.addEventListener("keydown", this.handleEsc)
    } 
    render() { 
        let { isVisible, toggleVisibility } = this.props 

        return (
            <nav className="nav">
                <a className="visually-hidden" href="#main">Skip to content</a>
                {
                    !isVisible && 
                    <div className="nav__toggler">
                        <div className="container">
                            <button className="nav__toggler-button" onClick={toggleVisibility}>
                                <Icon type={IconType.Hamburger} />
                                <span className="visually-hidden">Open menu</span>
                            </button> 
                        </div>
                    </div>
                }
                {
                    isVisible &&
                    <BodyClassName className="fill fill--green">
                        <div className="nav__menu" > 
                            <ul className="nav__menu-primary" onClick={toggleVisibility}>
                                <li className="nav__menu-primary-item">
                                    <Link to="/" className="nav__link">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav__menu-primary-item">
                                    <Link to="/items" className="nav__link">
                                        The fridge
                                    </Link>
                                </li>
                                <li className="nav__menu-primary-item">
                                    <Link to="/checklist" className="nav__link">
                                        Checklist
                                    </Link>
                                </li>
                                <li className="nav__menu-primary-item">
                                    <Link to="/about" className="nav__link">
                                        About
                                    </Link>
                                </li>
                            </ul>

                            <div className="nav__menu-secondary">
                                <button className="nav__menu-secondary-item" onClick={toggleVisibility}> 
                                    <Icon type={IconType.X} />
                                    <span className="nav__menu-secondary-item__text">Close</span>
                                </button> 
                            </div>
                        </div> 
                    </BodyClassName>
                }
            </nav>
        ) 
    }
}
