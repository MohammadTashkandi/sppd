import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './Index';
import NotFound from './NotFound';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Router;