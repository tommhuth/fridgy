import React, { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import Icon from "../shared/Icon"
import { deleteItem } from "../data/store/actions/item-actions"

class ListItem extends Component {
    render() {
        let item = this.props.item
        
        return (
            <div>
                <Link to={"/items/" + item.slug} >{item.title}</Link>
                <span className="nowrap">
                    <span className="amount ">× {item.amount}</span>
                    <button   className="circle-button"  type="button">
                        <Icon title={item.listed ? "x" : "plus"} />
                        <span className="visually-hidden">Add to checklist</span>
                    </button>
                </span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: item => dispatch(deleteItem(item))
    }
}

export default connect(null, mapDispatchToProps)(ListItem)