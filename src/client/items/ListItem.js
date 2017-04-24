import React, { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import Icon, { IconType } from "../shared/Icon"
import { checklistItem, dechecklistItem } from "../data/store/actions/item"
import Only from "../shared/Only"
import AdminOnly from "../shared/AdminOnly"
import moment from "moment"

export class ListItem extends Component {
    render() {
        let item = this.props.item

        return (
            <div className="item">
                <Link to={"/items/" + item.slug} className="item__link" >{item.title}</Link>

                <span className="nowrap">
                    <span className="item__amount ">× {item.amount}</span>

                    <AdminOnly element="span">
                        <Only if={item.checklist === moment().format("YYYY-MM-DD")}>
                            <button className="circle-button" type="button" onClick={this.props.dechecklistItem.bind(null, item)}>
                                <Icon type={IconType.X} />
                                <span className="visually-hidden">Remove from checklist</span>
                            </button>
                        </Only>

                        <Only if={item.checklist !== moment().format("YYYY-MM-DD")}>
                            <button className="circle-button" type="button" onClick={this.props.checklistItem.bind(null, item)}>
                                <Icon type={IconType.Plus} />
                                <span className="visually-hidden">Add to checklist</span>
                            </button>
                        </Only>
                    </AdminOnly>
                </span>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            checklistItem: (item) => dispatch(checklistItem(item)),
            dechecklistItem: (item) => dispatch(dechecklistItem(item))
        }
    }
)(ListItem)