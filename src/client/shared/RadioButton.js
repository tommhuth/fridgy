import React, { Component } from "react"
import Icon from "./Icon"

export default class RadioButton extends Component {
    render() {
        let checked = this.props.value === this.props.selected

        return (
            <label>
                <input type="radio"
                    onChange={this.props.onChange}
                    name={this.props.id}
                    defaultChecked={checked}
                    defaultValue={this.props.value} />
                <Icon title={checked ? "radiobutton-checked" : "radiobutton-default"} />
                {this.props.children}
            </label>
        )
    }
} 