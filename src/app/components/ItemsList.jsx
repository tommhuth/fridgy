/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import { connect } from "react-redux";
import Item from "./Item";

    
class ItemsList extends Component {
    render() {
        let items = [];

        for(let item of this.props.items){
            items.push(<li key={item._id}><Item item={item}  /></li>);
        }

        return (
            <div>
                <strong style={{ display: this.props.status.isLoadingItems ? "block": "none"}}>LOADING...</strong>
                <ul>
                    { items }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        status: state.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: _id => dispatch({type: "REMOVE_ITEM", _id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList)