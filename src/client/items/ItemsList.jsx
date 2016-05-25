/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import ListItem from "./ListItem";

    
class ItemsList extends Component {
    render() {

        return (
            <div>
                <ul className="items-list">
                    {
                        this.props.items.map( item => <li key={item._id}> <ListItem item={item}  /> </li>)
                    }
                </ul>
            </div>
        )
    }
}



export default ItemsList