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
        let item = this.props.items
        let categories = this.props.categories
        let list = filterItems(item.data, this.props.filter)

        return (
            <DocumentTitle title="The Fridge / Items">
                <Page>
                    <div className="container">
                        <h1 className="beta offset-small">The fridge</h1>

                        <Cloak if={item.isLoading || categories.isLoading}>
                            <Filter />

                            <ul className="items-list">
                                {
                                    sort(list, "title").map( item => <li key={item.id}> <ListItem item={item}  /> </li>)
                                }
                            </ul>
                        </Cloak>
                    </div>
                </Page>
            </DocumentTitle>
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