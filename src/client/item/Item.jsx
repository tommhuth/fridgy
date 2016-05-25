/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import { connect } from "react-redux";
import { fetchItem, clearItem } from "../app/actions/item-actions";


class Item extends Component {
    componentWillUnmount() {
        this.props.clearItem();
    }

    componentDidMount(){
        this.props.getItem(this.props.params.slug);
    }

    render(){
        return (
            <div className="container is-fancy">
                <strong style={{ display: this.props.status.isLoadingItem  ? "block": "none"}}>LOADING...</strong>

                <h2>{this.props.item.title}</h2>
                <p>{this.props.item._id}</p>

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