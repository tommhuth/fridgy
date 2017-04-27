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
        let checked = this.props.value === this.props.selected

        return (
            <label className="toggle-input">
                <input type="radio"
                    onChange={this.props.onChange}
                    name={this.props.id}
                    checked={checked}
                    value={this.props.value} />
                <Icon type={checked ? IconType.RadiobuttonChecked : IconType.RadiobuttonDefault} />
                {this.props.children}
            </label>
        )
    }
} 