import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import SideBar from './SideBar';


export default class Index extends React.Component {
    render() {
        return (
            <div>
                pull this 
                <Header />
                <SideBar />
            </div>
            
        );
    }
}



if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
