import React from 'react';

export default class Search extends React.Component {

    state = {
        programmers: []
    }

    //componentDidMount(){
    //    axios.get('/app/Http/Controllers/ProgammerController@FindProgrammer').then(response =>{
        //    this.setState({programmers:response.data})
      //  });
    //}

    render() {
    //    const programmers = this.state.programmers;

        return (
          //  programmers.map()

            <div className="canvas-background">
                <div className="grid-search-container">
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
                </div>
            </div>
        );
    }
}