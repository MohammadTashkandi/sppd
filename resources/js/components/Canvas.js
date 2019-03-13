import React from 'react';
import {NavLink} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';
import {Bar,Line, Pie} from 'react-chartjs-2';

export default class Canvas extends React.Component {
    
    state = {
        barData:{ //the data here should also be dynamic depending on what the PM wants to see
            labels: ['Unassigned->Assigned', 'Assigned->Progress', 'Progress->Resolved', 'Resolved->Closed'], //Bar names
            datasets:[ //here you mostly fill the data of the grap
                {// this is an object that you fill in each point in the graph
                    label:'Min',
                    data:[4,8,10,12],
                    backgroundColor:'rgb(44, 135, 196)',
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#122738',
                },//these objects will be rendered for every label mentioned in the above array "labels"
                {
                    label:'Average',
                    data:[20,15,13,14],
                    backgroundColor:'#9d9d9d',
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#122738',
                },//if you want more than 1 bar for a label, then add more object with the desired aspects!
                {
                    label:'Max',
                    data:[40,32,44,50],
                    backgroundColor:'#ffc600',
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#122738'
                }
            ]
        },
        lineData:{ //the data here should also be dynamic depending on what the PM wants to see
            labels: ['Major', 'Minor', 'Tweak', 'Crash'], //Bar names
            datasets:[ //here you mostly fill the data of the grap
                {// this is an object that you fill in each point in the graph
                    label:'Number of Tasks',
                    data:[3,12,6,1],
                    backgroundColor:'purple',
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#122738',
                },//these objects will be rendered for every label mentioned in the above array "labels"
            ]
        },
        pieData:{ //the data here should also be dynamic depending on what the PM wants to see
            labels: ['Major', 'Minor', 'Tweak', 'Crash'], //Bar names
            datasets:[ //here you mostly fill the data of the grap
                {// this is an object that you fill in each point in the graph
                    label:'Number of Tasks',
                    data:[3,12,6,1],
                    backgroundColor: [
                        'blue',
                        'red',
                        'green',
                        'pink',
                    ],
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#122738',
                },//these objects will be rendered for every label mentioned in the above array "labels"
            ]
        }
    }

    render() {
        return(
            <div className="canvas-background">
                <div className="info-bar">
                    <span className="decorative-box">i</span>
                    <span className="info-bar-page">Project</span>
                    <span className="info-bar-text">{this.props.infobar}</span>
                    <span>
                        <NavLink to={`/index/assignEmployee/${this.props.match.params.projectId}`}><button style={{marginRight:'1rem'}}className="info-bar-btn">Assign Employee</button></NavLink>
                        <NavLink to={`/index/createTask/${this.props.match.params.projectId}`}><button className="info-bar-btn">Create task</button></NavLink>
                    </span>
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
                                    <Bar height='270' width='665'  //everything here can be dynamic depending on results 
                                        data={this.state.barData} //this should alawys be dynamic
                                        options={{
                                            maintainAspectRatio: false,
                                            title:{ 
                                                display:true,
                                                text:'Task Transition Time', //this should also be dynamic
                                                fontSize:25
                                            },
                                            legend:{ //this should also be dynamic
                                                display:true,
                                                position:'right',
                                                labels:{
                                                    fontColor: '#333'
                                                }
                                            },
                                            scales:{
                                                yAxes:[{
                                                    scaleLabel:{
                                                        display: true,
                                                        labelString: 'Time in Days',
                                                    }
                                                }],
                                                xAxes:[{
                                                    scaleLabel:{
                                                        display:true,
                                                        labelString: 'Transition Time',
                                                    }
                                                }]
                                            }
                                            

                                            }}
                                        />
                                    </div>
                                    <div className="grid-item">2</div>
                                    <div className="grid-item">3</div>  
                                    <div className="grid-item">4</div>
                                </div>
<<<<<<< HEAD
                                <div className="grid-item">
                                    <Pie height='140' width='330'//everything here can be dynamic depending on results 
                                        data={this.state.pieData} //this should alawys be dynamic
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

                                        }}
                                    />
                                </div> 
                                <div className="grid-item">
                                    <Line height='270' width='665'//everything here can be dynamic depending on results 
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
=======
>>>>>>> 555327ddc443f21fb3c0f0a898004a3de2e3ff82
                            </div>
                    )}
                    </Spring>
                </div>
        );
    }
}