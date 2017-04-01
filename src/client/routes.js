import React from "react"
import { Route } from "react-router" 
import Wrapper from "./app/Wrapper"
import Items from "./items/pages/Items"
import Item from "./item/pages/Item"
import Home from "./home/pages/Home"
import About from "./about/pages/About"
import Checklist from "./checklist/pages/Checklist"
import ItemEdit from "./item/pages/ItemEdit"

function SpecialWrapper(props){
    return <Wrapper isSpecial={true} {...props}/>
}

export default (
    <Route>
        <Route component={Wrapper}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/checklist" component={Checklist} />
            <Route path="/items" component={Items} />
            <Route path="/items/:slug/edit" component={ItemEdit} />
        </Route>
        <Route component={SpecialWrapper}>
            <Route path="/items/:slug" component={Item} />
        </Route>
    </Route>
)