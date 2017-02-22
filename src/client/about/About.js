import React, { Component } from "react"

export default class About extends Component {
    render() {
        return (
            <div className="container page-bottom-margin">
                <h1 className="beta offset-small">About</h1>

                <p className="text intro">Tired of going grocery shopping only to end up with four packets of butter and none of that milk you really needed?</p>

                <div className="text-container">
                    <p className="text">So was I, so I made this to keep track of what I actually have in the fridge. But mostly to play with Laravel and Angular. And did I just use up my big, bold Helvetica design?</p>
                    <p className="text">Made with NodeJS/Express + React.</p>
                </div>

                <div className="text-container">
                    <ul className="list-bulleted">
                        <li>Icons by Noun Project.</li>
                        <li>Font hosting by Fonts.com.</li>
                        <li>Find this project on <a href="/fridge" target="_self">GitHub</a>.</li>
                    </ul>
                </div>
            </div>
        )
    }
}
