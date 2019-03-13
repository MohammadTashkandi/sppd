{/* /Applications/`Development/projects/laravelProjects/sppd/sppd (sppd directory) beta malk d5l */}
{/*dmrtk zeta */}
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';

import NotFound from './NotFound';
import Header from './Header';
import SideBar from './SideBar';
import Canvas from './Canvas';
import Home from './Home';
import Search from './Search';
import Login from './Login';
import Register from './Register';
import CreateProject from './CreateProject';
import CreateTask from './CreateTask';
import AddProgrammer from './AddProgrammer';
import AssignEmployee from './AssignEmployee';



export default class Index extends React.Component {
    state = {
        infobar: "",
                loggedIn: localStorage.getItem('usertoken') != null,
        projects: {},

    }

    editLoggedIn = (loggedIn) => {
        this.setState({loggedIn: loggedIn});
        //this.getProjects(); /* I dont think this is best practice, maybe we should use a lifecycle method */
        console.log('editloggedin '+ this.state.loggedIn);
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

    setInfobar = (text) => {
        this.setState({infobar: text});
    }
    
    render() {
        const key = Math.random() * 1000;
        return (
            <HashRouter>
                <div history={this.props.history} style={{maxHeight:'100vh'}}> 
                    <Header loggedIn={this.state.loggedIn} editLoggedIn={this.editLoggedIn}/>
                    <SideBar loggedIn={this.state.loggedIn} projects={this.state.projects} getProjects={this.getProjects} setInfobar={this.setInfobar} />
                    {/* <InfoBar loggedIn={this.state.loggedIn} infobar={this.state.infobar} />   */}                                                         
                    <Switch>
                        <Route exact path="/" render={(props)=> <Login {...props} editLoggedIn={this.editLoggedIn}/>} /> {/* we use render instead of component so we can add props */}
                        <Route path="/register" component={Register} />
                        <Route exact path="/index" render={(props)=> <Home {...props} infobar={this.state.infobar} />} />
                        <Route path="/index/createProject" render={(props)=> <CreateProject {...props} getProjects={this.getProjects} infobar={this.state.infobar} />} />
                        <Route path="/index/search/:userId" render={(props)=> <Search {...props} infobar={this.state.infobar} />} />
                        <Route path="/index/project/:projectId" render={(props)=> <Canvas {...props} infobar={this.state.infobar} />} />
                        <Route path="/index/assignEmployee/:projectId" render={(props)=> <AssignEmployee {...props} infobar={this.state.infobar} />} />
                        <Route path="/index/createTask/:projectId" render={(props)=> <CreateTask {...props} infobar={this.state.infobar} />} />
                        <Route path="/index/addProgrammer" render={(props)=> <AddProgrammer {...props} infobar={this.state.infobar} />} />
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
