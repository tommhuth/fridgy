import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "../shared/Icon";
import Select from "../shared/Select";
import { fetchCategories  } from "../app/actions/categories-actions";

class ItemEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.item.title,
            category: props.item.category,
            amount: props.item.amount
        }
    }
    componentDidMount(){
        this.props.fetchCategories();
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }
    handleAmountChange(e){
        this.setState({ amount: e.target.value })
    }
    handleCategoryChange(value, label){
        this.setState({ category: value })
    }
    render(){
        let item = this.props.item;
        return (
            <div className="item-edit" >
                <div className="container">
                    <fieldset>
                        <legend className="visually-hidden">Edit {item.title}</legend>
                        {JSON.stringify(this.state)}

                        <div className="question">
                            <label htmlFor="title">Title</label>
                            <input type="text"
                                   id="title"
                                   value={this.state.title}
                                   onChange={this.handleTitleChange.bind(this)}
                                   className="text-input large"/>
                        </div>

                        <div className="question inline">
                            <label htmlFor="amount">Amount</label>
                            <input type="number"
                                   id="amount"
                                   value={this.state.amount}
                                   onChange={this.handleAmountChange.bind(this)}
                                   className="text-input small"/>
                        </div>

                        <div className="question inline">
                            <label htmlFor="amount">Unit</label>
                            <Select
                                isSmaller={true}
                                id="unit"
                                onChange={this.handleCategoryChange.bind(this)}
                                selectedText={item.category}
                                selectedValue={item.category} >
                                {
                                    this.props.categories.map((e) => <option key={e.name}  value={e.name}>{e.name}</option>)
                                }
                            </Select>
                        </div>

                        <div className="question">
                            <label htmlFor="amount">Category</label>
                            <Select
                                isSmaller={true}
                                id="category"
                                onChange={this.handleCategoryChange.bind(this)}
                                selectedText={item.category}
                                selectedValue={item.category} >
                                {
                                    this.props.categories.map((e) => <option key={e.name}  value={e.name}>{e.name}</option>)
                                }
                            </Select>
                        </div>

                    </fieldset>
                </div>
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        item: state.item,
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemEdit)