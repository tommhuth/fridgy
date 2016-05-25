/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react"; 
import { Link } from "react-router";
import classNames from "classnames";
    
class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected || "Select something"
        }
    }

    handleSelectChange(e) {
        this.setState({ selected: e.target.value })

    }

    render() {
        let navClass = classNames("select", { });

        return (
            <div className={navClass}>
                <span>{this.state.selected   }</span>

                <select value={this.state.selected} onChange={this.handleSelectChange.bind(this)}>
                    {
                        this.props.items.map(e => <option value={e.name}>{e.name} ({e.popularity})</option>)
                    }
                </select>
            </div>
        )
    }
}



export default Select;