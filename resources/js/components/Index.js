import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';

import NotFound from './NotFound';
import Header from './Header';
import SideBar from './SideBar';
import Canvas from './Canvas';
import InfoBar from './InfoBar';
import Home from './Home';
import Search from './Search';



export default class Index extends React.Component {
    state = {
        projects: {
            project1:{name:"Project 1", task1:"Fix that", task2:"repair that", task3:"do that" },
            project2:{name: "Project 2", task1:"Fix what", task2:"repair what", task3:"do what" },
            project3:{name: "Project 3", task1:"Fix this", task2:"repair this", task3:"do this" },
            project4:{name: "Project 4", task1:"Fix who", task2:"repair who", task3:"do who" },
        },
    }

    render() {
        return (
            <HashRouter>
                <div history={this.props.history} style={{maxHeight:'100vh'}}> 
                        <Header />
                        <SideBar projects={this.state.projects}/>
                        <InfoBar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/search/:userId" component={Search} />
                        <Route path="/project/:projectId" component={Canvas} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </HashRouter>
            
        );
    }
}



if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
