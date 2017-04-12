import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchItems } from "../../data/store/actions/items"
import Page from "../../app/Page"
import MealAdvisor from "../MealAdvisor"

export  class Home extends Component {
    componentWillMount() {
        let silent = this.props.items.data.length > 0

        this.props.fetchItems(silent)
    }

    render() {  
        return (
            <Page>
                <h1 className="visually-hidden">What’s in that fridge?</h1>

                <MealAdvisor items={this.props.items} />
            </Page>

        )
    }
}

export default connect(
    state => {
        return {
            items: state.items
        }
    },
    (dispatch) => {
        return {
            fetchItems: (silent) => dispatch(fetchItems(silent))
        }
    }
)(Home)