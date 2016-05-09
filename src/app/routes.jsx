import React from 'react';
import { Route } from 'react-router';
import PageWrapper from './screens/PageWrapper';
import ItemsPage from "./screens/ItemsPage";
import AddItemPage from "./screens/AddItemPage";
import StartPage from "./screens/StartPage"

export default (
    <Route component={PageWrapper}>
        <Route path="/" component={StartPage} />
        <Route path="/items" component={ItemsPage} />
        <Route path="/add-item" component={AddItemPage} />
    </Route>
)