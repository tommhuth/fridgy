/**
 * Created by tomm.huth on 11/04/16.
 */

import "react-fastclick";
import React from "react";
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import About from "./screens/About";
import Header from "./components/Header";

var App = React.createClass({
    render: function() {
        return(
            <div>
                <Header/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
});

render(
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>,
    document.getElementById("app-root")
);