import React, { Component } from "react";
import Icon from "./Icon";

class CheckBox extends Component {
    render() {
        let selected = this.props.selected; 
        let checked;

        if(Array.isArray(selected)){
            checked = selected.find(e => e === this.props.value)
        } else {
            checked = selected;
        }

        return ( 
            <label>
                <input type="checkbox"
                       onChange={this.props.onChange}
                       name={this.props.id}
                       defaultChecked={!!checked}
                       defaultValue={this.props.value} />
                <Icon title={checked ? "checkbox-checked" : "checkbox-default"} />
                {this.props.children}
            </label>
        )
    }
}

export default CheckBox;