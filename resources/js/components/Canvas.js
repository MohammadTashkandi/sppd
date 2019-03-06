import React from 'react';
import {NavLink} from 'react-router-dom';

export default class Canvas extends React.Component {


    render() {
        return(
            <div className="canvas-background">
                <hr className="hr" style={{margin:'0'}} />
                <div className="grid-container">
                    <div className="grid-item">1</div>
                    <div className="grid-item"><NavLink to={`/index/createTask/${this.props.match.params.projectId}`}><button>Create task</button></NavLink></div>
                    <div className="grid-item">3</div>  
                    <div className="grid-item">4</div>
                </div>
            </div>
        );
    }
}