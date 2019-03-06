import React from 'react';
import { withRouter } from 'react-router';
/* import PropTypes from 'prop-types';*/

class SideBar extends React.Component {
    /* To get props */
    /* static propTypes = { 
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      } */

    projectPillsRef = React.createRef();
    taskPillsRef = React.createRef();
    backButtonRef = React.createRef();
    vPillsTab = React.createRef();
    vPillsTabContent = React.createRef();
    
      componentWillMount() {
          this.props.getProjects();
      }

      /* componentDidUpdate() {
          this.props.getProjects();
      } */

    renderProject = (key) => {
        const project = this.props.projects[key];
        console.log(project);
        return(
                <a key={key} onClick={()=> this.handleClick(key, event.target.innerText)} className="nav-link" id={"v-pills-"+key+"-tab"} data-toggle="pill" href={"#v-pills-"+key} role="tab" aria-controls={"#v-pills-"+key} aria-selected="false">{project}</a>
        );
    }

    renderTask = (key) => {
        const project = this.props.projects[key];
        return(
            <div key={key} className="tab-pane fade" id={"v-pills-"+key}role="tabpanel" aria-labelledby={"v-pills-"+key+"-tab"}>
                <a>{project.task1}</a> {/* How do I loop over every task in a project dynamically */}
            </div>
        );
    }

    handleClick = (key,pName) => {
        this.animateSideBar();
        this.changePath(key);
        const info = {page:"Project", text:pName};
        this.props.setInfobar(info);
    }

    animateSideBar = () => {
        if(this.projectPillsRef.current.className=='active'){
            this.projectPillsRef.current.className='inactive';
            this.projectPillsRef.current.style.width='15%';
            this.taskPillsRef.current.style.width='85%';
            this.vPillsTabContent.current.style.display='block';
            this.vPillsTab.current.style.display='none';
            this.backButtonRef.current.style.display='block';

            
        }else if(this.projectPillsRef.current.className=='inactive') {
            this.projectPillsRef.current.className='active';
            this.projectPillsRef.current.style.width="90%";
            this.taskPillsRef.current.style.width="10%";
            this.vPillsTabContent.current.style.display='none';
            this.vPillsTab.current.style.display='block';
            this.backButtonRef.current.style.display='none';
        }
    }

    changePath = (key) => {     
            this.props.history.push(`/index/project/${key}`);  /* put / before project to make it work correctly */
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
                    <div id="project-pills" className="active" ref={this.projectPillsRef}>{/* this should be added from state */}
                        <button className="btn btn-outline-primary" id="back-button" onClick={this.animateSideBar} ref={this.backButtonRef}>&#8678;</button>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" ref={this.vPillsTab} role="tablist" aria-orientation="vertical">
                            {projectIds.map(this.renderProject)}
                        </div>
                    </div>
                    <div id="task-pills" ref={this.taskPillsRef}>
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