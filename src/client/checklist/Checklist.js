import React, { Component } from "react"
import ItemsList from "../items/ItemsList"
import Cloak from "../shared/Cloak"
import { connect } from "react-redux"
import { fetchItems } from "../data/store/actions/items"
import moment from "moment"

class Items extends Component {
    componentWillMount() {
        this.props.fetchItems()
    }

    render() { 
        let data = this.props.items.data.filter(i => i.checklist === moment().format("YYYY-MM-DD"))

        return (
            <div className="container">
                <h1 className="beta offset-small">Checklist</h1>

                <Cloak if={this.props.items.isLoading}>
                    <ItemsList items={data} />
                </Cloak>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            items: state.items,
        }
    },
    (dispatch) => {
        return {
            fetchItems: () => dispatch(fetchItems())
        }
    }
)(Items)