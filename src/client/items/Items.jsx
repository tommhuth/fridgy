/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react"; 
import  ItemsList from "./ItemsList";
import { connect } from "react-redux";
import { fetchItems } from "../app/actions/item-actions";


class Items extends Component {
    componentDidMount(){
        this.props.fetchItems();
    }
    render(){
        return (
            <div className="container">
                <h2>Items list</h2>

                <strong style={{ display: this.props.status.isLoadingItems && !this.props.items.length ? "block": "none"}}>LOADING...</strong>

                <ItemsList items={this.props.items } state={this.props.status}/>
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        status: state.status
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchItems: ()=> dispatch(fetchItems())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Items)