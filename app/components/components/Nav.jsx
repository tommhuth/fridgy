/**
 * Created by tomm.huth on 11/04/16.
 */

import React from "react";
import cssClasses from "classnames";
import { Link } from 'react-router'

export default React.createClass({
    getInitialState: function() {
        return { active:false }
    },
    closeMenu: function(){
        this.setState({ active: false })
    },
    toggleActive: function(){
        this.setState({ active: !this.state.active })
    },
    render: function() {
        let navClass = cssClasses( { "nav": true, "is-active": this.state.active });

        return(
            <nav className={navClass}>
                <div className="container">
                    <button type="button" onClick={this.toggleActive} className="nav-toggle-button">
                        {this.state.active ? 'Hide' : 'Show'} menu
                    </button>
                </div>
                <div className="nav-wrapper">
                    <div className="container">
                        <ul onClick={this.closeMenu}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/items">The Fridge</Link></li>
                            <li><Link to="/checklist">Checklist</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});
