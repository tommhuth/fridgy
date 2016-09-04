import React, { Component } from "react"
import Icon from "../shared/Icon"

export default class Home extends Component {
    render(){
        return (
            <div className="container">
                <h1 className="beta offset-small">What’s in <br/>that fridge?</h1>

                <fieldset className="search input-pair">
                    <legend className="visually-hidden">Search the fridge</legend>

                    <label className="visually-hidden" for="keyword">Search term</label>
                    <input className="input"
                           name="keyword"
                           id="keyword"
                           autocomplete="off"
                           type="text"
                           placeholder="Search..." />

                        <button
                            type="submit"
                            tabindex="-1">
                            <Icon title="magnifier" />
                            <span className="visually-hidden">Find or create</span>
                        </button>

                </fieldset>
            </div>
        )
    }
}
