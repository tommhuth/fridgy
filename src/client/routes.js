import React from "react"
import { Route } from "react-router"
import App from "./app/App"
import Items from "./items/Items"
import Item from "./item/Item"
import Home from "./home/Home"
import About from "./about/About"
import Checklist from "./checklist/Checklist"
import ItemEdit from "./item/ItemEdit"

export default (
    <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/items" component={Items} />
        <Route isSpecial={true} path="/items/:slug" component={Item} >
            <Route isSpecial={true} path="/items/:slug/edit" component={ItemEdit} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/checklist" component={Checklist} />
    </Route>
)