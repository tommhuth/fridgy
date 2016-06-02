import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../app/actions/categories-actions";

class Restock extends Component {
    componentDidMount(){
        this.props.getCategories();
    }
    render() {
        return (
            <fieldset className="container">
                <legend>Add Item</legend>

                <label> Name </label>
                <input placeholder="Name"/>

                <label>Category</label>

                <button onClick={() => this.props.addItem(11, this.node.value)}>Add</button>
            </fieldset>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        status: state.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (id, name) => dispatch({type: "ADD_ITEM", id, name}),
        getCategories: () => dispatch(fetchCategories())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restock)