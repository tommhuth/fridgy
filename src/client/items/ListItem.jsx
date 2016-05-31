/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { deleteItem } from "../app/actions/item-actions";

class ListItem extends Component {
    render() {
        let item = this.props.item;

        return (
            <div>
                <Link to={"/items/" + item.slug} ><strong>{item.title}</strong></Link>
                <p>{item.category}</p>
                <p>{item.amount}</p>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: item => dispatch(deleteItem(item))
    }
};

export default connect(null, mapDispatchToProps)(ListItem)