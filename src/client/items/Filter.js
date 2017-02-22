import React, { Component } from "react"
import { connect } from "react-redux"
import { setCategoryFilter, setStockFilter } from "../data/store/actions/filter-actions"
import { fetchCategories } from "../data/store/actions/categories-actions"
import Select from "../shared/Select"

class Filter extends Component {
    componentDidMount() {
        this.props.fetchCategories()
    }

    handleCategoryChange(value) {
        this.props.setCategoryFilter(value)
    }

    handleStockChange(value) {
        this.props.setStockFilter(value)
    }

    render() {
        return (
            <fieldset className="filter-list">
                <legend className="visually-hidden">Filter list</legend>

                <label className="visually-hidden" htmlFor="filter-category">
                    Category filter
                </label>
                <Select
                    id="filter-category"
                    onChange={this.handleCategoryChange.bind(this)}
                    selectedValue=""
                    selectedText="All">
                    <option value="">Everything</option>
                    {
                        this.props.categories.map((e) => <option key={e.name} value={e.name}>{e.name}</option>)
                    }
                </Select>

                <label className="visually-hidden" htmlFor="filter-stock">
                    Stock filter
                </label>
                <Select
                    id="filter-stock"
                    onChange={this.handleStockChange.bind(this)}
                    selectedValue=""
                    selectedText="In and out of stock">
                    <option key={1} value="">In and out of stock</option>
                    <option key={2} value="IN_STOCK">In stock</option>
                    <option key={3} value="OUT_OF_STOCK">Out of stock</option>
                </Select>
            </fieldset>
        )
    }
}
 
export default connect(
    (state) => {
        return {
            filter: state.filter,
            categories: state.categories
        }
    },
    (dispatch) => {
        return {
            setCategoryFilter: (category) => dispatch(setCategoryFilter(category)),
            setStockFilter: (stock) => dispatch(setStockFilter(stock)),
            fetchCategories: () => dispatch(fetchCategories())
        }
    }
)(Filter)