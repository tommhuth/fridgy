import React, { Component } from "react"
import Icon, { IconType } from "./Icon"
import PropTypes from "prop-types"

export default class RadioButton extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.any,
        selected: PropTypes.any
    }
    render() {
        let { onChange, id, value, children, selected } = this.props
        let checked = value === selected

        return (
            <label className="toggle-input">
                <input type="radio"
                    onChange={onChange}
                    name={id}
                    checked={checked}
                    value={value} />
                <Icon type={checked ? IconType.RadiobuttonChecked : IconType.RadiobuttonDefault} />
                {children}
            </label>
        )
    }
} 