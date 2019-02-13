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
    
    renderProject = (key) => {
        const project = this.props.projects[key];
        return(
                <a key={key} onClick={()=> this.handleClick(key)} className="nav-link" id={"v-pills-"+key+"-tab"} data-toggle="pill" href={"#v-pills-"+key} role="tab" aria-controls={"#v-pills-"+key} aria-selected="false">{project.name}</a>
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

    handleClick = (key) => {
        this.animateSideBar();
        this.changePath(key);
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
        this.props.history.push(`project/${key}`);
    }

    render() {
        const projectIds = Object.keys(this.props.projects);

        return (
                <div style={{width:'20%'}}>
                    <div id="project-pills" className="active" ref={this.projectPillsRef}>{/* this should be added from state */}
                        <button className="btn btn-outline-primary" id="back-button" onClick={this.animateSideBar} ref={this.backButtonRef}>&#8678;</button>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" ref={this.vPillsTab} role="tablist" aria-orientation="vertical">
                            {projectIds.map(this.renderProject)}
                            {/* <a onClick={this.handleClick} className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false">Home</a>
                            <a onClick={this.handleClick} className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                            <a onClick={this.handleClick} className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                            <a onClick={this.handleClick} className="nav-link active show" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="true">Settings</a> */}
                        </div>
                    </div>
                    <div id="task-pills" ref={this.taskPillsRef}>
                        <div className="tab-content" id="v-pills-tabContent" ref={this.vPillsTabContent} style={{display:'none', margin:'1em'}}>
                            {projectIds.map(this.renderTask)}
                            {/* <div className="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <p>Cillum ad ut irure tempor velit nostrud occaecat ullamco aliqua anim Lorem sint. Veniam sint duis incididunt do esse magna mollit excepteur laborum qui. Id id reprehenderit sit est eu aliqua occaecat quis et velit excepteur laborum mollit dolore eiusmod. Ipsum dolor in occaecat commodo et voluptate minim reprehenderit mollit pariatur. Deserunt non laborum enim et cillum eu deserunt excepteur ea incididunt minim occaecat.</p>
                            </div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <p>Culpa dolor voluptate do laboris laboris irure reprehenderit id incididunt duis pariatur mollit aute magna pariatur consectetur. Eu veniam duis non ut dolor deserunt commodo et minim in quis laboris ipsum velit id veniam. Quis ut consectetur adipisicing officia excepteur non sit. Ut et elit aliquip labore Lorem enim eu. Ullamco mollit occaecat dolore ipsum id officia mollit qui esse anim eiusmod do sint minim consectetur qui.</p>
                            </div>
                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                <p>Fugiat id quis dolor culpa eiusmod anim velit excepteur proident dolor aute qui magna. Ad proident laboris ullamco esse anim Lorem Lorem veniam quis Lorem irure occaecat velit nostrud magna nulla. Velit et et proident Lorem do ea tempor officia dolor. Reprehenderit Lorem aliquip labore est magna commodo est ea veniam consectetur.</p>
                            </div>
                            <div className="tab-pane fade active show" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                <p>Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.</p>
                            </div> */}
                        </div>
                    </div>
                </div>  
        );
    }
}

export default withRouter(SideBar); {/* to get props */}