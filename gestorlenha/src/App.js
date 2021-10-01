import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from './pages/Index';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import NotFound from './pages/404';
import CriarPedido from './pages/CriarPedido';
import VerPedidos from './pages/VerPedidos';

const axios = require('axios');

export const ax = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
});



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: {}};
    }

    update_login(login){
        this.setState({login});
    }

    
    render() {
        
        return ( 
            <div className = "App" > 
                <Router> 
                    <Navbar login={this.state.login} update_login={this.update_login.bind(this)}/>
                    <Switch>
                        <Route exact path="/">
                            <Index></Index>
                        </Route>

                        <Route exact path="/login">
                            <Login update_login={this.update_login.bind(this)}/>
                        </Route>
                        
                        <Route exact path="/criarpedido">
                            <CriarPedido login={this.state.login}/>
                        </Route>

                        <Route exact path="/verpedidos">
                            <VerPedidos login={this.state.login}/>
                        </Route>

                        <Route component={NotFound} />
                        
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );

    }
}
