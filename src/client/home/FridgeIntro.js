import React, { Component } from "react"   
import Icon, { IconType } from "../shared/Icon"
import { Link } from "react-router"

export default class MealAdvisor extends Component { 
    render() {  
        return ( 
            <div className="fridge-intro">
                <div className="container">
                    <h1 className="fridge-intro__title beta">What’s in <br />that fridge</h1>
                    <p className="fridge-intro__description intro-text">Lorem ipsum dolor sit amet, consectetur adipiscing, suspendisse nisl ante, maximus ac feugia </p>    
                    <Link to="/items" className="fridge-intro__link">
                        Browse
                        <Icon type={IconType.ArrowRight} />
                    </Link>
                </div>
            </div> 
        )
    }
} 