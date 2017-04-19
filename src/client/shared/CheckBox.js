import React, { Component } from "react"
import Icon, { IconType } from "./Icon"

export default class CheckBox extends Component {
    render() {
        let selected = this.props.selected
        let checked

        if (Array.isArray(selected)) {
            checked = selected.find(e => e === this.props.value)
        } else {
            checked = selected
        }

        return (
            <label className="toggle-input">
                <input type="checkbox"
                    onChange={this.props.onChange}
                    name={this.props.id}
                    defaultChecked={!!checked}
                    defaultValue={this.props.value} />
                <Icon type={checked ? IconType.CheckboxChecked : IconType.CheckboxDefault} />
                {this.props.children}
            </label>
        )
    }
} 