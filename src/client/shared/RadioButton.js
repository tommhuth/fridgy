import React, { Component } from "react"
import Icon, { IconType } from "./Icon"

export default class RadioButton extends Component {
    render() {
        let checked = this.props.value === this.props.selected

        return (
            <label className="toggle-input">
                <input type="radio"
                    onChange={this.props.onChange}
                    name={this.props.id}
                    defaultChecked={checked}
                    defaultValue={this.props.value} />
                <Icon type={checked ? IconType.RadiobuttonChecked : IconType.RadiobuttonDefault} />
                {this.props.children}
            </label>
        )
    }
} 