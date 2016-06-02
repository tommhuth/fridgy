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
            <fieldset className="filter-list">
                <legend className="visually-hidden">Filter list</legend>

                <label className="visually-hidden" for="filter-category">
                    Category filter
                </label>
                <Select
                    id="filter-category"
                    onChange={this.handleCategoryChange.bind(this)}
                    selected="" >
                    <option value="">Everything</option>
                    {
                        this.props.categories.map((e) => <option key={e.name}  value={e.name}>{e.name}</option>)
                    }
                </Select>

                <label className="visually-hidden" for="filter-stock">
                    Stock filter
                </label>
                <Select
                    id="filter-stock"
                    onChange={this.handleStockChange.bind(this)}
                    selected="" >
                    <option value="">In and out of stock</option>
                    <option value="IN_STOCK">In stock</option>
                    <option value="OUT_OF_STOCK">Out of stock</option>
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