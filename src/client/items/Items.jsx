/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import  ItemsList from "./ItemsList";
import  Filter from "./Filter";
import { connect } from "react-redux";
import { fetchItems } from "../app/actions/item-actions";
import { filterItems } from "../app/actions/filter-actions";


class Items extends Component {
    componentDidMount(){
        this.props.fetchItems();
    }
    render(){
        return (
            <div className="container">
                <h2>Items list</h2>

                <strong style={{ display: this.props.status.isLoadingItems && !this.props.items.length ? "block": "none"}}>LOADING...</strong>

                <Filter />

                <ItemsList items={this.props.items } state={this.props.status}/>
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