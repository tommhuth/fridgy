/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react"; 
import { Link } from "react-router";
import classNames from "classnames";
    
class Select extends Component {
    render() {
        let navClass = classNames("select", { });

        return (
            <div className={navClass}>
                <select>
                    {
                        this.props.items.map(e => <option>{e.name} ({e.popularity})</option>)
                    }
                </select>
            </div>
        )
    }
}



export default Select;