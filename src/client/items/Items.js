import React, { Component } from "react"
import ItemsList from "./ItemsList"
import Cloak from "../shared/Cloak"
import Filter from "./Filter"
import { connect } from "react-redux"
import { fetchItems } from "../data/store/actions/items-actions"
import { filterItems } from "../data/store/actions/filter-actions"

class Items extends Component {
    componentDidMount() {
        this.props.fetchItems()
    }
    render() {
        return (
            <div className="container">
                <h1 className="beta offset-small">The fridge</h1>

                <Cloak state={this.props.status.isLoadingCategories && this.props.status.isLoadingItems && !this.props.items.length}>
                    <Filter />

                    <ItemsList items={this.props.items} state={this.props.status} />
                </Cloak>

            </div>
        )
    }
}
 
export default connect(
    (state) => {
        return {
            items: filterItems(state.items, state.filter),
            status: state.status,
            categories: state.categories
        }
    },
    (dispatch) => {
        return {
            fetchItems: () => dispatch(fetchItems())
        }
    }
)(Items)