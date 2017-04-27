import React, { Component } from "react"
import Icon, {IconType} from "./Icon"
import classNames from "classnames"
import PropTypes from "prop-types"

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
    static propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func
    }

    state = {
        selectedText: null,
        selectedValue: this.props.value,
        hasFocus: false
    } 

    getSelected(element) {
        let index = element.selectedIndex
        let text = element.options[index] ? element.options[index].text : null
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
        let { hasFocus, selectedValue, selectedText } = this.state
        let { subtle, children, style } = this.props
        let selectClass = classNames("select", style, {
            "select--focus": hasFocus,
            "select--subtle": subtle
        })

        return (
            <div className={selectClass}>
                <span className="select__inner">{selectedText}</span>
                <span className="select__icon"><Icon type={IconType.ChevronDown} /></span>
                
                <select 
                    className="select__native"
                    ref={(e) => this.element = e}
                    value={selectedValue} 
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onChange={this.handleSelectChange.bind(this)}>
                    {children}
                </select> 
            </div>
        )
    }
} 