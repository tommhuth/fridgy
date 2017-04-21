import React, { Component } from "react"   
import Icon, { IconType } from "../shared/Icon" 

export default class MealAdvisor extends Component { 
    render() {  
        return ( 
            <div className="fridge-outro"> 
                <Icon type={IconType.ChickenDinner} /> 
            </div> 
        )
    }
} 