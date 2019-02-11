import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-inverse" id="header-nav">
                <div className="container-fluid">
                    <div className="navbar-header" id="header-first">
                        <a className="navbar-brand" href="#">WebSiteName</a>
                    </div>
                        <ul className="nav navbar-nav" id="header-middle">
                            <li className="active"><a href="#">Home</a></li>
                            <li className="inactive"><a href="#">Notifications</a></li>
                            <li className="inactive"><a href="#">Search</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right" id="header-last">
                            <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                        </ul>
                </div>
            </nav>
        );
    }
}