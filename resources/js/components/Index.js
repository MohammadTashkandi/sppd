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
import Login from './Login';
import Register from './Register';



export default class Index extends React.Component {
    state = {
        loggedIn: localStorage.getItem('usertoken') != null,
        projects: {
            project1:{name:"Project 1", task1:"Fix that", task2:"repair that", task3:"do that" },
            project2:{name: "Project 2", task1:"Fix what", task2:"repair what", task3:"do what" },
            project3:{name: "Project 3", task1:"Fix this", task2:"repair this", task3:"do this" },
            project4:{name: "Project 4", task1:"Fix who", task2:"repair who", task3:"do who" },
        },

    }

    editLoggedIn = (loggedIn) => {
        this.setState({loggedIn: loggedIn});
    }
    
    render() {
        return (
            <HashRouter>
                <div history={this.props.history} style={{maxHeight:'100vh'}}> 
                    <Header loggedIn={this.state.loggedIn} editLoggedIn={this.editLoggedIn} />
                    <SideBar loggedIn={this.state.loggedIn} projects={this.state.projects}/>
                    <InfoBar loggedIn={this.state.loggedIn} />                              
                    <Switch>
                        <Route exact path="/" render={(props)=> <Login {...props} editLoggedIn={this.editLoggedIn} />} />{/* we use render instead of component so we can add props */}
                        <Route path="/register" component={Register} />
                        <Route exact path="/index" component={Home} />
                        <Route path="/index/search/:userId" component={Search} />
                        <Route path="/index/project/:projectId" component={Canvas} />
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
