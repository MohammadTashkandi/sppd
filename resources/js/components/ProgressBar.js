import React from 'react';

export default class ProgressBar extends React.Component{
    render(){
        return(
            <React.Fragment>
                <h5 className="progress-header">Project Progress: 35%</h5> {/* dynamic */} 
                <div className="track">
                    <div className="thumb" style={{height: "65%"}}></div> {/* 0% means complete 100% means not started
                                                                            so for 35% we do 100-35 = 65 nad vice versa
                                                                          heigh its also dynamic depending on calculations */}
                </div>
                <h6 className="date-header"><b>Start Date:</b>2-26-2019</h6>
                <h6 className="date-header" style={{marginBottom:"2rem"}}><b>Planned End Date:</b>2-30-2019</h6>
            </React.Fragment>
        )
    }
}