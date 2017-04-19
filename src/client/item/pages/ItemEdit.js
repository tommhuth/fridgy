import React, { Component } from "react"
import { connect } from "react-redux"
import ButtonLink from "../../shared/ButtonLink"
import Button, { ButtonStyle } from "../../shared/Button"
import Select, { SelectStyle } from "../../shared/Select"
import RadioButton from "../../shared/RadioButton"
import CheckBox from "../../shared/CheckBox"
import SelectionGroup from "../../shared/SelectionGroup"
import { fetchCategories } from "../../data/store/actions/categories"
import { fetchItem } from "../../data/store/actions/item"
import Page from "../../app/Page"

class ItemEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: props.item.title,
            category: props.item.category,
            amount: props.item.amount,
            food: ["pizza"],
            places: null,
            test1: "b",
            test2: "3",
            conditions: true
        }
    }
    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchItem(this.props.params.slug)
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }
    handleAmountChange(e) {
        this.setState({ amount: e.target.value })
    }
    handleCategoryChange(value) {
        this.setState({ category: value })
    }
    handleFoodChange(value) {
        this.setState({
            food: value
        })
    }
    handlePlacesChange(value) {
        this.setState({
            places: value
        })
    }
    handleTest1Change(value) {
        this.setState({
            test1: value
        })
    }
    handleTest2Change(value) {
        this.setState({
            test2: value
        })
    }
    handleSingle(e) {
        this.setState({
            conditions: e.target.checked
        })
    }
    render() {
        let item = this.props.item.data

        return (
            <Page>
                <div className="container">
                    <h1 className="beta offset-small">Edit {item.title}</h1>

                    <fieldset>
                        <legend className="visually-hidden">Edit {item.title}</legend>

                        <div className="question" >
                            <CheckBox onChange={this.handleSingle.bind(this)}
                                id="terms-and-cond"
                                selected={this.state.conditions}>
                                I agree to terms and conditions
                        </CheckBox>
                        </div>

                        <div className="question" >
                            <SelectionGroup title="Cities been to"
                                onChange={this.handlePlacesChange.bind(this)}>
                                <CheckBox value="oslo">Oslo</CheckBox>
                                <CheckBox value="nyc">NYC</CheckBox>
                                <CheckBox value="berlin">Berlin</CheckBox>
                            </SelectionGroup>
                        </div>

                        <div className="question" >
                            <SelectionGroup title="Food I eat"
                                selected={this.state.food}
                                onChange={this.handleFoodChange.bind(this)}>
                                <CheckBox value="sushi">Sushi</CheckBox>
                                <CheckBox value="pizza">Pizza</CheckBox>
                                <CheckBox value="hamburger">Hamburger</CheckBox>
                            </SelectionGroup>
                        </div>


                        <div className="question" >
                            <fieldset className="input-group">
                                <legend>Whole buncha radios</legend>
                                <SelectionGroup onChange={this.handleTest1Change.bind(this)}
                                    selected={this.state.test1}>
                                    <RadioButton value="a">Option A</RadioButton>
                                    <RadioButton value="b">Option B</RadioButton>
                                    <RadioButton value="c">Option C</RadioButton>
                                </SelectionGroup>
                                <hr />
                                <SelectionGroup selected={this.state.test2}
                                    onChange={this.handleTest2Change.bind(this)}>
                                    <RadioButton value="1">Option 1</RadioButton>
                                    <RadioButton value="2">Option 2</RadioButton>
                                    <RadioButton value="3">Option 3</RadioButton>
                                </SelectionGroup>
                            </fieldset>

                        </div>

                        <div className="question">
                            <label htmlFor="title">Title</label>
                            <input type="text"
                                id="title"
                                value={this.state.title}
                                onChange={this.handleTitleChange.bind(this)}
                                className="text-input text-input--large" />
                        </div>

                        <div className="question ">
                            <label htmlFor="amount">Amount</label>
                            <input type="number"
                                id="amount"
                                value={this.state.amount}
                                onChange={this.handleAmountChange.bind(this)}
                                className="text-input text-input--small" />
                        </div>


                        <div className="question">
                            <label htmlFor="amount">Category</label>
                            <Select
                                subtle={true}
                                style={SelectStyle.Narrow}
                                id="category"
                                onChange={this.handleCategoryChange.bind(this)}
                                selectedText={item.category}
                                selectedValue={item.category}>
                                {
                                    this.props.categories.data.map((e) => <option key={e.name} value={e.name}>{e.name}</option>)
                                }
                            </Select>
                        </div>

                        <Button style={ButtonStyle.Inverted}>Save</Button>
                        <ButtonLink style={ButtonStyle.Inverted} to={"/items/" + this.props.params.slug}>Back</ButtonLink>
                        <ButtonLink style={ButtonStyle.Inverted} to={"/items"}>items</ButtonLink>

                        <pre>{JSON.stringify(this.state, null, 4)}</pre>
                    </fieldset>
                </div>
            </Page>
        )
    }
}

export default connect(
    (state) => {
        return {
            item: state.item,
            categories: state.categories
        }
    },
    (dispatch) => {
        return {
            fetchCategories: () => dispatch(fetchCategories()),
            fetchItem: (slug) => dispatch(fetchItem(slug))
        }
    }
)(ItemEdit)