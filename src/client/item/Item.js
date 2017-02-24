import React, { Component } from "react"
import { connect } from "react-redux"
import ButtonLink from "../shared/ButtonLink"
import Button from "../shared/Button"
import Icon from "../shared/Icon"
import Cloak from "../shared/Cloak"
import { fetchItem, clearItem } from "../data/store/actions/item"

class Item extends Component {
    componentWillUnmount() {
        this.props.clearItem() 
    }
    
    componentWillMount() { 
        this.props.getItem(this.props.params.slug)
    }
    
    render() {
        let item = this.props.item

        return (
            <div className="item-entry " >
                <Cloak state={this.props.status.isLoadingItem}>
                    <div className="container">
                        <div className="offset-small item-status">
                            <Icon title={item.amount ? "checkmark" : "x"} />
                        </div>

                        <h1 className="beta item-name">
                            {item.title}
                        </h1>

                        <p className="item-details">
                            {item.amount ? "It’s in the fridge" : "Ooops, ain’t got that"}
                            {item.amount ? " × " + item.amount : ""}
                        </p>

                        <Button className="is-inverted is-icon-only" >
                            <Icon title="plus" />
                            <span className="visually-hidden">Increase amount</span>
                        </Button>

                        <Button className="is-inverted is-icon-only" >
                            <Icon title="minus" />
                            <span className="visually-hidden">Decrease amount</span>
                        </Button>
                        <ButtonLink to={"/items/" + this.props.params.slug + "/edit"}
                            className="is-inverted">
                            EDIT
                        </ButtonLink>
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
            status: state.status,
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