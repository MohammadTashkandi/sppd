import axios from 'axios';

export const login = (user) => {
    axios.post('api/login', {
        email: user.username,
        password: user.password
    })
    .then((res) => {
        localStorage.setItem('usertoken', res.data.token);
        console.log(res);
    },{
        headers: {'Content-Type': 'application/json'}
    })
    .catch((err) => {
        console.log(err);
    })
}

export const register = (newUser) => {
    axios.post('api/register', newUser,{
        headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}