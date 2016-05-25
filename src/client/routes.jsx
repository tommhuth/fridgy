import React from 'react';
import { Route } from 'react-router';
import   App  from './app/App';
import   Items  from './items/Items';
import   Item  from './item/Item';
import   Restock  from './restock/Restock';
import   Home  from './home/Home';

export default (
    <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/items" component={Items} />
        <Route isSpecial={true} path="/items/:slug" component={Item} />
        <Route path="/stock-up" component={Restock} /> 
    </Route>
)