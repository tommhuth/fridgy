import React, { Component } from "react"
import { connect } from "react-redux"

export  class AdminOnly extends Component {
    render() {
        let Wrapper = this.props.element || "div"

        return (
            <Wrapper>
                {this.props.auth.data.level === 2 ? this.props.children : null}
            </Wrapper>
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