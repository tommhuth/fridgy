import React, { Component } from "react"  
import Icon, { IconType} from "../shared/Icon"

export default class NotificationMessage extends Component { 
    render() { 
        return ( 
            <div className={"notification-system-message " + (this.props.isError ? "notification-system-message--error" : "")} onClick={this.props.onClick}>
                <div className="container">
                    <p className="notification-system-message__description">{this.props.message}</p>
                    <p className="notification-system-message__subtitle">
                        Tap to dismiss
                        <Icon type={IconType.ArrowRight} />
                    </p>
                </div>
            </div> 
        )
    }
}
