/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import { connect } from "react-redux";
import { setCategoryFilter, setStockFilter } from "../app/actions/filter-actions";
import { fetchCategories } from "../app/actions/categories-actions";
import Select from "../shared/Select";


class Filter extends Component {
    componentDidMount(){
        this.props.fetchCategories()
    }

    handleCategoryChange(value){
        this.props.setCategoryFilter(value)
    }

    handleStockChange(value){
        this.props.setStockFilter(value) 
    }

    render(){
        return (
            <fieldset > 
                <Select onChange={  this.handleStockChange.bind(this) } selected="" >
                    <option value="">All</option>
                    <option value="IN_STOCK">In stock</option>
                    <option value="OUT_OF_STOCK">Out of stock</option>
                </Select>

                <Select onChange={this.handleCategoryChange.bind(this)} selected="" >
                    <option value="">Everything</option>
                    {
                        this.props.categories.map((e) => <option key={e.name}  value={e.name}>{e.name}</option>)
                    }
                </Select>

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