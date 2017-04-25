import React, { Component } from "react"
import { connect } from "react-redux"  
import Login from "./Login"

class AuthGate extends Component {  
    render() { 
        return (
            <div>
                {this.props.auth.data.level ? this.props.children : <Login /> }
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
)(AuthGate)