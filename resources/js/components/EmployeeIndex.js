import React from 'react';
export default class EmployeeIndex extends React.Component {
    
    state = {}

    render() {
        if(!this.props.loggedIn) {
            this.props.addNotification('Error', 'Please login first', 'danger');
            this.props.history.push('/');
        }
        return(
                
            <h1>home</h1>
            );
    }
}