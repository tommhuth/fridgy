/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import { connect } from "react-redux";

class ItemsList extends Component {
    render() {
        return (
            <fieldset className="container">
                <legend>Add Item</legend>
                <label>
                    <input ref={(node)=> this.node = node} placeholder="Name"/>
                    <button onClick={() => this.props.addItem(11, this.node.value)}>Add</button>
                </label>
            </fieldset>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (id, name) => dispatch({type: "ADD_ITEM", id, name})
    }
};

export default connect(null, mapDispatchToProps)(ItemsList)