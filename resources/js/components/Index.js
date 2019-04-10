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
import AssignEmployee from './AssignEmployee';
import TaskPage from './TaskPage';
import EmployeePage from './EmployeePage';
import ReactNotification from "react-notifications-component";
import EmployeeIndex from './EmployeeIndex';
import EmployeeCanvas from './EmployeeCanvas';
import EmployeeTaskPage from './EmployeeTaskPage';
import RateTaskPage from './RateTaskPage';
import "react-notifications-component/dist/theme.css";



export default class Index extends React.Component {
    state = {
        infobar: "",
        loggedIn: localStorage.getItem('usertoken') != null,
        isManager: localStorage.getItem('PMid') != null,
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
            dismiss: { duration: 3000 },
            dismissable: { click: true }           
          });
    }

    editLoggedIn = (loggedIn, isManager) => {
        this.setState({loggedIn: loggedIn});
        if(isManager) {
            this.getProjects(); /* I dont think this is best practice, maybe we should use a lifecycle method */
        } else {
            this.getProgrammerProjects();
        }
    }

    editManager = (isManager) => {
        this.setState({isManager: isManager});
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

    getProgrammerProjects = () => {
        if(this.state.loggedIn){
            axios.get('api/getProgrammerProjects', {
                params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                    Pid: localStorage.getItem('Pid')
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

    getProgrammerTasks = (Pid) => {
        /* console.log(Pid)
        console.log(localStorage.getItem('Pid')) */
        if(this.state.loggedIn){
            axios.get('api/getProgrammerTasks', {
                params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                    Pid: Pid,
                    ProgId: localStorage.getItem('Pid'),
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

    setInfobar = (text) => {
        this.setState({infobar: text});
    }

    render() {
        return (
            <HashRouter>
                <div style={{maxHeight:'100vh'}}>
                    <ReactNotification ref={this.notificationRef} /> 
                    <Header loggedIn={this.state.loggedIn} editLoggedIn={this.editLoggedIn} isManager={this.state.isManager}/>
                    <SideBar loggedIn={this.state.loggedIn} projects={this.state.projects} tasks={this.state.tasks} getProjects={this.getProjects} getProgrammerProjects={this.getProgrammerProjects} getTasks={this.getTasks} setInfobar={this.setInfobar} getProgrammerTasks={this.getProgrammerTasks} isManager={this.state.isManager}/>
                    {/* <InfoBar loggedIn={this.state.loggedIn} infobar={this.state.infobar} />   */}                                                         
                    <Switch>
                        <Route exact path="/" render={(props)=> <Login {...props} editLoggedIn={this.editLoggedIn} editManager={this.editManager} isManager={this.state.isManager} addNotification={this.addNotification} loggedIn={this.state.loggedIn} />} /> {/* we use render instead of component so we can add props */}
                        <Route path="/register" render={(props) => <Register {...props} loggedIn={this.state.loggedIn} addNotification={this.addNotification} />} />
                        <Route exact path="/index" render={(props)=> <Home {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/createProject" render={(props)=> <CreateProject {...props} loggedIn={this.state.loggedIn} getProjects={this.getProjects} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/search/:userId" render={(props)=> <Search {...props} loggedIn={this.state.loggedIn} isSearchFull={this.isSearchFull} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/project/:projectId" render={(props)=> <Canvas {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/employeePage/:id" render={(props)=> <EmployeePage {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/createTask/:projectId" render={(props)=> <CreateTask {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} getTasks={this.getTasks} />} />
                        <Route path="/index/assignEmployee/:projectId" render={(props)=> <AssignEmployee {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} getTasks={this.getTasks} />} />
                        <Route path="/index/addProgrammer" render={(props)=> <AddProgrammer {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/Task/:taskId" render={(props)=> <TaskPage {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/index/rateTask/:taskId" render={(props)=> <RateTaskPage {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} />} />


                        <Route exact path="/employeeIndex" render={(props)=> <EmployeeIndex {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/employeeIndex/project/:projectId" render={(props)=> <EmployeeCanvas {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} />} />
                        <Route path="/employeeIndex/Task/:taskId" render={(props)=> <EmployeeTaskPage {...props} loggedIn={this.state.loggedIn} infobar={this.state.infobar} addNotification={this.addNotification} />} />
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
