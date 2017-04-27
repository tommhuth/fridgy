import React, { Component } from "react"
import { connect } from "react-redux"
import { setCategoryFilter, setStockFilter } from "../data/store/actions/filter"
import { fetchCategories } from "../data/store/actions/categories"
import { StockFilter } from "../data/store/actions/filter"
import {Select, Option} from "../shared/Select"

class Filter extends Component {
    componentDidMount() {
        let silent = this.props.categories.data.length > 0

        this.props.fetchCategories(silent)
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
                    value="" >
                    <Option value="">Everything</Option>
                    {
                        this.props.categories.data.map((e) => <Option key={e.name} value={e.name}>{e.name}</Option>)
                    }
                </Select>

                <label className="visually-hidden" htmlFor="filter-stock">
                    Stock filter
                </label>
                <Select
                    id="filter-stock"
                    onChange={this.handleStockChange.bind(this)}
                    value={StockFilter.All}>
                    <Option value={StockFilter.All}>In and out of stock</Option>
                    <Option value={StockFilter.InStock}>In stock</Option>
                    <Option value={StockFilter.OutOfStock}>Out of stock</Option>
                </Select>
            </fieldset>
        )
    }
}

export default connect(
    store => {
        return {
            filter: store.filter,
            categories: store.categories
        }
    },
    dispatch => {
        return {
            setCategoryFilter: (category) => dispatch(setCategoryFilter(category)),
            setStockFilter: (stock) => dispatch(setStockFilter(stock)),
            fetchCategories: (silent) => dispatch(fetchCategories(silent))
        }
    }
)(Filter)