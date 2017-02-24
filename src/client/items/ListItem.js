import React, { Component } from "react"
import { Link } from "react-router" 
import Icon from "../shared/Icon" 

export default class ListItem extends Component {
    render() {
        let item = this.props.item

        return (
            <div>
                <Link to={"/items/" + item.slug} >{item.title}</Link>
                <span className="nowrap">
                    <span className="amount ">× {item.amount}</span>
                    <button className="circle-button" type="button">
                        <Icon title={item.listed ? "x" : "plus"} />
                        <span className="visually-hidden">Add to checklist</span>
                    </button>
                </span>
            </div>
        )
    }
} 