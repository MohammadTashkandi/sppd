import React from 'react';
import {NavLink} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';
import {Radar} from 'react-chartjs-2';

export default class EmployeePage extends React.Component {
    
    state = {
        barData:{ //the data here should also be dynamic depending on what the PM wants to see
            labels: ['Judgement', 'Communication', 'Stress Tolerance', 'Technical'],
            datasets:[ //here you mostly fill the data of the graph
                {// this is an object that you fill in each point in the graph
                    label:'',
                    data:[1,3,5,4],
                    backgroundColor:'rgb(247, 199, 111, 0.4)',
                    borderColor: 'orange',
                },//these objects will be rendered for every label mentioned in the above array "labels"
            ]
        },
    }

    render() {
        return(
            <div className="canvas-background">
                <div className="info-bar">
                    <span className="decorative-box">i</span>
                    <span className="info-bar-page">Employee's Profile</span>
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
                                    <Radar height = '270' width = '665'  //everything here can be dynamic depending on results 
                                        data={this.state.barData} //this should alawys be dynamic   
                                        options={{
                                            legend: {
                                                display: false
                                              },
                                              title:{ 
                                                display:true,
                                                text:'Personal Performance Measures', //this should also be dynamic
                                                fontSize:25,
                                                },
                                              scale: {
                                                ticks: {
                                                  beginAtZero: true
                                                }
                                            }

                                            }}
                                        />
                                    </div>
                                <div className="grid-item-profile">
                                    <h4>Personal Information:</h4>
                                    <div className="profile-info">name</div>
                                    <div className="profile-info">id</div>
                                    <div className="profile-info">email</div>
                                    <div className="profile-info">number</div>
                                </div> 
                                
                            </div>
                    </div>
                    )}
                    </Spring>
                </div>
        );
    }
}