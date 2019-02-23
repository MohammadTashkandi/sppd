import React from 'react';

export default class Search extends React.Component {
    render() {
        return (
            <div className="canvas-background">
                <div className="grid-search-container">
                    <div className="grid-search-item">
                        <div className="search-tag">MT</div>
                        <div className="search-name">Mohammad Tashkandi</div>
                        <div className="search-id">435160085</div>
                        <div className="search-button">
                            <a className="btn btn-default btn-sm" id="visit-page">
                                <span class="glyphicon glyphicon-stats"></span> View Stats
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}