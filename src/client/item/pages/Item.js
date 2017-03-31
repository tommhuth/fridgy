import React, { Component } from "react"
import { connect } from "react-redux"
import Cloak from "../../shared/Cloak"
import { fetchItem, clearItem } from "../../data/store/actions/item"
import moment from "moment"
import Button from "../../shared/Button"
import SimilarItemsList from "../SimilarItemsList"

class Item extends Component {
    componentWillUnmount() {
        this.props.clearItem()
    }

    componentWillReceiveProps(newProps) {
        if (this.props.params.slug !== newProps.params.slug) {
            this.props.getItem(newProps.params.slug)
        }
    }

    componentWillMount() {
        this.props.getItem(this.props.params.slug)
    }

    render() {
        let item = this.props.item

        return (
            <div className="item-entry " >
                <Cloak if={item.isLoading}>
                    <div className="container">
                        <h1 className="beta offset-small item-entry__title">
                            {item.data.title}
                        </h1>
                        <p className="item-entry__status">
                            {item.data.amount ? `You’ve got ${item.data.amount} of that, buddy` : "Ooops, ain’t got that"}
                        </p>

                        <div className="item-entry__related-items">
                            <h2 className="item-entry__details-header">See also</h2>
                            <div className="item-entry__details-data">
                                <SimilarItemsList items={item.data.similar} />
                            </div>
                        </div>

                        <div className="item-entry__category">
                            <h2 className="item-entry__details-header">Category</h2>
                            <p className="item-entry__details-data">{item.data.category}</p>
                        </div>

                        <div className="item-entry__last-updated">
                            <h2 className="item-entry__details-header">Last edited</h2>
                            <p className="item-entry__details-data">{moment(item.data.updatedAt).fromNow()}</p>
                        </div>

                        <div className="item-entry__admin">
                            <h2 className="item-entry__details-header">Edit</h2>
                            <div className="item-entry__details-data">
                                <Button>+</Button>
                                <Button>-</Button>
                                <Button>Edit</Button>
                            </div>
                        </div>
                    </div>

                    {this.props.children}
                </Cloak>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            item: state.item,
            categories: state.categories
        }
    },
    (dispatch) => {
        return {
            getItem: (slug) => dispatch(fetchItem(slug)),
            clearItem: () => dispatch(clearItem())
        }
    }
)(Item)