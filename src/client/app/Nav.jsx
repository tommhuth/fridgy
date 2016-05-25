/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react"; 
import { Link } from "react-router";
import classNames from "classnames";
    
class Nav extends Component {
    render() {
        let navClass = classNames("nav", {
            "is-open": this.props.menuVisibility
        });

        return (
            <nav className={navClass}>
                <div className="container">
                    <button className="nav-toggle-button" type="button" onClick={this.props.toggleVisibility}>Toggle nav</button>
                </div>

                <div className="nav-wrapper">
                    <div className="container"> 
                        <ul onClick={this.props.toggleVisibility}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/items">Items</Link></li>
                            <li><Link to="/stock-up">Stock up</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}



export default Nav;