import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "../shared/Icon";
import Cloak from "../shared/Cloak";
import { fetchItem, clearItem } from "../app/actions/item-actions";

class Item extends Component {
    componentWillUnmount() {
        this.props.clearItem();
    }
    componentDidMount(){
        this.props.getItem(this.props.params.slug);
    }
    render(){
        let item = this.props.item;

        return (
        <div className="item-entry container" >
            <Cloak state={this.props.status.isLoadingItem}>
                <div className="offset-small item-status">
                    <Icon title={item.amount ? "checkmark" : "x"} />
                </div>

                <h1 className="beta item-name">
                    {item.title}
                </h1>

                <p className="item-details">
                    {item.amount ? "It’s in the fridge" : "Ooops, ain’t got that" }
                    {item.amount ? " × " + item.amount  : "" }
                </p>

                <button className="button is-inverted is-icon-only" >
                    <Icon title="plus" />
                    <span className="visually-hidden">Increase amount</span>
                </button>

                <button className="button is-inverted is-icon-only" >
                    <Icon title="minus" />
                    <span className="visually-hidden">Decrease amount</span>
                </button>
            </Cloak>

        </div>

        )
    } 
}

const mapStateToProps = (state) => {
    return {
        item: state.item,
        status: state.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItem: (slug) => dispatch(fetchItem(slug)),
        clearItem: () => dispatch(clearItem())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Item)