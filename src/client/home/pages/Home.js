import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchItems } from "../../data/store/actions/items"
import Page from "../../app/Page"
import MealAdvisor from "../MealAdvisor"
import FridgeIntro from "../FridgeIntro"
import FridgeOutro from "../FridgeOutro"

export  class Home extends Component {
    componentWillMount() {
        let silent = this.props.items.data.length > 0

        this.props.fetchItems(silent)
    }

    render() {  
        return (
            <Page> 
                <FridgeIntro />
                <MealAdvisor items={this.props.items} />
                <FridgeOutro />
            </Page>

        )
    }
}

export default connect(
    store => {
        return {
            items: store.items
        }
    },
    dispatch => {
        return {
            fetchItems: (silent) => dispatch(fetchItems(silent))
        }
    }
)(Home)