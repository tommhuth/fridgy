import React from 'react';
import { Route } from 'react-router';
import { App, Home, Items, Item, AddItem } from './containers';

export default (
    <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/items" component={Items} />
        <Route path="/stock-up" component={AddItem} />
        <Route path="/items/:slug" component={Item} />
    </Route>
)