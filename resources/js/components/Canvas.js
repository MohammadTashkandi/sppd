import React from 'react';
import {NavLink} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';
import {Bar} from 'react-chartjs-2';

export default class Canvas extends React.Component {
    
    state = {
        chartDate:{ //the data here should also be dynamic depending on what the PM wants to see
            labels: ['Unassigned->Assigned', 'Assigned->Progress', 'Progress->Resolved', 'Resolved->Closed'], //Bar names
            datasets:[ //here you mostly fill the data of the grap
                {// this is an object that you fill in each point in the graph
                    label:'Min',
                    data:[4,8,10,12],
                    backgroundColor:'rgb(44, 135, 196)',
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#122738'
                },//these objects will be rendered for every label mentioned in the above array "labels"
                {
                    label:'Average',
                    data:[20,15,13,14],
                    backgroundColor:'#9d9d9d',
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#122738'
                },//if you want more than 1 bar for a label, then add more object with the desired aspects!
                {
                    label:'Max',
                    data:[40,32,44,50],
                    backgroundColor:'#ffc600',
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#122738'
                }
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
                                    <Bar //everything here can be dynamic depending on results 
                                        data={this.state.chartDate} //this should alawys be dynamic
                                        options={{
                                            maintainAspectRatio: true,
                                            title:{ 
                                                display:true,
                                                text:'Status Duration', //this should also be dynamic
                                                fontSize:25
                                            },
                                            legend:{ //this should also be dynamic
                                                display:true,
                                                position:'right',
                                                labels:{
                                                    fontColor:'#ffc600'
                                                }
                                            },

                                        }}
                                    />
                                </div>
                                <div className="grid-item">2</div>
                                <div className="grid-item">3</div>  
                                <div className="grid-item">4</div>
                            </div>
                        </div>
                )}
                </Spring>
            </div>
        );
    }
}