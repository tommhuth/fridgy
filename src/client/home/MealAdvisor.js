import React, { Component } from "react"  
import sort from "sort-array"
import ListItem from "../items/ListItem" 
import Select, { SelectStyle } from "../shared/Select"
import Cloak from "../shared/Cloak"
import Icon, { IconType } from "../shared/Icon"

export default class MealAdvisor extends Component {
    pageSize = 4
    state = {
        tag: "dinner",
        page: 0
    }

    hasMorePages(items, tag) {
        let pages = Math.ceil(items.filter(i => i.tags.includes(tag)).length / this.pageSize)

        return this.state.page < pages - 1
    }
    incrementPage() { 
        this.setState({ page: this.state.page + 1})
    }
    onTagChange(value) { 
        this.setState({ tag: value, page: 0 })
    }
    getTags(items) {
        let result = []

        for(let item of items) {
            for(let tag of item.tags) {
                if(!result.includes(tag)) {
                    result.push(tag)
                }
            }
        }

        if(!result.length) {
            result.push("dinner")
        }

        return result
    }
    filter(items, tag) { 
        return sort(
            items.filter(i => i.tags.includes(tag)),
            "title" 
        ).slice(0, (this.state.page + 1) * this.pageSize)
    }
    getLoadMoreButton(){
        return (
            <button type="button"  className="meal-advisor__load-more" onClick={this.incrementPage.bind(this)}>
                <Icon type={IconType.ArrowDown} />
                <span className="visually-hidden">Load more</span>
            </button>
        )
    }
    render() { 
        let items = this.props.items.data
        let tag = this.state.tag  

        return ( 
            <div className="meal-advisor">
                <div className="container "> 
                    <div className="container-restricted">
                        <div className="center-text"> 
                            <h2 className="visually-hidden">{tag}</h2>
                            <Select 
                                selectedText={tag} 
                                selectedValue={tag} 
                                style={SelectStyle.Plain} 
                                onChange={this.onTagChange.bind(this)}>    
                                {this.getTags(items).map(i => <option value={i} key={i}>{i}</option>)}
                            </Select>
                        </div> 

                        <Cloak if={this.props.items.isLoading} >
                            <ul className="meal-advisor__list">
                                {sort(this.filter(items, tag), "title").map(i => <li key={i.id}><ListItem item={i} /> </li>)}
                            </ul>
                        
                            { this.hasMorePages(items, tag) ? this.getLoadMoreButton() : null }
                        </Cloak>
                        
                    </div> 
                </div>  
            </div>   
        )
    }
} 