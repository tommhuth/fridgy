import React, { Component } from "react"
import Icon, {IconType} from "./Icon"
import classNames from "classnames"

export const SelectStyle = {
    Wide: "select--large",
    Plain: "select--plain",
    Narrow: "select--medium"
}

export class Option extends Component {
    render() {
        return <option value={this.props.value}>{this.props.children}</option>
    }
}

export class Select extends Component { 
    state = {
        selectedText: null,
        selectedValue: this.props.value,
        hasFocus: false
    } 

    getSelected(element) {
        let index = element.selectedIndex
        let text = element.options[index].text
        let value = element.value

        return { index, text, value }
    }

    componentDidMount() {
        let { text, value } = this.getSelected(this.element)

        this.setState({ 
            selectedText: text,
            selectedValue: value
        })
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
  
    handleSelectChange({ target }) {  
        let { text, value } = this.getSelected(target) 

        this.setState({
            selectedText: text,
            selectedValue: value
        })

        if (this.props.onChange) {
            this.props.onChange(value, text)
        }
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