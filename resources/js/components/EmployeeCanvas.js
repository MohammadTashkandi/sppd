import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {Bar,Line, Pie} from 'react-chartjs-2';

export default class EmployeeCanvas extends React.Component {
    
    state = {
        lineData:{},
        pieData:{},
        graphData:{},
        pieData2:{},
    }

    componentDidMount(){
        this.loadStatistics();
        this.getFailedTasks();
        this.getTaskNumbers();
        this.getSeverityNumbers();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.match.params.projectId != this.props.match.params.projectId) {
            this.setState({
                lineData: {}
            });
            this.loadStatistics();
            this.getFailedTasks();
            this.getTaskNumbers();
            this.getSeverityNumbers();

        }
    }

    getFailedTasks = () =>{
        axios.get('api/getFailedTasksForProgrammerInProject',{
            params:{
                PrId: localStorage.getItem('Pid'),
                Pid: this.props.match.params.projectId
            }
        })
        .then((res)=>{
            console.log(res.data)
            //failed then completed
            this.setState({
                pieData:{ //the data here should also be dynamic depending on what the PM wants to see
                    labels: ['Completed', 'Failed'], //Bar names
                    datasets:[ //here you mostly fill the data of the grap
                        {// this is an object that you fill in each point in the graph
                            label:'Number of Tasks',
                            data:[res.data[1],res.data[0]],
                            backgroundColor: [
                                'green',
                                'red',
                            ],
                            hoverBorderWidth: 2,
                            hoverBorderColor: '#122738',
                        },//these objects will be rendered for every label mentioned in the above array "labels"
                    ]
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    loadStatistics = () =>{
        axios.get('api/countSeverityForProgrammerInProject',{
            params:{
                PrId: localStorage.getItem('Pid'),
                Pid: this.props.match.params.projectId
            }
        })
        .then((res)=>{
            const total = res.data[0] + res.data[1] + res.data[2] + res.data[3] + res.data[4] + res.data[5] + res.data[6] + res.data[7];
            this.setState({
                lineData:{
                    labels: ['Feature', 'Trivial', 'Text', 'Tweak','Minor','Major','Crash','Block'], //Bar names
                    datasets:[
                        {// this is an object that you fill in each point in the graph
                            label:'Percentage of Total Tasks',
                            data:[(res.data[0]/total * 100), (res.data[1]/total * 100), (res.data[2]/total * 100), (res.data[3]/total * 100),
                            (res.data[4]/total * 100), (res.data[5]/total * 100), (res.data[6]/total * 100), (res.data[7]/total * 100),],
                            backgroundColor:'purple',
                            hoverBorderWidth: 2,
                            hoverBorderColor: '#122738',
                        },//these objects will be rendered for every label mentioned in the above array "labels"
                    ]
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getSeverityNumbers = () =>{
        axios.get('api/countSeverityForProgrammerInProject',{
            params:{
                PrId: localStorage.getItem('Pid'),
                Pid: this.props.match.params.projectId
            }
        })
        .then((res)=>{
            this.setState({
                pieData2:{
                    labels: ['Text', 'Trivial', 'Tweak', 'Minor','Feature','Major','Crash','Block'], //Bar names
                    datasets:[
                        {// this is an object that you fill in each point in the graph
                            label:'Number of Total Tasks',
                            data:[res.data[2],res.data[1],res.data[3],res.data[4],res.data[0],res.data[5],res.data[6],res.data[7]],
                            backgroundColor: ['#31bb05', '#a9e200', '#fbe022', '#ffce7a', '#fcb064', '#fd8854', '#fb5d4a', '#f8284a'],
                            hoverBorderWidth: 2,
                            hoverBorderColor: '#122738',
                        },//these objects will be rendered for every label mentioned in the above array "labels"
                    ]
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getFailedTasks = () =>{
        axios.get('api/getFailedTasksForProgrammerInProject',{
            params:{
                PrId: localStorage.getItem('Pid'),
                Pid: this.props.match.params.projectId
            }
        })
        .then((res)=>{
            this.setState({
                pieData:{ //the data here should also be dynamic depending on what the PM wants to see
                    labels: ['Completed', 'Failed'], //Bar names
                    datasets:[ //here you mostly fill the data of the grap
                        {// this is an object that you fill in each point in the graph
                            label:'Number of Tasks',
                            data:[res.data[1],res.data[0]],
                            backgroundColor: [
                                '#003f5c',
                                '#ffa600',
                            ],
                            hoverBorderWidth: 2,
                            hoverBorderColor: '#122738',
                        },//these objects will be rendered for every label mentioned in the above array "labels"
                    ]
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getTaskNumbers = () =>{
        axios.get('api/countStatusForProgrammerInProject', {
            params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                PrId: localStorage.getItem('Pid'),
                Pid: this.props.match.params.projectId
            }
        })
        .then((res) => {
        //New-assigned - Progress - Resolved - Closed - Re-Opened
        this.setState({
            graphData:{ //the data here should also be dynamic depending on what the PM wants to see
                    labels: ['New-Assigned', 'Progress', 'Resolved', 'Closed','Re-Opened'],
                    datasets:[ //here you mostly fill the data of the graph
                        {// this is an object that you fill in each point in the graph
                            label:'',
                            data:[res.data[0],res.data[1],res.data[2],res.data[3],res.data[4]],
                            backgroundColor:['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
                            borderColor: 'orange',
                        },//these objects will be rendered for every label mentioned in the above array "labels"
                    ]
                }
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    render() {
        if(!this.props.loggedIn) {
            this.props.addNotification('Error', 'Please login first', 'danger');
            this.props.history.push('/');
        }
        return(
            <div className="canvas-background">
                <div className="info-bar">
                    <span className="decorative-box">i</span>
                    <span className="info-bar-page">Project</span>
                    <span className="info-bar-text">{this.props.infobar}</span> 
                </div>
                <hr className="hr" style={{margin:'0'}} />
                <Spring from={{opacity:0}} // you must wrap the part of the component you want animated in this spring syntax
                        to={{opacity:1}}
                        config={{duration:750}}
                >
                    {props => (
                        <div style={props}>
                            <div className="grid-container">
                            <div className="grid-item">
                            <Bar height = '270' width = '665'  //everything here can be dynamic depending on results 
                                        data={this.state.graphData} //this should alawys be dynamic   
                                        options={{
                                            maintainAspectRatio: false,
                                            title:{ 
                                                display:true,
                                                text:'Task Status Count', //this should also be dynamic
                                                fontSize:25,
                                                fontFamily: '"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                                            },
                                            legend:{ //this should also be dynamic
                                                display:false,
                                            },
                                            scales:{
                                                yAxes:[{
                                                    scaleLabel:{
                                                        display: true,
                                                        labelString: 'Number Of Tasks Of Status',
                                                    },
                                                    ticks: {   
                                                        beginAtZero: true,
                                                        stepSize: 1
                                                    },
                                                }],
                                                xAxes:[{
                                                    scaleLabel:{
                                                        display:true,
                                                        labelString: 'Status Type',
                                                    }
                                                }]
                                            }
                                            

                                            }}
                                        />
                                    </div>
                                <div className="grid-item">
                                <Pie //everything here can be dynamic depending on results 
                                        data={this.state.pieData} //this should alawys be dynamic
                                        options={{
                                            maintainAspectRatio: false,
                                            title:{ 
                                                display:true,
                                                text:'Completed Vs Failed Tasks', //this should also be dynamic
                                                fontSize:18
                                            },
                                            legend:{ //this should also be dynamic
                                                display:true,
                                                position:'right',
                                                labels:{
                                                    fontColor:'#333'
                                                }
                                            },
                                            
                                        }}
                                    />
                                </div> 
                                <div className="grid-item">
                                    <Line height = '270' width = '665' //everything here can be dynamic depending on results 
                                        data={this.state.lineData} //this should alawys be dynamic
                                        options={{
                                            maintainAspectRatio: false,
                                            title:{ 
                                                display:true,
                                                text:'Task Severity', //this should also be dynamic
                                                fontSize:25
                                            },
                                            legend:{ //this should also be dynamic
                                                display:true,
                                                position:'right',
                                                labels:{
                                                    fontColor:'#333'
                                                }   
                                            },
                                            scales:{
                                                yAxes:[{
                                                    ticks: {
                                                        callback: function (value) {
                                                            return Number(value).toFixed()+"%"
                                                          },
                                                        beginAtZero: true,
                                                        min: 0,
                                                        max: 100
                                                    },
                                                    scaleLabel:{
                                                        display: true,
                                                        labelString: 'Percentage %',
                                                    }
                                                }],
                                                xAxes:[{
                                                    scaleLabel:{
                                                        display:true,
                                                        labelString: 'Task Severity',
                                                    }
                                                }]
                                                
                                            }
                                        }}
                                        />
                                </div>
                                <div className="grid-item">
                                <Pie //everything here can be dynamic depending on results 
                                        data={this.state.pieData2} //this should alawys be dynamic
                                        options={{
                                            maintainAspectRatio: false,
                                            title:{ 
                                                display:true,
                                                text:'Task Severity Numbers', //this should also be dynamic
                                                fontSize:18
                                            },
                                            legend:{ //this should also be dynamic
                                                display:true,
                                                position:'right',
                                                labels:{
                                                    fontColor:'#333'
                                                }
                                            },
                                            
                                        }}
                                    />
                                </div>
                            </div>
                    </div>
                    )}
                    </Spring>
                </div>
        );
    }
}