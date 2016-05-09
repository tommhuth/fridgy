/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import { connect } from "react-redux";

class Item extends Component {
    render(){
        return (
            <li>
                <strong>{this.props.item.title}</strong>  ({this.props.item.category})
                <button onClick={this.props.onClick}>DELETE</button>
            </li>
        )
    }
}
    
class ItemsList extends Component {
    render() {
        return (
            <div>
                <strong style={{ display: this.props.status.isLoadingItems ? "block": "none"}}>LOADING...</strong>
                <ul>
                    { this.props.items.map( item => <Item onClick={() => this.props.deleteItem(item._id)} item={item} key={item._id} />) }
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