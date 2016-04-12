/**
 * Created by tomm.huth on 11/04/16.
 */

import React from "react";
import { Test } from "./Test";
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

var Home = React.createClass({
    render: function() {
        return  (
            <div>
                <h2>Home</h2>
                <div>Bla. </div>
            </div>
        );
    }
});
var About = React.createClass({
    render: function() {
        return  (
            <div>
                <h2>About</h2>
                <div>Bla lorem. </div>
            </div>
        );
    }
});
var Users = React.createClass({
    render: function() {
        return  (
            <div>
                <h2>Users</h2>
                <ul>
                    <li><Link to="/users/jason-aldean">Jason Aldean</Link></li>
                    <li><Link to="/users/jacob-bryant">Jacob Bryant</Link></li>
                    <li><Link to="/users/tim-mcgraw">Tim McGraw</Link></li>
                </ul>

                {this.props.children}
            </div>
        );
    }
});
var User = React.createClass({
    render: function() {
        return  (
            <div>
                <h3>{this.props.params.userId}</h3>
                <p>This is a user </p>
            </div>
        );
    }
});
var NotFound = React.createClass({
    render: function(){
        return (
            <h2>Ooops can't do that</h2>
        )
    }
});

var App = React.createClass({
    render: function() {
        return(
            <div>
                <h1>Appy pants</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/users">Users</Link></li>
                </ul>

                <hr/>

                {this.props.children}
            </div>
        );
    }
});


render(
    <Router history={browserHistory}>
        <Route  component={App}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/users" component={Users} >
                <Router path="/users/:userId" component={User} />
            </Route>

            <Route path="*" component={NotFound} />
        </Route>
    </Router>
    , document.getElementById("main"));