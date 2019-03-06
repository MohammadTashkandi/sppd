import React from 'react';
import {NavLink} from 'react-router-dom';

export default class Canvas extends React.Component {


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

                <div className="grid-container">
                    <div className="grid-item">1</div>
                    <div className="grid-item">2</div>
                    <div className="grid-item">3</div>  
                    <div className="grid-item">4</div>
                </div>
            </div>
        );
    }
}