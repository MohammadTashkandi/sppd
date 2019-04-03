import React from 'react';
import { withRouter } from 'react-router';
import {NavLink} from "react-router-dom";
/* import PropTypes from 'prop-types';*/

class SideBar extends React.Component {
    
    state = {
        currentlyUpdating: "",
    }

    projectPillsRef = React.createRef();
    taskPillsRef = React.createRef();
    backButtonRef = React.createRef();
    vPillsTab = React.createRef();
    vPillsTabContent = React.createRef();
    taskRef = React.createRef();
    projectsHeaderRef = React.createRef();
    tasksHeaderRef = React.createRef();
    
    componentDidMount() {
        if(this.props.isManager){
            this.props.getProjects();
        }
        else if(!this.props.isManager){
            this.props.getProgrammerProjects();
        }
      }

      /* componentDidUpdate(prevProps) {
        if(this.props.projects[0] !== prevProps.projects[0]) {
              console.log('didUpdate in');
              this.props.getProjects();
          }
      } */
    
    renderProject = (key) => {
        const project = this.props.projects[key];
        return(
            <React.Fragment key={key}>
                <div className="sidebar-seperator"></div>
                {/* dont need key here if parent has key i think */}
                <a key={key} onClick={()=> this.handleClick(key, event.target.innerText)} className="nav-link" id={"v-pills-"+key+"-tab"} data-toggle="pill" href={"#v-pills-"+key} role="tab" aria-controls={"#v-pills-"+key} aria-selected="false">{project}</a>
            </React.Fragment>
        );
    }

    renderTask = (key) => {
        const taskIds = Object.keys(this.props.tasks);
        
            return(             
                <div key={key} ref={this.taskRef} className="tab-pane fade" id={"v-pills-"+key} role="tabpanel" aria-labelledby={"v-pills-"+key+"-tab"}>
                    {taskIds.map((id) => {
                        const task = this.props.tasks[id];
                        var link = "";
                        if(this.props.isManager){
                            link = `/index/Task/${task.id}`
                        }else{
                            link = `/employeeIndex/Task/${task.id}`
                        }
                        if(task.Pid == this.state.currentlyUpdating) {
                            return (
                                <React.Fragment key={id}>
                                    <div className="sidebar-task-seperator"></div>
                                    {/* dont need key here if parent has key i think */}
                                    <NavLink key={id} className="sidebar-task" to={`${link}`} onClick={() => this.props.setInfobar(event.target.innerText)} style={{textTransform:"capitalize"}}>{task.title}</NavLink>
                                </React.Fragment>
                                );
                            }
                    })}
                </div>
            );
    }
    
    handleClick = (key,pName) => {
        if(this.props.isManager) {
            this.props.getTasks(key);
        } else {
            this.props.getProgrammerTasks(key);
        }
        this.setState({currentlyUpdating:key});
        this.changePath(key);
        this.props.setInfobar(pName);
        this.animateSideBar();
    }

    animateSideBar = () => {
        if(this.projectPillsRef.current.className=='active'){
            this.projectPillsRef.current.className='inactive';
            this.projectPillsRef.current.style.width='15%';
            this.taskPillsRef.current.style.width='85%';
            this.vPillsTabContent.current.style.display='block';
            this.vPillsTab.current.style.display='none';
            this.backButtonRef.current.style.display='block';
            this.projectsHeaderRef.current.style.display="none";
            this.tasksHeaderRef.current.style.display="block";
            
        }else if(this.projectPillsRef.current.className=='inactive') {
            this.projectPillsRef.current.className='active';
            this.projectPillsRef.current.style.width="90%";
            this.taskPillsRef.current.style.width="10%";
            this.vPillsTabContent.current.style.display='none';
            this.vPillsTab.current.style.display='block';
            this.backButtonRef.current.style.display='none';
            this.projectsHeaderRef.current.style.display="block";
            this.tasksHeaderRef.current.style.display="none";
        }
    }

    changePath = (key) => { 
        if(this.props.isManager){
            this.props.history.push(`/index/project/${key}`);  /* put / before project to make it work correctly */
        } 
        else if(!this.props.isManager){
            this.props.history.push(`/employeeIndex/project/${key}`);  /* put / before project to make it work correctly */
        }   
    }

    render() {
        const projectIds = Object.keys(this.props.projects);
        
        const loggedIn=this.props.loggedIn;
        if(!loggedIn) {
            console.log('sidebar '+loggedIn);
            return(null);
        }else {
            return (
                <div style={{width:'20%'}}>
                    <div id="project-pills" className="active" ref={this.projectPillsRef}>
                        <h2 ref={this.projectsHeaderRef} className="sidebar-header-projects">Projects</h2>
                        <button className="btn btn-outline-primary" id="back-button" onClick={this.animateSideBar} ref={this.backButtonRef}>&#8678;</button>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" ref={this.vPillsTab} role="tablist" aria-orientation="vertical">
                            {projectIds.map(this.renderProject)}
                        </div>
                    </div>
                    <div id="task-pills" ref={this.taskPillsRef}>
                    <h2 ref={this.tasksHeaderRef} className="sidebar-header-tasks">Tasks</h2>
                        <div className="tab-content" id="v-pills-tabContent" ref={this.vPillsTabContent} style={{display:'none', margin:'1em'}}>
                                {projectIds.map(this.renderTask)}
                        </div>
                    </div>
                </div> 
            );
        }
    }
}

export default withRouter(SideBar); {/* to get props */}