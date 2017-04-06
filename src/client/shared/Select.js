import React, { Component } from "react"
import Icon, {IconType} from "./Icon"
import classNames from "classnames"

export const SelectStyle = {
    Wide: "select--large",
    Narrow: "select--medium"
}

export default class Select extends Component { 
    state = {
        selectedText: this.props.selectedText,
        selectedValue: this.props.selectedValue,
        hasFocus: false
    }

    componentDidMount() {
        this.handleSelectChange()
    }

    handleBlur() { 
        this.setState({
            hasFocus: false
        })
        setTimeout(() => this.setState({  hasFocus: false  }), 100 )
    }

    handleFocus() {
        this.setState({
            hasFocus: true
        })
    }

    handleSelectChange() {
        let text = this.getSelectedOptionText()
        let value = this.element.value

        this.setState({
            selectedText: text,
            selectedValue: value
        })

        if (this.props.onChange) {
            this.props.onChange(value, text)
        }
    }

    getSelectedOptionText() {
        let element = this.element
        let options = element.options

        return (element.selectedIndex > -1 && options[element.selectedIndex]) ? options[element.selectedIndex].text : this.props.selectedText
    }
 
    render() {
        let selectClass = classNames("select", {
            "select--focus": this.state.hasFocus,
            "select--subtle": this.props.subtle
        })

        return (
            <div className={selectClass + " " + (this.props.style || "")}>
                <span className="select__inner">{this.state.selectedText}</span>
                <span className="select__icon"><Icon type={IconType.ChevronDown} /></span>
                
                <select 
                    className="select__native"
                    ref={(e) => this.element = e}
                    value={this.state.selectedValue} 
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onChange={this.handleSelectChange.bind(this)}>
                    {this.props.children}
                </select> 
            </div>
        )
    }
} 