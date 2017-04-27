import React, { Component } from "react"
import Icon, { IconType } from "./Icon"

export default class CheckBox extends Component { 
    render() {
        let { selected, id, value, onChange, children } = this.props
        let checked

        if (Array.isArray(selected)) {
            checked = selected.find(e => e === this.props.value)
        } else {
            checked = selected
        }

        return (
            <label className="toggle-input">
                <input type="checkbox"
                    onChange={onChange}
                    name={id}
                    checked={!!checked}
                    value={value} />
                <Icon type={checked ? IconType.CheckboxChecked : IconType.CheckboxDefault} />
                {children}
            </label>
        )
    }
} 