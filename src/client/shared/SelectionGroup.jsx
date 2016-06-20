import React, { Component } from "react";
import uuid from "node-uuid";
    
class SelectionGroup extends Component {
    constructor(props){
        super(props);
        this.id = "selection-group-" + uuid.v1();

        this.state = {
            selected: props.selected
        }
    }
    handleChange(e) {
        let value;

        if(e.target.type === "checkbox"){
            let inputs = this.element.querySelectorAll("input");
            value = [];

            for(let i = 0; i < inputs.length; i++) {
                let element = inputs[i];

                if(element.checked){
                    value.push(element.value);
                }
            }
        } else {
            value = e.target.value;
        }

        this.setState({ selected: value });
        this.props.onChange(value);
    }
    render() {
        let items = [];
        let i = 0;
        
        for(let element of this.props.children){
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
            <fieldset ref={(e) => this.element = e}>
                <legend>{this.props.title}</legend>
                <ul>
                    {items}
                </ul>
            </fieldset>
        )
    }
}

export default SelectionGroup;