import React, { Component } from "react";
import Icon from "./Icon";
import classNames from "classnames";
    
class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedText: props.selectedText,
            selectedValue: props.selectedValue,
            hasFocus: false
        }
    }

    componentDidMount(){
        this.handleSelectChange();
    }

    handleBlur(){
        this.setState({
            hasFocus: false
        })
    }

    handleFocus(){
        this.setState({
            hasFocus: true
        })
    }

    handleSelectChange() {
        let text = this.getSelectedOptionText();
        let value = this.element.value; 

        this.setState({
            selectedText: text,
            selectedValue: value
        });

        if(this.props.onChange) {
            this.props.onChange(value, text);
        }
    }

    getSelectedOptionText(){
        let element = this.element;
        let options = element.options;

        return (element.selectedIndex > -1 && options[element.selectedIndex]) ? options[element.selectedIndex].text : this.props.selectedText;
    }

    render() {
        let selectClass = classNames("select", {
                "has-focus": this.state.hasFocus,
                "is-subtle": this.props.isSubtile
            }
        );

        return (
            <div className={selectClass + " " + (this.props.size || "")}>
                <span>{this.state.selectedText}</span>
                <Icon title="chevron-down" />

                <select ref={(e) => this.element = e}
                        value={this.state.selectedValue}
                        onFocus={this.handleFocus.bind(this)}
                        onBlur={this.handleBlur.bind(this)}
                        onChange={this.handleSelectChange.bind(this)}>
                    {
                        this.props.children
                    }
                </select>
            </div>
        )
    }

}

export default Select;