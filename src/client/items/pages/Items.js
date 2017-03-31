import React, { Component } from "react"
import ItemsList from "./../ItemsList"
import Cloak from "../../shared/Cloak" 
import Filter from "./../Filter"
import { connect } from "react-redux"
import { fetchItems } from "../../data/store/actions/items"
import { filterItems } from "../../data/store/actions/filter"

class Items extends Component {
    componentWillMount() {
        let silent = this.props.items.data.length > 0

        this.props.fetchItems(silent)
    }

    render() {
        let item = this.props.items
        let categories = this.props.categories
        let list = filterItems(item.data, this.props.filter)

        return (
            <div className="container">
                <h1 className="beta offset-small">The fridge</h1>
                
                <Cloak if={item.isLoading || categories.isLoading}>
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
            fetchItems: (silent) => dispatch(fetchItems(silent))
        }
    }
)(Items)