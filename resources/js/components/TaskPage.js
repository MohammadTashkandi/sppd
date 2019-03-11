import React from 'react';

export default class TaskPage extends React.Component {

    render() {
        return(
            <React.Fragment>
                <div className="info-bar">
                        <span className="decorative-box">i</span>
                        <span className="info-bar-page">Task</span>
                        <span className="info-bar-text">{this.props.infobar}</span>
                        <span>
                            
                        </span>
                </div>
                <hr className="hr" style={{margin:'0'}} />

                <h2>Task Page</h2>
            </React.Fragment>
        );
    }
}