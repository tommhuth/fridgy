import React, { Component } from "react" 
import ListItem from "../ListItem" 
import sort from "sort-array"
import Cloak from "../../shared/Cloak"
import Filter from "./../Filter"
import { connect } from "react-redux"
import { fetchItems } from "../../data/store/actions/items"
import { filterItems } from "../../data/store/actions/filter"
import Page from "../../app/Page"
import DocumentTitle from "react-document-title"

class Items extends Component {
    componentWillMount() {
        let silent = this.props.items.data.length > 0

        this.props.fetchItems(silent)
    }

    render() {
        let { items, categories, filter } = this.props
        let list = filterItems(items.data, filter)

        return (
            <DocumentTitle title="The Fridge / Items">
                <Page>
                    <div className="container">
                        <h1 className="beta offset-small">The fridge</h1>

                        <Cloak if={items.isLoading || categories.isLoading}>
                            <Filter />

                            <ul className="items-list">
                                {sort(list, "title").map(item => <li key={item.id}><ListItem item={item} /></li>)}
                            </ul>
                        </Cloak>
                    </div>
                </Page>
            </DocumentTitle>
        )
    }
}

export default connect(
    store => {
        return {
            items: store.items,
            filter: store.filter,
            categories: store.categories
        }
    },
    dispatch => {
        return {
            fetchItems: (silent) => dispatch(fetchItems(silent))
        }
    }
)(Items)