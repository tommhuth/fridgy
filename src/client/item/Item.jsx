import React, {Component } from "react";
import { connect } from "react-redux";
import Icon from "../shared/Icon";
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
        <div className="  item-entry  " >
            <div className="offset-small item-status">
                <Icon title={item.amount ? "checkmark" : "x"} />
            </div>

            <h1 className="beta item-name  ">
                {item.title}
            </h1>

            <p className="item-details">
                {item.amount ? "It’s in the fridge" : "Ooops, ain’t got that" }
                {item.amount ? " × " + item.amount  : "" }
            </p>

            <button className="button is-inverted is-icon-only" >
                <Icon title="plus" />
            </button>

            <button className="button is-inverted is-icon-only" >
                <Icon title="plus" />
            </button>

            <div className="container is-fancy">
                <strong style={{ display: this.props.status.isLoadingItem  ? "block": "none"}}>LOADING...</strong>

            </div>
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