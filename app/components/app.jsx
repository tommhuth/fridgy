/**
 * Created by tomm.huth on 11/04/16.
 */ 

import "react-fastclick";
import React from "react";
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import cssClasses from "classnames";

var Nav = React.createClass({
    getInitialState: function() {  return { active:false }},
    closeMenu: function(){ this.setState({ active: false })},
    toggleActive: function(){ this.setState({ active: !this.state.active })},
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

                        <ul>
                            <li><Link onClick={this.closeMenu} to="/">Home</Link></li>
                            <li><Link onClick={this.closeMenu} to="/about">The Fridge</Link></li>
                            <li><Link onClick={this.closeMenu} to="/users">Checklist</Link></li>
                            <li><Link onClick={this.closeMenu} to="/users">About</Link></li>
                        </ul>
                    </div>
                </div>
                
            </nav>
        );
    }
});
var Header = React.createClass({
    render: function() {
        return(
            <header>
                <Nav/>

                <hr/>

            </header>
        );
    }
});
var App = React.createClass({
    render: function() {
        return(
            <Header/>
        );
    }
});


render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>  </Route>
    </Router>
    , document.getElementById("main"));