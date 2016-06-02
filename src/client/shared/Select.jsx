import React, {Component } from "react";
import Icon from "./Icon";
import classNames from "classnames";
    
class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: "",
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
        this.setState({
            selectedText:this.element.options[this.element.selectedIndex].text,
            selected: this.element.value
        })
        this.props.onChange(this.element.value);
    }

    render() {
        let navClass = classNames("select", { "has-focus": this.state.hasFocus });

        return (
            <div className={navClass}>
                <span>{this.state.selectedText}</span>
                <Icon title="chevron-down" />

                <select ref={(e) => this.element = e}
                        value={this.state.selected}
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