import React, { Component } from "react"
import uuid from "node-uuid" 

export default class SelectionGroup extends Component { 
    id = "selection-group-" + uuid.v1()
    state = {
        selected: this.props.selected
    } 
    handleChange(e) {
        let value

        if (e.target.type === "checkbox") {
            let inputs = this.element.querySelectorAll("input")
            value = []

            for (let i = 0; i < inputs.length; i++) {
                let element = inputs[i]

                if (element.checked) {
                    value.push(element.value)
                }
            }
        } else {
            value = e.target.value
        }

        this.setState({ selected: value })
        this.props.onChange(value)
    }
    render() {
        let items = []
        let i = 0
        let legend = <legend>{this.props.title}</legend>

        for (let element of this.props.children) {
            items.push(
                <li key={this.id + "-" + i++}>
                    {React.cloneElement(element, {
                        onChange: this.handleChange.bind(this),
                        selected: this.state.selected,
                        id: this.id
                    })}
                </li>
            )
        }

        return (
            <fieldset className="input-group" ref={(e) => this.element = e}>
                {this.props.title ? legend : null}
                <ul>
                    {items}
                </ul>
            </fieldset>
        )
    }
} 