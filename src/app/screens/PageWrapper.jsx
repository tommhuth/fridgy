/**
 * Created by tomm.huth on 11/04/16.
 */
import React, {Component } from "react";
import { connect } from "react-redux";
import Nav from "../components/Nav";

class PageWrapper extends Component {
    render() {
        return (
            <div>
                <Nav menuVisibility={this.props.menuVisibility} 
                     toggleVisibility={this.props.toggleVisibility} />

                <main className="main">
                    
                        { this.props.children }
                     
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        menuVisibility: state.menuVisibility
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleVisibility: () => dispatch({type:"TOGGLE_MENU"})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper)