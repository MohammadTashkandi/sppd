import React from 'react';
import {NavLink} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';

export default class Home extends React.Component {

    render() {
        return(
            <React.Fragment>
                <div className="info-bar">
                        <span className="decorative-box">i</span>
                        <span className="info-bar-page">Home</span>
                        <span className="info-bar-text"></span>
                        <span>
                            
                        </span>
                </div>
                <hr className="hr" style={{margin:'0'}} />
                    <h2 className="home-h2">Welcome to Your Dashboard !</h2>
                    <h3 className="home-h3">
                        Start registering your employees or navigate your projects and tasks on the left sidebar  
                    </h3>
                    <h4 className="home-h4">
                        Haven't started a project yet? Well click below and start !
                    </h4>
                    <Spring from={{opacity:0 , marginLeft: 0}} // you must wrap the part of the component you want animated in this spring syntax
                    to={{opacity:1, marginLeft: 750}}
                    config={{duration:2500}}
            >
                {props => (
                    <div style={props}>
                        <NavLink to={`/index/createProject`}><button className="info-bar-btn-home">Start a Project !</button></NavLink>
                    </div>
                )}
            </Spring>
                    
                
            </React.Fragment>
        );
    }
}