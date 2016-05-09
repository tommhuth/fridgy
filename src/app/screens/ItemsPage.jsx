/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react"; 
import ItemsList from "../components/ItemsList";
import { connect } from "react-redux";
import { fetchItems } from "../actions/item-actions";


class ItemsPage extends Component {
    componentDidMount(){
        this.props.getItems();
    }
    render(){
        return (
            <div className="container">
                <h2>Items list</h2>
                 
                <ItemsList />
            </div>
        )
    } 
}
const mapDispatchToProps = (dispatch) => {
    return {
        getItems: ()=> dispatch(fetchItems())
    }
};

export default connect(null, mapDispatchToProps)(ItemsPage)