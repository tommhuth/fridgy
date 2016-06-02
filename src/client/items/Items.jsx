import React, { Component } from "react";
import ItemsList from "./ItemsList";
import Cloak from "../shared/Cloak";
import Filter from "./Filter";
import { connect } from "react-redux";
import { fetchItems } from "../app/actions/items-actions";
import { filterItems } from "../app/actions/filter-actions";

class Items extends Component {
    componentDidMount(){
        this.props.fetchItems();
    }
    render(){
        return (
            <div className="container">
                <h1 className="beta offset-small">The fridge</h1>

                <Cloak state={this.props.status.isLoadingCategories && this.props.status.isLoadingItems && !this.props.items.length}>
                    <Filter />

                    <ItemsList items={this.props.items } state={this.props.status}/>
                </Cloak>

            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        items: filterItems(state.items, state.filter),
        status: state.status,
        categories: state.categories
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchItems: ()=> dispatch(fetchItems())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Items)