import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {Radar} from 'react-chartjs-2';

export default class EmployeeTaskPage extends React.Component {
    statusRef = React.createRef();
    buttonRef = React.createRef();

    state = {
        task:{},
        barData:{},
    }

    componentDidMount(){
        this.loadTask();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.match.params.taskId != this.props.match.params.taskId) {
            this.setState({
                task: {},
                barData: {},
            });
            this.loadTask();
        }
    }

    loadTask = () =>{
        axios.get('api/getTaskInfo',{
            params:{
                id: this.props.match.params.taskId
            }
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data.status == "New-assigned" || res.data.status == "Progress" || res.data.status == "Re-Opened"){
                this.buttonRef.current.style.display = "block";
            }else{
                this.buttonRef.current.style.display = "none";
            }
            this.setState({task: res.data});
            this.setState({
                barData:{ //the data here should also be dynamic depending on what the PM wants to see
                    labels: ['Judgement', 'Communication', 'Stress Tolerance', 'Technical'],
                    datasets:[ //here you mostly fill the data of the graph
                        {// this is an object that you fill in each point in the graph
                            label:'',
                            data:[res.data.tJud,res.data.tCu,res.data.tStr,res.data.tTech],
                            backgroundColor:'rgb(247, 199, 111, 0.4)',
                            borderColor: 'orange',
                        },//these objects will be rendered for every label mentioned in the above array "labels"
                    ]
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onClick = () =>{
        axios.post('api/changeTaskStatus',{
                id: this.props.match.params.taskId,
                number: 0
        })
        .then((res)=>{
            console.log(res)
            if(res.data == "Progress"){
                this.statusRef.current.innerText = "Progress"
            }else if(res.data == "Resolved"){
                this.statusRef.current.innerText = "Resolved"
                this.buttonRef.current.style.display = "none";
            }else if(res.data == "Re-Opened"){
                this.statusRef.current.innerText = "Re-Opened"
            }
            this.props.addNotification('Success', 'Status Transition Successful', 'success');
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
                    <span className="info-bar-text">Task Info Page</span>
                    <span>
                            
                    </span>
                </div>
                <hr className="hr" style={{margin:'0'}} />
            <Spring from={{opacity:0}} // you must wrap the part of the component you want animated in this spring syntax
            to={{opacity:1}}
            config={{duration:750}}
            >
            {props => (
                
                <div style={props}>
                <div>
                    <div style={{marginLeft:"83rem", position:'absolute'}}>

                        <Radar height = '350' width = '800' //everything here can be dynamic depending on results 
                            data={this.state.barData} //this should alawys be dynamic   
                            options={{
                                maintainAspectRatio: true,
                                legend: {
                                    display: false
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
                    
                    <span><h2 className="prog-task-header"><b>Task Information:</b></h2></span>                    
                    <span><h4 className="prog-task" style={{textTransform:"capitalize"}}><b>Task Title:</b>{this.state.task.title}</h4></span>
                    <span><h4 className="prog-task"><b>Severity:</b>{this.state.task.severity}</h4></span>
                    <span><h4 className="prog-task"><b>Status:</b><span ref={this.statusRef}>{this.state.task.status}</span></h4></span>
                    <button className="login-btn" ref={this.buttonRef} style={{marginBottom:'2rem', marginTop:'4rem', marginLeft:'37rem', display:"none"}} onClick={this.onClick}>Transition to The Next Phase</button>
                    </div>
                </div>
            )}
        </Spring>
        </React.Fragment>
            );
    }
}