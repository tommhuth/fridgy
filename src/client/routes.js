import React from "react"
import { Route, IndexRoute } from "react-router"
import AppSpecial from "./app/AppSpecial"
import AppPlain from "./app/AppPlain"
import Items from "./items/pages/Items"
import Item from "./item/pages/Item"
import Home from "./home/pages/Home"
import About from "./about/pages/About"
import Checklist from "./checklist/pages/Checklist"
import ItemEdit from "./item/pages/ItemEdit"

export default (
    <Route>
        <Route component={AppPlain}>
            <IndexRoute component={Home} />
            <Route path="/about" component={About} />
            <Route path="/checklist" component={Checklist} />
            <Route path="/items" component={Items} />
        </Route>
        <Route component={AppSpecial}>
            <Route path="/items/:slug" component={Item} >
                <Route path="/items/:slug/edit" component={ItemEdit} />
            </Route>
        </Route>
    </Route>
)