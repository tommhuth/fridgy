import React, { Component } from "react"
import ListItem from "../../items/ListItem" 
import sort from "sort-array"
import Cloak from "../../shared/Cloak"
import { connect } from "react-redux"
import { fetchItems } from "../../data/store/actions/items"
import moment from "moment"
import Page from "../../app/Page"
import DocumentTitle from "react-document-title"

class Items extends Component {
    componentWillMount() {
        let silent = this.props.items.data.length > 0

        this.props.fetchItems(silent)
    }

    render() {
        let data = sort(this.props.items.data.filter(i => i.checklist === moment().format("YYYY-MM-DD")), "title")

        return (
            <DocumentTitle title="The Fridge / Checklist">
                <Page>
                    <div className="checklist">
                        <div className="container">
                            <h1 className="beta offset-small">Checklist</h1>
                            <div className="checklist__description">
                                <p className="intro-text">Stuff you need to do something about.</p>
                                {!data.length && <p className="intro-text">But there's nothing here yet!</p>}
                            </div>

                            <Cloak if={this.props.items.isLoading}>  
                                <ul className="items-list">
                                    {
                                    data.map( item => <li key={item.id}> <ListItem item={item}  /> </li>)
                                    }
                                </ul>
                            </Cloak>
                        </div> 
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
        }
    },
    dispatch => {
        return {
            fetchItems: (silent) => dispatch(fetchItems(silent))
        }
    }
)(Items)