/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/categories-actions";
import { Select } from "../../components"

class AddItemForm extends Component {

    componentDidMount(){
        this.props.getCategories();
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: null
        };
    }

    render() {
        return (
            <fieldset className="container">
                <legend>Add Item</legend>
                <label> Name </label>
                <input ref={(node)=> this.node = node} placeholder="Name"/>

                <label>Category</label>
                <Select items={this.props.categories}  />

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

export default connect(mapStateToProps, mapDispatchToProps)(AddItemForm)