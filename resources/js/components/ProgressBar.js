import React from 'react';

export default class ProgressBar extends React.Component{
    render(){
        return(
            <React.Fragment>
                <h5 className="progress-header">Project Progress: 75%</h5>
                <div className="track">
                    <div className="thumb" style={{height: "65%"}}></div>
                </div>
                <h6 className="date-header"><b>Start Date:</b>2-26-2019</h6>
                <h6 className="date-header" style={{marginBottom:"2rem"}}><b>Planned End Date:</b>2-30-2019</h6>
            </React.Fragment>
        )
    }
}