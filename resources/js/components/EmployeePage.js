import React from 'react';
import {Spring} from 'react-spring/renderprops';
import {Radar,Pie} from 'react-chartjs-2';

export default class EmployeePage extends React.Component {
    
    state = {
        name:"",
        email: "",
        number: "",
        start:"",
        end:0,
        barData:{},
        pieData:{ //the data here should also be dynamic depending on what the PM wants to see
            labels: ['Completed', 'Failed'], //Bar names
            datasets:[ //here you mostly fill the data of the grap
                {// this is an object that you fill in each point in the graph
                    label:'Number of Tasks',
                    data:[3,12],
                    backgroundColor: [
                        'green',
                        'red',
                    ],
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#122738',
                },//these objects will be rendered for every label mentioned in the above array "labels"
            ]
        }
    }

    componentDidMount(){
        this.loadProgrammerInfo();
    }

    loadProgrammerInfo = () =>{
        axios.get('api/getProgrammerInfo', {
            params: { /* if youre using get requests in axios and you want to send a parameter you have to use this syntax(put params) */
                Pid: this.props.match.params.id,
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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick = () =>{
        console.log(this.state);
    }
    render() {
        return(
            <div className="canvas-background">
                <div className="info-bar">
                    <span className="decorative-box">i</span>
                    <span className="info-bar-page">Employee's Profile</span>
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
                                <Pie height='260' width='700'//everything here can be dynamic depending on results 
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
                                <div className="grid-item-profile">
                                    <div>

                                    <h4 id="profile-2" style={{marginBottom:"1.5rem"}}>Calculate Programmer Productivity:</h4>
                                    <div className="profile-info" id="profile">
                                        <b style={{fontStyle:"normal"}}>Enter Start Time (In date):</b>
                                        <div style={{marginBottom:"0.8rem"}}> {/* seperator */}
                                        </div> <input type= "date" name = "start" onChange={this.onChange} required />
                                    </div>
                                    <div className="profile-info" id="profile">
                                        <b style={{fontStyle:"normal"}}>Enter Length Of Time Beginning From Start Date:</b>
                                        <div style={{marginBottom:"0.8rem"}}> {/* seperator */}
                                        </div> <input type="number" name = "end" placeholder="In Hours" onChange={this.onChange} required />
                                    </div>
                                    <div className="profile-info" id="profile">
                                        <b style={{fontStyle:"normal"}}><button onClick={this.onClick}>Calculate</button></b>
                                        <div style={{marginBottom:"0.8rem"}}> {/* seperator */}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    )}
                    </Spring>
                </div>
        );
    }
}