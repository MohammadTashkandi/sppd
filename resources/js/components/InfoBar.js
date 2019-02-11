import React from 'react';

export default class InfoBar extends React.Component {
    render() {
        return(
            <React.Fragment>
                <p className="info-bar">
                    <span className="decorative-box">e</span>
                    <span>YOOOOO</span> { /*use the url to putsomething here*/ }
                </p>
                <hr style={{margin:'0'}}></hr>
            </React.Fragment>
        );
    }
}