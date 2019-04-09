import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {Radar} from 'react-chartjs-2';

export default class TaskPage extends React.Component {

    buttonRef1 = React.createRef();
    buttonRef2 = React.createRef();
    statusRef = React.createRef();

    state={
        task:{},
        programmer:"",
        barData:{ //the data here should also be dynamic depending on what the PM wants to see
            labels: ['Judgement', 'Communication', 'Stress Tolerance', 'Technical'],
            datasets:[ //here you mostly fill the data of the graph
                {// this is an object that you fill in each point in the graph
                    label:'Required',
                    data:[3,2,4,5],
                    backgroundColor:'rgb(255, 198, 0, 0.1)',
                    borderColor: 'rgb(255, 198, 0)',
                },//these objects will be rendered for every label mentioned in the above array "labels"
                {
                    label:'Actual',
                    data:[3,2,4,4],
                    backgroundColor:'rgb(44, 135, 196, 0.1)',
                    borderColor: 'rgb(44, 135, 196)',
                },
            ]
        }
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
           this.setState({programmer: res.data.first_name + ' ' + res.data.last_name});
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
            if(res.data.status == "Resolved" || ((res.data.status ==  "Closed") && (res.data.actualTCU == null))){
                this.buttonRef1.current.style.display = "block";
                this.buttonRef2.current.style.display = "block";
            }else{
                this.buttonRef1.current.style.display = "none";
                this.buttonRef2.current.style.display = "none";
            }
            this.setState({task: res.data});
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
            this.buttonRef2.current.style.display = "none";
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
            this.buttonRef2.current.style.display = "none";
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
                    <div>
                        <span><h2 className="prog-task-header"><b>Task Information:</b></h2></span>                    
                        <span><h4 className="prog-task-pm" style={{textTransform:"capitalize"}}><b>Task Title:</b>{this.state.task.title}</h4></span>
                        <span><h4 className="prog-task-pm" style={{textTransform:"capitalize"}}><b>Employee Assigned:</b>{this.state.programmer}</h4></span>
                        <span><h4 className="prog-task-pm"><b>Severity:</b>{this.state.task.severity}</h4></span>
                        <span><h4 className="prog-task-pm"><b>Status:</b><span ref={this.statusRef}>{this.state.task.status}</span></h4></span>                        
                    </div>
                    <div style={{marginLeft:"79rem", marginTop:"-31.5rem", position:'absolute'}}>

                        <Radar height = '350' width = '800' //everything here can be dynamic depending on results 
                            data={this.state.barData} //this should alawys be dynamic   
                            options={{
                                maintainAspectRatio: true,
                                legend: {
                                    display: true
                                    },
                                    title:{ 
                                        display:true,
                                        text:'Task Skill Requirement Level', //this should also be dynamic
                                        fontSize:25,
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
                    <div className="deviation-container">
                        <span><h4 className="prog-task-pm-stat"><b>Stress Deviation (Negative = Below Required Level):</b><span>{this.state.task.tStrDeviation}</span></h4></span>
                        <span><h4 className="prog-task-pm-stat"><b>Judgement Deviation (Negative = Below Required Level):</b><span>{this.state.task.tJudDeviation}</span></h4></span>
                        <span><h4 className="prog-task-pm-stat"><b>Techincal Deviation (Negative = Below Required Level):</b><span>{this.state.task.tTechDeviation}</span></h4></span>
                        <span><h4 className="prog-task-pm-stat"><b>Communication Deviation (Negative = Below Required Level):</b><span>-{this.state.task.tCuDeviation}</span></h4></span>
                    </div>
                    <button className="login-btn" ref={this.buttonRef1} style={{display:"none", borderColor:'rgb(105, 18, 18)', marginLeft:"45rem", color: 'rgb(105, 18, 18)'}} onClick={this.closeTask}>Close This Task</button>
                        <button className="login-btn-2" ref={this.buttonRef2} style={{display:"none", borderColor:'red', marginLeft:"43.7rem"}} onClick={this.reOpenTask}>Re-Open This Task</button>
                </div>
            )}
        </Spring>
            </React.Fragment>
        );
    }
}