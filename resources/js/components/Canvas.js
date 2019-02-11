import React from 'react';

export default class Canvas extends React.Component {
    render() {
        return(
            <div className="canvas-background">
                <div className="grid-container">
                    <div className="grid-item-large">1</div>
                    <div className="grid-item">2</div>
                    <div className="grid-item">3</div>
                    <div className="grid-item">4</div>
                    <div className="grid-item">5</div>
                </div>
            </div>
        );
    }
}