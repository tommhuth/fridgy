/**
 * Created by tomm.huth on 11/04/16.
 */

import React from "react";
import { Test } from "./Test";
import ReactDOM from "react-dom";

var HelloMessage = React.createClass({
    render: function() {
        return  <div>
                    <Test name={this.props.name}></Test>
                    <div><strong>Hello sexypants {this.props.name}  :) xx</strong></div>
                </div>;
    }
});

ReactDOM.render(<HelloMessage name="John" />, document.getElementById("main"));