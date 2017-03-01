import React, { Component } from "react"
import ItemsList from "./ItemsList"
import Cloak from "../shared/Cloak"
import Filter from "./Filter"
import { connect } from "react-redux"
import { fetchItems } from "../data/store/actions/items"
import { filterItems } from "../data/store/actions/filter"

class Items extends Component {
    componentWillMount() {
        this.props.fetchItems()
    }

    render() {
        let { isLoading, data } = this.props.items
        let list = filterItems(data, this.props.filter) 

        return (
            <div className="container">
                <h1 className="beta offset-small">The fridge</h1>
                
                <Cloak if={this.props.categories.isLoading || isLoading}>
                    <Filter />

                    <ItemsList items={list} />
                </Cloak>

            </div>
        )
    }
}
 
export default connect(
    (state) => {
        return {
            items: state.items, 
            filter: state.filter, 
            categories: state.categories
        }
    },
    (dispatch) => {
        return {
            fetchItems: () => dispatch(fetchItems())
        }
    }
)(Items)