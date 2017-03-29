import React, { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import Icon, { IconType } from "../shared/Icon"
import { checklistItem, dechecklistItem } from "../data/store/actions/items"
import Only from "../shared/Only"
import moment from "moment"

export class ListItem extends Component {
    render() {
        let item = this.props.item

        return (
            <div>
                <Link to={"/items/" + item.slug} >{item.title}</Link>

                <span className="nowrap">
                    <span className="amount ">× {item.amount}</span>

                    <Only if={item.checklist === moment().format("YYYY-MM-DD")}>
                        <button className="circle-button" type="button" onClick={this.props.dechecklistItem.bind(null, item.slug)}>
                            <Icon type={IconType.X} />
                            <span className="visually-hidden">Remove from checklist</span>
                        </button>
                    </Only>

                    <Only if={item.checklist !== moment().format("YYYY-MM-DD")}>
                        <button className="circle-button" type="button" onClick={this.props.checklistItem.bind(null, item.slug)}>
                            <Icon type={IconType.Plus} />
                            <span className="visually-hidden">Add to checklist</span>
                        </button>
                    </Only>
                </span>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            checklistItem: (slug) => dispatch(checklistItem(slug)),
            dechecklistItem: (slug) => dispatch(dechecklistItem(slug))
        }
    }
)(ListItem)