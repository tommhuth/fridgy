import React, { Component } from "react"
import ListItem from "./ListItem"

export default class ItemsList extends Component {
    render() { 

        return (
            <div>
                <ul className="items-list">
                    {
                        this.props.items.map( item => <li key={item.id}> <ListItem item={item}  /> </li>)
                    }
                </ul>
            </div>
        )
    }
}