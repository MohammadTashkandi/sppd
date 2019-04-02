import React from 'react';
import {Spring} from 'react-spring/renderprops';

export default class TaskPage extends React.Component {

    buttonRef1 = React.createRef();
    buttonRef2 = React.createRef();
    statusRef = React.createRef();

    state={
        task:{},
        programmer:""
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
            if(res.data.status == "Resolved"){
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
                        <span><h4 className="prog-task-pm"><b>Task Title:</b>{this.state.task.title}</h4></span>
                        <span><h4 className="prog-task-pm" style={{textTransform:"capitalize"}}><b>Employee Assigned:</b>{this.state.programmer}</h4></span>
                        <span><h4 className="prog-task-pm"><b>Severity:</b>{this.state.task.severity}</h4></span>
                        <span><h4 className="prog-task-pm"><b>Status:</b><span ref={this.statusRef}>{this.state.task.status}</span></h4></span>
                        <button className="login-btn" ref={this.buttonRef1} style={{position:"absolute", marginLeft:'33rem', display:"none", borderColor:'rgb(105, 18, 18)', color: 'rgb(105, 18, 18)'}} onClick={this.closeTask}>Close This Task</button>
                        <button className="login-btn-2" ref={this.buttonRef2} style={{position:"absolute", marginLeft:'51rem', display:"none", borderColor:'red'}} onClick={this.reOpenTask}>Re-Open This Task</button>
                    </div>
                </div>
            )}
        </Spring>
            </React.Fragment>
        );
    }
}