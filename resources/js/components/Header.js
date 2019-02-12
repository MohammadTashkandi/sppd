import React from 'react';
import logo from '../../LOGO2.png';

export default class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-inverse" id="header-nav">
                <div className="container-fluid">
                    <div className="navbar-header" id="header-first">
                        <a href="#"><img src={logo} id="logo"/></a>
                    </div>
                        <ul className="nav navbar-nav" id="header-middle">
                            <li className="home-link"><a href="#">Home</a></li>
                            <li className="search-link"><a href="#">Search</a></li>
                            <li className="notification-link"><a href="#"><i className="fas fa-comment-alt" id="bell"></i></a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right" id="header-last"> 
                           <a href="#" className="btn btn-info btn-lg" id="logout-btn"> <span className="glyphicon glyphicon-log-out"></span> Logout</a>
                        </ul>
                </div>
            </nav>
        );
    }
}