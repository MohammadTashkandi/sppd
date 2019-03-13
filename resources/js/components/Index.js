{/*
 /Applications/Development/projects/laravelProjects/sppd/sppd
 */}
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
import TaskPage from './TaskPage';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";



export default class Index extends React.Component {
    state = {
        infobar: "",
        searchFull: false,
        loggedIn: localStorage.getItem('usertoken') != null,
        projects: {},
        tasks: {},
    }

    notificationRef = React.createRef();

    addNotification = (title, message, type) => {
        this.notificationRef.current.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 1500 },
            dismissable: { click: true }           
          });
    }

    editLoggedIn = (loggedIn) => {
        this.setState({loggedIn: loggedIn});
        this.getProjects(); /* I dont think this is best practice, maybe we should use a lifecycle method */
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

    getTasks = (Pid) => {
        if(this.state.loggedIn){
            axios.get('api/getTasks', {
                params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                    Pid: Pid,
                }
            })
            .then((res) => {
                if(res.status == 200) {
                    this.setState({tasks: res.data})
                    console.log(this.state.tasks);
                }else if(res.status == 404){
                    console.log(res.data);
                }
            })
        }else{
            console.log('not logged in yet');
        }
    }

    isSearchFull = (bool) =>{
        /* console.log(bool) //here it says true
        this.setState({searchFull: bool}); //i set it to state
        console.log(this.state.searchFull); //state still stays false???? */
    }

    setInfobar = (text) => {
        this.setState({infobar: text});
    }

    render() {
        return (
            <HashRouter>
                <div style={{maxHeight:'100vh'}}>
                    <ReactNotification ref={this.notificationRef} /> 
                    <Header loggedIn={this.state.loggedIn} editLoggedIn={this.editLoggedIn} isSearchFull={this.isSearchFull} searchFull={this.state.searchFull}/>
                    <SideBar loggedIn={this.state.loggedIn} projects={this.state.projects} tasks={this.state.tasks} getProjects={this.getProjects} getTasks={this.getTasks} setInfobar={this.setInfobar} />
                    {/* <InfoBar loggedIn={this.state.loggedIn} infobar={this.state.infobar} />   */}                                                         
                    <Switch>
                        <Route exact path="/" render={(props)=> <Login {...props} editLoggedIn={this.editLoggedIn} addNotification={this.addNotification} />} /> {/* we use render instead of component so we can add props */}
                        <Route path="/register" render={(props) => <Register {...props} addNotification={this.addNotification} />} />
                        <Route exact path="/index" render={(props)=> <Home {...props} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/createProject" render={(props)=> <CreateProject {...props} getProjects={this.getProjects} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/search/:userId" render={(props)=> <Search {...props} isSearchFull={this.isSearchFull} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/project/:projectId" render={(props)=> <Canvas {...props} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/createTask/:projectId" render={(props)=> <CreateTask {...props} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/addProgrammer" render={(props)=> <AddProgrammer {...props} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/Task/:taskId" render={(props)=> <TaskPage {...props} infobar={this.state.infobar} addNotification={this.addNotification} />} />
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
