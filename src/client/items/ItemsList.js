import React, { Component } from "react"
import ListItem from "./ListItem"
import sort from "sort-array"

export default class ItemsList extends Component {
    render() { 
        let items = sort(this.props.items, "title")

        return (
            <div>
                <ul className="items-list">
                    {
                        items.map( item => <li key={item.id}> <ListItem item={item}  /> </li>)
                    }
                </ul>

                {!items.length ? <p className="subtle">Ooops, nothing to show!</p> : null}
            </div>
        )
    }
}