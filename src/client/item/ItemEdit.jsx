import React, { Component } from "react";
import { connect } from "react-redux";
import ButtonLink from "../shared/ButtonLink";
import Button from "../shared/Button";
import Select from "../shared/Select";
import RadioButton from "../shared/RadioButton";
import CheckBox from "../shared/CheckBox";
import SelectionGroup from "../shared/SelectionGroup";
import { fetchCategories  } from "../app/actions/categories-actions";

class ItemEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.item.title,
            category: props.item.category,
            amount: props.item.amount,
            food: null,
            places: null,
            test1: null,
            test2: null
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
    handleFoodChange(value){
        this.setState({
            food: value
        })
    }
    handlePlacesChange(value){
        this.setState({
            places: value
        })
    }
    handleTest1Change(value){
        this.setState({
            test1: value
        })
    }
    handleTest2Change(value){
        this.setState({
            test2: value
        })
    }
    render(){
        let item = this.props.item;
        return (
            <div className="item-edit" >
                <div className="container-fixed">
                    <fieldset>
                        <legend className="visually-hidden">Edit {item.title}</legend>

                        <div className="question" >
                            <SelectionGroup title="Cities been to"
                                            selected={["oslo", "berlin"]}
                                            onChange={this.handlePlacesChange.bind(this)}>
                                <CheckBox value="oslo">Oslo</CheckBox>
                                <CheckBox value="nyc">NYC</CheckBox>
                                <CheckBox value="berlin">Berlin</CheckBox>
                            </SelectionGroup>

                            <SelectionGroup title="Food I eat"
                                            onChange={this.handleFoodChange.bind(this)}>
                                <CheckBox value="sushi">Sushi</CheckBox>
                                <CheckBox value="pizza">Pizza</CheckBox>
                                <CheckBox value="hamburger">Hamburger</CheckBox>
                            </SelectionGroup>
                        </div>


                        <div className="question" >
                            <SelectionGroup selected="a"
                                            onChange={this.handleTest1Change.bind(this)}>
                                <RadioButton value="a">Option A</RadioButton>
                                <RadioButton value="b">Option B</RadioButton>
                                <RadioButton value="c">Option C</RadioButton>
                            </SelectionGroup>
                            <hr />
                            <SelectionGroup onChange={this.handleTest2Change.bind(this)}>
                                <RadioButton value="1">Option 1</RadioButton>
                                <RadioButton value="2">Option 2</RadioButton>
                                <RadioButton value="3">Option 3</RadioButton>
                            </SelectionGroup>
                        </div>

                        <div className="question">
                            <label htmlFor="title">Title</label>
                            <input type="text"
                                   id="title"
                                   value={this.state.title}
                                   onChange={this.handleTitleChange.bind(this)}
                                   className="text-input large"/>
                        </div>

                        <div className="question ">
                            <label htmlFor="amount">Amount</label>
                            <input type="number"
                                   id="amount"
                                   value={this.state.amount}
                                   onChange={this.handleAmountChange.bind(this)}
                                   className="text-input small"/>
                        </div>


                        <div className="question">
                            <label htmlFor="amount">Category</label>
                            <Select
                                isSubtle={true}
                                size="large"
                                id="category"
                                onChange={this.handleCategoryChange.bind(this)}
                                selectedText={item.category}
                                selectedValue={item.category} >
                                {
                                    this.props.categories.map((e) => <option key={e.name}  value={e.name}>{e.name}</option>)
                                }
                            </Select>
                        </div>

                        <Button>Save</Button>
                        <ButtonLink to={"/items/" + this.props.params.slug}>Back</ButtonLink>
                        <ButtonLink to={"/items"}>items</ButtonLink>

                        <p>{ JSON.stringify(this.state ) }</p>
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