import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from './pages/Index';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/404';

const axios = require('axios');

export const ax = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
});
/*ax.get('/encomenda')
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.log(e);
            })
            */

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        
        return ( 
            <div className = "App" > 
                <Router> 
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            <Index></Index>
                        </Route>

                        <Route component={NotFound} />
                        
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );

    }
}
