import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import SideBar from './SideBar';
import Canvas from './Canvas';
import InfoBar from './InfoBar';


export default class Index extends React.Component {
    render() {
        return (
            <div style={{maxHeight:'100vh'}}> 
                <Header />
                <SideBar />
                <InfoBar />
                <Canvas />
            </div>
            
        );
    }
}



if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
