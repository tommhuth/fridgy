import React, { Component } from "react"
import { connect } from "react-redux"
import Cloak from "../../shared/Cloak"
import { fetchItem, clearItem, adjustAmount } from "../../data/store/actions/item"
import moment from "moment"
import Button from "../../shared/Button"
import ButtonLink from "../../shared/ButtonLink"
import SimilarItemsList from "../SimilarItemsList"
import AdminOnly from "../../shared/AdminOnly"
import BodyClassName from "react-body-classname"
import numberConverter from "number-to-words"
import Page from "../../app/Page"
import DocumentTitle from "react-document-title"

class Item extends Component {
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
            <DocumentTitle title={"The Fridge / Items / " + item.data.title}>
                <BodyClassName className="fill fill--blue">
                    <Cloak if={item.isLoading}> 
                        <Page className="item-entry " >
                            <div className="container">
                                <h1 className="beta offset-small item-entry__title">
                                    {item.data.title}
                                </h1>
                                <p className="item-entry__status">
                                    {item.data.amount ? `You’ve got ${numberConverter.toWords(item.data.amount)} of that, buddy` : "Ooops, ain’t got that"}
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

                                <AdminOnly>
                                    <div className="item-entry__admin">
                                        <h2 className="item-entry__details-header">Edit</h2>
                                        <Button onClick={this.props.adjustAmount.bind(null, item.data, 1)}>+</Button>
                                        <Button onClick={this.props.adjustAmount.bind(null, item.data, -1)}>-</Button>
                                        <ButtonLink to={`/items/${item.data.slug}/edit`}>Edit</ButtonLink>
                                    </div>
                                </AdminOnly>
                            </div>

                            {this.props.children} 
                        </Page>
                    </Cloak>
                </BodyClassName>
            </DocumentTitle>
        )
    }
}

export default connect(
    store => {
        return {
            item: store.item,
            categories: store.categories
        }
    },
    dispatch => {
        return {
            getItem: (slug) => dispatch(fetchItem(slug)),
            clearItem: () => dispatch(clearItem()),
            adjustAmount: (item, amount) => dispatch(adjustAmount(item, amount))
        }
    }
)(Item)