{/* /Applications/Development/projects/laravelProjects/sppd/sppd (sppd directory) beta malk d5l */}
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
import CreateProject from './CreateProject'



export default class Index extends React.Component {
    state = {
        loggedIn: localStorage.getItem('usertoken') != null,
        projects: {},

    }

    editLoggedIn = (loggedIn) => {
        this.setState({loggedIn: loggedIn});
        this.getProjects(); /* I dont think this is best practice, maybe we should use a lifecycle method */
        console.log('editloggedin '+this.state.loggedIn);
    }

    getProjects = () => {
        if(this.state.loggedIn){
            axios.get('api/findProject', {
                params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                    PMid: localStorage.getItem('PMid')
                }
            })
            .then((res) => {
                if(res.status==200) {
                    this.setState({projects: res.data})
                }
            })
        }else{
            console.log('not logged in yet');
        }
    }
    
    render() {
        return (
            <HashRouter>
                <div history={this.props.history} style={{maxHeight:'100vh'}}> 
                    <Header loggedIn={this.state.loggedIn} editLoggedIn={this.editLoggedIn} />
                    <SideBar loggedIn={this.state.loggedIn} projects={this.state.projects}/>
                    <InfoBar loggedIn={this.state.loggedIn} />                              
                    <Switch>
                        <Route exact path="/" render={(props)=> <Login {...props} editLoggedIn={this.editLoggedIn} />} /> {/* we use render instead of component so we can add props */}
                        <Route path="/register" component={Register} />
                        <Route exact path="/index" component={Home} />
                        <Route path="/index/createProject" render={(props)=> <CreateProject {...props} getProjects={this.getProjects} />} />
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
