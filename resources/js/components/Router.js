import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './Index';
import NotFound from './NotFound';
import Search from './Search';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/search" component={Search} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Router;