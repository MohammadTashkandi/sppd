import React from 'react';

export default class AssignEmployee extends React.Component {
    gridRef = React.createRef();

    state = {
        programmers: {}
    }

    assignEmp = () =>{
        //this is not best practice to remove element, but did not know how to do it using refs
        document.getElementById("grid").parentElement.removeChild(document.getElementById("grid"));
    }

    render() {

        return (
            <div className="canvas-background">
                <div className="info-bar">
                    <span className="decorative-box">i</span>
                    <span className="info-bar-page">Assign Employee</span>
                    <span className="info-bar-text"></span>
                    <span>
                            
                    </span>
                </div>
                <hr className="hr" style={{margin:'0'}} />
                <div className="pad-top">{/* just some padding top */}</div>

                <div className="grid-search-container">
                    <div className="grid-assign-item" id="grid" ref={this.gridRef}>
                        <div className="assign-tag">M T</div>
                        <div className="assign-name">Mohammad Tashkandi</div>
                        <div className="assign-id">435160085</div>
                        <div className="assign-button">
                            <button type="submit" onClick={this.assignEmp}className="btn btn-default btn-sm" id="assign-emp">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}