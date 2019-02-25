import React from 'react';

import Header from './Header';
import SideBar from './SideBar';
import InfoBar from './InfoBar';




export default class Index extends React.Component {
    state = {
        projects: {
            project1:{name:"Project 1", task1:"Fix that", task2:"repair that", task3:"do that" },
            project2:{name: "Project 2", task1:"Fix what", task2:"repair what", task3:"do what" },
            project3:{name: "Project 3", task1:"Fix this", task2:"repair this", task3:"do this" },
            project4:{name: "Project 4", task1:"Fix who", task2:"repair who", task3:"do who" },
        },
    }

    render() {
        return (
                <div history={this.props.history} style={{maxHeight:'100vh'}}> 
                        <Header />
                        <SideBar projects={this.state.projects}/>
                        <InfoBar />
                </div>
        );
    }
}
