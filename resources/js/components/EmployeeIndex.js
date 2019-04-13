import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {Radar,Bar} from 'react-chartjs-2';

export default class EmployeeIndex extends React.Component {    
    state = {
        name: "",
        email: "",
        number: "",
        barData:{},
        graphData:{}
    }

    componentDidMount(){
        this.loadProgrammerInfo();
        this.getTaskNumbers();
    }

    loadProgrammerInfo = () =>{
        axios.get('api/getProgrammerInfo', {
            params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                Pid: localStorage.getItem('Pid')
            }
        })
        .then((res) => {
            if(res.status==200){
                const name = res.data.first_name + ' ' + res.data.last_name;
                this.setState({
                    name:name,
                    email:res.data.email,
                    number:res.data.phone_number,
                    barData:{ //the data here should also be dynamic depending on what the PM wants to see
                        labels: ['Judgement', 'Communication', 'Stress Tolerance', 'Technical'],
                        datasets:[ //here you mostly fill the data of the graph
                            {// this is an object that you fill in each point in the graph
                                label:'',
                                data:[res.data.pJud,res.data.pCu,res.data.pStr,res.data.pTech],
                                backgroundColor:'rgb(247, 199, 111, 0.4)',
                                borderColor: 'orange',
                            },//these objects will be rendered for every label mentioned in the above array "labels"
                        ]
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err.response.data[0])
        })
    }

    getTaskNumbers = () =>{
        axios.get('api/countStatusForProgrammer', {
            params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                PrId: localStorage.getItem('Pid')
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
                            data:[res.data[0],res.data[1],res.data[2],res.data[3],res.data[4],res.data[5],res.data[6],res.data[7]], //change thisisishissis
                            backgroundColor: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
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
            <React.Fragment>
                <div className="canvas-background">
                <div className="info-bar">
                    <span className="decorative-box">i</span>
                    <span className="info-bar-page">Home</span>
                    <span className="info-bar-text" style={{textTransform:"capitalize"}}>{this.state.name}</span>
                    
                </div>
                <hr className="hr" style={{margin:'0'}} />
                <Spring from={{opacity:0}} // you must wrap the part of the component you want animated in this spring syntax
                        to={{opacity:1}}
                        config={{duration:1500}}
                >
                    {props => (
                        <div style={props}>
                            <div className="grid-container-2">

                                <div className="grid-item">
                                    <Radar height = '270' width = '665'  //everything here can be dynamic depending on results 
                                        data={this.state.barData} //this should alawys be dynamic   
                                        options={{
                                            legend: {
                                                display: false
                                              },
                                              title:{ 
                                                display:true,
                                                text:'Programmer Performance Measures', //this should also be dynamic
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

                                <div className="grid-item-profile">
                                    <h4 id="profile-2" style={{marginBottom:"1.5rem"}}>Personal Information:</h4>
                                    <div className="profile-info" id="profile">
                                        <b style={{fontStyle:"normal"}}>Name:</b>
                                        <div style={{marginBottom:"0.8rem"}}> {/* seperator */}
                                        </div>{this.state.name}
                                    </div>
                                    <div className="profile-info" id="profile">
                                        <b style={{fontStyle:"normal"}}>ID:</b>
                                        <div style={{marginBottom:"0.8rem"}}> {/* seperator */}
                                        </div>{this.props.match.params.id}
                                    </div>
                                    <div className="profile-info" id="profile">
                                        <b style={{fontStyle:"normal"}}>E-Mail:</b>
                                        <div style={{marginBottom:"0.8rem"}}> {/* seperator */}
                                        </div>{this.state.email}
                                    </div>
                                    <div className="profile-info" id="profile">
                                        <b style={{fontStyle:"normal"}}>Phone Number:</b>
                                        <div style={{marginBottom:"0.8rem"}}>
                                        </div>{this.state.number}
                                    </div>
                                </div>
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
                                                    }
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
                                <div className="grid-item-profile">
                                    <h4 id="profile-2" style={{marginBottom:"5rem"}}>Programmer Productivity:</h4>
                                    <div className="profile-info" id="profile">
                                        <b style={{fontStyle:"normal"}}>Productivity (Tasks Completed Per Day):</b>
                                        <div style={{marginBottom:"0.8rem"}}> {/* seperator */}
                                        </div>
                                    </div>
                                    <div style={{marginBottom:"3rem"}}> {/* seperator */}
                                        </div>
                                    <div className="profile-info" id="profile">
                                        <b style={{fontStyle:"normal"}}>This Programmer Finishes:</b>
                                        <div style={{marginBottom:"0.8rem"}}> {/* seperator */}
                                        </div> 1.3 Tasks everyday
                                    </div>
                                </div>
                            </div>
                    </div>
                    )}
                    </Spring>
                </div>
            </React.Fragment>
            );
    }
}