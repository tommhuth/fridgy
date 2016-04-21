/**
 * Created by tomm.huth on 11/04/16.
 */

import React from "react"; 
import Nav  from "./Nav";
 
export default React.createClass({
    render: function() {
        return(
            <header>
                <a href="#main" className="skip-to-content container">Skip to content</a>
                <Nav/>
            </header>
        );
    }
});
 