import React from 'react';

export default class Search extends React.Component {

    state = {
        programmers: {}
    }

    componentWillMount(){
        /* const searchValue = this.props.match.params.userId;
        const id = parseInt(searchValue, 10);
        const res = searchValue.charAt(0) + searchValue.charAt(3);
        console.log(res) */
         /* axios.get('api/findProgrammer', {
                id: this.props.match.params.userId
        })
        .then((res) => {
            console.log(res);
            if(res.status==200){
                this.setState({programmers : res.data})
            }
            else{
                console.log("no programmers with this id");
            }
        }) */
    }
    componentDidUpdate(){
        axios.get('api/findProgrammers', {
                id: this.props.match.params.userId
        })
        .then((res) => {
            console.log(res);
            if(res.status==200){
                this.setState({programmers : res.data})
            }
            else{
                console.log("no programmers with this id");
            }
        })
    }
    componentWillUnmount(){
            this.props.isSearchFull(true);
    }
    renderProgrammer = (key) => {
        return(
            <div className="grid-search-container">
                    <div className="grid-search-item">
                        <div className="search-tag">{programmers[key].id}</div> {/* how to get letters from string? */}
                        <div className="search-name">{programmers[key].name}</div>
                        <div className="search-id">{programmers[key].id}</div>
                        <div className="search-button">
                            <a className="btn btn-default btn-sm" id="visit-page">
                                <span className="glyphicon glyphicon-stats"></span> View Stats
                            </a>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const programmers = Object.keys(this.state.programmers);

        return (
            <div className="canvas-background">
                {programmers.map(this.renderProgrammer)}
                {/* <div className="grid-search-container">
                    <div className="grid-search-item">
                        <div className="search-tag">MT</div>
                        <div className="search-name">Mohammad Tashkandi</div>
                        <div className="search-id">435160085</div>
                        <div className="search-button">
                            <a className="btn btn-default btn-sm" id="visit-page">
                                <span className="glyphicon glyphicon-stats"></span> View Stats
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}