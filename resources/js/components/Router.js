import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';

import NotFound from './NotFound';
import Canvas from './Canvas';
import Home from './Home';
import Search from './Search';
import Login from './Login';
import Index from './Index';



export default class Router extends React.Component {
    render() {
        return (
            <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/index" component={Index} />
                        <Route path="/index/search/:userId" component={Search} />
                        <Route path="/index/project/:projectId" component={Canvas} />
                        <Route component={NotFound} />
                    </Switch>
            </HashRouter>
            
        );
    }
}

ReactDOM.render(<Router/>, document.querySelector('#app'));
