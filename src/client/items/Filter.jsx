/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import { connect } from "react-redux";
import { setCategoryFilter, setStockFilter } from "../app/actions/filter-actions";
import { fetchCategories } from "../app/actions/categories-actions";


class Filter extends Component {
    componentDidMount(){
        this.props.fetchCategories()
    }
    handleCategoryChange(e){
        this.props.setCategoryFilter(e.target.value)
    }
    handleStockChange(e){
        this.props.setStockFilter(e.target.value)
    }
    render(){
        return (
            <fieldset >
                <select onChange={this.handleStockChange.bind(this)}>
                    <option>All</option>
                    <option value="IN_STOCK">In stock</option>
                    <option value="OUT_OF_STOCK">Out of stock</option>
                </select>
                <select onChange={this.handleCategoryChange.bind(this)}>
                    <option>Everything</option>
                    {
                        this.props.categories.map( (e) => <option value={e.name}>{e.name}</option>)
                    } 
                </select>
            </fieldset>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        categories: state.categories
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setCategoryFilter: (category)=> dispatch(setCategoryFilter(category)),
        setStockFilter: (stock)=> dispatch(setStockFilter(stock)),
        fetchCategories: () => dispatch(fetchCategories())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter)