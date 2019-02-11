import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import SideBar from './SideBar';
import Canvas from './Canvas';


export default class Index extends React.Component {
    render() {
        return (
            <div> 
                <Header />
                <SideBar />
                <Canvas style={{marginLeft: '20%'}} />
            </div>
            
        );
    }
}



if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
