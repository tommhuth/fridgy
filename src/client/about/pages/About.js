import React, { Component } from "react"
import Page from "../../app/Page"

export default class About extends Component {
    render() {
        return (
            <Page>
                <div className="about">
                    <div className="container">
                        <h1 className="about__title beta offset-small">About</h1>

                        <div className="about__description paragraphs">
                            <p className="intro-text">Tired of going grocery shopping only to end up with four ten donuts and none of that milk you really need?</p>
                            <p>So was I, so I made this to keep track of what I actually have in the fridge &mdash; but obviously mostly to play with NodeJS and React.</p>
                            <p>Made with NodeJS/Express + React.</p>
                            
                            <ul className="list list--bulleted">
                                <li>Hosted on Heroku.</li>
                                <li>Icons by Noun Project.</li>
                                <li>Fonts by Fonts.com.</li>
                                <li>Find this project on <a href="https://github.com/tommhuth/fridgy" className="link" target="_blank">GitHub</a>.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Page> 
        )
    }
}
