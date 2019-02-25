import React from 'react';

export default class Login extends React.Component {
    state = {
        username:"",
        password:"",
    }

    onChange = (e) => {
        this.setState({ [e.current.name]:e.current.value })
    }
    render() {
        return(
            <form>
                <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
                <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" />
                <input type="submit" className="fadeIn fourth" value="Log In" />
            </form>

        );
    }
}