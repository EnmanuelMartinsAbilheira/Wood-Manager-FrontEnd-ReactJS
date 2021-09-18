import logo from './logo.svg';
import './App.css';
const axios = require('axios');

export const ax = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
});

function App() {
    ax.get('/encomenda')
        .then(r => {
            console.log(r);
        })
        .catch(e => {
            console.log(e);
        })

    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        img src = { logo }
        className = "App-logo"
        alt = "logo" / >
        <
        p >
        Edit < code > src / App.js < /code> and save to reload. < /
        p > <
        a className = "App-link"
        href = "https://reactjs.org"
        target = "_blank"
        rel = "noopener noreferrer" >
        Learn React <
        /a> < /
        header > <
        /div>
    );
}

export default App;