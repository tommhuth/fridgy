import React, { Component } from "react"
import Icon, { IconType } from "../../shared/Icon"
import Page from "../../app/Page"

export default class Home extends Component {
    render() {
        return (
            <Page>
                <div className="container">
                    <h1 className="beta offset-small">What’s in <br />that fridge?</h1>


                    <Icon type={IconType.Fridge} />
                </div>
            </Page>

        )
    }
}
