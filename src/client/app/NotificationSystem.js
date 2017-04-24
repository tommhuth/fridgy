import React, { Component } from "react" 
import { connect } from "react-redux"
import { add, remove } from "../data/store/actions/notifications"
import NotificationMessage from "./NotificationMessage"
import TransitionGroup from "react-transition-group/CSSTransitionGroup"
import sortArray from "sort-array"

export class NotificationSystem extends Component {
    dismiss(id){
        this.props.remove(id)
    }
    render() { 
        return (
            <TransitionGroup 
                transitionName="slide"
                className="notification-system"
                component="div"
                transitionEnterTimeout={350}
                transitionLeaveTimeout={350}>
                {this.props.notifications.map(i => <NotificationMessage {...i} key={i.id} onClick={this.dismiss.bind(this, i.id)}/>)}
            </TransitionGroup>
        )
    }
} 

export default connect(
    store => {
        return {
            notifications: sortArray(store.notifications.data, "createdAt").reverse()
        }
    },
    dispatch => {
        return {
            add: (message, isError, duration) => dispatch(add(message, isError, duration)),
            remove: (id) => dispatch(remove(id)),
        }
    }
)(NotificationSystem)
