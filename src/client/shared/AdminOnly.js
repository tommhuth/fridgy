import React, { Component } from "react"
import { connect } from "react-redux"

export  class AdminOnly extends Component {
    render() {
        return (
            <div>
                {this.props.auth.data.level === 2 ? this.props.children : null}
            </div>
        )
    }
} 

export default connect(
    store => {
        return {
            auth: store.auth
        }
    }
)(AdminOnly)