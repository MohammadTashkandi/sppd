import React from 'react';

export default class InfoBar extends React.Component {
    render() {
        const loggedIn=this.props.loggedIn;
        if(!loggedIn) {
            console.log('infobar '+loggedIn);
            return(null);
        }else {

            return(
                <React.Fragment>
                    <div className="info-bar">
                        <span className="decorative-box">e</span>
                        <span className="info-bar-page">{this.props.infobar.page}</span>
                        <span className="info-bar-text">{this.props.infobar.text}</span>
                    </div>
                    <hr className="hr" style={{margin:'0'}} />
                </React.Fragment>
            );
        }
    }
}