import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {Radar} from 'react-chartjs-2';
import {NavLink} from "react-router-dom";

export default class TaskPage extends React.Component {

    buttonRef1 = React.createRef();
    statusRef = React.createRef();
    dev1Ref = React.createRef();
    dev2Ref = React.createRef();
    dev3Ref = React.createRef();
    dev4Ref = React.createRef();

    state={
        task:{},
        programmer:"",
        barData:{}
    }

    componentDidMount(){
        this.loadTask();
        this.findProgrammer();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.match.params.taskId != this.props.match.params.taskId) {
            this.setState({
                task: {},
                programmer: "",
            });
            this.loadTask();
            this.findProgrammer();
        }
    }

    findProgrammer = () =>{
        axios.get('api/findTaskProgrammer',{
            params:{
                id: this.props.match.params.taskId
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({
                programmer: res.data.first_name + ' ' + res.data.last_name,
                PrID: res.data.id,
            });
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    loadTask = () =>{
        axios.get('api/getTaskInfo',{
            params:{
                id: this.props.match.params.taskId
            }
        })
        .then((res)=>{
            if(res.data.status == "Resolved" || ((res.data.status ==  "Closed") && (res.data.actualTCu == null))){
                this.buttonRef1.current.style.display = "inline";
                if(res.data.actualTCu != null){
                    this.dev1Ref.current.style.display = "none";
                    this.dev2Ref.current.style.display = "none";
                    this.dev3Ref.current.style.display = "none";
                    this.dev4Ref.current.style.display = "none";
                }

            }else{
                if(res.data.actualTCu != null){
                    this.dev1Ref.current.style.display = "none";
                    this.dev2Ref.current.style.display = "none";
                    this.dev3Ref.current.style.display = "none";
                    this.dev4Ref.current.style.display = "none";
                }
                this.buttonRef1.current.style.display = "none";
            }

            this.setState({
                task: res.data,
                barData:{ //the data here should also be dynamic depending on what the PM wants to see
                    labels: ['Judgement', 'Communication', 'Stress Tolerance', 'Technical'],
                    datasets:[ //here you mostly fill the data of the graph
                        {// this is an object that you fill in each point in the graph
                            label:'Required',
                            data:[
                                res.data.tCu,
                                res.data.tJud,
                                res.data.tStr,
                                res.data.tTech,
                            ],
                            backgroundColor:'rgb(255, 198, 0, 0.1)',
                            borderColor: 'rgb(255, 198, 0)',
                        },//these objects will be rendered for every label mentioned in the above array "labels"
                        {
                            label:'Actual',
                            data:[
                                res.data.actualTCu,
                                res.data.actualTJud,
                                res.data.actualTStr,
                                res.data.actualTTech,
                            ],
                            backgroundColor:'rgb(44, 135, 196, 0.1)',
                            borderColor: 'rgb(44, 135, 196)',
                        },
                    ]
                }
            });
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    closeTask = () =>{
        axios.post('api/setTaskStatusToClose',{
            id: this.props.match.params.taskId,
        })
        .then((res)=>{
            console.log(res)
            this.props.addNotification('Success', 'Closed Task Successfully', 'success');
            this.buttonRef1.current.style.display = "none";
            this.statusRef.current.innerText = "Closed"
            this.props.history.push(`/index/rateTask/${this.props.match.params.taskId}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    reOpenTask = () =>{
        axios.post('api/setTaskStatusToReOpened',{
            id: this.props.match.params.taskId,
        })
        .then((res)=>{
            console.log(res)
            this.props.addNotification('Success', 'Re-Opened Task Successfully', 'success');
            this.buttonRef1.current.style.display = "none";
            this.statusRef.current.innerText = "Reopened"
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render() {
        if(!this.props.loggedIn) {
            this.props.addNotification('Error', 'Please login first', 'danger');
            this.props.history.push('/');
        }
        return(
            <React.Fragment>
                <div className="info-bar">
                        <span className="decorative-box">i</span>
                        <span className="info-bar-page">Task</span>
                        <span className="info-bar-text">{this.props.infobar}</span>
                        
                </div>
                <hr className="hr" style={{margin:'0'}} />

                <Spring from={{opacity:0}} // you must wrap the part of the component you want animated in this spring syntax
            to={{opacity:1}}
            config={{duration:750}}
            >
            {props => (
                <div style={props}>
                    <div className="task-flex">
                        <div className="task-flex-box">
                            <div style={{marginTop:'2rem'}}>
                                <Radar height = '375' width = '700' //everything here can be dynamic depending on results 
                                    data={this.state.barData} //this should alawys be dynamic   
                                    options={{
                                        maintainAspectRatio: true,
                                        legend: {
                                            display: true
                                        },
                                        title:{ 
                                            display:true,
                                            text:'Task Skill Requirement Vs Actual Employee Performance', //this should also be dynamic
                                            fontSize:20,
                                        },
                                        scale: {
                                            ticks: {
                                                beginAtZero: true,
                                                min: 0,
                                                max: 5
                                            }
                                        }
                                    }}
                                    />
                            </div>

                            <div ref={this.buttonRef1} style={{display:"none", marginLeft:'10rem'}}>
                                <button className="login-btn"  style={{borderColor:'rgb(105, 18, 18)', color: 'rgb(105, 18, 18)'}} onClick={this.closeTask}>Close This Task</button>
                                <button className="login-btn-2"  style={{ borderColor:'red', marginLeft:"2rem"}} onClick={this.reOpenTask}>Re-Open This Task</button>
                            </div>
                        </div>
                        <div className="task-flex-box">
                            <div>
                                <h2 className="prog-task-header"><b>Task Information:</b></h2>                   
                                <h4 className="prog-task-pm" style={{textTransform:"capitalize"}}><b>Task Title:</b>{this.state.task.title}</h4>
                                <h4 className="prog-task-pm" style={{textTransform:"capitalize"}}><b>Employee Assigned:</b> {this.state.programmer}
                                            <span className="task-page-btn"><NavLink to={`/index/employeePage/${this.state.PrID}`} className="btn btn-default btn-sm" id="task-visit-page">
                                                <span className="glyphicon glyphicon-stats"></span> View Stats
                                            </NavLink></span></h4>
                                <h4 className="prog-task-pm"><b>Severity:</b>{this.state.task.severity}</h4>
                                <h4 className="prog-task-pm"><b>Status:</b><span ref={this.statusRef}>{this.state.task.status}</span></h4>                      
                            </div>
                            <div style={{marginTop:'4rem'}}>
                                <h2 className="prog-task-header" style={{color: '#019494'}}><b>Deviation <span style={{fontSize: '1.5rem'}}>(Negative = Below Required Level)</span> :</b></h2>
                                <h4 className="prog-task-pm-stat"><b>Stress Deviation: </b><span><span ref={this.dev1Ref}>N/A</span>{this.state.task.tStrDeviation}</span></h4>
                                <h4 className="prog-task-pm-stat"><b>Judgement Deviation: </b><span><span ref={this.dev2Ref}>N/A</span>{this.state.task.tJudDeviation}</span></h4>
                                <h4 className="prog-task-pm-stat"><b>Techincal Deviation: </b><span><span ref={this.dev3Ref}>N/A</span>{this.state.task.tTechDeviation}</span></h4>
                                <h4 className="prog-task-pm-stat"><b>Communication Deviation: </b><span><span ref={this.dev4Ref}>N/A</span>{this.state.task.tCuDeviation}</span></h4>
                            </div>
                        </div>
                </div>
            </div>
            )}
        </Spring>
            </React.Fragment>
        );
    }
}