import React from 'react';

export default class InfoBar extends React.Component {
    render() {
        const loggedIn=this.props.loggedIn;
        if(!loggedIn) {
            console.log('infobar '+loggedIn);
            return(null);
        }else {

            return(
                null
            );
        }
    }
}